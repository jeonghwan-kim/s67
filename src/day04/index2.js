(() => {
  const cnt = function*(start, end) {
    for (let i = start; i <= end; i++) yield i;
  };

  const g = function*(g, f, interval) {
    for(const i of g) {
      yield () => new Promise(rev => (f(i), setTimeout(rev, interval)));
    }
  };

  let p = Promise.resolve();
  const f1 = v => document.getElementById('counter').innerHTML = v;
  for(const v of g(cnt(0, 3), f1, 1000)) p = p.then(v);

  const el = document.getElementById('box');
  const f2 = v => el.style.marginTop = v + 'px';
  p = Promise.resolve();
  for(const v of g(cnt(0, 500), f2, 10)) p = p.then(v);
})();
