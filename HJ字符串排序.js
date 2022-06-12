// {
//     if( nums.length == 1){
//         return 1;
//     }
//     var dp = [nums[0]]
//     for( let i = 1; i < nums.length; i++ ){
//         let dpMaxIndex = dp.length - 1;
//         if( nums[ i] > dp[dpMaxIndex]   ){
//             dp.push( nums[i])
//         } else {
//             let left = 0;
//             let right = dpMaxIndex;
//             let pos= 0;
//             while( left <= right  ){
//                 let middle = ((right - left) >>1) + left;
//                 if ( dp[middle] >= nums[i] ) {
//                     // 有可能是这个位置
//                     right = middle - 1;
//                     pos = middle;
//                 } else {
//                     left = middle+1;
//                 }
//             }
//             dp[pos] = nums[i]
            
//         }
//     }
//     return dp.length;
// }

// 第一个大于等于的
function firstNum(){
    let arr = [2,5, 6, 8, 9];
    let target = 4;
    let left = 0;
    let pos = arr.length; 
    let right = arr.length-1;
    while( left <= right ){
        debugger
        let middle = (( right- left ) >> 1) + left;
        if ( arr[middle] >= target) {
            right = middle-1
            pos = middle;
        }else {
            left = middle+1;
        }
    }
    console.log( pos )
    return left
}