//Reference https://rapidapi.com/apilayernet/api/rest-countries-v1
// Reference Coding Journey https://www.youtube.com/watch?v=THZyM2z8s-o&t=805s
//https://www.techiedelight.com/get-selected-text-from-drop-down-list-javascript/

//  Region information
function getSearch() {
  const getRegions = async () => {
      const RegionName = document.getElementById("Search").value;
      const request = await fetch(`https://restcountries.eu/rest/v2/region/${RegionName}`);
      const data = await request.json();
      return data;
  };

  getRegions().then(regionData => {
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").innerHTML = "<h2>" + document.getElementById("Search").value + 
    " Region:</h2><table id='table'><tr id='tbl-header'><th>Country</th><th>Capital</th></tr></table>";
    for (i = 0; i < regionData.length; i++) {
        let name = regionData[i].name;
        let capital = regionData[i].capital;
        
        // Row added here
        let table = document.getElementById("table");
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = name;
        cell2.innerHTML = capital;
    }
}).then(function() { 
  alphabetic();
})
}
// Reference W3Schools, link: https://www.w3schools.com/howto/howto_js_sort_table.asp
function alphabetic() 
{
  var table, rows, switching, i, x, y, itshouldSwitch;
  table = document.getElementById("table");
  switching = true;
  
  while (switching) {
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
          itshouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[0];
          y = rows[i + 1].getElementsByTagName("td")[0];
          
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              itshouldSwitch = true;
              break;
          }
      }
          
      if (itshouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
      }
  }
}

//  Country information
const countriesList = document.getElementById("countries");
let countries;
countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

  getCountries();
 async function getCountries() {
     await fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
  .then(data => initialize(data))
  .catch(err => console.log("Error:", err));
 }

function initialize(countriesData) {
    countries = countriesData;
    let options = "";

    countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);

    countriesList.innerHTML = options;

    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
    displayCountryInfo(countriesList[countriesList.selectedIndex].value);

  }

 function displayCountryInfo(countryByAlpha3Code) {
    const countryData =  countries.find(country => country.alpha3Code === countryByAlpha3Code);
    document.querySelector("#flag-container img").src = countryData.flag;
    document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
    document.getElementById("capital").innerHTML = countryData.capital;
    document.getElementById("map-container").innerHTML =   `<a " href="https://www.google.com/maps/place/${countryData.name}" target="_blank">Click here for location`
   
  }