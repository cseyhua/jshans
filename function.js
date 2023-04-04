/**
 * 手写函数对象实例的call、apply、bind
 * 首先是上述三个函数的作用与区别：
 * 上述三个函数都可以该表函数执行时的上下文
 * 其中主要的区别是：
 * 使用call函数时，参数通过参数列表传入
 * 使用apply函数时，参数通过一个数组参数传入
 * 调用bind函数会返回一个绑定上下文的新函数
 *
 * 在写bind函数时发现一个问题：
 * 函数参数可以使用arguments对象获取，但箭头函数里面使用arugments，时为父函数的arguments
 *
 */

// ==== Function.prototype.call ====
Function.prototype._call = function (thisArg, ...args) {
    // 由于函数里面this是指向其调用上下文，因此我们使用函数调用_call时
    if (typeof this !== "function") {
        throw Error("caller type error");
    }
    thisArg = thisArg ?? window;

    thisArg.fn = this;

    let res = thisArg.fn(...args);
    delete thisArg.fn;
    return res;
};

let name = 3;

function testCall() {
    function t() {
        return this.name;
    }
    console.log(t());
    console.log(t._call({ name: 2 }));
}

// testCall()

// ==== Function.prototype.apply ====
Function.prototype._apply = function (thisArg, args = []) {
    if (typeof this !== "function") {
        throw Error("type function");
    }

    thisArg = thisArg ?? window;

    thisArg.fn = this;

    let res = thisArg.fn(...args);
    delete thisArg.fn;
    return res;
};

Function.prototype.myApply = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    let result = null;
    // 判断 context 是否存在，如果未传入则为 window
    context = context || window;
    // 将函数设为对象的方法
    context.fn = this;
    // 调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    // 将属性删除
    delete context.fn;
    return result;
};

function testApply() {
    function t(args) {
        console.log(...arguments);
        return this.name;
    }
    console.log(t(1, 3, 4));
    console.log(t.myApply({ name: 4 }, [1, 2, 6, 7, 8]));
}

// testApply();

// ==== Function.prototype.bind ====
Function.prototype._bind = function (thisArg, ...args) {
    if (typeof this !== "function") {
        throw Error("type erreo");
    }
    thisArg = thisArg ?? window;

    fn = this;

    return function () {
        return fn.apply(thisArg, [...args, ...arguments]);
    };
};

function testBind() {
    function t() {
        console.log(...arguments);
    }
    let obj = { name: 5 };
    let fn = t._bind(obj, 1, 2, 3);
    fn(9, 0);
    obj.name = 6;
    fn(8, 0);
}

// testBind()

/**
 * 函数柯里化
 * 将多参数函数进行多次调用，每次传入少量参数
 */

function curry(fn, ...args) {
    return fn.length <= args.length
        ? fn(...args)
        : curry.bind(null, fn, ...args);
}

function testCurry() {
    function t(arg1, arg2, arg3, arg4, arg5) {
        console.log(...arguments);
    }
    curry(t, 1, 2, 3)(1)(3);
}

// testCurry()

// ==== 针对函数柯里化，应用 ====

/**
 * 实现一个这样的函数
 * add(1,2,3)(2,3)(4,5,6,7,8)()
 */

function _add(...args) {
    return args.reduce((x, y) => x + y);
}

function add() {
    let res = [...arguments].reduce((x, y) => x + y);
    return add.arguments.length == 1 ? res : add.bind(null, res);
}

function testAdd() {
    console.log(add(1, 2)(1, 2)(1, 2, 3)());
}

// testAdd()

/**
 * 对象原型探索
 */

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.say = function () {
    console.log(`{name:${this.name},age:${this.age}}`);
};

Person.prototype.version = 2021;

// let p1 = new Person("nick", 23);
// let p2 = new Person("nick", 23);

// p1.version = 2022;

// console.log(p1);
// console.log(p2);

function Chinese(name, age, city) {
    Person.call(this, name,age)
    this.city = city;
}

Chinese.prototype.__proto__ = Person.prototype;

let p3 = new Chinese("nick", 23, "dalian");

// console.log(p3.say());

/*
class Person {
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

class Chinese extends Person {
    constructor(name, age, city){
        super(name,age)
        this.city = city
    }
}

console.log(new Chinese('nick', 23,'dalian'))
*/
