using System.Collections.Generic;

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
	public Pub Pub { get; set; }
}