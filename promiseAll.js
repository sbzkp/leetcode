// let p1 = Promise.resolve("p1");
// let p2 = Promise.resolve("p2");
// let p3 = Promise.resolve("p3");
// let p4 = Promise.resolve("p4");


let PromiseAll = function( args  ){
    let result = [];
    let returnPromise = [];
    let count = 0 ;
    if ( !Array.isArray(args) ) {
        throw new Error("请输入数组")
    }

    return new Promise(( resolve, reject )=>{
        for (let index = 0; index < args.length; index++) {
            const promise = args[index];
            promise.then(( data )=>{
                count++
                result[index] = data;
                if (count == args.length) {
                    resolve( result )

                }
            })
        }
    })
}

// let returnResult = PromiseAll( [p1, p2, p3, p4] );


// https://zhuanlan.zhihu.com/p/362648760

// 输入不仅仅只有Array
function promiseAll(args) {
    return new Promise((resolve, reject) => {
        const promiseResults = [];
        let iteratorIndex = 0;
        // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
        // 输出顺序和完成顺序是两码事
        let fullCount = 0;
        // 用于迭代iterator数据
        for (const item of args) {
            // for of 遍历顺序，用于返回正确顺序的结果
            // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
            let resultIndex = iteratorIndex;
            iteratorIndex += 1;
            // 包一层，以兼容非promise的情况
            Promise.resolve(item).then(res => {
                promiseResults[resultIndex] = res;
                fullCount += 1;
                // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
                if (fullCount === iteratorIndex) {
                    resolve(promiseResults)
                }
            }).catch(err => {
                reject(err)
            })
        }
        // 处理空 iterator 的情况
        if (iteratorIndex === 0) {
            resolve(promiseResults)
        }
    }
    )
}
if (!Promise.all) Promise.all = promiseAll;



let map = new Map();
map.set("a", 123  )
map.set("b", 456  )

// 如果是map的话，item 就是 [a, 123], [b, 456 ]
for ( let item of map ) {
    console.log( item )    
}



let promise3 = Promise.resolve(1)
let promise2 = new Promise((resolve, reject  )=>{
    setTimeout(()=>{
        resolve(2)
    }, 1000)
})

let promise1 = new Promise((resolve, reject  )=>{
    setTimeout(()=>{
        resolve(3)
    }, 2000)
})
// 塔塔

function promiseAll(promises){
    return new Promise(function(resolve,reject){
        if(!Array.isArray(promises)){
            return reject(new TypeError("argument must be anarray"))
        }
        var countNum=0;
        var promiseNum=promises.length;
        var resolvedvalue=new Array(promiseNum);
        for(var i=0;i<promiseNum;i++){
                (function(i){
                    Promise.resolve(promises[i]).then(function(value){
                        countNum++;
                        resolvedvalue[i]=value;
                        if(countNum===promiseNum){
                            return resolve(resolvedvalue)
                        }
                    },function(reason){
                        return reject(reason)
                    })
            })(i)
        }
    })
}
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);
promiseAll([p1,p2,p3]).then(function(value){
    console.log(value)
})
