/*
 *Functions to make heatmap and animation
 */

function addHeat() {
	var map = L.map('map1').setView([50.909698, -1.404351], 12);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'seouldave.pfmhi79d',
			accessToken: 'pk.eyJ1Ijoic2VvdWxkYXZlIiwiYSI6ImNpbDY5NXZpNzAxNDZ2M2x6dnM5dTR4cGcifQ.RH7mjvfK51NI-TthBXSa-g'
			}).addTo(map);
			
			var heat = L.heatLayer(asbPoints,
			{radius: 12,
			 blur: 15
			}).addTo(map);
			var geoJSON;
			
			
			//Function to style polygons
		 function style(feature) {
			 return {
				 fillColor: '#1E1E1E',
				 weight: 2,
				 opacity: 1,
				 color: 'white',
				 dashArray: '3',
				 fillOpacity: 0.1
			 }
		 }
		 
		 function highlightPolygon(e) {
			 var layer = e.target;
			 
			 layer.setStyle({
				 weight: 5,
				 color: '#666',
				 dashArray: '',
				 fillOpacity: 0.3
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
			 this._div.innerHTML = '<h4>2015 Heatmap</h4>' + (props ?
			   props.ward + '<br><b>Deprivation Index: </b>' + props.dep_index + '<br>' : 'Hover on ward');
		 };
		 info.addTo(map);
			
			//Call geoJSON array to add to the map
		geojson = L.geoJson(wards, {
			style: style,
			onEachFeature: onEachPolygon
			}).addTo(map);
			
			
			
			
}
			
			
//Function to make animation
function addAnimation() {
	var map = L.map('map2').setView([50.909698, -1.404351], 12);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'seouldave.pfmhi79d',
			accessToken: 'pk.eyJ1Ijoic2VvdWxkYXZlIiwiYSI6ImNpbDY5NXZpNzAxNDZ2M2x6dnM5dTR4cGcifQ.RH7mjvfK51NI-TthBXSa-g'
			}).addTo(map);
			var geoJson;
			
		//Function to style polygons
		 function style(feature) {
			 return {
				 fillColor: '#1E1E1E',
				 weight: 2,
				 opacity: 1,
				 color: 'white',
				 dashArray: '3',
				 fillOpacity: 0.1
			 }
		 }
		 

		 
		 //Call geoJSON array to add to the map
		geojson = L.geoJson(wards, {
			style: style,
			}).addTo(map);
			
			
			
			var heatAni = L.heatLayer(asb1,
			{radius: 12,
			 blur: 15
			}).addTo(map);
			
			var div = L.DomUtil.create('div', 'info_heat'),
			
			x = 2;
			var name = "";
			
			var interval = setInterval(function(){run()}, 1000);
			
			function run() {
				name = "asb" + x.toString();
				map.removeLayer(heatAni);
				heatAni = L.heatLayer(window[name], {radius: 30, blur: 15}).addTo(map);
				
				var monthBox = L.control({position: 'topright'});
			monthBox.onAdd = function(map) {
				
				months = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
				div.innerHTML = '<h4>Heatmap Animation</h4><hr><p>' + months[x - 1] + '<br> 2015</p>';
				return div
			}
			monthBox.addTo(map);
				
			
			
				x++;	
				if (x === 13) {
					x = 1;
				//clearInterval(interval);
				}
				
			}		
			
}




