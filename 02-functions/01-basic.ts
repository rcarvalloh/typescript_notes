/*

Function in TS are defined exactly as functions in JS, however the difference lies in the tools we now have to properly and statically define them 

*/

// we can define a return type
// same rules about inference and redundancy must be followed
function add(n1: number, n2: number): number {
  return n1 + n2;
}

// we can tell typescript that a function must not return anything
function voidReturnFunction(): void {
  console.log("myfunc");
}

// void doesn't exist in javascript, when it gets compiled if we try to print the value of the function it would be undefined.

// Function is also a type we can assign to a variable, allowing us to make sure  the right function is assigned to the variable.
let someExpressedFunction: Function;
someExpressedFunction = voidReturnFunction;

// however, the problem here is that any function can be stored in this variable (as Function is a generic type), sometimes we require to be very specific about the characteristics of the function we can store. For this we can use types and interfaces

// a type that defines a function blueprint that must accept no parameters and return nothing
type NonReturningFunction = () => void;

let aFunctionThatReturnsNothing: VoidFunction;

// will fail
aFunctionThatReturnsNothing = add;

// will work
aFunctionThatReturnsNothing = voidReturnFunction;

// here is another example, we can only store a function that takes 2 parameters and returns a value, the name of the variables don't matter, the types do
type ReturningNumberWithParamsFunc = (a: number, b: number) => number;

let twoValAndReturnFunc: // will fail
twoValAndReturnFunc = voidReturnFunction;

// will work
twoValAndReturnFunc = add;

// we can specify function types for callbacks as well
function myCallBackTest(a: number, b: number, cb: (a: number) => void) {
  cb(a + b);
}

// in this case we are telling typescript that myCallBackTest requires to receive a function that accept a number and returns nothing

// we can define function blueprints using interfaces and arrow functions

// in this case this is the same as the type NonReturningFunction
interface NonReturningFunctionInterface {
  (): void;
}

let anotherNonReturningFunction: NonReturningFunction;

// will fail
anotherNonReturningFunction = add;

// will work
anotherNonReturningFunction = voidReturnFunction;
