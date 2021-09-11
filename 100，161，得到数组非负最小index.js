//用最精炼的代码实现数组非零非负最小值 index
// 例如：[10,21,0,-7,35,7,9,23,18] 输出 5, 7 最小

let arr = [10,21,0,-7,35,12,9,23,18]

function getIndex(arr){
    let index=null;
    let min = void 0;
    arr.map((item, arrIndex)=>{

    })
    return index;
}


function getIndex(arr){
    let index = null;
    arr.reduce((min, currentValue, arrIndex)=>{
        if( min == null ) {
            min = currentValue;
            index = arrIndex;
        }
        if( currentValue > 0  && currentValue < min  ){
            min = currentValue;
            index = arrIndex;
        }
        // 这里一定要返回累加器，否则，累加器的值第一次是null，后面由于函数没有明显的返回值，
        //所以会默认返回undefined，因此，min的值后面都是undefined
        return min 
    }, null)
    return index;
}


// ihost 配置
// ##
// # Host Database
// #
// # localhost is used to configure the loopback interface
// # when the system is booting.  Do not change this entry.
// ## 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
// 127.0.0.1	localhost
// 255.255.255.255	broadcasthost
// ::1             localhost
// 185.199.108.133 raw.githubusercontent.com
// #13.250.177.223 github.com
// 140.82.113.3 github.com 
// 199.232.69.194 github.global.ssl.fastly.net
// 185.199.108.153 assets-cdn.github.com
// 185.199.109.153 assets-cdn.github.com
// 185.199.110.153 assets-cdn.github.com
// 185.199.111.153 assets-cdn.github.com



