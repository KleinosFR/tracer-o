

const calculation = async (distance, duration) => {
    
    const termeJournalier = 12.01;

    const termeJournalierPerMin = termeJournalier/8/60;

    let distanceCost = 0;
    let durationCost = 0;
    let totalCost = 0;
    
    



    if (distance<20) {

        
        distanceCost = Math.round(9.15 + (distance*0.7));
        durationCost = Math.round(termeJournalierPerMin*duration*100)/100;

        totalCost = distanceCost + durationCost

        console.log(totalCost);
        return totalCost;

    } else {

        distanceCost = Math.round(distance*0.7);
        durationCost = Math.round(termeJournalierPerMin*duration*100)/100;

        totalCost = distanceCost + durationCost


        console.log(totalCost);
        return totalCost;

    }

    
    

}


export default calculation