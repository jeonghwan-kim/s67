(() => {
  const elLoop = (el, f) => {
    const stack = [];
    do {
      f(el);
      if(el.firstElementChild)  stack.push(el.firstElementChild);
      if(el.nextElementSibling) stack.push(el.nextElementSibling);
    } while(el = stack.pop())
  };

  const elLoopWithFilter = (el, run, filter) => {
    return elLoop(el, el => filter(el) && run(el));
  };

  const t = Date.now();
  elLoopWithFilter(
      document.getElementById('root'),
      el => console.log(el),
      el => el.tagName.toLowerCase() == 'article');
  console.log(`time: ${Date.now() - t}`);
})();
