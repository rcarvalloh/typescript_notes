/*

 we can create our own Types using the type keyword, by convention the first letter must be a capital one

*/

// this is a very basic type where we are pretty much giving an alias to the number type
type MyNewNumber = number;

// here we are creating a type that can be either number, string or boolean
type MyVariables = number | string | boolean;

function myTypeAliasFunc(i1: MyVariables, i2: MyVariables) {
  return;
}

// we can also create object types
type UserAccount = {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
};

function validateUserInput(user: UserAccount) {
  return;
}

// another example with an array
type strArray = string[];

// a tuple with 3 parameters first one string, second a number and third boolean
type someTuple = [string, number, boolean];

// types are strict by definition
type SystemServiceDefinition = {
  systemId: number;
  systemDescription: string;
};

// if we wanted to use the above type we must define the object only with the attributes defined in it
const systemObjectDefinition: SystemServiceDefinition = {
  systemId: 140569,
  systemDescription: "a new system",
  // adding this parameter causes an error because it is not defined in the type
  additionalData: "more data",
};
