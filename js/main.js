var options = $("#countryBox");
var i = 0;

var $results = $('#rep-lookup-results'),
country = $('#country').val();
//API 
var requestURL = 'https://restcountries.eu/rest/v1/all';
console.log("before call");
//for the countryBox select box
$(document).ready(function () {
	$("#table").hide();
	$.ajax({
		url: requestURL,
		success: function(data) {
			//console.log(data[0].name); //gets Afghanistan
			options.prepend("<option value='' selected='selected'></option>");

			//append name and alphacode to countryBox select box
			$.each(data, function() {
				options.append($("<option />").val(this.alpha2Code).text(this.name));
			});

		},
		//if not possible
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		},
		async: false

	});

});
//to get data from the API and fill the table
options.change(function() {

	var countrySelected = $('#countryBox :selected').text();

	var countryName = null;
	var countryCapital= null;
	var population = null;
	var region= null;
	var currencies= null;
	var alphaKey= null;

	callAjax();
	//to get the data from the API 
	//put into variable for later use
	$.ajax({
		url: requestURL,
		success: function(data) {
			$.each(data, function() {
				if(this.name === countrySelected)
				{
					countryName = this.name;
					countryCapital = this.capital;
					population = this.population;
					region = this.region;
					currencies = this.currencies;
					alphaKey = this.alpha2Code;
					console.log(population + "b");


				}
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		},
		async: false
	});
	
	//fill table with values
	$('#name').html(countryName);
	$('#capital').html(countryCapital);
	$('#population').html(population);
	$('#region').html(region);
	$('#currencies').html(currencies);
	
	//get the flag image from geognos
	var flagCode = alphaKey;
	var $flagShow;
	//can change the size of the flag by changing the url to the flag
	$flagShow =  '<img src="http://www.geognos.com/api/en/countries/flag/' + flagCode + '.png" style="width:150px;height:75px;" >'
	
	//when the user clicks on "For More Details" goes to geognos information about the country
	var detailsCode = alphaKey.toLowerCase();
	var $detailsShow = '<p><a href="http://www.geognos.com/geo/en/cc/'+ detailsCode+ '.html" target="_blank">For More Details</a></p>'

	//hide text from before
	$('#rep-lookup-results').hide();
	//put the flag into table
	$("#flag").html($flagShow);
	//put the country's details into the table
	$("#details").html($detailsShow);
	//show the hidden table
	$("#table").show();

});
var callAjax = function()
{

}