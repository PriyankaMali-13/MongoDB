//Insert Documents
db.movies.insert([
	{
		title: "Fight Club",
		writer: "Chuck Palahniuko",
		year: 1999,
		actors: ["Brad Pitt", "Edward Norton"],
	},
	{
		title: "Pulp Fiction",
		writer: "Quentin Tarantino",
		year: 1994,
		actors: ["John Travolta", "Uma Thurman"],
	},
	{
		title: "Inglorious Basterds",
		writer: "Quentin Tarantino",
		year: 2009,
		actors: ["Brad Pitt", "Diane Kruger", "Eli Roth"],
	},
	{
		title: "The Hobbit: An Unexpected Journey",
		writer: "J.R.R. Tolkein",
		year: 2012,
		franchise: "The Hobbit",
	},
	{
		title: "The Hobbit: An Desolation of Smaug",
		writer: "J.R.R. Tolkein",
		year: 2013,
		franchise: "The Hobbit",
	},
	{
		title: "The Hobbit: The Battle of the Five Armies",
		writer: "J.R.R. Tolkein",
		year: 2012,
		franchise: "The Hobbit",
		synopsis:
			"Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.",
	},
	{ title: "Pee Wee Herman Big Adventure" },
	{ title: "Avtar" },
]);

//Find Documents
//1
db.movies.find();
db.getCollection("movies").find();
//2
db.movies.find({ writer: "Quentin Tarantino" });
//3
db.movies.find({ actors: "Brad Pitt" });
//4
db.movies.find({ franchise: "The Hobbit" });
//5
db.movies.find({ $and: [{ year: { $gt: 1900 } }, { year: { $lt: 2000 } }] });
//6
db.movies.find({ $or: [{ year: { $lt: 2000 } }, { year: { $gt: 2010 } }] });

//Update
//1
db.movies.update(
	{ title: "The Hobbit: An Unexpected Journey" },
	{
		$set: {
			synopsis:
				"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.",
		},
	}
);
//2
db.movies.update(
	{ title: "The Hobbit: The Desolation of Smaug" },
	{
		$set: {
			synopsis:
				"The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.",
		},
	}
);
//3
db.movies.update(
	{ title: "Pulp Fiction" },
	{ $push: { actors: "Samuel L. Jackson" } }
);

//Text
//1 ---the dot character (i.e. .) to match all characters including new line
db.movies.find({ synopsis: /.Bilbo./ });
//2
db.movies.find({ synopsis: /.Gandalf./ });
//3
db.movies.find({
	$and: [{ synopsis: /Bilbo/ }, { synopsis: { $not: /Gandalf/ } }],
});
//4
db.movies.find({ $or: [{ synopsis: /dwarves/ }, { synopsis: /hobbit/ }] });
//5
db.movies.find({ $and: [{ synopsis: /gold/ }, { synopsis: /dragon/ }] });

//Delete
//1 We can also use remove to delete document
db.movies.deleteOne({ title: "Pee Wee Herman Big Adventure" });
//2
db.movies.remove({ title: "Avtar" });

//Relationships
//Insert Users
db.users.insert([
	{
		username: "GoodGuyGreg",
		first_name: "Good Guy",
		last_name: "Greg",
	},
	{
		username: "ScumbagSteve",
		full_name: {
			first: "Scumbag",
			last: "Steve",
		},
	},
]);

//Insert Posts
db.posts.insert([
	{
		_id: 1,
		username: "GoodGuyGreg",
		title: "Passes out at party",
		body: "Wakes up early and cleans house",
	},

	{
		_id: 2,
		username: "GoodGuyGreg",
		title: "Steals your identity",
		body: "Raises your credit score",
	},

	{
		_id: 3,
		username: "GoodGuyGreg",
		title: "Reports a bug in your code",
		body: "Sends you a Pull Request",
	},

	{
		_id: 4,
		username: "ScumbagSteve",
		title: "Borrows something",
		body: "Sells it",
	},

	{
		_id: 5,
		username: "ScumbagSteve",
		title: "Borrows everything",
		body: "The end",
	},

	{
		_id: 6,
		username: "ScumbagSteve",
		title: "Forks your repo on github",
		body: "Sets to private",
	},
]);

//Insert Comments
db.comments.insert([
	{
		username: "GoodGuyGreg",
		comment: "Hope you got a good deal!",
		post: 4,
	},
	{
		username: "GoodGuyGreg",
		comment: "What's mine is yours!",
		post: 5,
	},
	{
		username: "GoodGuyGreg",
		comment: "Don't violate the licensing agreement!",
		post: 6,
	},
	{
		username: "ScumbagSteve",
		comment: "It still isn't clean",
		post: 1,
	},
	{
		username: "ScumbagSteve",
		comment: "Denied your PR cause I found a hack",
		post: 3,
	},
]);

//Quries on relation
//1
db.users.find();
//2
db.posts.find();
//3
db.posts.find({ username: "GoodGuyGreg" });
//4
db.posts.find({ username: "ScumbagSteve" });
//5
db.comments.find();
//6
db.comments.find({ username: "GoodGuyGreg" });
//7
db.comments.find({ username: "ScumbagSteve" });
//8
db.comments.find({
	post: db.posts.findOne({ title: "Reports a bug in your code" })._id,
});
