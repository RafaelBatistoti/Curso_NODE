const p = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
    rej(new Error("msg"));
  }, 2000);
});
p
.then((result) => console.log("result", result))
.catch(err => console.log("Error", err.msg));
