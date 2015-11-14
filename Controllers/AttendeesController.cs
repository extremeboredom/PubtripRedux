
using System.Linq;
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
		[RouteAttribute("api/trips/{tripId}/attendees")]
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
	}
}