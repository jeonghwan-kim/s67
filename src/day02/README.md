Day 2
=====

Excution Context

- Variable Environment: Value
- **Lexical Environment**: Reference
  - **Outer Lexical Environment**: Chaining algorithm
  - Generator
  - **Environment Record**: Variable, Code
    - Object: Variable
    - Decalrative: Reference
      - Glaobal Environment Record: var 있는지 키워드. 성능이슈, 함수 스콥, 블록 스콥
      - Function Environment Record
      - Module Environment Record

Arrow function에서

- this 가 없음.
- acuments 가 없음.
- 상기와 같은 초기화 작업이 없어서 성능이 좋음.

Object Method

```javascript
const obj = {
  foo() {
  }
}
```

결론

- 클래스를 만들때는 class 키워드를 사용하자.
- 객체 메소드를 만들자.
- 애로우 함수를 사용하자.
