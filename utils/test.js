const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
//选择排序
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
}
//插入排序
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}
//希尔排序
function shellSort(arr) {
  let gap = parseInt(arr.length / 2);
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];
      let j = i - gap;
      while (j >= 0 && arr[j] > temp) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + gap] = temp;
    }
    gap = parseInt(gap / 2);
  }
  return arr;
}
//快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
//归并排序
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

//斐波那契排序
function fibonacciSort(arr) {
  let fibonacci = [1, 1];
  for (let i = 2; i < arr.length; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }
  let fibonacciIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
    fibonacciIndex = j;
  }
  return arr;
}
//杨辉三角
function yanghuiTriangle(n) {
  let arr = [[1]];
  for (let i = 1; i < n; i++) {
    let temp = [];
    temp[0] = 1;
    temp[i] = 1;
    for (let j = 1; j < i; j++) {
      temp[j] = arr[i - 1][j - 1] + arr[i - 1][j];
    }
    arr.push(temp);
  }
  return arr;
}

//分片上传
function chunkUpload(file, callback) {
  let chunkSize = 2 * 1024 * 1024;
  let chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  let reader = new FileReader();
  let blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  let frOnload = function (e) {
    let chunk = e.target.result;
    callback(chunk);
    currentChunk++;
    if (currentChunk < chunks) {
      loadNext();
    }
  };
  let frOnerror = function (e) {
    console.log('error');
  };
  let loadNext = function () {
    let start = currentChunk * chunkSize;
    let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    reader.readAsArrayBuffer(blobSlice.call(file, start, end));
  };
  loadNext();
}

//blob
function blobToArrayBuffer(blob, callback) {
  let fr = new FileReader();
  fr.onload = function (e) {
    callback(e.target.result);
  };
  fr.readAsArrayBuffer(blob);
}

//链表
function LinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
LinkedList.prototype.push = function (value) {
  let node = {
    value: value,
    next: null
  };
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length++;
};
LinkedList.prototype.pop = function () {
  if (this.head === null) {
    return null;
  }
  let current = this.head;
  let prev = null;
  while (current.next !== null) {
    prev = current;
    current = current.next;
  }
  this.tail = prev;
  this.tail.next = null;
  this.length--;
  return current.value;
};
