(() => {
  const cnt = function*(start, end) {
    for (let i = start; i <= end; i++) yield i;
  };

  const img = function*(g, f) {
    const imgs = [];

    for (const i of g) {
      yield _=> new Promise(res=> {
        const img = document.createElement('img');
        img.src = i + '.png';
        imgs.push(img);
        img.onload = _=>setTimeout(_=>(f(img), res(imgs)), 200);
      });
    }
  };

  const unwrapper = function*(g) {
    for (const f of g) yield f();
  };

  Promise
      .all(unwrapper(img(cnt(1, 5), console.log)))
      .then(v => {
        return v[0].reduce((p, el) => (p.appendChild(el), p),
            document.getElementById('stage1'))
      });

  let p = Promise.resolve();
  const f1 = el => document.getElementById('stage2').appendChild(el);
  for(const v of img(cnt(1, 5), f1)) p = p.then(v);

})();
