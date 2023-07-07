let arr = [
  { id: 1, name: '1', pid: 0 },
  { id: 2, name: '2', pid: 1 },
  { id: 3, name: '3', pid: 1 },
  { id: 4, name: '4', pid: 3 },
  { id: 5, name: '5', pid: 3 }
];

function plainArrToTreeData(arr) {
  const copyData = JSON.parse(JSON.stringify(arr));

  return copyData.filter((item) => {
    //遍历子元素
    const child = arr.filter((i) => i.pid === item.id);

    child.length && (item.children = child);

    return item.pid === 0;
  });
}

console.log('plainArrToTreeData(arr)', plainArrToTreeData(arr));
