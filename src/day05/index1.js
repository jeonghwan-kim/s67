const A = function(){}
A.prototype = {
  methodA(){},
  methodB(){}
}
const map = new WeakMap();
A.prototype = new Proxy(A.prototype, {
	get(target, key){
		if(!(key in target)) return ()=>{ console.log('not a method!'); }
		if(!map.has(target)) { map.set(target, {}); }
		if(!map.get(target)[key]) {
			map.get(target)[key] = (...arg) =>{
				console.log(key, arg);
				return target[key](...arg);
			}
		}
		return map.get(target)[key];
	}
});

const a = new A();
a.methodA(1,2,3,4);  // methodA [1, 2, 3, 4]
a.xxx();             // not a method!
