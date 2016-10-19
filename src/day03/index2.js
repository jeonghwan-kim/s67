
(() => {
  const elLoop = function*(el) {
    const stack = [];
    do{
      yield(el);
      if(el.firstElementChild) stack.push(el.firstElementChild);
      if(el.nextElementSibling) stack.push(el.nextElementSibling);
    } while(el = stack.pop());
  };

  const t = Date.now();
  for(const el of elLoop(document.getElementById('root'))) {
    if(el.tagName.toLowerCase() == 'article') {
      // 제너레이터로 루프 중간에 빠져나올수 있다.
      console.log(el);
      break;
    }
  }

  console.log(`time: ${Date.now() - t}`)
})();
