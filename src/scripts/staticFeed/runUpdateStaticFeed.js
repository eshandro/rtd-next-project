const filterLightRail = require('./filterLightRail'),
		updateStaticFeed = require('./updateStaticFeed'),
		globals = require('../globals');


updateStaticFeed(globals.mainFeedUrl,forceUpdate = process.argv[2])
	.then((data) => {
		console.log("data returned from updateStaticFeed:",data);
		if(!data.updateStaticFeed) {
			// don't call filterLightRail
			return ({lrJsonSuccess: false, data: "filterLightRail not called because updateStaticFeed failed or not needed"});
		} else {
			return filterLightRail();
		}
	})
	.then((data)=> {
		// console.log("data after filterLightRail called or not called: ",data);
		if (!data.lrJsonSuccess) {
			return ({updateStaticFeed: false, data:data.data});
		} else {
			return {updateStaticFeed: true, data: data.data};
		}
	})
	.catch((err) => {
		console.log("error in updateStaticFeed:", err);
		return ({updateStaticFeed: false, data: err});
	})

