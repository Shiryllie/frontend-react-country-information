function neighboringCountries(borders) {
    if (borders === 1) {
        return "country";
    } else {
        return "countries";
    }
}

export default neighboringCountries