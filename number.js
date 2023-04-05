/**
 * 与数字有关
 */

/**
 * 将数字每隔千分位用逗号隔开
 */
Number.prototype._format = function () {
    let str = this.toString();
    let dot = str.indexOf(".");
    str =
        dot !== -1
            ? ((str = str.split(".")), (dot = "." + str[1]), str[0])
            : ((dot = ""), str);
    let st = str.length % 3;
    return (
        (st === 0 ? "" : str.slice(0, st) + ",") +
        str.slice(st).match(/\d{3}/g) +
        dot
    );
};

// console.log(Number(1122343)._format())

/**
 * 实现非负大整数相加
 */
function bigNumSum(a, b) {
    a = a.toString().split("");
    b = b.toString().split("");
    let res = 0;
    let sum = [];
    while (a.length || b.length) {
        res += ~~a.pop() + ~~b.pop();
        res = res >= 10 ? (sum.unshift(res - 10), 1) : (sum.unshift(res), 0);
    }
    return sum.join("");
}

// console.log(bigNumSum(12456, 1223456))


/**
 * 实现Add(1,2,3,4)
 * @param  {...any} m 
 * @returns 
 */
var add = function (...m) {
    function temp(...n) {
        return add(m.concat(n).reduce((x,y)=>x+y));
    };
    temp.toString = function () {
        return m[0];
    };
    return temp;
};

// console.log(add(3,1,5)(1,56)); // 12
// console.log(add(3)(6)(9)(25).toString()); // 43


