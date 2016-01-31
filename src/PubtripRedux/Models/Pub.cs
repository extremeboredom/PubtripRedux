using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using pubtrip_redux.Models;

public class Pub
{
	public int Id { get; set; }
	public string Name { get; set; }
	public List<Trip> Trips { get; set; }
}

public class Trip
{
	public int Id { get; set; }
	public string Name { get; set; }
	public DateTimeOffset Date { get; set; }
	public DateTimeOffset? OrderCutoff { get; set; }
	[Required]
	public ApplicationUser Organiser { get; set; }
	[Required]
	public Pub Pub { get; set; }
	
	public ICollection<Attendee> Attendees { get; set; }
}

public class Attendee
{
	public int Id { get; set; }
	
	[Required]
	public Trip Trip { get; set; }
	
	[Required]
	public ApplicationUser User { get; set; }
}