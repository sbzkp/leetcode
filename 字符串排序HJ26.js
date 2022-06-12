function getTest(){
    let map = new Map();
    let str  = "A Famous Saying: Much Ado About Nothing (2012/8).";
    let result=[];
    let arr = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", 
        "U", "V", "W", "X", "Y", "Z",
    ]
    let getMaxIndex = ( arr, target)=>{
        let returnIndex = 0;
        arr.map( (item, index)=>{
            if( item == target.toUpperCase() || item == target.toLowerCase()) {
                returnIndex = Math.max( index,  returnIndex)
            }
        })
        return returnIndex
    }
    debugger
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        const recordIndex = arr.indexOf( element.toUpperCase());
        if (recordIndex == -1) {
            map.set( index, element)
        } else if ( result[recordIndex] ) {
            let maxIndex = getMaxIndex( result,  element)
            if ( maxIndex >= 0  ) {
                result.splice( maxIndex+1, 0, element )
            }
        } else {
            result[recordIndex] = element;
        }
    }
    result = result.filter( item=>{
        return item
    })
 
    map.forEach(function (value, key, map) {
        result.splice(key, 0, value )
    })
    
    return result.join("")
}

