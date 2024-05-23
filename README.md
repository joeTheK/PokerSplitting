# PokerSplitting
Joseph Kelley

Purpose
---

The purpose of this repo is to algorithmically divide poker chips based on the
buy-in, # of players, and number of chips for each game. It is intended for
home cash-games.

The alg_simple file is poc just showing that my algorithm works.

The alg file is a better and more customizable test of the algorithm. It is written
in JS as I hope to port it to a website.


ALGORITHM
---

I had tried may iterarations such as a reverse-cashiers algorithm, using knapsack solutions. The
goal was to maximize the number of chips you had, because who doesn't like a ton of chips.
but the algorithm I ended up using was much more elegent, running in O(n), n being the number
of different denominations used.

(the example below uses an example of a 5 dollar buy-in with 12 chips max per player and standard
denoms of [0.05, 0.1, 0.25, 0.5])

1. create the results array with all denominations to the max value and calculate the total
```
results = [12, 12, 12, 12]
total = 10.8
```
2. find the amount we need to remove to get to our buyIn
```
toRemove = total - buyIn ==> (5.8 = 10.8 - 5)
```
3. to avoid overshooting and complicated floating point math make subrtact the non-divisible part of toRemove for the current denomination
```
(current denom = 0.5)
if(toRemove divisible by 0.5)
{
    chipsToRemove = toRemove / 0.5
} 
else 
{ // we have to remove the 0.3 because 5.8 is not divisble by 0.5
    chipsToRemove = toRemove - (toRemove % 0.5)
    chipsToRemove /= 0.5 
}
```
4. subtract the chipsToRemove from the resulting array
```
results[currentDenom] -= chipsToRemove
```
5. continue from 2 for each remaining denomination

if you use a buy in divisible by your lowest denmoniation there should always be a resulting array, assuming you have
enough chips to play with.