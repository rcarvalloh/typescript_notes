/*

Typescript supports all basic type primitives that come from Javascript

number: represents any kind of number, be it an integer, a negative a float, etc.
string: all text values
boolean: true/false (even truthy and falsy values recognize only those 2)
symbol: special primitive defined in javascript 
null: no value
undefined: no value
bigint: numeric values too large to be represented using number

It also defines all non-primitives

array
object
enum

and define its own types that are enforced during compilation time and translated to javascript code

*/

/*

Types in Typescript are richer and more specific, core primitives (number, string, etc...) are all in lower case

*/

/*
 CREATING A VARIABLE OR CONSTANT AND ASSIGNING A TYPE
 
 We should only assign a type to a variable when it is not initialized, in other words, we should trust type inference most of the time

 */

// Good syntax
let numberOfTypes: number;

// Bad syntax due to redundancy (you can´t change variable types dynamically in typescript and the right type is infered from its initial value)
let numberOfTypesTwo: number = 10;

// This is the right approach
let numberOfTypesThree = 10;

/*

  Object Types

*/

// Good Syntax
const myObject = {};

// Bad Syntax because we are not telling typescript what the object has inside, we are only telling it that it is an object, we should have let type inference work here
const myObject2: object = { text: "my long text", aValue: 33 };

// Now trying to access any kind of parameter inside the object fails because it doesn't know that it exists
console.log(myObject2.text);

/*

  We can define the object's inner types directl when creating it 
  const person: {
      key1: string;
      key2: bool;
      key3: number;
  }

*/

// Now if we tell typescript what the object inner types will be, we can access them
const myObject3: {
  text: string;
  aValue: number;
} = {
  text: "some long text",
  aValue: 33,
};

// we can access the parameters without problem this time
console.log(myObject3.text);

/* object and {} behave the same if {} is empty

const myObject4: {} = {
    text: "some long text",
    aValue: 33,
}

Would also fail because we are not telling typescript about what is contained in the object nor are we letting it infere the details

*/

// We must remember that in order to define the object properly when not using type inference we must explicitly tell the types that each of its keys will have

/* 

 Array Types

*/

// We must let typescript infer or explicitly tell what kind of data will be stored in the array, again, we must follow the rules of redundancy and inferernce.

// would create an array that only allows to store strings
let myStringArray: string[] = [];

// would create an array that only allows to store numbers
let myNumberArray: number[] = [];

// would create an array allows to store any type
let myAnyArray: any[] = [];

// last one is considered a bad practice as this breaks the purpose of typescript
// type[] can also be written as Array<type>
let aNewArray: Array<number> = [];
aNewArray.push(100);

// fails due to wrong inner type
aNewArray.push("string");

// regular methods work just fine
for (let value of myAnyArray) {
  console.log(value);
}

// Would create an array where we can store objects
let myObjectArray: object[] = [];
myObjectArray.push({ key: 100 });

/*
  Tuple type

 tuples are only part of typescript, there is no concept of tuple in Javascript, tuples are arrays of fixed length and types

 */

// Tuples require to be explicitly defined
// [typeOfValue1, typeOfValue2]
let myFirstTuple: [number, string] = [100, "name"];

/* 

 ENUM

*/

// enum variables are by convention named with the first being a capital letter
// this is a basic enum where each entry is assigned a sequence number that starts with 0, for instance READ_ONLY equals to 1

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

let receivedRole = 1;

// we can access enum properties, the idea is to have a short description of the attribute when comparing
if (receivedRole === Role.ADMIN) {
  console.log("is admin");
}

//we can  create  an ENUM with specific values
enum MasterRoles {
  ADMIN = 100,
  READ_ONLY = "KFKNF9",
}

// we can override the starting number sequence for the enum
// now ADMIN = 100, READ_ONLY = 101 and AUTHOR = 102
enum NewRoles {
  ADMIN = 100,
  READ_ONLY,
  AUTHOR,
}
