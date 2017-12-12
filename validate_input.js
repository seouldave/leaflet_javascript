/*
 * Functions to validate the inputs given on the input interface
 */

//Function to check if field is empty
var isEmpty    = function(x) { return x === ""; }

//Function to check if field is number
var isNumber   = function(x) { return ! isNaN(x-0); } 

//If field is invalid it is passed here
var invalid    = function(x) { x.style.backgroundColor = '#FFFF7E'; error = true; }

//If field is valid, passed here, changes field back to white in case of form resubmit
var valid      = function(x) { x.style.backgroundColor = "White"; }

function validate()	{

	error 	 	 		= false; 
	var allboxes 		= document.getElementsByClassName('box');
	
	var disturbance 	= document.getElementById('disturbance');
	var addInfo 		= document.getElementById('addInfo');
	var lat 			= document.getElementById('lat');
	var lon	 		 	= document.getElementById('lon');

	//Clear yellow highlighting in case form is resubmitted 
	for (var i=0;i<allboxes.length;i++) {
		valid(allboxes[i]); 
	}
	
	//Loop through all fields to check if empty 
	for (var i=0;i<allboxes.length;i++) { 
		if	(isEmpty(allboxes[i].value))	{
			invalid(allboxes[i]); 
		}
	} 
	
	//Validate disturbance field 
	if (disturbance.value === "non")	{
		invalid(disturbance);
		alert("Please select a distubance.");
	}
	
	//Validate latitude field
	if (!isNumber(lat.value) || isEmpty(lat.value))	{
		invalid(lat);
		alert("Please click on the map to show the location of the disturbance.");
	}
	
	//Validate longitude field
	if (!isNumber(lon.value) || isEmpty(lon.value))	{
		invalid(lon);
		alert("Please click on the map to show the location of the disturbance.");
	}
	
	
	//Validate addInfo field
	if (isEmpty(addInfo.value))	{
		invalid(addInfo);
		alert("Please type in additional information OR refresh the page and do NOT delete the text in the Further Details box if you do not wish to add further information.");
	}
	
	
	
	//If error, return false and alert user
	if (error) { 
		alert("Please check the form for highlighted errors and resubmit");
		return false; 
	} 
	
	//Submit form if there are no errors. 
	else 	{
		return true; 
	} 
}