/*

Interfaces can be used to define a blueprint for a class, it differs from inheritance in several ways
 - you can implement multiple interfaces (whilest you can only inherit from a single class)
 - an interface doesn't have the concept of constructor method
 - an intertace does not have implementation details, as in, there is nothing implemented that can be inherited.
 
*/

// this interface forces the object to implement 3 properties and a method
interface Car {
  brand: string;
  model: string;
  modelYear: number;
  getAttributes(attribute: string): {};
}

// interfaces definitions are joined automatically
interface Car {
  attribs: string;
}

// we can also mix interfaces using the extends keyword

interface LuxuryCar extends Car {
  cost: number;
}

// we can extend from multiple interfaces by just adding a comma

class FordFocus implements Car {
  constructor(
    public brand: string,
    public model: string,
    public modelYear: number,
    public attribs: string
  ) {}
  getAttributes(attribute: string) {
    return {};
  }

  // notice that we can add more parameters or methods and this would still works, the interface only makes sure we implement what it defines but it doesn't constraint the class to just it
  getMileage() {
    console.log(100);
  }
}

// if we didn't provide the exact elements the interface requieres then TS would throw an error, interfaces can be used with classes to force structure

// interface with readonly

interface Greetings {
  readonly name: string;
  lname: string;
}

// readonly make sures that a parameters defined in the interface can't be changed after it has been initially set, the compiler would throw an error

let user: Greetings;

user = { name: "rafael", lname: "carvallo" };

// if we tried to change name, the compiler would not allow it

user.name = "Jose";

// however we can still change lname

user.lname = "Gomez";

// Interfaces can also be used to define the structure of a function, just like type

// type removeFunc = (param: number) => void;
interface removeFunc {
  (param: number): void;
}

// both ways are ok to be used, however types might be more readable

// we can specify optional properties to an interface

interface SpecialCars extends Car {
  description?: string;
  // we can also mark as optional a method
  carDesc?(): void;
}

// the character ? tells TS that this is optional attribute

// the optional character also works on attributes passed to a function and on class definitions

class OptionalClass {
  name?: string;
  constructor(name?: string) {
    // here if we didn't pass the attribute name, then it would be undefined, alternatively we could have just used a default parameter
    this.name = name;
  }
}
