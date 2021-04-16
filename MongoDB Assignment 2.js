//Atlanta Population
//1
db.zipcodes.find({ $and: [{ city: "ATLANTA" }, { state: "GA" }] });
//2
db.zipcodes.aggregate([
	{ $match: { $and: [{ city: "ATLANTA" }, { state: "GA" }] } },
]);
//3
db.zipcodes.aggregate([
	{ $match: { city: "ATLANTA" } },
	{ $group: { _id: "$city", total: { $sum: 1 } } },
]);
//4
db.zipcodes.aggregate([
	{ $match: { city: "ATLANTA" } },
	{ $group: { _id: "$city", total: { $sum: "$pop" } } },
]);

//Populations by state
//1
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, pop: { $sum: "$pop" } } },
]);
//2(Perform sort operation on answer of query1)
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, pop: { $sum: "$pop" } } },
	{ $sort: { pop: 1 } },
]);
//3(Perform limit operation on answer of query2)
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, pop: { $sum: "$pop" } } },
	{ $sort: { pop: 1 } },
	{ $limit: 3 },
]);
/*{
    "_id" : {
        "state" : "WY"
    },
    "pop" : 453528
}

{
    "_id" : {
        "state" : "AK"
    },
    "pop" : 544698
}

{
    "_id" : {
        "state" : "VT"
    },
    "pop" : 562758
}*/

//Populations by city
//1
db.zipcodes.aggregate([
	{
		$group: {
			_id: { city: "$city", state: "$state" },
			pop: { $sum: "$pop" },
		},
	},
]);
//2(Perform sort operation on answer of query1)
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, pop: { $sum: "$pop" } } },
	{ $sort: { pop: 1 } },
]);
//3(Perform limit operation on answer of query2)
db.zipcodes.aggregate([
	{ $group: { _id: { city: "$city" }, pop: { $sum: "$pop" } } },
	{ $sort: { pop: 1 } },
	{ $limit: 3 },
]);

//4(Output of query3)
/*{
    "_id" : {
        "city" : "EMMONAK"
    },
    "pop" : 0
}


{
    "_id" : {
        "city" : "CHEVAK"
    },
    "pop" : 0
}


{
    "_id" : {
        "city" : "OREGON HOUSE"
    },
    "pop" : 0
}*/

//Bonus
//1
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, avgStatePop: { $avg: "$pop" } } },
]);
//2
db.zipcodes.aggregate([
	{ $group: { _id: { state: "$state" }, avgStatePop: { $avg: "$pop" } } },
	{ $limit: 3 },
]);

/*{
    "_id" : {
        "state" : "MN"
    },
    "avgStatePop" : 4958.02947845805
}


{
    "_id" : {
        "state" : "MD"
    },
    "avgStatePop" : 11384.2357142857
}


{
    "_id" : {
        "state" : "ID"
    },
    "avgStatePop" : 4126.02049180328
}*/
