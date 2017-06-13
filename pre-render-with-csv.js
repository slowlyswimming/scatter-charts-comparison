// pre-render d3 charts at server side
var d3 = require('d3');
var jsdom;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}
var fs = require('fs')
	, htmlStub = '<html><head></head><body><div id="dataviz-container"></div><script src="d3.v3.min.js"></script></body></html>'

jsdom.env({
	features : { QuerySelector : true }
	, html : htmlStub
	, done : function(errors, window) {
	// this callback function pre-renders the dataviz inside the html document, then export result into a static file

		var el = window.document.querySelector('#dataviz-container')
			, body = window.document.querySelector('body')
			, circleId = 'a2324'  // say, this value was dynamically retrieved from some database

		
		//load data from csv file
		//d3.csv('data.csv', function(data){
		fs.readFile('data.csv', 'utf8', function (err, data) {
			data = d3.csvParse(data);
			
			data.forEach(function(d){
			    d.x = +d.x;
			    d.y = +d.y;
			});
			console.log(data.length);
			// generate the dataviz
			var svg = d3.select(el)
				.append('svg:svg')
					.attr('width', 500)
					.attr('height', 500);

			svg.selectAll('.circle')
				.data( data )
				.enter()
					.append('circle')
					.attr('r', 1)
					.attr('fill', '#26963c')
					.attr('cx', function(d){return d.x;})
	    			.attr('cy', function(d){return d.y;});

	    	// save result in an html file, we could also keep it in memory, or export the interesting fragment into a database for later use
			var svgsrc = window.document.documentElement.innerHTML;
			fs.writeFile('index-svg-d3-csv-pre-render.html', svgsrc, function(err) {
				if(err) {
					console.log('error saving document', err);
				} else {
					console.log('The file was saved!');
				}
			});
		});

		// d3.select(el)
		// 	.append('svg:svg')
		// 		.attr('width', 500)
		// 		.attr('height', 500)
		// 		.append('circle')
		// 			.attr('cx', 250)
		// 			.attr('cy', 250)
		// 			.attr('r', 1)
		// 			.attr('fill', '#26963c')
		// 			.attr('id', circleId) // say, this value was dynamically retrieved from some database

		// make the client-side script manipulate the circle at client side)
		// var clientScript = "d3.select('#" + circleId + "').transition().delay(1000).attr('fill', '#f9af26')"

		// d3.select(body)
		// 	.append('script')
		// 		.html(clientScript)

			
	} // end jsDom done callback
})
// no semi-column was harmed during this development

//execute by node.js
//>node --max-old-space-size=5120 pre-render.js