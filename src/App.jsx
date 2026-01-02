import './App.css';
import axios from 'axios';
import React from "react";
import colorForCountry from "./helpers/colorForCountry.js";
import calculateMillion from "./helpers/calculateMillion.js";
import neighboringCountries from "./helpers/neighboringCountries.js";


function App() {
    const [countries, setCountries] = React.useState([]);
    const [countriesVisible, setCountriesVisible] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");

    async function fetchCountry() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flag,population,continents,region,capital,borders,tld'
            );
            setCountries(result.data);
            console.log(result.data[0]);
            console.log(result.data[0].continents);
            console.log(result.data[0].dtl);
        } catch (e) {
            console.error(e);
        }
    }

    function handleSearchSubmit(e) {
        if (e.key === "Enter") {
            setSearchTerm(inputValue);
            setInputValue("");   // maakt het zoekveld leeg
        }
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            {/*<div className="header">*/}
            <div className='worldmap'><img src={'src/assets/world_map.png'}/></div>
            <h1>World regions</h1>
            <div className='button-container'>
                <button className={countriesVisible ? 'click-button' : 'search-button'} onClick={() => {
                    if (!countriesVisible) fetchCountry();
                    setCountriesVisible(true);
                    setSearchTerm(inputValue);
                    setInputValue("");
                }}>{countriesVisible ? "Search" : "Click!"}</button>

                {countriesVisible && (
                    <input
                        type="text"
                        placeholder="Zoek een land..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                    />
                )
                }
            </div>
            {searchTerm ? (
                filteredCountries.length > 0 ? (
                    <div className="search-container">
                        <ul className="result">
                            {
                                filteredCountries.map((country) => (
                                        <li key={country.name.common} className="search-result">
                                            <div className="flag-result"><h2>{country?.flag} {country?.name?.common}</h2>
                                            </div>
                                            <p>{country?.name?.common} is situated in {country?.region} and the
                                                capital is {country?.capital}<br/>
                                                It has a population of {calculateMillion(country?.population)} million
                                                people
                                                and it
                                                borders
                                                with {country?.borders.length} neighboring {neighboringCountries(country?.borders?.length)}<br/>
                                                Websites can be found on {country?.tld} domain's</p>
                                        </li>
                                    )
                                )

                            }
                        </ul>
                    </div>
                ) : (
                    <h2 className={"error"}>No countries found 😢</h2>
                )
            ) : (

                <div className='countries'>
                    <ul className='list-countries'>
                        {countries
                            .slice()
                            .sort((a, b) => a?.population - b?.population)
                            .map((country) => (
                                <li key={country.name.common} className={colorForCountry(country.continents[0])}>
                                    <div className="flag">{country?.flag}</div>
                                    {country?.name?.common} <br/>
                                    <p>Has a population of {country?.population} people</p>
                                </li>
                            ))}
                    </ul>
                </div>
            )
            }

        </>

    )
}

export default App;
