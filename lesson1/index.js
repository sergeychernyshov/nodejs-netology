const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('2foo');
    }, 300);
});

promise1.then((value) => {
    console.log("3"+value);
    // expected output: "foo"
});

console.log("!"+promise1);
// expected output: [object Promise]
