def findTotal(result, denoms):
    toReturn = 0
    for i, denom in enumerate(denoms):
        toReturn += result[i] * denom
    return toReturn

denoms =  [0.05, 0.1, 0.25, 0.5]

buyIn= int(input("buy-in amount 5 or 10?"))

players = int(input("# of Players:"))
if players >= 9 or players <= 1:
    players = int(input("Please enter a number between 2-8"))

maxChips = int(75/players)
result = []
total = 0

# max out all
for denom in denoms:
    result.append(maxChips)

total = findTotal(result, denoms)

# if total < buyIn then alg won't work
if(total < buyIn):
    print("error, not enough chips")

print(total)
for index, denom in reversed(list(enumerate(denoms))):
    total = findTotal(result, denoms)
    total_denom = result[index] * denom
    toRemove = total - buyIn 

    print(denom, result, total, toRemove)

    # if greater than 0 that means we can remove all of this chip type
    if(toRemove - total_denom > 0):
        result[index] = 0
        continue
    #if to remove < current denom, don't remove any
    if(toRemove < denom):
        continue

    # this makes sure we don't overshoot,
    # if toRemove is divisible by the current denom
    # then we can use all of toRemove, else we need
    # round toRemove down to where it is divisible
    toSub = toRemove if toRemove % denom == 0 else toRemove - (toRemove % denom)  

    # this finds the number of chips we have to subtract
    # from the result array
    toSub /= denom
    result[index] -= toSub

print("final")
print(result, findTotal(result, denoms))




    


