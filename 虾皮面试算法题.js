const obj = {
    a: 1,
    b: {
        c: {
            d: [1, 2, 3],
            e: [{
                f: 1,
            }],
        },
    },
    g: 1,
};

function  getPath( obj, target, str, result ) {
    for (const key  of Object.keys( obj )) {
        if ( Array.isArray( obj[key] ) ) {
            getPath( obj[key], target, str+`.${key}`, result ) 
        } else if (typeof obj[key] == "object") {
            getPath( obj[key], target, str+`.${key}`, result ) 
            
        } else if ( obj[key] == target ) {
            result.push( str+`.${key}`)          
        }
    }
}
function test(obj, target) {
    let result = [];
    getPath( obj, target, str="<root>" , result)

    return result;
}




const curry = (obj, target) => {
    let res = [];
    const getTarget = (temp, str) => {
      for (let index of Object.keys(temp)) {
        if (typeof temp[index] === 'object' && !Array.isArray(temp[index])) {
          getTarget(temp[index], str + '.' + index);
        }
        if (Array.isArray(temp[index])) {
          temp[index].forEach((item, i) => {
            if (typeof item === 'object') {
              getTarget(item, str + '.' + index + '[' + i + ']');
            } else if (item === 1) {
              res.push(str + '.' + index + '[' + i + ']');
            }
          });
        } else if (temp[index] === 1) {
          res.push(str + '.' + index);
        }
      }
    };
    getTarget(obj, 'root');
    return res;
  };