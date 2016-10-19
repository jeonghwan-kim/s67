(() => {
  const each = function*(arr) {
    console.log('each start');
    for (const v of arr.slice(0)) {
      console.log('each:', v);
      yield v;
    }
  };
  for(const v of each([1,2,3,4])) console.log(v);

  const filter = function*(e, f) {
    console.log('filter start');
    for (const v of e) {
      if (f(v)) {
        console.log('filter:', v);
        yield v;
      }
    }
  };
  for (const v of filter(each([1,2,3,4]), v=> v%2 === 0)) console.log(v);

  const map = function*(e, f) {
    console.log('map start');
    for (const v of e) {
      console.log('map:', v);
      yield f(v);
    }
  };

  for (const v of map(filter(each([1,2,3,4]), v => v%2 === 0), v => v*2)) {
    console.log(v);
  }
})();
