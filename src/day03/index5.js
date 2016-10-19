(() => {
  const lazy = (() => {
    const gene = function*(iter) {
      for (const v of iter) yield v;
    };
    const filter = function*(g, f) {
      for (const v of g) if (f(v)) yield v;
    };
    const map = function*(g, f) {
      for (const v of g) yield f(v);
    };
    const Lazy = class {
      constructor(iter) { this.seed = gene(iter); }
      [Symbol.iterator]() { return this.seed; }
      filter(f) {
        this.seed = filter(this.seed, f);
        return this;
      }
      map(f) {
        this.seed = map(this.seed, f);
        return this;
      }
    };
    return v => new Lazy(v);
  })();

  for (const v of lazy([1,2,3,4])) console.log(v);
  for (const v of lazy([1,2,3,4])
                    .filter(v => v % 2 === 0)) console.log(v);
  for (const v of lazy([1,2,3,4])
                    .filter(v => v % 2 === 0)
                    .map(v => v * 2) ) console.log(v);
})();
