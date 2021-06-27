interface human{
  name: string,
  age: number,
  gender: string,
}
const person = {
  name: "Nahee",
  age: 22,
  gender: "female",
}


const sayHi = (person: human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
};

//gender가 선택적인 요소임을 명시해야만 실행됨. 만약 gender?이 아니라 gender이면 실행 안됨. 에러 띄움. 이것이 타입 스크립트의 커다란 장점
console.log(sayHi(person));

export {};