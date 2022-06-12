// https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript
/*
	https://github.com/Advanced-Frontend/Daily-Interview-Question
	第 160 题：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法
	// 我的答案在最下面

	const list = [1, 2, 3]
	const square = num => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(num * num)
			}, 1000)
		})
	}

	function test() {
		list.forEach(async x=> {
			const res = await square(x)
			console.log(res)
		})
	}
	test()

*/


async function test() {
	new Promise(( resolve, reject )=>{
		setTimeout(()=>{
			resolve()
		}, 1000)
	})

	for (let i = 0; i < list.length; i++) {
		const res = await square(x)
		console.log(res)
	}
}


// xxxxxxxxx
let ratings = [5, 4, 5];
let sum = 0;
let sumFunction = async function (a, b) {
	return a + b;
}

ratings.map(async function (rating) {
	sum = await sumFunction(sum, rating);
})

console.log(sum);
// Expected output: 14
// Actual output: 0


// xxxxxxxx
function test() {
	var nums = [1, 2, 3, 4]
	for (let index = 0; index < nums.length; index++) {
		(async x => {
			var res = await setTimeout(() => {
				return new Promise((resolve, reject) => {
					console.log(new Date(), nums[index])
					resolve()
				})
			}, 3000)
			console.log(new Date(), res)
		})(nums[index])
	}
}

// xxxxxxxx
// 先执行Promise，然后就可以实现await的并行处理
function resolveAfter2Seconds(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log("setTimeout", new Date());
			resolve(x);
		}, 2000);
	});
}

async function f1() {
	console.log(new Date());
	var a = resolveAfter2Seconds(10);
	var b = resolveAfter2Seconds(10);
	console.log("test")
	console.log(a);
	console.log(b);
	console.log("test")

	await a;
	await b;
	console.log("f1");
	console.log(new Date());
}
f1();


function f1() {
	console.log(new Date());
	var a = resolveAfter2Seconds(10);
	var b = resolveAfter2Seconds(10);
	// console.log(a);
	// console.log(b);
	console.log("f1");
	console.log(new Date());
}
f1();

// xxxxxxxxxxxxxxx

var test = function (index) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
			console.log(new Date(), index)
		}, 1000)
	})
}
// 这个forEach 方法是自己写的，在for循环外面写async的目的是为了能将循环里的await全部放到async里面，这样的话，await就可以实现串行的了，
// 如果想实现并行的话，请看forEach2的方法
var forEach = function (callback) {
	(async () => {
		console.log("////////////")
		for (let index = 0; index < 3; index++) {
			await test(index)
		}
	})()
}
//  实现await 的并行, 因为这样 的情况下，每次循环的时候，async的函数都会执行，下一次循环的async 和上一次的async是并列的两个函数，
// 每一个await 都是在自己的async里面，而不是在一个大的async里面
var forEach2 = function (callback) {
	console.log("////////////")
	for (let index = 0; index < 3; index++) {
		(async () => {
			await test(index);
		})()
	}
}

// xxxxxxxx
// 这就是我关于160 题的答案
const list = [1, 2, 3]
const square = num => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(num * num)
		}, 1000)
	})
}

function test() {
	(async()=>{
		for (let index = 0; index < 3; index++) {
			const res = await square(index)
			console.log(new Date(), res)
		}
	})()
}
test()












