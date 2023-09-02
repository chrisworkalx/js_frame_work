import './style.css';

const shopContainer = document.createElement('div');

let htmlString = '';

function fetchData() {
  fetch(
    'https://www.fastmock.site/mock/3277f26b72e3b8aa6de012d30c06ce3f/api/api/getTargetDevice'
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      const { results } = r.data;
      const oUserDiv = document.querySelector('.user-info');

      if (results && Object.keys(results).length) {
        oUserDiv.classList.add('user-border');
        oUserDiv.innerHTML = `
        <p>姓名：${results.deviceName}</p>
        <p>编号： ${results.serialNumber}</p>
        <p>日期： ${results.date}</p>
        `;
      }
    });
}

for (let i = 1; i < 10; i++) {
  htmlString += `
    <li style="margin: 10px;">
      <span style="color: #f40">商品-${i}</span>
    </li>
  `;
}

shopContainer.innerHTML = `
  <ul>
    ${htmlString}
  </ul>
  <div style="width: 100px; height: 100px; background-color: red;"></div>
  <button type="primary" id=“fetchBtn” onclick="fetchData()">mockData</button>
  <div class="user-info"></div>
  `;

document.querySelector('#shop').appendChild(shopContainer);
