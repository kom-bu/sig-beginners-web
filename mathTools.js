"use strict";
function randInt(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower));
}
function shuffledBits(n, k) {
    const arr = [...Array(n)].map((_, i) => {
        if (i < k)
            return 1;
        else
            return 0;
    });
    [...Array(k)].forEach((_, i) => {
        const rand = randInt(i, n);
        const reservoir = arr[i];
        arr[i] = arr[rand];
        arr[rand] = reservoir;
    });
    return arr;
}
//[...Array(1000)].forEach(()=>{shuffledBits(5,2).forEach((x,i)=>{test[i]+=x})})
function constrain(x, lower, upper) {
    return Math.max(lower, Math.min(upper, x));
}
function constrainVec(v, absBound) {
    const absV = v.map(x => x ^ 2).reduce((a, b) => a + b);
    if (absV > absBound)
        return v.map(x => x * absBound / absV);
    else
        return v;
}
function argMin(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
}
function roulette(probs) {
    const probSum = probs.reduce((a, b) => a + b, 0);
    const normalizedProbs = probs.map(prob => prob / probSum);
    const normalizedProbAccum = [0];
    normalizedProbs.forEach(normalizedProb => {
        normalizedProbAccum.push(normalizedProbAccum[normalizedProbAccum.length - 1] + normalizedProb);
    });
    let result = -1;
    const rand = Math.random();
    probs.forEach((_, i) => {
        if (normalizedProbAccum[i] <= rand && rand < normalizedProbAccum[i + 1])
            result = i;
    });
    return result;
}
