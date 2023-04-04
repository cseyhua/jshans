/*
JavaScript类型判断
== 通用
1、typeof:根据类型标识符确定
返回值有
基本数据类型
null        => object
undefined   => undefined
number      => number
bigint      => bigint
boolean     => boolean
string      => string
symbol      => symbol
引用数据类型
Object
Array
Date
Regex
Map
WeakMap
Set
WeakSet
Promise
等以上引用数据类型返回 => function
使用引用数据类型构造函数创建的对象 => object
Function => function
函数 => function

2、constructor:
对于基本数据类型会使用包装对象进行包装(注意null、undefined没有包装器对象)
由于基本数据类型没有属性与原型因此不能直接通过`.`访问构造函数
可以使用(variable).constructor

3、instanceof:原型链上进行查找
4、Object.prototype.toString.call:返回[object Type]
注意可以通过设置变量的`[Symbol.toStringTag]`修改输出

== 特定
isNaN:将参数强转为Number，再判断
Number.isNaN:不进行类型转换，进行比较
Array.isArray:判断是不是数组实例

== 关于一些判断相等的
Object.is
与==、===的区别
使用==、===判断-0与+0或NaN与NaN时，-0、+0判断相等，NaN判断不相等，而Object.is则与之相反

== 对于基本数据类型的相等性判断==/===
                null      undefined     number      string      boolean      bigint     symbol
null            1/1         1/0          0/0          0/0          0/0         0/0        0/0
undefined       1/0         1/1          0/0          0/0          0/0         0/0        0/0
number          0/0         0/0          1/1          1/0          1/0         1/0        0/0
string          0/0         0/0          1/0          1/1          1/0         1/0        0/0
boolean         0/0         0/0          1/0          1/0          1/1         1/0        0/0
bigint          0/0         0/0          1/0          1/0          1/0         1/1        0/0
symbol          0/0         0/0          0/0          0/0          0/0         0/0        0/0


== 关于??与||
直接返回值而不是boolean值

*/

function getType(obj){
    if (obj == null)return 'null'
    let type = typeof obj
    if (type === 'object'){
        return Object.prototype.toString.call(obj).replace(/\[|\]|object /g,'').toLowerCase()
    }
    return type
}

function testGetType(){
    let arr = [new Array(5), new Object(), new Map(), 1, true, ""]
    console.log(arr.map(getType))
}

// testGetType()