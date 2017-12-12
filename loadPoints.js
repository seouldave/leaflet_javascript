/*
 *Function to call data points from database and style map
 */

function loadAsbPoints() {
	var map = L.map('map').setView([50.909698, -1.404351], 12);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: 'seouldave.pfmhi79d',
			accessToken: 'pk.eyJ1Ijoic2VvdWxkYXZlIiwiYSI6ImNpbDY5NXZpNzAxNDZ2M2x6dnM5dTR4cGcifQ.RH7mjvfK51NI-TthBXSa-g'
			}).addTo(map);
			
			var asbPoints = new Array();
			var firstArray = new Array();
			var secondArray = new Array();
			var thirdArray = new Array();
			var fourthArray = new Array();
			
			
			//clusters by quarter
			var asbFirst = new L.MarkerClusterGroup({showCoverageOnHover:false});
			var asbSecond = new L.MarkerClusterGroup({showCoverageOnHover:false});
			var asbThird = new L.MarkerClusterGroup({showCoverageOnHover:false});
			var asbFourth = new L.MarkerClusterGroup({showCoverageOnHover:false});
			
			
			//Icons
			var redIcon = L.icon({
				iconUrl: 'images/flag_red.gif',
				iconSize: [16, 16],
				iconAnchor: [8, 16],
				popupAnchor: [0, -16]
			});
			
			var orangeIcon = L.icon({
				iconUrl: 'images/flag_orange.gif',
				iconSize: [16, 16],
				iconAnchor: [8, 16],
				popupAnchor: [0, -16]
			});
			
			var greenIcon = L.icon({
				iconUrl: 'images/flag_green.gif',
				iconSize: [16, 16],
				iconAnchor: [8, 16],
				popupAnchor: [0, -16]
			});
			
			var blueIcon = L.icon({
				iconUrl: 'images/flag_blue.gif',
				iconSize: [16, 16],
				iconAnchor: [8, 16],
				popupAnchor: [0, -16]
			});
			
		//AJAX request to server using PHP script - callback function used to process the data that is received
		$.getJSON("php/asb_getData.php", function(results) {
			
			//Insert data received from server into asbPoints array
			for (var i = 0; i < results.length; i++) {
				asbPoints.push ({
					oid: results[i].oid,
					month: results[i].month,
					lat: results[i].lat,
					lon: results[i].lon,
					loc: results[i].location,
					month_name: results[i].month_name
				});
			}
			
			//assign markers to array corresponding to the quarter of the year 
			for (var i = 0; i < asbPoints.length; i++) {
				var x = parseInt(asbPoints[i].month);
				if (x === 1 && x < 4) {
					firstArray.push(asbPoints[i]);
				} else if (x === 4 && x < 7) { 
					secondArray.push(asbPoints[i]);
				} else if (x === 7 && x < 10) {
					thirdArray.push(asbPoints[i]);
				} else if (x === 10 && x <= 12 ) {
					fourthArray.push(asbPoints[i]);
				}
			}
				
			plotMarkers();
			});
		
		//Plot markers onto the map
		function plotMarkers() {
			for (var i = 0; i < firstArray.length; i++) {
				markerLocation = new L.LatLng(firstArray[i].lat, firstArray[i].lon);
				marker = new L.marker(markerLocation, {icon: redIcon});
				marker.bindPopup("<h3>First Quarter Incident</h3><h4>Location:</h4>" + firstArray[i].loc + "<br><br><hr><h4>Month:</h4>" + firstArray[i].month_name);
				asbFirst.addLayer(marker);			
			}
			
			for (var i = 0; i < secondArray.length; i++) {
				markerLocation = new L.LatLng(secondArray[i].lat, secondArray[i].lon);
				marker = new L.marker(markerLocation, {icon: orangeIcon});
				marker.bindPopup("<h3>Second Quarter Incident</h3><h4>Location:</h4>" + secondArray[i].loc + "<br><br><hr><h4>Month:</h4>" + secondArray[i].month_name);
				asbSecond.addLayer(marker);
			}
			
			for (var i = 0; i < thirdArray.length; i++) {
				markerLocation = new L.LatLng(thirdArray[i].lat, thirdArray[i].lon);
				marker = new L.marker(markerLocation, {icon: greenIcon});
				marker.bindPopup("<h3>Third Quarter Incident</h3><h4>Location:</h4>" + thirdArray[i].loc + "<br><br><hr><h4>Month:</h4>" + thirdArray[i].month_name);
				asbThird.addLayer(marker);
			}
			
			for (var i = 0; i < fourthArray.length; i++) {
				markerLocation = new L.LatLng(fourthArray[i].lat, fourthArray[i].lon);
				marker = new L.marker(markerLocation, {icon: blueIcon});
				marker.bindPopup("<h3>Fourth Quarter Incident</h3><h4>Location:</h4>" + fourthArray[i].loc + "<br><br><hr><h4>Month:</h4>" + fourthArray[i].month_name);
				asbFourth.addLayer(marker);
			}
		}

	map.addLayer(asbFirst);
	map.addLayer(asbSecond);
	map.addLayer(asbThird);
	map.addLayer(asbFourth);
	
	
	//Legend
	var legend = L.control({position: 'bottomright'});
		 
		 legend.onAdd = function(map) {
			 
			 var div = L.DomUtil.create('div', 'point_legend'); //create a div with class "point_legend"
				 
				 
			div.innerHTML += '<h4 style="text-align: center;">Legend</h4><div style="font-size: .9em; float: right; marginLeft: 50px; padding-right: 10px; padding-left: 30px; margin-bottom: 15px;">\
							 <ui class="legend">\
							 <li class="red">First Quarter Incident</li>\
							 <li class="orange">Second Quarter Incident</li>\
							 <li class="green">Third Quarter Incident</li>\
							 <li class="blue">Fourth Quarter Incident</li></ui></div>';
			
			
			return div;
			 
			 
		 };
		 
		 legend.addTo(map);
	
				
}