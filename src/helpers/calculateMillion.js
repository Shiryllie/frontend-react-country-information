function calculateMillion(population) {
    const number = population / 1000000;
    return Math.round(number*100)/100;
}

export default calculateMillion;
