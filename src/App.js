import React, { useState, useEffect } from 'react';
import {MenuItem, 
        FormControl,
        Card,
        CardContent,
        Select}
        from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import { sortData } './util';


function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    // STATE = How to write a variable in REACT <<<

    // https://disease.sh/v3/covid-19/countries

    // USEEFFECT = Runs a piece of code
    // based on a given condition

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
    }, []);

    useEffect(() => {
      //async -> send a request, wait for it, do something with it
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => ({
                name: country.country, // United States, United Kingdom
                value: country.countryInfo.iso2, // US, UK, FR
              }));

              const sortedData = sortData(data);
              setTableData(sortedData);
              setCountries(countries);
            });
        };
        getCountriesData();
      }, []);

      const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);

        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`
        /* Search for     // https://disease.sh/v3/covid-19/all if Worldwide
          Or     // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
         */
         await fetch(url)
         .then(response => response.json())
         .then((data => {
          setCountry(countryCode);
          //All of the data from the country response
          setCountryInfo(data);
         }));
      };

      console.log("Country Information >>>>", countryInfo)

    return ( 
    <div className="app" > { /*BEM naming convention*/ } 
    <div className="app__left">
      <div className="app__header">         {/* Header */}
        <h1> <span className="C">COVID</span> 19 <span className="T">Tracker</span></h1> 
        <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop through all the countries and show a drop down
            list of the options*/}
            {/* Title + Select Input Dropdown Field*/}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/*<MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">YOOOOOOOO</MenuItem>*/}
          </Select>
        </FormControl>
      </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          
          {/*InfoBox*/}
          {/*InfoBox*/}
          {/*InfoBox*/}
        </div>

        {/* Map */}
        <Map />
        </div>
        <Card className="app__right">
          {/* Table */}
          <h3>Live Cases By Country</h3>
          <Table country={tableData}/>
          {/* Graph */}
          <h3>Worldwide New Cases</h3>
        </Card>
    </div>
    );
}

export default App;