const arr = [
  {
    id: 2,
    name: '部门B',
    parentId: 0
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  }
];

let formatPlainToTree = (arr) => {
  const copyData = JSON.parse(JSON.stringify(arr));

  const finalData = copyData.reduce((targetArr, nextItem) => {
    // 根节点
    if (nextItem.parentId === 0) {
      targetArr.push(nextItem);
    } else {
      // 开始找子节点
      copyData.map((item) => {
        if (item.id === nextItem.parentId) {
          item.children
            ? item.children.push(nextItem)
            : (item.children = [nextItem]);
        }
      });
    }

    return targetArr;
  }, []);

  return finalData;
};

let list = formatPlainToTree(arr);

console.log('list', list);
