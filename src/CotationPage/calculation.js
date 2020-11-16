const TARIF = [
    [1.1, 1.04, 0.91, 0.83],
    [1.17, 1.1, 0.98, 0.87],
    [1.22, 1.16, 1.01, 0.91],
    [1.26, 1.2, 1.05, 0.94],
    [1.31, 1.24, 1.07, 0.97],
    [1.32, 1.26, 1.1, 0.99],
];

const REBATE = 10 // percent of rebate to apply

const calculation = async (distance, weight) => {
    let distanceIdx = null;
    let weightIdx = null;

    switch (true) {
        case distance <= 50:
            distanceIdx = 0;
            break;
        case distance >= 51 && distance <= 200:
            distanceIdx = 1;
            break;
        case distance >= 201 && distance <= 500:
            distanceIdx = 2;
            break;
        case distance >= 501:
            distanceIdx = 3;
            break;
        default:
            break;
    }

    switch (true) {
        case weight <= 50:
            weightIdx = 0;
            break;
        case weight > 50 && weight <= 100:
            weightIdx = 1;
            break;
        case weight > 100 && weight <= 200:
            weightIdx = 2;
            break;
        case weight > 200 && weight <= 300:
            weightIdx = 3;
            break;
        case weight > 300 && weight <= 400:
            weightIdx = 4;
            break;
        case weight > 400 && weight <= 500:
            weightIdx = 5;
            break;
        default:
            break;
    }

    const initialCost = Math.round(distance * TARIF[weightIdx][distanceIdx])

    const totalCost = Math.round(initialCost *(100-REBATE) /100)

    return totalCost;
};

export default calculation;
