// https://github.com/mqyqingfeng/Blog/issues/12
let obj = {
    name: "zs"
}
let name = "window"

let getName = function( params){
    this.age = 18; 
    this.address = "sh"
}

let bindFunction = getName.myBindFcuntion( obj, {test: "out"} )

bindFunction( { name: "zs", age: [1,2,34] } )

// // 第四版
// Function.prototype.myBindFcuntion = function (context) {

//     var self = this;
//     var args = Array.prototype.slice.call(arguments, 1);

//     var fNOP = function () {};

//     var fBound = function () {
//         var bindArgs = Array.prototype.slice.call(arguments);
//         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
//     }

//     fNOP.prototype = this.prototype;
//     fBound.prototype = new fNOP();
//     return fBound;
// }


// let test  = new bindFunction();

// Function.prototype.myBindFcuntion = function(   ){
//     let args = [].slice.call(arguments);
//     const context = args.shift();
//     const bindFunction = this;
//     let bindFunctionPrototype = bindFunction.prototype;
//     let returnFcuntion =  function(){
//         console.log(  [...args, ...arguments] )
//         return bindFunction.apply( context, [...args, ...arguments] )
//     }
//     returnFcuntion.prototype = bindFunctionPrototype;
// }

// test.__proto__ = bindFunction.prototype