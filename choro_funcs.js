/*
 * Functions to load choropleth map of deprivity in Southampton
 */
 
 function loadChoro() {
	 var map = L.map('map').setView([50.909698, -1.404351], 12);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'seouldave.pfmhi79d',
			accessToken: 'pk.eyJ1Ijoic2VvdWxkYXZlIiwiYSI6ImNpbDY5NXZpNzAxNDZ2M2x6dnM5dTR4cGcifQ.RH7mjvfK51NI-TthBXSa-g'
			}).addTo(map);
			
		var geojson;
			//Function to return colour according to a value
		 function colour(x) {
			 return x > 6.5 ? '#99000d' :
					x > 5 ? '#cb181d' :
					x > 3 ? '#ef3b2c' : 
					x > 1 ? '#fb6a4a' :
					x > 0 ? '#fc9272' :
					x > -0.5 ? '#fcbba1' :
					x > -0.94 ? '#fee5d9':
							 '#fff5f0';
					
		 }
		 
		 
		 //Function to style polygons according to value
		 function style(feature) {
			 return {
				 fillColor: colour(feature.properties.dep_index),
				 weight: 2,
				 opacity: 1,
				 color: 'white',
				 dashArray: '3',
				 fillOpacity: 0.7
			 }
		 }
		 

		 function highlightPolygon(e) {
			 var layer = e.target;
			 
			 layer.setStyle({
				 weight: 5,
				 color: '#666',
				 dashArray: '',
				 fillOpacity: 0.7
			 });
			 
			 if(!L.Browser.ie && !L.Browser.opera) {
				 layer.bringToFront();
			 }
			 info.update(layer.feature.properties);
		 }
		 
		 function resetHighlightPolygon(e) {
			 geojson.resetStyle(e.target);
			 
			 info.update();
		 }
		 
		 
		 
		 function zoomToPolygon(e) {
			 map.fitBounds(e.target.getBounds());
		 }
		 
		 function onEachPolygon(feature, layer) {
			 layer.on({
				 mouseover: highlightPolygon,
				 mouseout: resetHighlightPolygon,
				 click: zoomToPolygon
			 });
		 }
		 
		 //Function to show information in div on hover
		 var info = L.control();
		 
		 info.onAdd = function(map) {
			 this._div = L.DomUtil.create('div', 'info'); //create a div with class "info"
			 this.update();
			 return this._div;
		 };
		 
		 //Insert info into div
		 info.update = function(props) {
			 this._div.innerHTML = '<h4>Deprivation Index</h4>' + (props ?
			   '<b>' + props.ward + '</b><br />' + props.dep_index : 'Hover on ward');
		 };
		 info.addTo(map);
		 
		 //Legend
		 var legend = L.control({position: 'bottomright'});
		 
		 legend.onAdd = function(map) {
			 
			 var div = L.DomUtil.create('div', 'info legend'), //create a div with class "info legend"
				 grades = [-1, -0.5, 1, 3, 5, 6.5], //, 
				 labels = [];
				 
			//Loop through dep_index intervals and create a label with a coloured square for each intervals
			div.innerHTML += '<h4>Legend</h4>';
			for(var i = 0; i < grades.length; i++) {
				div.innerHTML +=
						'<i style="background:' + colour(grades[i]) + '"></i> ' +
					grades[i] + (grades[i + 1] ? ' to ' + grades[i + 1] + '<br>' : '+');
			}
			
			return div;
			 
			 
		 };
		 
		 legend.addTo(map);
			
		//Call geoJSON array to add to the map
		geojson = L.geoJson(wards, {
			style: style,
			onEachFeature: onEachPolygon
			}).addTo(map);
 }
 
 
 
 
 