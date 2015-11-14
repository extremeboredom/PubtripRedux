
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using pubtrip_redux.Models;

namespace pubtrp_redux.Controllers
{
	[Authorize]
	public class AttendeesController: Controller
	{
		private ApplicationDbContext m_dbContext;
		
		public AttendeesController(ApplicationDbContext dbContext)
		{
			m_dbContext = dbContext;
		}
		
		[HttpGet]
		[Route("api/trips/{tripId}/attendees")]
		public async Task<IActionResult> GetAttendeesForTripAsync(int tripId, CancellationToken cancel)
		{
			var attendees = await m_dbContext.Attendees
											 .Where(a => a.Trip.Id == tripId)
											 .Select(a => new {
												 a.Id,
												 Trip = a.Trip.Id,
												 User = a.User.UserName
											 })
											 .ToListAsync(cancel);
											 
			return new HttpOkObjectResult(attendees);
		}
		
		[HttpPost]
		[Route("api/trips/{tripId}/attendees")]
		public async Task<IActionResult> StartAttendingAsync(int tripId, CancellationToken cancel)
		{
			var trip = await m_dbContext.Trips
										.FirstOrDefaultAsync(t => t.Id == tripId, cancel);
										
			if (trip == null) {
				return new BadRequestResult();
			}
			
			var userId = User.GetUserId();
        	var user = await m_dbContext.Users.FirstAsync(u => u.Id == userId);
			
			var attendee = new Attendee
			{
				User = user,
				Trip = trip
			};
			
			m_dbContext.Attendees.Add(attendee);
			
			await m_dbContext.SaveChangesAsync(cancel);
			
			var createdDto = new
			{
				attendee.Id,
				Trip = attendee.Trip.Id,
				User = attendee.User.UserName
			};
			
			return new CreatedResult(
				string.Format("/api/trips/{0}/attendees/{1}", tripId, attendee.Id), 
				createdDto);
		}
	}
}