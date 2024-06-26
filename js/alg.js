
function findTotal(result, chips) {
    var toReturn = 0;
    result.forEach((element, index) => {
        toReturn += element * chips[index][1];
    });
    return toReturn;
}

function algorithm(chips, players, buyIn) {
    var result = []
    
    // max out result array
    chips.forEach((element) => {
        result.push(Math.floor((element[2])/players))
    });
    
    var total = findTotal(result, chips);

    // if not enough chips return err
    if(total < buyIn){
        return [-1, "Error, not enough chips for specified configurations."];
    }

    for (let index = chips.length - 1; index >= 0; index--) {
        const list = chips[index];
        const denom = list[1];
        
        total = findTotal(result, chips);
        let total_denom = result[index] * denom
        let toRemove = total - buyIn;
        toRemove = toRemove.toFixed(2); // get rif of any weird floating points 

        // if greater than 0 that means we can remove all of this chip type
        if(toRemove - total_denom > 0){
            result[index] = list[3]; // adds the minimum user specified
            continue;
        }
        // if to remove < current denom, don't remove any
        if(toRemove < denom){
            continue;
        }

        // this makes sure we don't overshoot,
        // if toRemove is divisible by the current denom
        // then we can use all of toRemove, else we need
        // round toRemove down to where it is divisible
        let toSub = toRemove % denom == 0 ? toRemove : toRemove - (toRemove % denom);
        toSub /= denom;
        result[index] -= toSub; 
        
        // makes sure there is a minimum of the user specified amount
        if(result[index] < list[3]){
            result[index] = list[3];
        }
    }

    if(findTotal(result, chips) != buyIn){
        return [-1, "Error, configuration doesn't add up to buy in amount"];
    }

    return [0, result];

}
