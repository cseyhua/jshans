/**
 * 与数和数组有关的
 */

let a = 3;
let b = 4;

a = a + b;
b = a - b;
a = a - b;

// console.log(a,b)

let c = 400;
let d = 10;

c = c ^ d;
d = c ^ d;
c = c ^ d;

// console.log(c, d)

// ==== 乱序输出数组 ====
const outOfOrder = (arr) => {
    let randomIdx = 0;
    for (let idx = 0; idx < arr.length - 1; idx++) {
        randomIdx =
            idx + 1 + Math.floor(Math.random() * (arr.length - idx - 1));
        arr[idx] = arr[idx] ^ arr[randomIdx];
        arr[randomIdx] = arr[idx] ^ arr[randomIdx];
        arr[idx] = arr[idx] ^ arr[randomIdx];
    }
    return arr;
};

// console.log(outOfOrder([1,2,3,5,6,7]))


// ==== [1,2,3,4,5,6,7,8]求和 ====
const sum = (arr) => arr.reduce((x, y) => x + y);

// console.log(sum([1,2,3,4,5,6,7,8]))
// console.log(sum([1]))


// ==== [1,2,3,[4,5,[6,7,[8]], 9], 10]求和 ====
const multiDimSum = (arr) => {
    return arr.reduce((x, y) => x + (Array.isArray(y) ? multiDimSum(y) : y), 0);
};

const multiDimSum1 = (arr) => {
    return arr
        .toString()
        .split(",")
        .reduce((x, y) => x + Number(y), 0);
};

// console.log(multiDimSum([1, 2, 3, 4, 5, 6, 7, 8]));
// console.log(multiDimSum([1]));
// console.log(multiDimSum([1, 2, 3, [4, 5, [6, 7, [8]], 9], 10]));
// console.log(multiDimSum([[[10]]]));
// console.log(multiDimSum1([1, 2, 3, [4, 5, [6, 7, [8]], 9], 10]));


// ==== 实现数组扁平化 ====

// toString
const flat1 = (arr) => {
    return arr.toString().split(',').map(v=>+v)
}

// reduce
const flat2 = (arr) => {
    return arr.reduce((x,y)=>x.concat(Array.isArray(y)?flat2(y):y), [])
}

// ...扩展语法
const flat3 = (arr) =>{
    while(arr.some(v=>Array.isArray(v))){
        arr = [].concat(...arr)
    }
    return arr
}

// JSON

const flat4 = (arr)=>{
    return JSON.parse(`[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`)
}

// console.log(flat1([1,2,3, [-4, [6,6]]]))
// console.log(flat2([1,2, [[10]],3, [-4, [6,6]]]))
// console.log(flat3([1,2, [[10]],3, [-4, [6,6]]]))
// console.log(flat4([1,2, [[10]],3, [-4, [6,6]]]))


/**
 * 实现数组去重
 */

// ==== Set ====

// ==== Map ====


/**
 * 实现数组的flat方法
 */


/**
 * 实现数组的push方法
 */

Array.prototype._push = function () {
    let len = this.length
    for (let i = 0; i< arguments.length;i++){
        this[len + i] = arguments[i]
    }
    return this.length
}

let arr = [1,2,3,4,5,6]

// console.log(arr._push(1,2,3,[3]))
// console.log(arr)

/**
 * 实现数组的filter方法
 */

Array.prototype._filter = function(fn){
    return this.reduce((x,y)=>{
        if(fn(y))x.push(y)
        return x
    },[])
}

// console.log(arr._filter(v=>v>3))

/**
 * 实现数组的map方法
 */

Array.prototype._map = function(fn){
    return this.reduce((x,y)=>x.concat(fn(y)),[])
}

// console.log(arr._map(v=>v**2))



/**
 * 类数组转换
 * slice
 * splice
 * concat
 * from
 */
