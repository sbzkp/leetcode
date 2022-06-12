​
需要反复看的

ECMAScript 6 专门为合并对象提供了 Object.assign()方法。这个方法接收一个目标对象和一个 1 或多个源对象作为参数，然后将每个源对象中可枚举(Object.propertyIsEnumerable()返回 true) 和自有(Object.hasOwnProperty()返回 true)属性复制到目标对象。以字符串和符号为键的属性 会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标 对象上的[[Set]]设置属性的值。

let dest, src, result;
/**
* 简单复制 */
2
3
 dest = {};
src = { id: 'src' }; 4
result = Object.assign(dest, src);
// Object.assign 修改目标对象
// 也会返回修改后的目标对象 console.log(dest === result); // true
5 6 7 8 9 10
 console.log(dest !== src);
console.log(result);
console.log(dest);
/**
* 多个源对象 */
// true
// { id: src }
// { id: src }
  dest = {};
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
console.log(result); // { a: foo, b: bar }
/**
* 获取函数与设置函数 */
dest = {
  set a(val) {
    console.log(`Invoked dest setter with param ${val}`);
  }
    };
src = { 11
  get a() {
    console.log('Invoked src getter');
    return 'foo';
} };
Object.assign(dest, src);
// 调用 src 的获取方法
// 调用 dest 的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来 console.log(dest); // { set a(val) {...} }

 Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使 用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目 标对象。换句话说，不能在两个对象间转移获取函数和设置函数。

如果赋值期间出错，则操作会中止并退出，同时抛出错误。Object.assign()没有“回滚”之前 赋值的概念，因此它是一个尽力而为、可能只会完成部分复制的方法。

let dest, src, result;
/*** 错误处理 */
    dest = {};
    src = {
        a: 'foo',
        get b() {
            // Object.assign()在调用这个获取函数时会抛出错误
            throw new Error();
        },
        c: 'bar' 
    };
    try {
        Object.assign(dest, src);
    } catch(e) {

    }
// Object.assign()没办法回滚已经完成的修改
// 因此在抛出错误之前，目标对象上已经完成的修改会继续存在:
    console.log(dest); 
    // { a: foo }

在 ECMAScript 6 之前，有些特殊情况即使是===操作符也无能为力:

// 这些是===符合预期的情况 console.log(true === 1); // false console.log({} === {}); // false console.log("2" === 2); // false
// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等

   console.log(+0 === -0);
console.log(+0 === 0);
console.log(-0 === 0);
// true
// true
// true
 // 要确定NaN的相等性，必须使用极为讨厌的isNaN() console.log(NaN === NaN); // false console.log(isNaN(NaN)); // true

// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等

console.log(+0 === -0);
console.log(+0 === 0);
console.log(-0 === 0);
// true
// true
// true

// 要确定NaN的相等性，必须使用极为讨厌的isNaN()

console.log(NaN === NaN); // false 
console.log(isNaN(NaN)); // true

为改善这类情况，ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但同时也考虑 到了上述边界情形。这个方法必须接收两个参数:

 console.log(Object.is(true, 1));  // false
 console.log(Object.is({}, {}));   // false
console.log(Object.is("2", 2));    // false
// 正确的 0、-0、+0 相等/不等判定  
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0));  //true
console.log(Object.is(-0, 0));  // false

 // 正确的 NaN 相等判定 
console.log(Object.is(NaN, NaN)); // true


对象字面量创建对象
创建自定义对象的通常方式是创建 Object 的一个新实例，然后再给它添加属性和方法，如下例 所示:

let person = new Object();
person.name = "Nicholas";
person.age = 29; 
person.job = "Software Engineer";

person.sayName = function() {
    console.log(this.name); 
};

这个例子创建了一个名为 person 的对象，而且有三个属性(name、age 和 job)和一个方法 (sayName())。
sayName()方法会显示 this.name 的值，这个属性会解析为 person.name。早期 JavaScript 开发者频繁使用这种方式创建新对象。
几年后，对象字面量变成了更流行的方式。前面的例子如果使用对象字面量则可以这样写:

