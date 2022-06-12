// https://github.com/mqyqingfeng/Blog/issues/12
let obj = {
    name: "zs"
}
let name = "window"

let getName = function( params){
    console.log( this.name)
    console.log( params )
}

let bindFunction = getName.myBindFcuntion( obj, {test: "out"} )

bindFunction( { name: "zs", age: [1,2,34] } )

let test  = new bindFunction();

Function.prototype.myBindFcuntion = function(   ){
    let args = [].slice.call(arguments);
    const context = args.shift();
    const bindFunction = this;
    let bindFunctionPrototype = bindFunction.prototype;
    let returnFcuntion =  function(){
        console.log(  [...args, ...arguments] )
        return bindFunction.apply( context, [...args, ...arguments] )
    }
    returnFcuntion.prototype = bindFunctionPrototype;
}

// test.__proto__ = bindFunction.prototype