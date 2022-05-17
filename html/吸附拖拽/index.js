(() => {
  const idioms = ['马到成功', '万事如意', '恭喜发财', '生龙活虎'];
  //空白区域集合
  const blankWrapperCollection = document.querySelectorAll(
    '.topBox .cell-wrapper-box .wrapper'
  );
  //可拖动区域集合
  const contentWrapperDom = document.querySelector('.bottomBox');
  let ochars = null,
    charAreas = [], //缓存每个可移动方格的位置参数 {x, y}
    blankAreas = [], //空白区域默认保存的位置
    resArr = [undefined, undefined, undefined, undefined],
    blankItemWidth = blankWrapperCollection[0].offsetWidth,
    blankItemHeight = blankWrapperCollection[0].offsetHeight,
    cellX = 0, // 每个成语wrapper距离左侧的offsetLeft
    cellY = 0, // 每个成语wrapper距离左侧的offsetTop
    startX = 0, // 每个成语wrapper距离左侧的clientX
    startY = 0, // 每个成语wrapper距离左侧的clientY
    mouseX = 0, // 鼠标默认距离每个成语wrapper的left
    mouseY = 0; // // 鼠标默认距离每个成语wrapper的top
  //设置移动端 font-size
  function resizeFontSize() {
    //上面这种会出现奇怪的问题 所以先设置固定的px值
    // document.documentElement.style.fontSize =
    //   document.documentElement.clientWidth / 37.5 + 'px';
    document.documentElement.style.fontSize = '10px';
  }

  // 生成模版字符串拼接到dom结构中
  function getAllCharToString() {
    const _arr = idioms.reduce((targetArr, nextItem) => {
      const newNextItem = [...nextItem];
      return targetArr.concat(newNextItem).sort(randomSort);
    }, []);

    let initStr = '';

    for (let i = 0; i < _arr.length; i++) {
      initStr += `
        <div class="cell-wrapper-box">
          <div class="wrapper" data-index="${i}">${_arr[i]}</div>
        </div>
      `;
    }

    contentWrapperDom.innerHTML = initStr;
  }

  // 打乱排序
  function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  }

  //开始绑定事件函数

  function bindEvent() {
    let ochar = null;

    for (let i = 0; i < ochars.length; i++) {
      ochar = ochars[i];
      ochar.addEventListener('touchstart', handleTouchStart, false);
      ochar.addEventListener('touchmove', handleTouchMove, false);
      ochar.addEventListener('touchend', handleTouchEnd, false);
    }
  }

  function handleTouchStart(e) {
    cellW = this.offsetWidth;
    cellH = this.offsetHeight;
    cellX = this.offsetLeft;
    cellY = this.offsetTop;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    mouseX = startX - cellX;
    mouseY = startY - cellY;
    this.style.transition = 'none';
    this.style.width = cellW / 10 + 'rem';
    this.style.height = cellH / 10 + 'rem';
    this.style.position = 'fixed';
    this.style.left = cellX / 10 + 'rem';
    this.style.top = cellY / 10 + 'rem';
  }

  function handleTouchMove(e) {
    e.preventDefault(); //消除默认事件 防止抖动
    const moveX = e.touches[0].clientX,
      moveY = e.touches[0].clientY;
    cellX = moveX - mouseX;
    cellY = moveY - mouseY;
    this.style.left = cellX / 10 + 'rem';
    this.style.top = cellY / 10 + 'rem';
  }

  function handleTouchEnd(e) {
    // this -> e.target
    //开始吸附的功能
    for (let i = 0; i < blankAreas.length; i++) {
      if (resArr[i] !== undefined) {
        //判断如果数组已经放置了元素，继续下一轮
        continue;
      }

      let { x, y } = blankAreas[i];

      //边界判断
      if (
        (cellX > x &&
          cellX < x + blankItemWidth / 2 &&
          cellY > y &&
          cellY < y + blankItemHeight / 2) ||
        (cellX + blankItemWidth > x + blankItemWidth / 2 &&
          cellX + blankItemWidth < x + blankItemWidth &&
          cellY > y &&
          cellY < y + blankItemHeight / 2)
      ) {
        setPosition(this, [x, y], false);
        setResArr(this, i);

        if (!resArr.includes(undefined)) {
          setTimeout(() => {
            if (checkResult()) {
              alert('组装正确');
            } else {
              alert('成语组装失败');
            }

            resetChars();
          }, 1000);
        }
        return;
      }
    }

    // 获取当前移动的索引 然后恢复之前的样子
    const _index = Number(this.dataset.index);
    this.style.transition = 'all .5s ease-in-out'; //加入动画
    this.style.left = charAreas[_index].x / 10 + 'rem';
    this.style.top = charAreas[_index].y / 10 + 'rem';
  }

  function saveArea(domCollection, targetArr) {
    let startX = 0,
      startY = 0,
      oItem = null;
    for (let i = 0; i < domCollection.length; i++) {
      oItem = domCollection[i];
      startX = oItem.offsetLeft;
      startY = oItem.offsetTop;
      targetArr.push({
        x: startX,
        y: startY
      });
    }
  }

  function init() {
    resizeFontSize();
    getAllCharToString();
    //在dom结构生成后 需要找到所有的 .bottomBox cell-wrapper-box .wrapper
    ochars = contentWrapperDom.querySelectorAll('.cell-wrapper-box .wrapper');
    saveArea(blankWrapperCollection, blankAreas); //缓存初始空白位置数组
    saveArea(ochars, charAreas); //缓存初始可移动位置数组
    bindEvent();
  }

  function setPosition(el, [x, y], isAnimate = true) {
    if (isAnimate) {
      el.style.transition = 'all .5s ease-in-out'; //加入动画
    }
    el.style.left = x / 10 + 'rem';
    el.style.top = y / 10 + 'rem';
  }

  //保存填充在空白区域的el信息
  function setResArr(el, index) {
    resArr[index] = {
      char: el.innerText,
      el
    };
  }

  //检查成语是否正确
  function checkResult() {
    let idiom = '';
    resArr.forEach((item) => {
      idiom += item.char;
    });
    return idioms.find((item) => item === idiom);
  }

  //重置el
  function resetChars() {
    resArr.forEach((item) => {
      const el = item.el;
      const _index = Number(el.dataset.index);
      const { x, y } = charAreas[_index];
      setPosition(el, [x, y]);
    });
    resArr = [undefined, undefined, undefined, undefined];
    cellX = 0;
    cellY = 0;
    startX = 0;
    startY = 0;
    mouseX = 0;
    mouseY = 0;
  }
  init();
})();
