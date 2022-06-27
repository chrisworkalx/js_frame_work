```js
/**
 * cardChart表示echarts实例
 * cardChart.containPixel('grid', pointInPixel)可以判定是否在grid中去点击或者操作等
 * pointInGrid【0】 表示echarts对应的索引
 * x 表示x轴对应的值
*/
cardChart.getZr().on('click', (params) => {
    let pointInPixel = [params.offsetX, params.offsetY];
    if (cardChart.containPixel('grid', pointInPixel)) {
        let pointInGrid = cardChart.convertFromPixel({
            seriesIndex: 0
        }, pointInPixel);
        let xIndex = pointInGrid[0]; //索引
        let handleIndex = Number(xIndex);
        let seriesObj = cardChart.getOption(); //图表object对象
        var op = cardChart.getOption();
        //获得图表中点击的列
        var x = op.xAxis[0].data[handleIndex];  //获取点击的列名
        console.log(x);
        console.log(handleIndex, seriesObj);
    };
});
```