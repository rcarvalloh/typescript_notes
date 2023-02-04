/*

Casting is the action of forcing TS to treat a type as a different one

Two ways to use casting:

 <typeToCast>element
 element as typeToCast

*/

// let's see this in action with a function

function returnReceivedVal(val: string | number) {
  return val;
}

let someVal = returnReceivedVal("some long string");

// if we tried to cast .length on someval would fail because TS only knows this can either be a string or a number but is not sure about what it really is
console.log(someVal.length);

// however we can type cast it, which is basically saying "treat this a this type"
console.log((someVal as string).length);

// this is one use case for casting
