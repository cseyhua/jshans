/* ============= Promise.all ===============================
对于promise.all参数数组里面的promise，只要有一个状态变为rejected，则all返回
reject，错误的promise原因，否则返回resolve，即所有正常，结果按顺序作为数组，一起返回
*/
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let res = new Array(promises.length);
        let idx = 0;
        let successCount = 0;
        for (let promise of promises) {
            ((i) => {
                promise.then(
                    (value) => {
                        res[i] = value;
                        successCount++;
                        successCount === promises.length && resolve(res);
                    },
                    (err) => {
                        reject(err);
                    }
                );
            })(idx++);
        }
    });
}

function testPromiseAll() {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p1");
        }, 2000);
    });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p2");
        }, 4000);
    });
    let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p3");
        }, 6000);
    });

    promiseAll([p1, p2, p3]).then(
        (value) => {
            console.log(value);
        },
        (err) => {
            console.log(err);
        }
    );
}

/* ===================== Promise.race ===========================
对于race函数，只要promise数组中一个敲定就会返回
*/
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        let success = false;
        for (let promise of promises) {
            // 在这里我们用一个变量记住是否已经返回，
            // 是不必须的因为promise的状态只能改变一次，因此可以直接传递
            // 即 promise.then(resolve, reject)
            promise.then(
                (value) => {
                    if (!success) {
                        success = true;
                        resolve(value);
                    }
                },
                (err) => {
                    if (!success) {
                        success = true;
                        reject(err);
                    }
                }
            );
        }
    });
}

function testPromiseRace() {
    let promises = [
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("p1");
            }, 6000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("p2");
            }, 4000);
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("p3");
            }, 6000);
        }),
    ];
    promiseRace(promises).then(
        (v) => {
            console.log(v);
        },
        (e) => {
            console.log(e);
        }
    );
}

// testPromiseRace()

/* ================= 手写防抖与节流 =======================
1、什么是防抖

简单说，防抖就是对于用户在一定时间内的连续操作，我们只执行最后一次，

2、什么是节流

简单说，节流就是对一给定操作我们在一定时间内只执行一次

以上两种方法都是为了防止用户连续操作，造成资源浪费的限定函数
*/


