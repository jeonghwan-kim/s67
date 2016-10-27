const instance = (cls, arg)=>Object.assign({__proto__:cls}, arg || {});
const chainof = (cls, target)=>{
	while(target = target.__proto__) if(target === cls) return true;
	return false;
}
const vali = (...arg)=>{
	for(let i = 0, j = arg.length; i < j; i += 2){
		if(typeof arg[i + 1] == 'function'){
			if(!arg[i + 1](arg[i])) throw new Error('invalid type at ' + (i / 2));
		}else if(!chainof(arg[i + 1], arg[i])){
			throw new Error('invalid instance at ' + (i / 2));
		}
	}
};
const num =v=>typeof v == 'number';
const str =v=>typeof v == 'string';
const bool =v=>typeof v == 'boolean';
const arr = Array.isArray;
const dom =v=>v.nodeType == 1 && v.tagName;

const Display = {
	get position(){
		return [this.x || 0, this.y || 0];
	},
	set position(v){
		vali(v, arr, v[0], num, v[1], num);
		this.x = v[0] || 0, this.y = v[1] || 0;
	},
	get area(){
		return [this.w || 0, this.h || 0];
	},
	set area(v){
		vali(v, arr, v[0], num, v[1], num);
		this.w = v[0] || 0, this.h = v[1] || 0;
	},
	get rotate(){
		return this.angle;
	},
	set rotate(v){
		this.angle = v;
	},
	move(x, y, _ = vali(x, num, y, num)){
		this.x = x, this.y = y;
	},
	renderDOM(el, x = 0, y = 0, _ = vali(el, dom, x, num, y, num)){
		el.appendChild(this.el || (this.el = document.createElement('div'))); // TODO:
		this.el.style.cssText = `position:absolute;left:${this.x + x}px;top:${this.y + y}px;width:${this.w}px;height:${this.h}px;background:${this.background}`;
	},
	get super(){
		return this.__proto__.__proto__;
	}
};
const Group = {
	__proto__:Display,
	addChild(child, _ = vali(child, Display)){
		const children = this.children || (this.children = new Set());
		children.add(child);
		return child;
	},
	removeChild(child, _= vali(child, Display)){
		if(this.children) this.children.delete(child);
	},
	renderDOM(el, x = 0, y = 0, _ = vali(el, dom, x, num, y, num)){
		this.super.renderDOM.call(this, el, x, y);
		if(this.children) this.children.forEach(child=>child.renderDOM(this.el, this.x, this.y));
	}
};
const Bitmap = {
	__proto__:Display,
	renderDOM(el, x = 0, y = 0, _ = vali(el, dom, x, num, y, num)){
		if(!this.el){
			this.el = document.createElement('img');
			this.el.onload =_=>{
				this.w = this.el.width;
				this.h = this.el.height;
			};
			this.el.src = this.src;
		}
		this.super.renderDOM.call(this, el, x, y);
		Object.assign(this.el.style, {
			left:`${this.x - this.w}px`,
			top:`${this.y - this.h}px`
		});
	}
};
const Circle = {
	__proto__:Display,
	get area(){
		return this.r * this.r * Math.PI;
	},
	set area(v){
	},
	get radius(){
		return this.r;
	},
	set radius(v){
		vali(num, v)
		this.r = v;
	},
	renderDOM(el, x = 0, y = 0, _ = vali(el, dom, x, num, y, num)){
		this.super.renderDOM.call(this, el, x, y);
		Object.assign(this.el.style, {
			left:`${this.x - this.radius}px`,
			top:`${this.y - this.radius}px`,
			width:`${this.r * 2}px`,
			height:`${this.r * 2}px`,
			borderRadius:'50%'
		});
	}
};
const ROOT = instance(Group, {x:0, y:0, w:window.innerWidth, h:window.innerHeight, background:'#aaa'});
const group = instance(Group, {x:100, y:100, w:500, h:500, background:'#ff0'});

const circle = instance(Circle, {x:0, y:0, r:10, background:'#f00'});
const bitmap = instance(Bitmap, {x:0, y:0, src:'1.png'});
ROOT.addChild(group);
group.addChild(circle);
group.addChild(bitmap);

let angle = 0, r = 10, rv = 1;
const loop =_=>{
	angle++;
	if(rv > 0){
		if(r > 30) rv *= -1;
	}else{
		if(r < 10) rv *= -1;
	}
	r += rv;
	circle.position = [250 + Math.cos(angle * Math.PI / 180) * 200, 250 + Math.sin(angle * Math.PI / 180)* 200];
	circle.r = r;
	bitmap.position = [250 + Math.cos((angle + 180) * Math.PI / 180) * 200,
		250 + Math.sin((angle + 180) * Math.PI / 180)* 200];
	bitmap.area = [90 * r / 30, 136  * r/ 30];
	bitmap.rotate = angle;
	ROOT.renderDOM(document.body);
	requestAnimationFrame(loop);
};
loop();
