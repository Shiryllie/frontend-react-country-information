import './App.css';
import axios from 'axios';
import React from "react";
import colorForCountry from "./helpers/colorForCountry.js";


function App() {
    const [countries, setCountries] = React.useState([]);

    async function fetchCountry() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flag,population,continents'
            );
            setCountries(result.data);
            console.log(result.data[0]);
            console.log(result.data[0].continents);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {/*<div className="header">*/}
            <div className='worldmap'><img src={'src/assets/world_map.png'}/></div>
            <h1>World regions</h1>
            <div className='button-container'>
                <button onClick={fetchCountry}>Click!</button>
            </div>
            {/*</div>*/}
            <div className='countries'>
                <ul className='list-countries'>
                    {countries
                        .slice()
                        .sort((a, b) => a?.population - b?.population)
                        .map((country) => (
                            <li key={country.name.common} className={colorForCountry(country.continents[0])}>
                                <div className='flag'>{country?.flag}</div>
                                {country?.name?.common} <br/>
                                <p>Has a population of {country?.population} people</p>
                            </li>
                        ))}
                    {/*<li>{countries[0]?.name?.common}</li>*/}
                    {/*<li>Has a population of {countries[0]?.population} people</li>*/}
                </ul>
            </div>
        </>
    )
}

export default App
