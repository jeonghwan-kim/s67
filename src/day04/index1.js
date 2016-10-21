(() => {
  const gene = function*(arr) {
    for (const v of arr) {
      yield p => new Promise(rev => {
        setTimeout(() => rev(p + v), 200);
      });
    }
  };

  let p = Promise.resolve(0);

  for (const v of gene([1,2,3,4])) p = p.then(v);

  p.then(v => {
    let p = document.createElement('p');
    p.innerHTML = v;
    document.getElementById('root').appendChild(p);
  })

})();
