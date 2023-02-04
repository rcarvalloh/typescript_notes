// Rest parameters
// creates an array of N length, where N is the amount of parameters passed to the function, this is useful when we want to accept an initially undefined amount of parameters

// we can assign a type to the parameter array as usual, here we are expecting that all parameters sent to the function are numbers
function myRestParameter(...myRestVar: number[]) {
  // here myRestVar is an array containing all the parameters passed in order
  console.log(myRestVar[0]);
}

// Spread operator (...)
// allows us to extract the data of an object and/or array
const myObjectA = {
  var1: 1,
  var2: 2,
};

// Objects and arrays are reference based we can't simply do this:
const objA = {};
const objB = objA;

// because we are assigning objB the address reference of objA, this causes that any change made to objA would be reflected on objB and viceversa, in other words, it is not a true copy. if we wanted to do a copy we would need to use the spread operator

// the following would add the objectA into objectB as in {{myObjectA}} which is not a true copy either, this would insert myObjectA using as key its own name
const myObjectB = { myObjectA };

// this would be a true copy
const myObjectC = { ...myObjectA };

// deconstructing

// this example assigns the first 2 elements of an N element array to the constants a1 and b1
const myTestArray = [1, 2, 3, 4, 5, 6];
const [a1, b1, ...rest] = myTestArray;

// a1 = 1 and b1 = 2. rest is a constant as well that stores the reference to an array that contains what was not deconstructed ([3, 4, 5, 6]) this is optional
// a1, b1 and rest are created as constants because we used const, we could've used let and would be created as variables

// this can be done with objects too
const myTestObject = {
  firstName: "rafael",
  age: 33,
  specialAttributes: { atr1: "programmer" },
};

// here we extract firstName and atr1 and assign those as variables
const {
  firstName,
  specialAttributes: { atr1 },
} = myTestObject;

// we can also rename variables
// here the output items will be variables instead of constants
let {
  firstName: aName,
  specialAttributes: { atr1: job },
} = myTestObject;
