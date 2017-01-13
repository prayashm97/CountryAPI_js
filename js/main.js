var options = $("#countryBox");
var i = 0;

var $results = $('#rep-lookup-results'),
country = $('#country').val();
var requestURL = 'https://restcountries.eu/rest/v1/all';
console.log("before call");
$(document).ready(function () {
	$("#table").hide();
	$.ajax({
		url: requestURL,
		success: function(data) {
			//console.log(data[0].name); gets Afghanistan
			options.prepend("<option value='' selected='selected'></option>");

			$.each(data, function() {

				options.append($("<option />").val(this.alpha2Code).text(this.name));
			});

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus, errorThrown);
		},
		async: false

	});

	});
options.change(function() {

	var countrySelected = $('#countryBox :selected').text();

	// var Country;
	var countryName = null;
	var countryCapital= null;
	var population = null;
	var region= null;
	var currencies= null;
	var alphaKey= null;

	callAjax();
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
	$('#name').html(countryName);
	$('#capital').html(countryCapital);
	$('#population').html(population);
	$('#region').html(region);
	$('#currencies').html(currencies);

	var flagCode = alphaKey;
	var $flagShow;
	$flagShow =  '<img src="http://www.geognos.com/api/en/countries/flag/' + flagCode + '.png" style="width:150px;height:75px;" >'

	var detailsCode = alphaKey.toLowerCase();
	var $detailsShow = '<p><a href="http://www.geognos.com/geo/en/cc/'+ detailsCode+ '.html" target="_blank">For More Details</a></p>'

	$('#rep-lookup-results').hide();
	$("#flag").html($flagShow);
	$("#details").html($detailsShow);

	$("#table").show();

});
var callAjax = function()
{

}