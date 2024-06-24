const MIN_RADIUS = 7.5
const MAX_RADIUS = 7.5
const DEPTH = 2
const LEFT_COLOR = 'F79A00'
const RIGHT_COLOR = 'FD12D1'
const NUM_POINTS = 2500

const getGradientStop = (ratio) => {
    // For outer ring numbers potentially past max radius,
    // just clamp to 0
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

    const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
    );
    const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * ratio
    );
    const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
    const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

    return `#${color}`;
};

const calculateColor = (x) =>{
    const maxDiff = MAX_RADIUS * 2
    const distance = x+ MAX_RADIUS

    const ratio = distance /maxDiff

    const stop = getGradientStop(ratio)

    return stop
}

const randomFromInterval = (min,max) => {
    return Math.random() * (max - min) + min
}

export const pointInner =Array.from(
    {length:NUM_POINTS},
    (v,k) => k+1
).map((num) =>{
    const randomRadius = randomFromInterval(MIN_RADIUS,MAX_RADIUS)
    const randomAngle = Math.random() * Math.PI *2

    const x = Math.cos(randomAngle) * randomRadius
    const y = Math.sin(randomAngle) * randomRadius
    const z = randomFromInterval(-DEPTH , DEPTH)


    const color = calculateColor(x)

    return{
        idx :num,
        position : [x,y,z],
        color,
    }

})
export const pointOuter =Array.from(
    {length:NUM_POINTS/4},
    (v,k) => k+1
).map((num) =>{
    const randomRadius = randomFromInterval(MIN_RADIUS/2,MAX_RADIUS*2)
    const randomAngle = Math.random() * Math.PI *2

    const x = Math.cos(randomAngle) * randomRadius
    const y = Math.sin(randomAngle) * randomRadius
    const z = randomFromInterval(-DEPTH * 10 , DEPTH * 10)


    const color = calculateColor(x)

    return{
        idx :num,
        position : [x,y,z],
        color,
    }

})