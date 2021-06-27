const name = "Nahee",
  age = 22,
  gender = "female";

//파라미터의 타입과 함수 리턴 값의 타입을 지정 
const sayHi = (name:string , age:number, gender:string): void => {
  console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

//gender가 선택적인 요소임을 명시해야만 실행됨. 만약 gender?이 아니라 gender이면 실행 안됨. 에러 띄움. 이것이 타입 스크립트의 커다란 장점
sayHi(name, age, gender);

export {};