let person = {
    name: "Nicholas", 12 age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name); }
    };
}

使用new操作符的时候，生成对象的四个步骤
(1) 在内存中创建一个新对象。
(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
(3) 构造函数内部的 this 被赋值为这个新对象(即 this 指向新对象)。
(4) 执行构造函数内部的代码(给新对象添加属性)。
(5) 如果构造函数返回非空对象，则返回该对象;否则，返回刚创建的新对象。

构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，其定义的方法会在每个实例上 都创建一遍。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方 法不是同一个 Function 实例。
我们知道，ECMAScript 中的函数是对象，因此每次定义函数时，都会 初始化一个对象。逻辑上讲，这个构造函数实际上是这样的:

function Person(name, age, job){ 
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("console.log(this.name)"); // 逻辑等价 
}

这样理解这个构造函数可以更清楚地知道，每个 Person 实例都会有自己的 Function 实例用于显 示 name 属性。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。但创建新 Function 实例的机制是一样的。因此不同实例上的函数虽然同名却不相等，如下所示:

console.log(person1.sayName == person2.sayName); // false

console.log(Person.prototype.isPrototypeOf(person1)); // true console.log(Person.prototype.isPrototypeOf(person2)); // true

这里通过原型对象调用 isPrototypeOf()方法检查了 person1 和 person2。因为这两个例子内 部都有链接指向 Person.prototype，所以结果都返回 true。

ECMAScript 的 Object 类型有一个方法叫 Object.getPrototypeOf()，返回参数的内部特性 [[Prototype]]的值。例如:

console.log(Object.getPrototypeOf(person1) == Person.prototype); // true console.log(Object.getPrototypeOf(person1).name); // "Nicholas"

为避免使用 Object.setPrototypeOf()可能造成的性能下降，可以通过 Object.create()来创 建一个新对象，同时为其指定原型:

    let biped = {
      numLegs: 2
    };
    let person = Object.create(biped);
    person.name = 'Matt';
console.log(person.name);
console.log(person.numLegs); console.log(Object.getPrototypeOf(person) === biped); // true

hasOwnProperty()方法用于确定某个属性是在实例上还是在原型对象上。这个方法是继承自 Object 的，会在属性存在于调用它的对象实例上时返回 true

Object.getOwnPropertyDescriptor()方法只对实例属性有 效。要取得原型属性的描述符，就必须直接在原型对象上调用 Object.getOwnProperty- Descriptor()。

3. 原型和 in 操作符

有两种方式使用 in 操作符:单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在可 以通过对象访问指定属性时返回 true，无论该属性是在实例上还是在原型上。 Page 231

Page231 在上面整个例子中，name 随时可以通过实例或通过原型访问到。因此，调用"name" in persoon1 时始终返回 true，无论这个属性是否在实例上。如果要确定某个属性是否存在于原型上，则可以像下 面这样同时使用 hasOwnProperty()和 in 操作符:

    function hasPrototypeProperty(object, name){
      return !object.hasOwnProperty(name) && (name in object);
}

要获得对象上所有可枚举的实例属性，可以使用 Object.keys()方法。这个方法接收一个对象作 为参数，返回包含该对象所有可枚举属性名称的字符串数组 ，只能返回该对象上的属性，跟原型对象没有关系

    function Person() {}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
    let keys = Object.keys(Person.prototype);
    console.log(keys);   // "name,age,job,sayName"
    let p1 = new Person();
    p1.name = "Rob";
    p1.age = 31;
    let p1keys = Object.keys(p1);
    console.log(p1keys); // "[name,age]"

如果想列出所有实例属性，无论是否可以枚举，都可以使用 Object.getOwnPropertyNames():

let keys = Object.getOwnPropertyNames(Person.prototype);

console.log(keys); // "[constructor,name,age,job,sayName]"

注意，返回的结果中包含了一个不可枚举的属性 constructor。Object.keys()和 Object. getOwnPropertyNames()在适当的时候都可用来代替 for-in 循环。

遍历对象会用到的方法

for-in 循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnProperty- 3

Symbols()以及 Object.assign()在属性枚举顺序方面有很大区别。for-in 循环和 Object.keys() 的枚举顺序是不确定的，取决于 JavaScript 引擎，可能因浏览器而异。

Page253  es7  Object.values()和 Object.entries()接收一个对象，返回它们内容的数组。Object.values() 返回对象值的数组，Object.entries()返回键/值对的数组

const o = {
  foo: 'bar', 13 baz: 1,
  qux: {}
}; 
console.log(Object.values(o));

// ["bar", 1, {}]
console.log(Object.entries((o)));
// [["foo", "bar"], ["baz", 1], ["qux", {}]]

注意，非字符串属性会被转换为字符串输出。另外，这两个方法执行对象的浅复制:
const o = {
      qux: {}
};
    console.log(Object.values(o)[0] === o.qux);
    // true
    console.log(Object.entries(o)[0][1] === o.qux);
    // true
    符号属性会被忽略:
    const sym = Symbol();
    const o = {
      [sym]: 'foo'
    };
    console.log(Object.values(o));
    // []
    console.log(Object.entries((o)));
    // []

Page 234

Page 237 原型的问题

知识点

8.4 继承


面试要看
https://juejin.cn/post/6946022649768181774#heading-44
1, 工厂模式
    code

    缺点

    工厂模式无法解决对象的识别问题： 不知道对象是什么类型的。
    使用工厂函数创建的对象，只有开发者是知道它的类型的（通过工厂函数变量名），但是程序仍然认为它是一个普通的对象。
    每个对象都是通过工厂造就的全新的对象。
2, 构造函数模式
      构造函数是用来创建特定的类型的对象的。比如Js原生提供的Object， Array。都是构造函数模式创建的原生构造函数。

定义自定义构造函数可以确保实例被标识为特定类型，相比于工厂模式，这是一个很大的好处。在 这个例子中，person1 和 person2 之所以也被认为是 Object 的实例,
是因为所有自定义对象都继承 自 Object(后面再详细讨论这一点)。

function Person(name, age, job){ 
    console.log(this)
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() { 
        console.log(this.name);
    };
}


3，原型模式

二；理解原型

在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自 Object。




变量提升
  所有末定义直接赋值的变量自动声明为拥有全局作用域；
  function func() { a = 1; var b = 2;
}
func();
console.log(a); // 1
console.log(b); // b is not defined


let 的「创建」过程被提升了，但是初始化没有提升。
var 的「创建」和「初始化」都被提升了。
function 的「创建」「初始化」和「赋值」都被提升了。
最后看 const，其实 const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。

所谓暂时死区，就是不能在初始化之前，使用变量。



webpack
//   webpack默认只能对js进行处理，我们写的css 文件，webpack是会报错的， 因此需要使用loader来进行编译，

//   对于css来说， style-loader（用来将样式写到style里面），有css-loader（用来处理css模块之间的依赖关系），，
//   由于我们写css的时候，会用到css3的属性，不一定所有的浏览器都兼容，因此可以借助webpack来进行，可以使用postcss-loader，
//   这个loader需要借助autoprefixer插件, 另外需要在packahe.json 里面进行 browserslist(我们这个项目针对的浏览器进行设置)
//   css预处理器，也就是less，scss，scss-loader

//   处理图片
//   file-loader 用来处理把图片当作模块来处理
//   url-loader  用来设置，图片小于过某个大小的，转换为base64， 如果大图也用base64的话，由于js是单线程的，就要等大图的base64渲染完，才可以干其他事，会影响首页渲染 

