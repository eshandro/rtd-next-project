module.exports = {
	feedUrl : "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
	downloadFolder : __dirname + "/../../feed-temp/",
	extractedFolder : __dirname + "/../../feed/",
	filesToUpdate : ['routes.txt','stop_times.txt','stops.txt','trips.txt']
}