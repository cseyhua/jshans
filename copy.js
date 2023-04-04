/**
 * JS实现拷贝
 * 系统函数浅拷贝
 * 1、Object.assign
 * 如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。
 * 如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。
 * 因为null 和 undefined 不能转化为对象，所以第一个参数不能为null或 undefined，会报错。
 * 2、扩展运算符
 * {...obj}
 * 3、数组方法实现数组浅拷贝
 * slice
 * concat
 */

function shallowCopy(obj) {
    if (!obj || typeof obj !== "object") return;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key of Object.keys(obj)) {
        newObj[key] = obj[key];
    }
    return newObj;
}

function testShallowCopy() {
    let obj = {
        a: 1,
        b: {
            c: 1,
        },
    };

    let newObj = shallowCopy(obj);
    obj.a = 2;
    obj.b.c = 3;
    console.log(obj, newObj);
}

// testShallowCopy()

/**
 * 实现深拷贝
 * 深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比
 *  js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败
 * 1、JSON.stringify(obj)
 * 拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，
 * 当使用过JSON.stringify * 这个方法可以简单粗暴的实现深()进行处理之后，都会消失。
 * 2、函数库loadsh.cloneDeep
 * 3、手写实现
 */

function deepCopy(obj) {
    if (!obj || typeof obj !== "object") return;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key of Object.keys(obj)) {
        newObj[key] =
            typeof obj[key] == "object"
                ? deepCopy(obj[key])
                : (newObj[key] = obj[key]);
    }
    return newObj;
}

function testDeepCopy() {
    let obj = {
        a: 1,
        b: {
            c: 1,
        },
    };

    let newObj = deepCopy(obj);
    obj.a = 2;
    obj.b.c = 3;
    console.log(obj,newObj);
}

// testDeepCopy();
