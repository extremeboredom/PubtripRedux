using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using pubtrip_redux.Models;

public class TripDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Pub { get; set; }
    public DateTimeOffset Date { get; set; }
}

[Authorize]
public class TripsController : Controller
{
    private ApplicationDbContext m_dbContext;

    public TripsController(ApplicationDbContext dbContext)
    {
        m_dbContext = dbContext;
    }

    [HttpPost]
    [Route("api/trips")]
    public async Task<IActionResult> CreateTripAsync([FromBody]TripDto tripDto, CancellationToken cancel)
    {
        var pub = await m_dbContext.Pubs
                                   .Include(p => p.Trips)
                                   .FirstOrDefaultAsync(p => p.Id == tripDto.Pub, cancel);
        if (pub == null)
        {
            return new BadRequestResult();
        }
        
        var userId = User.GetUserId();
        var user = await m_dbContext.Users.FirstAsync(u => u.Id == userId);
        var trip = new Trip
        {
            Name = tripDto.Name,
            Pub = pub,
            Date = tripDto.Date,
            Organiser = user,
            Attendees = new List<Attendee>{ new Attendee { User = user } }
        };

        m_dbContext.Trips.Add(trip);

        await m_dbContext.SaveChangesAsync(cancel);

        var createdDto = new
        {
            Id = trip.Id,
            Name = trip.Name,
            trip.Date,
            Organiser = new { 
                trip.Organiser.UserName
            },
            Pub = new
            {
                Id = trip.Pub.Id,
                Name = trip.Pub.Name,
                TripsUrl = String.Format("/api/pubs/{0}/trips", trip.Pub.Id)
            }
        };

        return new CreatedResult(String.Format("/api/trips/{0}", trip.Id), createdDto);
    }

    [HttpGet]
    [Route("api/pubs/{pubId}/trips")]
    public async Task<IActionResult> GetTripsForPubAsync(int pubId, CancellationToken cancel)
    {
        var trips = await m_dbContext.Trips
									 .Where(t => t.Pub.Id == pubId)
									 .Select(t => new
									 {
									 	 Id = t.Id,
										 Name = t.Name,
                                         t.Date,
                                         Organiser = new { 
                                             t.Organiser.UserName
                                         },
										 Pub = new {
                                             t.Pub.Id
                                         }
									 })
									 .ToListAsync();

        return new HttpOkObjectResult(trips);
    }
    
    [HttpGet]
    [Route("api/trips/{tripId}")]
    public async Task<IActionResult> GetTripAsync(int tripId, CancellationToken cancel)
    {
        var trip = await m_dbContext.Trips
                                    .Where(t => t.Id == tripId)
                                    .Select(t => new {
                                        t.Id,
                                        t.Name,
                                        t.Date,
                                        Organiser = new {
                                            t.Organiser.UserName
                                        },
                                        Pub = new {
                                            t.Pub.Id,
                                            t.Pub.Name
                                        }
                                    })
                                    .FirstOrDefaultAsync(cancel);
        
        return new HttpOkObjectResult(trip);
    }
}