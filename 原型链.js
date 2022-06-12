class A {}
class B extends A {}

const a = new A()
const b = new B()

console.log( a.__proto__ )
console.log( b.__proto__ )
console.log( B.__proto__ )
console.log( B.prototype.__proto__ )
console.log( b.__proto__.proto__ )




function Student(name = "") {
  this.name = name;
  this.getName = function(){

  }
}


Promise.resolve().then(()=>{
    console.log(0)
    return Promise.resolve(4)
}).then((res)=>{
    console.log(res)
})

Promise.resolve().then(()=>{
    console.log(1)
}).then(()=>{
    console.log(2)
}).then(()=>{
    console.log(3)
}).then(()=>{
    console.log(5)
}).then(()=>{
    console.log(6)
})
