// myCanvas.width=400;
// myCanvas.height=300;
// const margin=30;
// const n=20;
// const array=[];
// let moves=[];

// const cols=[];
// const spacing=(myCanvas.width-margin*2)/n;
// const ctx=myCanvas.getContext("2d");

// const maxColumnHeight=200;

// init();

// let audioCtx = null;

// function playNote(freq, type){
//     if(audioCtx==null){
//         audioCtx = new(
//             AudioContext ||
//             webkitAudioContext || 
//             window.webkitAudioContext
//         )();
//     }
//     const dur=0.2;
//     const osc=audioCtx.createOscillator();
//     osc.frequency.value=freq;
//     osc.start();
//     osc.type=type;
//     osc.stop(audioCtx.currentTime+dur);

//     const node=audioCtx.createGain();
//     node.gain.value=0.4;
//     node.gain.linearRampToValueAtTime(
//         0, audioCtx.currentTime+dur
//     );
//     osc.connect(node);
//     node.connect(audioCtx.destination);
// }

// function init(){
//     for(let i=0; i<n; i++) {
//         array[i]=Math.random();
//     }
//     moves=[]; 
//     for(let i=0; i<array.length; i++) {
//         const x=i*spacing+spacing/2+margin;
//         const y=myCanvas.height-margin-i*3;
//         const width=spacing-4;
//         const height=(maxColumnHeight)*array[i];
//         cols[i]=new Column(x, y, width, height);
//     }
// }

// function play(){
//     moves=bubbleSort(array);
// }


// animate();

// function bubbleSort(array) {
//     const moves=[];
//     let n=array.length;
//     do {
//         var newn = 0;
//         for (let i = 1; i < n; i++) {
//             if (array[i - 1] > array[i]) {
//                 [array[i - 1], array[i]] = [array[i], array[i - 1]];
//                 moves.push({ indices: [i - 1, i], swap: true });
//                 newn = i;
//             } else {
//                 moves.push({ indices: [i - 1, i], swap: false });
//             }
//         }
//         n = newn;
//     } while (n > 0);
//     return moves;
// }

// function animate() {
//     ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//     let changed = false;
//     for(let i=0; i<cols.length; i++) {
//         changed = cols[i].draw(ctx) || changed;
//     }
    
//     if(!changed && moves.length>0) {
//         const move=moves.shift();
//         const[i, j]=move.indices;
//         const waveformType=move.swap?"square":"sine";
//         playNote(cols[i].height+cols[j].height, waveformType);
//         if(move.swap){
//             cols[i].moveTo(cols[j]);
//             cols[j].moveTo(cols[i], -1);
//             [cols[i], cols[j]]=[cols[j], cols[i]];
//         }else{
//             cols[i].jump();
//             cols[j].jump();
//         }
//     }

//     requestAnimationFrame(animate);
// }


myCanvas.width = 400;
myCanvas.height = 300;
const margin = 30;
const n = 20;
const array = [];
let moves = [];

const cols = [];
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 180;

init();

let audioCtx = null;

function playNote(freq, type) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.type = type;
    osc.stop(audioCtx.currentTime + dur);

    const node = audioCtx.createGain();
    node.gain.value = 0.4;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    moves = [];
    for (let i = 0; i < array.length; i++) {
        const x = i * spacing + spacing / 2 + margin;
        const y = myCanvas.height - margin - i * 3;
        const width = spacing - 4;
        const height = (maxColumnHeight) * array[i];
        cols[i] = new Column(x, y, width, height);
    }
}

function play(sortAlgorithm) {
    switch (sortAlgorithm) {
        case 'bubbleSort':
            moves = bubbleSort(array.slice());
            break;
        case 'selectionSort':
            moves = selectionSort(array.slice());
            break;
        case 'insertionSort':
            moves = insertionSort(array.slice());
            break;
        case 'heapSort':
            moves = heapSort(array.slice());
            break;
    }
}

animate();

function bubbleSort(array) {
    const moves = [];
    let n = array.length;
    do {
        var newn = 0;
        for (let i = 1; i < n; i++) {
            if (array[i - 1] > array[i]) {
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                moves.push({ indices: [i - 1, i], swap: true });
                newn = i;
            } else {
                moves.push({ indices: [i - 1, i], swap: false });
            }
        }
        n = newn;
    } while (n > 0);
    return moves;
}

function selectionSort(array) {
    const moves = [];
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[min_idx]) {
                min_idx = j;
            }
            moves.push({ indices: [i, j], swap: false });
        }
        [array[min_idx], array[i]] = [array[i], array[min_idx]];
        moves.push({ indices: [i, min_idx], swap: true });
    }
    return moves;
}

function insertionSort(array) {
    const moves = [];
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            moves.push({ indices: [j, j + 1], swap: true });
            j = j - 1;
        }
        array[j + 1] = key;
        moves.push({ indices: [j + 1, i], swap: false });
    }
    return moves;
}

function heapSort(array) {
    const moves = [];
    let n = array.length;

    function heapify(arr, n, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }

        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }

        if (largest != i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            moves.push({ indices: [i, largest], swap: true });
            heapify(arr, n, largest);
        }
    }

    for (let i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        moves.push({ indices: [0, i], swap: true });
        heapify(array, i, 0);
    }

    return moves;
}

function animate() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let changed = false;
    for (let i = 0; i < cols.length; i++) {
        changed = cols[i].draw(ctx) || changed;
    }

    if (!changed && moves.length > 0) {
        const move = moves.shift();
        const [i, j] = move.indices;
        const waveformType = move.swap ? "square" : "sine";
        playNote(cols[i].height + cols[j].height, waveformType);
        if (move.swap) {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i], -1);
            [cols[i], cols[j]] = [cols[j], cols[i]];
        } else {
            cols[i].jump();
            cols[j].jump();
        }
    }

    requestAnimationFrame(animate);
}