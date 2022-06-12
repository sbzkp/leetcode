
var maxDepth = function () {
    var root = {
        value: 1,
        left: {
            value: 2,
            right: null,
            left: {
                value: 4,
                left: null,
                right: {
                    value: 6,
                    left: { value: 7 },
                    right: { value: 8 }
                }
            }
        },
        right: {
            left: null,
            value: 3,
            right: {
                value: 5,
                left: null,
                right: null
            }
        }
    }
    let leftNode = [];
    let result = [];
    
    leftNode.push(root)
    while (root) {
        if (root.left) {
            leftNode.push(root.left);
        }
        root = root.left;
    }
    while (leftNode.length) {
        root = leftNode.pop();
        let rightNode = root.right;
        if (rightNode) {
            leftNode.push(rightNode)
        }
        while (rightNode && rightNode.left) {
            rightNode = rightNode.left;
            leftNode.push(rightNode)
        }
        result.push(root.value)
    }
    return result;
};
maxDepth()
(8) [4, 7, 6, 8, 2, 1, 3, 5]

