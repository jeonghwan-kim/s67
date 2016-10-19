
(() => {
  const is = (v, cls)=>{
    if(!(v instanceof cls)) throw 'invalid type';
  };

  const Composite = class{
    constructor(title){
      this.title = title;
      this.children = new Set();
    }
    add(child, type = is(child, Composite)) {
      this.children.add(child);
    }
    *operation(){
      yield this.title;
      for(const c of this.children) yield* c.operation(); // ? yield*
    }
    [Symbol.iterator](){
      return this.operation();
    }
  }

  let P = new Composite('parent');
  P.add(new Composite('child1'));
  P.add(new Composite('child2'));
  for(const title of P) console.log(title);
})()
