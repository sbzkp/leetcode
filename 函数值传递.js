怎么理解js中的函数是值传递的呢？

首先，如果是简单类型的话很好理解，要说的则是引用类型
 函数声明中的参数，可以理解为一个临时变量，如果参数是引用类型，那么该临时变量存储的则是该引用的地址，

typeof 虽然对原始值很有用，但它对引用值的用处不大。我们通常不关心一个值是不是对象， 而是想知道它是什么类型的对象。为了解决这个问题，ECMAScript 提供了 instanceof 操作符，语 法如下:
result = variable instanceof constructor


var name = "name";
var A = {
    name: "A",
    sayHello: function(){
        console.log(this)
        let s = ()=>{
            console.log(this.name);
        }
        return s;
    }
}

let sayHello = A.sayHello();
sayHello();
var B = {
    name: "B"
}
sayHello.call(B);




箭头函数的this，是和定义该箭头函数的时候，所在的环境有关系，和运行的时候没有关系
