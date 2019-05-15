(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let data = []
let count = 0;

const heapSort = (array) => {
    count = 0;
    let heapSize = array.length;
    array = buildHeap(array);
    for(let i = heapSize-1; i > 0; i--){
        [array[i], array[0]] = [array[0], array[i]]
        heapify(array, 0, i);
    }
    return array
}

const buildHeap = (array) => {
    for(let i = Math.floor((array.length / 2)-1); i >= 0; i--){
        heapify(array, i, array.length);
    }
    return array;
}

const heapify = (array, i, heapSize) => {
    let max = i;

    let left = (i*2)+1;
    let right = (i*2)+2;

    if(left < heapSize && array[i] < array[left]){
        count++;
        max = left
    }
    if(right < heapSize && array[max] < array[right]){
        count++;
        max = right
    }

    if(i != max){
        [array[max], array[i]] = [array[i], array[max]];
        heapify(array, max, heapSize)
    }
}

const createArray = (n) => {
    let array = [];
    for(let i = 0; i < n; i++){
        array.push(parseInt(Math.random() * 1000));
    }
    heapSort(array)
    
}

for(let i = 1; i <= 1000; i = i+20){
    createArray(i);
    data.push({
        n: i, 
        comparations: count,
        estimate: parseInt(i * Math.log2(i)),  
    });
}
new Morris.Line({
    element: 'Grafica_Comparaciones',
    data,
    xkey: 'n',
    ykeys: ['comparations', 'estimate', 'n'],
    ymax: 'auto',
    lineWidth: 2,
    labels: ['Real', 'Estimado', 'N'],
    resize: true,
    lineColors: ['#0B3C49', '#731963', '#F0E100'],
    parseTime: false
});
},{}]},{},[1]);
