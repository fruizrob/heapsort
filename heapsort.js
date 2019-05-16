let data = [];
let arrayOfComparations = [];
let arrayOfN = [];
let arrayOfEstimate = [];
let count = 0;

const heapSort = array => {
  count = 0;
  let heapSize = array.length;
  array = buildHeap(array);
  for (let i = heapSize - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]];
    heapify(array, 0, i);
  }
  return array;
};

const buildHeap = array => {
  for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
    heapify(array, i, array.length);
  }
  return array;
};

const heapify = (array, i, heapSize) => {
  let max = i;

  let left = i * 2 + 1;
  let right = i * 2 + 2;

  if (left < heapSize && array[i] < array[left]) {
    count++;
    max = left;
  }
  if (right < heapSize && array[max] < array[right]) {
    count++;
    max = right;
  }

  if (i != max) {
    [array[max], array[i]] = [array[i], array[max]];
    heapify(array, max, heapSize);
  }
};

const createArray = n => {
  let array = [];
  for (let i = 0; i < n; i++) {
    array.push(parseInt(Math.random() * 1000));
  }
  heapSort(array);
};

var options = {
  chart: {
    type: "line"
  },
  legend: {
    position: "top"
  },
  series: data,
  xaxis: {
    categories: arrayOfN,
    title: {
      text: "Cantidad de Datos"
    }
  },
  shadow: {
    enabled: true,
    color: "#000",
    top: 18,
    left: 7,
    blur: 10,
    opacity: 1
  },
  title: {
    text: "Gráfica de Resultados",
    align: "left"
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  yaxis: {
    title: {
      text: "Cantidad de Comparaciones"
    }
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

document.getElementById("button-run").addEventListener("click", ev => {
  data = [];
  arrayOfN = [];
  arrayOfComparations = [];
  arrayOfEstimate = [];

  let size;
  if (document.getElementById("input-size").value) {
    size = parseInt(document.getElementById("input-size").value);
  } else {
    size = 50;
  }

  let i = 1;
  while (i < 1000) {
    createArray(i);
    arrayOfN.push(i);
    arrayOfComparations.push(count);
    arrayOfEstimate.push(parseInt(i * Math.log2(i)));
    i += size;
  }

  data.push({
    name: "Real",
    data: arrayOfComparations
  });

  data.push({
    name: "Estimate",
    data: arrayOfEstimate
  });

  data.push({
    name: "N",
    data: arrayOfN
  });

  var options = {
    chart: {
      type: "line"
    },
    legend: {
      position: "top"
    },
    series: data,
    xaxis: {
      categories: arrayOfN
    },
    shadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 1
    },
    title: {
      text: "Gráfica de Resultados",
      align: "left"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }
  };

  chart.updateOptions(options);
});
