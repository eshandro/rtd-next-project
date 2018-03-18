const filterLightRail = require('./filterLightRail'),
		updateStaticFeed = require('./updateStaticFeed'),
		globals = require('../globals'),
		persistStaticLRData = require('./persistStaticLRData');

/**
 * Runs updateStaticFeed to:
 * 1. determine if feed needs updating. if yes, then:
 * 2. download zip file and unzip text files
 * 3. parse text files to JSON files
 * 4. filter JSON files to light rail only JSON files
 * 5. add light rail JSON data to db
 * 
 */
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
			// return {updateStaticFeed: true, data: data.data};
			return persistStaticLRData(data.data);
		}
	})
	.catch((err) => {
		console.log("error in updateStaticFeed:", err);
		return ({updateStaticFeed: false, data: err});
	})

