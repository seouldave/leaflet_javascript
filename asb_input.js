/*
 * Functions to map input map and form. It also calls previously inputted data from the database
 */

function loadMap() {
	var map = L.map('map').setView([50.909698, -1.404351], 12);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'seouldave.pfmhi79d',
			accessToken: 'pk.eyJ1Ijoic2VvdWxkYXZlIiwiYSI6ImNpbDY5NXZpNzAxNDZ2M2x6dnM5dTR4cGcifQ.RH7mjvfK51NI-TthBXSa-g'
			}).addTo(map);
			
			var marker = null //new L.marker([50.909698, -1.404351]).addTo(map);
			var input_form = L.control({position: 'topright'});
			
			
		//AJAX request to server using PHP script - callback function used to process the data that is received
		$.getJSON("php/asb_getDataInputs.php", function(results) {
			
			for(var i = 0; i < results.length; i++) {
				for(var i = 0; i < results.length; i++) {
				
				var inputLocation = new L.LatLng(parseFloat(results[i].lat), parseFloat(results[i].lon));
				console.log(inputLocation.lat);
				console.log(inputLocation.lng);
				var inputMarker = new L.marker(inputLocation).addTo(map);
				inputMarker.bindPopup('<h2>Input location</h2><hr><b>Date: </b>' + results[i].date + '<hr><br><b>Disturbance: ' + results[i].disturbance + '<hr><br><b>Additional info: ' + results[i].additional);
			};
				
				
			};
			
			
		});
		
		//Function to style polygons and interactivity
		 function style(feature) {
			 return {
				 fillColor: '#1E1E1E',
				 weight: 2,
				 opacity: 1,
				 color: 'gray',
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
			 this._div.innerHTML = '<h4>Locate disturbance</h4>' + (props ?
			   props.ward  : 'Hover on ward boundary');
		 };
		 info.addTo(map);
			
			//Call geoJSON array to add to the map
		geojson = L.geoJson(wards, {
			style: style,
			onEachFeature: onEachPolygon,
			fill: false
			}).addTo(map);
			
			input_form.onAdd = function(map) {
				
				var div = L.DomUtil.create('div', 'input_form');
				L.DomEvent.disableClickPropagation(div); //Method to stop click event firing in map when form clicked
				//input form
				div.innerHTML+= '<form id="insertData" onsubmit ="return validate();" method="POST" action="php/uploadData.php" enctype="multipart/form-data">\
								<div><b>Type of Disturbance:</b><br><select id="disturbance" class="box" name="disturbance">\
								<option value="non">Select a disturbance</option>\
								<option value="Vehicle nuisance">Vehicle nuisance</option>\
								<option value="Rowdy or inconsiderate behaviour">Rowdy or inconsiderate behaviour</option>\
								<option value="Rowdy/nuisance neighbours">Rowdy/nuisance neighbours</option>\
								<option value="Littering/drugs paraphernalia">Littering/drugs paraphernalia</option>\
								<option value="Animal problems">Animal problems</option>\
								<option value="Trespass">Trespass</option>\
								<option value="Nuisance calls">Nuisance calls</option>\
								<option value="Street drinking">Street drinking</option>\
								<option value="Prostitution-related activity">Prostitution-related activity</option>\
								<option value="Noise">Noise</option>\
								<option value="Begging/vagrancy">Begging/vagrancy</option>\
								<option value="Fireworks">Fireworks</option>\
								<option value="other">Other</option><br>\
								</select><br>\
								<b>Further details:</b><br><textarea id="additional" class="box" name="further_details" rows="4" cols="20">\Further details (do not delete if you do not want to enter any details).</textarea><br>\
								<div>\
								<b>Latitude: </b>\
								</div>\
								<input type="text" class="box" id="lat">\
								<div><b>Longitude:</b>\
								</div>\
								<input type="text" class="box" id="lon">\
								<input type="submit" name="Submit" value="Submit">\
								</div>\
								</form>';
				
				return div;
			};
			input_form.addTo(map);
			
			function onMapClick(e) {
				var lat = e.latlng.lat;
				var lon = e.latlng.lng;
				document.getElementById('lat').value = lat;
				document.getElementById('lon').value = lon;
				 if (marker !== null) {
				map.removeLayer(marker);
				}
				marker = L.marker((e.latlng)).addTo(map);
				
				
}

map.on('click', onMapClick);

}


