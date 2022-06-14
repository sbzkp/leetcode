// let root = {
//     value: "a",
//     left: {
//         value: "b",
//         left: {
//             value: "d"
//         },
//         right: {
//             value: "e",
//             left: {
//                 value: "g"
//             },
//             right: {
//                 value: "h",
//                 right: {
//                     value: "i"
//                 }
//             }
//         }
//     },
//     right: {
//         value: "c",
//         left: {
//             value: "f"
//         }
//     }
// }

let root = {
    value: "1",
    left: {
        value: "2",
        left: {
            value: "4"
        },
        right: {
            value: "5",
            left: {
                value: "7"
            },
            right: {
                value: "8",
               
            }
        }
    },
    right: {
        value: "3",
        right: {
            value: "6"
        }
    }
}

   
function middle( root ){
    let result = [];
    let back = [];
    if(!true){
        return null;
    }
    while( root ){
        back.push( root )
        root = root.left;
    }
    let node = back.pop();
    while( node ){
        result.push( node.value )
        let rootNode = node.right;
        if( rootNode ){
            back.push( rootNode )
            let leftNode = rootNode.left;
            while( leftNode ){
                back.push( leftNode )
                leftNode = leftNode.left;
            }
        }
        node = back.pop();
    }
    return result;
}
