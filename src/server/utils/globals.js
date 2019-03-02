module.exports = {
	mainFeedUrl: "http://www.rtd-denver.com/GoogleFeeder/",
	feedUrl : "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
	downloadFolder : __dirname + "/../../../feed-temp/",
	extractedFolder : __dirname + "/../../../feed/",
	filesToUpdate : ['routes.txt','stop_times.txt','stops.txt','trips.txt','calendar.txt','calendar_dates.txt'],
	timezone: 'America/Denver',
	lightRailRoutesRegex : /101.|103W|^A$|107R|113B|109L/,
	stops: {
 		"A-0":["Union Station Track 1","38th & Blake Station Track 1","40th & Colorado Station Track 1","Central Park Station Track 1","Peoria Station Track 1","40th Ave & Airport Blvd - Gateway Park Station Track 1","61st & Pena Station Track 1","Denver Airport Station"],
 		"101C-0": ["Littleton / Mineral Ave Station","Littleton / Downtown Station","Oxford - City of Sheridan Station","Englewood Station","Evans Station","I-25 & Broadway Station","Alameda Station","10th & Osage Station","Auraria West Station","Broncos Stadium at Mile High Station","Pepsi Center / Elitch Gardens Station","Union Station LRT Nb"],
		"101D-0": ["Littleton / Mineral Ave Station","Littleton / Downtown Station","Oxford - City of Sheridan Station","Englewood Station","Evans Station","I-25 & Broadway Station","Alameda Station","10th & Osage Station","Colfax at Auraria Station","Theatre District / Convention Center Station","16th & California Station","18th & California Station"],
		"101E-0": ["Lincoln Station","County Line Station","Dry Creek Station","Arapahoe at Village Center Station","Orchard Station","Belleview Station","Southmoor Station","Yale Station","Colorado Station","University of Denver Station","Louisiana & Pearl Station","I-25 & Broadway Station","Alameda Station","10th & Osage Station","Auraria West Station","Broncos Stadium at Mile High Station","Pepsi Center / Elitch Gardens Station","Union Station LRT Nb"],
		"101F-0": ["Lincoln Station","County Line Station","Dry Creek Station","Arapahoe at Village Center Station","Orchard Station","Belleview Station","Southmoor Station","Yale Station","Colorado Station","University of Denver Station","Louisiana & Pearl Station","I-25 & Broadway Station","Alameda Station","10th & Osage Station","Colfax at Auraria Station","Theatre District / Convention Center Station","16th & California Station","18th & California Station"],
		"101H-0": ["Florida Station","Iliff Station","Nine Mile Station","Dayton Station","Southmoor Station","Yale Station","Colorado Station","University of Denver Station","Louisiana & Pearl Station","I-25 & Broadway Station","Alameda Station","10th & Osage Station","Colfax at Auraria Station","Theatre District / Convention Center Station","16th & California Station","18th & California Station"],
		"103W-0": ["Jeffco Government Center Station","Red Rocks Community College Station","Federal Center Station","Oak Station","Garrison Station","Wadsworth Station","Lamar Station","Sheridan Station","Perry Station","Knox Station","Decatur / Federal Station","Auraria West Station","Broncos Stadium at Mile High Station","Pepsi Center / Elitch Gardens Station","Union Station LRT Nb"],
		"107R-0": ["Lincoln Station","County Line Station","Dry Creek Station","Arapahoe at Village Center Station","Orchard Station","Belleview Station","Dayton Station","Nine Mile Station","Iliff Station","Florida Station","Aurora Metro Center Station","2nd & Abilene Station","13th Ave Station","Colfax Station","Fitzsimons Station","Peoria Station"],
		"109L-0": ["16th & California Station","18th & California Station","20th & Welton Station","25th & Welton Station","27th & Welton Station","30th & Downing Station"],
		"113B-0": ["Westminster Station S-Bound","Union Station Track 8"],
		"A-1": ["Denver Airport Station","61st & Pena Station Track 2","40th Ave & Airport Blvd - Gateway Park Station Track 2","Peoria Station Track 2","Central Park Station Track 2","40th & Colorado Station Track 2","38th & Blake Station Track 2","Union Station Track 1"],
		"101C-1": ["Union Station","Pepsi Center / Elitch Gardens Station","Broncos Stadium at Mile High Station","Auraria West Station","10th & Osage Station","Alameda Station","I-25 & Broadway Station","Evans Station","Englewood Station","Oxford - City of Sheridan Station","Littleton / Downtown Station","Littleton / Mineral Ave Station"],
		"101D-1": ["18th & Stout Station","16th & Stout Station","Theatre District/Convention Ctr Station","Colfax at Auraria Station","10th & Osage Station","Alameda Station","I-25 & Broadway Station","Evans Station","Englewood Station","Oxford - City of Sheridan Station","Littleton / Downtown Station","Littleton / Mineral Ave Station"],
		"101E-1": ["Union Station","Pepsi Center / Elitch Gardens Station","Broncos Stadium at Mile High Station","Auraria West Station","10th & Osage Station","Alameda Station","I-25 & Broadway Station","Evans Station","Louisiana & Pearl Station","University of Denver Station","Colorado Station","Yale Station","Southmoor Station","Belleview Station","Orchard Station","Arapahoe at Village Center Station","Dry Creek Station","County Line Station","Lincoln Station"],
		"101F-1": ["18th & Stout Station","16th & Stout Station","Theatre District/Convention Ctr Station","Colfax at Auraria Station","10th & Osage Station","Alameda Station","I-25 & Broadway Station","Louisiana & Pearl Station","University of Denver Station","Colorado Station","Yale Station","Southmoor Station","Belleview Station","Orchard Station","Arapahoe at Village Center Station","Dry Creek Station","County Line Station","Lincoln Station"],
		"101H-1": ["18th & Stout Station","16th & Stout Station","Theatre District/Convention Ctr Station","Colfax at Auraria Station","10th & Osage Station","Alameda Station","I-25 & Broadway Station","Evans Station","Louisiana & Pearl Station","University of Denver Station","Colorado Station","Yale Station","Southmoor Station","Dayton Station","Nine Mile Station","Iliff Station","Florida Station"],
		"103W-1": ["Union Station","Pepsi Center / Elitch Gardens Station","Broncos Stadium at Mile High Station","Auraria West Station","Decatur / Federal Station","Knox Station","Perry Station","Sheridan Station","Lamar Station","Wadsworth Station","Garrison Station","Oak Station","Federal Center Station","Red Rocks Community College Station","Jeffco Government Center Station"],
		"107R-1": ["Peoria Station","Fitzsimons Station","Colfax Station","13th Ave Station","2nd & Abilene Station","Aurora Metro Center Station","Florida Station","Iliff Station","Nine Mile Station","Dayton Station","Belleview Station","Orchard Station","Arapahoe at Village Center Station","Dry Creek Station","County Line Station","Lincoln Station"],
		"109L-1": ["30th & Downing Station","27th & Welton Station","25th & Welton Station","20th & Welton Station","18th & Stout Station","16th & Stout Station"],
		"113B-1": ["Union Station Track 8","Westminster Station N-Bound"]
	}
};