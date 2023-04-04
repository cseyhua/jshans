// ==== 防抖函数 ====
function debounce(fn, expires) {
    let eventId = null;
    let _args = null;
    function callback(){
       fn(_args)
    }
    return (arguments)=>{
        _args = arguments
        if(eventId){
            clearTimeout(eventId, callback)
        }
        eventId = setTimeout(callback, expires)
    }
}

function testDebounce(){
    function db(){
        console.log(arguments[0])
    }
    let proxyDB = debounce(db, 2000)
    for(let i of [0,1,2,3]){
        proxyDB(i)
    }
}

// testDebounce()

// ==== 节流函数 ====
function throttle(fn, expires){
    let preTime = Date.now()
    return (arguments)=>{
        let currentTime = Date.now()
        if(currentTime - preTime >= expires){
            preTime = currentTime
            return fn(arguments)
        }
    }
}

function testThrottle(){
    function tt(){
        console.log(arguments[0])
    }
    let proxyFn = throttle(tt, 2000)
    proxyFn()
    proxyFn()
    setTimeout(()=>{
        proxyFn('nick')
    }, 2000)
    setTimeout(proxyFn, 3000)
}

// testThrottle()
