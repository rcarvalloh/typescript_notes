/*
 
 This is not a special feature in typescript, rather is a design technique where we write code that check what the type of the data is during runtime before doing anything with it
 
 We have two types of guards:

 typeof -> checks whether the type of the data is that of a javascript primitive, doesn't work with custom types, only with primitives in Javascript
 instanceof -> checks whether the object is an instance of a class


*/

type C = string | number;

function dcTest(a: C, b: C) {
  // runtime logic that checks for what the type of the data is before doing anything with it
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type Employee = {
  name: string;
  id: number;
  systemId: "AX";
};

// An interface can extend a type and also define literals
interface AdminEmployee extends Employee {
  role: "ADMINISTRATOR";
}

let myEmployee: AdminEmployee = {
  name: "rafael",
  id: 10402,
  role: "ADMINISTRATOR",
  systemId: "AX",
};

type AdminEmployeeNewType = {
  name: string;
  id: number;
  role: "ADMINISTRATOR";
};

type UnknowEmployee = Employee | AdminEmployee;

// Typeguards with custom types
function typeGuardingWithMix(empl: UnknowEmployee) {
  // if we don't add a typeguard here, the code won't compile
  // we can only make typeof comparisons using types JS knows at runtime, this is why typeof empl === "AdminEmployeeNewType" would fail, this is a type definition that only TS knows

  // this is a work around using the in keyword, which returns true if the key is in the object
  if ("role" in empl) {
    console.log(empl.role);
  }
}

// If we want to use this technique with types we define we must think carefully about options like the one shown above

/*

 InstanceOf typeguard

 allows us to assert whether an object is an instance of specific class which in turn allows us to do a typeguard

 */
class FastCar {
  public speed = "over 150 km/h";
  constructor(public make: string, public model: string) {}
  drive() {
    console.log("driving...");
  }
  goTurbo() {
    console.log("going turbo...");
  }
}

class SlowCar {
  public speed = "below 150 km/h";
  constructor(public make: string, public model: string) {}
  drive() {
    console.log("driving...");
  }
}

class Truck extends SlowCar {
  loadCargo(cargo: number) {
    console.log(`loading cargo... ${cargo} kg`);
  }
}

// We can create types that reference classes
type Cars = FastCar | SlowCar | Truck;

function useVehicle(vehicle: Cars) {
  // we can make use of instanceof to make sure the parameter we received is an instance of one of the 3 possible classes we defined in the type Cars
  if (vehicle instanceof FastCar) {
    vehicle.goTurbo();
  }
}

// We have to make sure that we check for the right class as class inheritance means that an object will have more than one class attribute, it will be an instance of the class we defined when making and it will also be an instance of the class that it inherited.
// myTruck instanceof Truck would return true
// myTruck instanceof SlowCar would also return true
const myTruck = new Truck("ford", "f150");

// instanceof doesn't work with interfaces, interfaces do not exist in JS

/* 

 Discriminated Unions
 The concept of adding a common property to different interfaces/types, etc. that allow us to identify the right type on run type when using unions
 this can be considered another type guard technique which can be used with interfaces

*/

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  // we discriminate using the parameter type that is common in both Bird and Horse
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
}
