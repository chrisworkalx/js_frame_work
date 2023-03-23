const companyDom = document.querySelector('#company')
	
let timer
let index = 0
cancelAnimationFrame(timer);
timer = requestAnimationFrame(function fn() {
  index+=80 //控制速度
  if (index < companyDom.offsetTop) {
     document.documentElement.scrollTop = index
     timer = requestAnimationFrame(fn);
   } else {
      cancelAnimationFrame(timer);
    }
});



const companyDom = document.querySelector('#company').scrollIntoView({
  behavior: "smooth", // 平滑过渡
  block: "center", // 上边框与视窗顶部平齐。默认值
});
