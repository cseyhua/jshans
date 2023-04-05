/**
 * Promise实现图片异步加载
 */

function loadImg(url){
    return new Promise((resolve, reject)=>{
        let img = new Image()
        img.src = url
        img.onerror = function (err){
            console.log('请求失败')
            reject(err)
        }
        img.onload = function (){
            console.log('请求成功')
            resolve()
        }
    })
}

function testLoadImg(){
    loadImg('https://w.wallhaven.cc/full/rr/wallhaven-rrg6yw.jpg').then(value=>{
        console.log('图片加载成功')
    }).catch(err=>{
        console.log(err)
    })
}

// testLoadImg()

/**
 * 实现发布订阅模式
 */


/**
 * 查找文章中出现频次最高的单词
 */
function mostWord(article){
    let wordlist = article.toLowerCase().match(/[a-z]+/g)
    let map = new Map()
    let maxWord = '',count = 0
    for(let word of wordlist){
        map.set(word, ~~map.get(word) + 1)
        if(map.get(word) > count){
            maxWord = word
            count = map.get(word)
        }
    }
    return maxWord + ':' + count
}

function testMostWord(){
    console.log(mostWord('word hello word true true word word hell'))
}

// testMostWord()

/**
 * 封装异步fetch
 */

/**
 * 判断对象是否存在循环引用
 */