// sometimes we need to have flexible containers, the idea behind this  is to have
// interfaces that force having specific attributes but don't constraint it to those specific attributes only, as in, we expect to have other attributes that we do not know beforehand but we want to store

// for this we use index types

// let's assume that we want to have an interface that we know must accept N amount of properties, those properties will be called as strings and what is stored in the property must be a string

// we can achieve this will the following code
interface AccessLevel {
  [prop: string]: string;
}

// sintax:
// [name: type_of_name (number|string|symbol)]: type_of_data (intersections are allowed)

// we can add specific parameters to the sintax but the specific parameters must be of the type the index type has defined.

interface AnotherAccessLevel {
  // id can only be string because the index type only has string defined to it
  id: string;
  [prop: string]: string;
}

// now we can add any amount of parameters of type string
let myIdLevel: AnotherAccessLevel = {
  id: "alfa",
  name: "delta",
  lastName: "sigma",
};

console.log(myIdLevel.name);

// index types allows to be flexible with the type of data we can store, they also work with unions and literals

interface AUser {
  id: number;
  isActive: boolean;
  [param: string]: string | boolean | number;
}
