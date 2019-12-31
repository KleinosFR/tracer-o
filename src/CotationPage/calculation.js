const calculation = async (distance, duration) => {
    const termeJournalier = 12.01;
    const fixUnder20Km = 9.15;
    const pricePerKm = 0.7;

    const termeJournalierPerMin = termeJournalier / 8 / 60;

    let distanceCost = 0;
    let durationCost = 0;
    let totalCost = 0;

    if (distance < 20) {
        distanceCost = Math.round(fixUnder20Km + distance * pricePerKm);
        durationCost = Math.round(termeJournalierPerMin * duration * 100) / 100;

        totalCost = distanceCost + durationCost;

        return totalCost;
    } else {
        distanceCost = Math.round(distance * pricePerKm);
        durationCost = Math.round(termeJournalierPerMin * duration * 100) / 100;

        totalCost = distanceCost + durationCost;

        return totalCost;
    }
};

export default calculation;
