/*

  ANY

 any doesn't tell typescript specifics about the data, it should be avoided whenever possible. Any also disables any kind of type check logic

 */

const someUndefinedArray: any[] = [];

// we can add anything to the array when using any
someUndefinedArray.push([1, "string", false]);

// however TS doesn't have information about what is really stored inside of the array in this example and thus there are no safeguards, here we are calling the parameter length on a boolean type which would cause a runtime error (undefined)
someUndefinedArray[2].length;

let someUndefinedVar: any;

// another example here is we are initializing this variable with the value 100 which is a number
someUndefinedVar = 100;

// but then we are also changing it to string, this is possible because of the any type and this is not a good practice
someUndefinedVar = "string";

/*
  unknown
  used for when we don't know beforehand what type a variable will be, this is a rarely used type, however it is better than the any type as there is still some sort of type checking logic.
*/

let userInput: unknown;
let userName: string;

// unknown allows to mutate variable types, the following lines of code would work
userInput = 5;
userInput = "some text";

userName = "Rafael";

// however you can't assign the values of an uknown variable to a specific type variable
// fails, can't assign strong to unknown
userName = userInput;

// unless a validation on runtime is done which typescript understands
if (typeof userInput === "string") {
  userName = userInput;
}

// here it works because it is actually checking the content of the variable and only assigning it if what is stored in it is a string

/*

 Never
 used for functions that never return, for instance when throwing an error the function never produces a value

 */

// unlike void it doesn't return. Never however, halts the execution or goes somewhere else or stays in a loop, effectively not returning

function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

// an example with a loop
function myAlwaysloop(): never {
  while (true) {}
}
