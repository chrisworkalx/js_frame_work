setTimeout(() => {
  new Promise((res) => res()).then(() => {
    console.log(1111);
  });
}, 0);

setTimeout(() => {
  console.log(2222);
}, 0);
