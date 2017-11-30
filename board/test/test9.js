// 일반적인 JS 객체

var person = new Object();
person.name = "홍길동";
person.age = 25;

console.log(person);

// JSON 객체

var person2 = {
    name: '홍길동', //key: value;
    age: 25
};
console.log(person2);

// value 는 배열이 될 수도 있다.
// string, number, object, array, true/false 등으로 표현이 가능.
// 