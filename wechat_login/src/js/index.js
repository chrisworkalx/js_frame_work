// fetch('/getToken')
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res, '==res');
//   });

fetch('/getWeChatQrcode')
  .then((res) => res.json())
  .then((res) => {
    document.querySelector('img').src = res.qrcodeUrl;
    console.log(res, '==res');
  });
