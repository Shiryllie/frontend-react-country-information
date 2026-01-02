// helper functie die het land naar de juiste kleur omzet
// op basis van het continent


function colorForCountry(continents) {
    if (continents === 'North America') {
        return 'green';
    } else if (continents === 'South America') {
        return 'light-green';
    } else if (continents === 'Asia') {
        return 'red';
    } else if (continents === 'Europe') {
        return 'yellow';
    } else if (continents === 'Africa') {
        return 'blue';
    } else {
        return 'purple';
    }
// kijken naar data field 'continents'
// noord amerika = groen
    // zuid amerika = licht groen
    // europa = geel
    // afrika = blauw
    // azie = rood
    // oceanie = paars
}

export default colorForCountry;