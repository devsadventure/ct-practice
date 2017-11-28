let arr = [1, 2, 3, 4, 5]

// ES6 코드
let arr2 = arr.map(x => x * 2)
console.log(arr2)

// ES5 코드
var a2 = arr.map(function(x) {
    return x * 2;
});
console.log(a2);

// 반복문으로 작성하는 코드
var a3 = [];
for (var i = 0; i < arr.length; i++){
    a3.push(arr[i] * 2);
}
console.log(a3);