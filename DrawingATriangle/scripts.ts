
let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

let width: number;
let height: number;

let inputA: HTMLInputElement;
let inputB: HTMLInputElement;
let inputC: HTMLInputElement;
let inputSubmit: HTMLInputElement;
let inputReset: HTMLInputElement;

let triangles: {r01: number, r12: number, r20: number}[] = [];

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const clampNumber = (value: number, min: number, max: number) => {
    if(value < min) return min;
    if(value > max) return max;
    return value;
}

const getWindowSize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
}

const setCanvasSize = () => {
    canvas.width = width;
    canvas.height = height;
}

const setFillStyle = (red: number, green: number, blue: number) => {
    graphics.fillStyle = `rgb(${red},${green},${blue})`;
}

const fillRect = (x: number, y: number, width: number, height: number) => {
    graphics.fillRect(x, y, width, height);
}

const setStrokeStyle = (red: number, green: number, blue: number, width: number) => {
    graphics.strokeStyle = `rgb(${red},${green},${blue})`;
    graphics.lineWidth = width;
}

const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
    graphics.beginPath();
    graphics.moveTo(x0, y0);
    graphics.lineTo(x1, y1);
    graphics.stroke();
}

const drawTriangle = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) => {
    graphics.beginPath();
    graphics.moveTo(x0, y0);
    graphics.lineTo(x1, y1);
    graphics.lineTo(x2, y2);
    graphics.lineTo(x0, y0);
    graphics.stroke();
}

const drawTriangleInCenter = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) => {
    const cx0 = x0 + width / 2 - (x1 - x0) / 2;
    const cy0 = -y0 + height / 2 + y2 / 2;
    const cx1 = x1 + width / 2 - (x1 - x0) / 2;
    const cy1 = -y1 + height / 2 + y2 / 2;
    const cx2 = x2 + width / 2 - (x1 - x0) / 2;
    const cy2 = -y2 + height / 2 + y2 / 2;
    drawTriangle(cx0, cy0, cx1, cy1, cx2, cy2);
}

const calculateAndDrawTriangle = (r01: number, r12: number, r20: number) => {
    const x0 = 0;
    const y0 = 0;
    const x1 = x0 + r01;
    const y1 = y0;
    const x2 = (r12**2 - r20**2 + x1**2) / (2 * x1);
    const y2 = Math.sqrt(r12**2 - x2**2);
    drawTriangleInCenter(x0, y0, x1, y1, x2, y2);
}

const calculateAndDrawTriangles = () => {
    triangles.forEach(i => {
        setRandomStrokeStyle(125, 255, 5);
        calculateAndDrawTriangle(i.r01, i.r12, i.r20);
    })
}

const retrieveCanvasAndContext = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    graphics = <CanvasRenderingContext2D>canvas.getContext('2d');
}

const setupCanvas = () => {
    retrieveCanvasAndContext();
    getWindowSize();
    setCanvasSize();
}

const fillBackground = (red: number, green: number, blue: number) => {
    setFillStyle(red, green, blue);
    fillRect(0, 0, width, height);
}

const drawXCordinateTigs = (lineInterval: number, tigHeight: number) => {
    for(let i = 0; i < width; i += lineInterval) {
        drawLine(i * lineInterval, 0, i * lineInterval, tigHeight);
    }
}

const drawYCordinateTigs = (lineInterval: number, tigHeight: number) => {
    for(let i = 0; i < height; i += lineInterval) {
        drawLine(0, i * lineInterval, tigHeight, i * lineInterval);
    }
}

const drawCordinates = (lineInterval: number, tigHeight: number) => {
    setStrokeStyle(250, 250, 230, 3);
    drawLine(0, 0, width, 0);
    drawLine(0, 0, 0, height);
    drawXCordinateTigs(lineInterval, tigHeight);
    drawYCordinateTigs(lineInterval, tigHeight);
}

const setRandomStrokeStyle = (min: number, max: number, width: number) => {
    setStrokeStyle(randomInt(min, max), randomInt(min, max), randomInt(min, max), width);
}

const resetCanvas = () => {
    getWindowSize();
    setCanvasSize();
    fillBackground(20, 20, 20);
    drawCordinates(8, 8);
    calculateAndDrawTriangles();
}

const retrieveInputA = () => {inputA = <HTMLInputElement>document.getElementById('a')}
const retrieveInputB = () => {inputB = <HTMLInputElement>document.getElementById('b')}
const retrieveInputC = () => {inputC = <HTMLInputElement>document.getElementById('c')}
const retrieveInputSubmit = () => {inputSubmit = <HTMLInputElement>document.getElementById('submit')}
const retrieveInputReset = () => {inputReset = <HTMLInputElement>document.getElementById('reset')}
const retrieveInputs = () => {
    retrieveInputA();
    retrieveInputB();
    retrieveInputC();
    retrieveInputSubmit();
    retrieveInputReset();
}

const checkInput = (input: string): boolean => {
    if(input != '' && parseInt(input)) return true;
    return false;
}

const getSafeInput = (input: string) => {
    if(checkInput(input)) {
        return clampNumber(parseInt(input), 0, Number.MAX_SAFE_INTEGER);
    }
    return -1;
}

const setInputsListeners = () => {
    const lengthInputs = [inputA, inputB, inputC];
    lengthInputs.forEach(i => {
        i.addEventListener('keyup', () => {
            if(checkInput(i.value)) {
                i.value = clampNumber(parseInt(i.value), 0, Number.MAX_SAFE_INTEGER).toString();
            } else {
                i.value = '';
            }
        });
    });
}

const setWindowListener = () => {
    window.addEventListener('resize', () => {
        resetCanvas();
    })
}

const addSafeInputTriangle = () => {
    const lengthA = getSafeInput(inputA.value);
    const lengthB = getSafeInput(inputB.value);
    const lengthC = getSafeInput(inputC.value);
    if(lengthA + lengthB + lengthC >= 0) {
        triangles.push({r01: lengthA, r12: lengthB, r20: lengthC});
    }
}

const setButtonListeners = () => {
    inputSubmit.addEventListener('click', () => {
        addSafeInputTriangle();
        resetCanvas();
    });

    inputReset.addEventListener('click', () => {
        triangles = [];
        resetCanvas();
    });
}

const setEventListeners = () => {
    setWindowListener();
    setInputsListeners();
    setButtonListeners();
}

const main = () => {
    setupCanvas();
    resetCanvas();
    retrieveInputs();
    setEventListeners();
}

main();
