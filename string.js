/**
 * 与字符串相关
 */

/**
 * 实现字符串的repeat函数
 */

String.prototype._repeat = function(repeatNum){
    return new Array(repeatNum + 1).join(this)
}

// console.log("abc"._repeat(3))

String.prototype._reverse = function(){
    return this.split('').reduceRight((x,y)=>x+y,"")
}

// console.log("asdfghjkl"._reverse())
