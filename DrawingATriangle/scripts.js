"use strict";
let canvas;
let graphics;
let width;
let height;
let inputA;
let inputB;
let inputC;
let inputSubmit;
let inputReset;
let triangles = [];
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const clampNumber = (value, min, max) => {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
};
const getWindowSize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
};
const setCanvasSize = () => {
    canvas.width = width;
    canvas.height = height;
};
const setFillStyle = (red, green, blue) => {
    graphics.fillStyle = `rgb(${red},${green},${blue})`;
};
const fillRect = (x, y, width, height) => {
    graphics.fillRect(x, y, width, height);
};
const setStrokeStyle = (red, green, blue, width) => {
    graphics.strokeStyle = `rgb(${red},${green},${blue})`;
    graphics.lineWidth = width;
};
const drawLine = (x0, y0, x1, y1) => {
    graphics.beginPath();
    graphics.moveTo(x0, y0);
    graphics.lineTo(x1, y1);
    graphics.stroke();
};
const drawTriangle = (x0, y0, x1, y1, x2, y2) => {
    graphics.beginPath();
    graphics.moveTo(x0, y0);
    graphics.lineTo(x1, y1);
    graphics.lineTo(x2, y2);
    graphics.lineTo(x0, y0);
    graphics.stroke();
};
const drawTriangleInCenter = (x0, y0, x1, y1, x2, y2) => {
    const cx0 = x0 + width / 2 - (x1 - x0) / 2;
    const cy0 = -y0 + height / 2 + y2 / 2;
    const cx1 = x1 + width / 2 - (x1 - x0) / 2;
    const cy1 = -y1 + height / 2 + y2 / 2;
    const cx2 = x2 + width / 2 - (x1 - x0) / 2;
    const cy2 = -y2 + height / 2 + y2 / 2;
    drawTriangle(cx0, cy0, cx1, cy1, cx2, cy2);
};
const calculateAndDrawTriangle = (r01, r12, r20) => {
    const x0 = 0;
    const y0 = 0;
    const x1 = x0 + r01;
    const y1 = y0;
    const x2 = (Math.pow(r12, 2) - Math.pow(r20, 2) + Math.pow(x1, 2)) / (2 * x1);
    const y2 = Math.sqrt(Math.pow(r12, 2) - Math.pow(x2, 2));
    drawTriangleInCenter(x0, y0, x1, y1, x2, y2);
};
const calculateAndDrawTriangles = () => {
    triangles.forEach(i => {
        setRandomStrokeStyle(125, 255, 5);
        calculateAndDrawTriangle(i.r01, i.r12, i.r20);
    });
};
const retrieveCanvasAndContext = () => {
    canvas = document.getElementById('canvas');
    graphics = canvas.getContext('2d');
};
const setupCanvas = () => {
    retrieveCanvasAndContext();
    getWindowSize();
    setCanvasSize();
};
const fillBackground = (red, green, blue) => {
    setFillStyle(red, green, blue);
    fillRect(0, 0, width, height);
};
const drawXCordinateTigs = (lineInterval, tigHeight) => {
    for (let i = 0; i < width; i += lineInterval) {
        drawLine(i * lineInterval, 0, i * lineInterval, tigHeight);
    }
};
const drawYCordinateTigs = (lineInterval, tigHeight) => {
    for (let i = 0; i < height; i += lineInterval) {
        drawLine(0, i * lineInterval, tigHeight, i * lineInterval);
    }
};
const drawCordinates = (lineInterval, tigHeight) => {
    setStrokeStyle(250, 250, 230, 3);
    drawLine(0, 0, width, 0);
    drawLine(0, 0, 0, height);
    drawXCordinateTigs(lineInterval, tigHeight);
    drawYCordinateTigs(lineInterval, tigHeight);
};
const setRandomStrokeStyle = (min, max, width) => {
    setStrokeStyle(randomInt(min, max), randomInt(min, max), randomInt(min, max), width);
};
const resetCanvas = () => {
    getWindowSize();
    setCanvasSize();
    fillBackground(20, 20, 20);
    drawCordinates(8, 8);
    calculateAndDrawTriangles();
};
const retrieveInputA = () => { inputA = document.getElementById('a'); };
const retrieveInputB = () => { inputB = document.getElementById('b'); };
const retrieveInputC = () => { inputC = document.getElementById('c'); };
const retrieveInputSubmit = () => { inputSubmit = document.getElementById('submit'); };
const retrieveInputReset = () => { inputReset = document.getElementById('reset'); };
const retrieveInputs = () => {
    retrieveInputA();
    retrieveInputB();
    retrieveInputC();
    retrieveInputSubmit();
    retrieveInputReset();
};
const checkInput = (input) => {
    if (input != '' && parseInt(input))
        return true;
    return false;
};
const getSafeInput = (input) => {
    if (checkInput(input)) {
        return clampNumber(parseInt(input), 0, Number.MAX_SAFE_INTEGER);
    }
    return -1;
};
const setInputsListeners = () => {
    const lengthInputs = [inputA, inputB, inputC];
    lengthInputs.forEach(i => {
        i.addEventListener('keyup', () => {
            if (checkInput(i.value)) {
                i.value = clampNumber(parseInt(i.value), 0, Number.MAX_SAFE_INTEGER).toString();
            }
            else {
                i.value = '';
            }
        });
    });
};
const setWindowListener = () => {
    window.addEventListener('resize', () => {
        resetCanvas();
    });
};
const addSafeInputTriangle = () => {
    const lengthA = getSafeInput(inputA.value);
    const lengthB = getSafeInput(inputB.value);
    const lengthC = getSafeInput(inputC.value);
    if (lengthA + lengthB + lengthC >= 0) {
        triangles.push({ r01: lengthA, r12: lengthB, r20: lengthC });
    }
};
const setButtonListeners = () => {
    inputSubmit.addEventListener('click', () => {
        addSafeInputTriangle();
        resetCanvas();
    });
    inputReset.addEventListener('click', () => {
        triangles = [];
        resetCanvas();
    });
};
const setEventListeners = () => {
    setWindowListener();
    setInputsListeners();
    setButtonListeners();
};
const main = () => {
    setupCanvas();
    resetCanvas();
    retrieveInputs();
    setEventListeners();
};
main();
//# sourceMappingURL=scripts.js.map