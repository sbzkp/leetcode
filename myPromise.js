// https://juejin.cn/post/6850037281206566919
// promise.reject()的参数如果是
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


// let promise = new myPromise(( resolve, reject )=>{
// 	setTimeout(()=>{
// 		resolve("666")
// 	}, 2000)
// })
// promise.then(( data )=>{
// 	console.log( data)
// })



// 这个例子用来解释为啥onRejected返回一个非对象的普通值的话，就直接resolve 
let promise = new Promise(( resolve, reject )=>{
	reject("  error ")
}).then(()=>{}, ( err )=>{
	return "晚风做酒"
}).then(( data )=>{
	console.log( "sucess " + data)
},( err  )=>{
	console.log( " error " + err)
})

// Promise.reject() 并不会对参数进行解构，直接将参数返回，因此，在onreject那里，不需要对返回值进行迭代
// Promise.reject( Promise.reject(" error") ) 的返回值是一个拒绝的promise，拒绝的值是一个Promise
// Promise.resolve( Promise.resolve(" success") ) 的返回值是一个解决的promise，解决的值是success

// let promise = new Promise(( resolve, reject )=>{
// 	reject("error") 
// }).then(()=>{}, ()=>{
// 	return Promise.reject("err" )
// }).then(( data )=>{
// 	console.log(data)
// }, (error)=>{ 
// 	console.log("error " + error)
// })



// class myPromise{
// 	constructor( executor ){
// 		this.status = "PENDING";
// 		this.reason = undefined;
// 		this.resolvedValue = undefined;
// 		this.successCallback = [];
// 		this.errorCallback = [];
// 		let resolved = ( resolvedValue  )=>{
// 			if ( this.status == "PENDING") {
// 				this.status == "FULFILLED"
// 				this.resolvedValue = resolvedValue;
// 				console.log( this.successCallback )
// 				for (let index = 0; index < this.successCallback.length; index++) {
// 					const callBack = this.successCallback[index];
// 					callBack( resolvedValue )
// 				}
// 			}
// 		}
// 		let reject = ( reason )=>{
// 			if ( this.status == "PENDING") {
// 				this.status == "REJECTED"
// 				this.reason = reason;
// 				for (let index = 0; index < this.errorCallback.length; index++) {
// 					const callBack = this.errorCallback[index];
// 					callBack( reason )
// 				}
// 			}
// 		}
// 		executor( resolved, reject )
// 	}
// 	resolvePromise = function( x, resolve, reject) {
// 		let then = x.then;
// 		if ( typeof x == "object" ) {
// 			// 如果x是一个普通值，直接用promise.resolve()，如果x是thenable的，就等到当前then解析完
// 			if ( typeof then == "function" ) {
// 				then( ( data)=>{
// 					resolvePromise(data, resolve, reject)
// 				}, ( reason)=>{
// 					resolvePromise(reason, resolve, reject)
// 				} )
// 			}
// 		} else {
// 			if (  this.status == "FULFILLED") {
// 				resolve( x )
// 			}
// 			if (  this.status == "REJECTED") {
// 				reject( x )
// 			}
// 		}
// 	}
// 	then( onResolve, onRejected ){
// 		onResolve = typeof onResolve == "function" ? onResolve : ( v)=>{return v}
// 		onRejected = typeof onRejected == "function" ? onRejected : ( v)=>{ return v}
// 		return new Promise(( resolve, reject )=>{
// 			try {
// 				if ( this.status == "FULFILLED" ) {
// 					let x = onResolve( this.resolvedValue )
// 					resolvePromise(x, resolve,  reject)
// 				}
// 				if ( this.status == "REJECTED" ) {
// 					let x = onRejected( this.reason )
// 					resolvePromise(x, resolve,  reject)
// 				}
// 			} catch (error) {
// 				onRejected(error)
// 			}
// 		})
// 		// if ( this.status == "PENDING" ) {
// 		// 	this.successCallback.push( onResolve  );
// 		// 	this.errorCallback.push( onRejected  );
// 		// }
// 		// if ( this.status == "REJECTED" ) {
// 		// 	this.errorCallback.push( onRejected  );
// 		// }
// 		// if ( this.status == "FULFILLED" ) {
// 		// 	this.errorCallback.push( onRejected  );
// 		// }
		
// 	}
// }



// let test = new Promise(( resolve, reject )=>{ 
// 	setTimeout(()=>{
// 		resolve(" 66666 ")
// 	}, 1000)
// }).then(( data )=>{
// 	console.log( " 王剑峰和 张克苹 百年好合" + data)
// })



// let promise = new Promise( ( resolve, reject )=>{
// 	resolve("6666")
// }).then(( data )=>{ 
// 	console.log(data) 
// 	return "王剑峰爱张克苹"
// }).then(( data )=>{
// 	console.log(data) 
// }).then(( data )=>{
// 	console.log(data) 
// })


class myPromise{
	constructor( executor ){
		this.status = "PENDING";
		this.reason = "";
		this.data = "";
		this.successCallBack=[];
		this.errorCallback=[];
		let resolve = ( data )=>{
			this.data = data;
			this.status = "FULFILLED"
			for (let index = 0; index < this.successCallBack.length; index++) {
				const callBack = this.successCallBack[index];
				callBack( data )
			}
		}
		let reject = ( reason )=>{
			this.reason = reason;
			this.status = "REJECTED"
			for (let index = 0; index < this.successCallBack.length; index++) {
				const callBack = this.successCallBack[index];
				callBack( reason )
			}
		}
		executor( resolve, reject )
	}

	resolvePromise = ( x, resolve, reject, p2 )=>{
		if ( typeof x == "object") {
			let then = x.then;
			if ( typeof  then == "function") {
				then(( successData )=>{
					resolvePromise( successData, resolve, reject, p2 )
				}, ( reason )=>{
					resolvePromise( reason, resolve, reject, p2 )
				} )
			}
		} else {
			resolve( x )
		}
	}

	// then 返回的是promise，如果没有显式的返回值
	then( onResolve, onRejected ){
		if ( this.status == "PENDING" ) {
			this.successCallback.push( onResolve  );
			this.errorCallback.push( onRejected  );
		}
		if ( this.status == "REJECTED" ) {
			this.errorCallback.push( onRejected  );
		}
		if ( this.status == "FULFILLED" ) {
			this.errorCallback.push( onRejected  );
		}
		this.successCallBack.push( onResolve ) 
		let p2 =  new Promise( (resolve, reject)=>{
			let x;
			if (this.status == "REJECTED") {
				x = onResolve( this.data )
			}
			if ( this.status == "FULFILLED") {
				x = onRejected( this.reason )
			}
			resolvePromise(x, resolve, reject, p2)
		} )
		return p2;
	}
	catch( errorCallback ){
		this.errorCallback.push( errorCallback ) 
	}
}







