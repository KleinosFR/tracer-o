

const calculation = async (distance) => {

    let cost = 0;

    if (distance<20) {

        cost = ( 9.15 + (distance*0.7));
        console.log(cost);
        return cost;

    } else {

        cost = (distance*0.7);
        console.log(cost);
        return cost;

    }

    
    

}


export default calculation