// function overload allows us to overload the types to make sure TS understands what type the function will return based on its inputs

type AddTypesNew = number | string;

// this is an example of overload, we just write above the function
function add(a: string, b: string): string;
function add(a: AddTypesNew, b: AddTypesNew): AddTypesNew {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// here if we wanted to call any method on myAddResult for number would fail, because typescripts infers that the result must be AddTypes which is not specific, it doesn't really know whether the result is a string or a number
let myAddResultNew = add("alfa", "b");

// we can fix this lack of precision by using function overloads

// to overload a function we write the function base parameters again above the function definition
function addTwoNew(a: number, b: number): number;
function addTwoNew(a: string, b: string): string;
function addTwoNew(a: string | number, b: string | number): string | number {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

let addResultNew = addTwoNew(2, 2);
let addResultTwoNew = addTwoNew("Rafael ", "Carvallo ");

// and know typescripts knows how to deal with situation, we are telling TS that when a and b are numbers the function will return a number, likewise when a and b are strings the function will return a string

// this can get cumbersome and that is why generics exist
