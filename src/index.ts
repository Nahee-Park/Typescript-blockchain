class Human {
  public name: string;
  public age: number;
  public gender: string;
  // 생성자 -> 이 클래스가 시작될 때마다 호출됨 (클래스로부터 객체를 만들때마다 )
  constructor(name:string, age:number, gender?:string){
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const nahee = new Human("Nahee", 22, "femaile")


const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
};

//gender가 선택적인 요소임을 명시해야만 실행됨. 만약 gender?이 아니라 gender이면 실행 안됨. 에러 띄움. 이것이 타입 스크립트의 커다란 장점
console.log(sayHi(nahee));

export {};