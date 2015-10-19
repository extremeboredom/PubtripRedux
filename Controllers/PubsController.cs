

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using pubtrip_redux.Models;

[Authorize]
public class PubsController : Controller
{
	private ApplicationDbContext m_dbContext;
	
	public PubsController(ApplicationDbContext dbContext)
	{
		m_dbContext = dbContext;
		
		if (!m_dbContext.Pubs.Any())
		{
			var rancliffe = new Pub {Name = "Rancliffe Arms" };
			m_dbContext.Pubs.AddRange(
				rancliffe,
				new Pub {
					Name = "Generous Briton"
				}
			);
			m_dbContext.Trips.Add(new Trip{ Name = "My First Trip", Pub = rancliffe});
			m_dbContext.SaveChanges();
		}
	}
	
	[HttpGet]
	[Route("api/pubs")]
	public async Task<List<Pub>> GetPubsAsync(CancellationToken cancel)
	{
		return await m_dbContext.Pubs.ToListAsync(cancel);
	}
}