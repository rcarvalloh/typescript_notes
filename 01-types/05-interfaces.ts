/*

In its basic form an interface just represents the form an object should have, however interfaces can be used for several things including setting up blueprints that must be followed by class definitions 

*/

interface Person {
  name: string;
  age: number;
}

// we can use the interface for type checking of objects
let myPersonObj: Person;

// when we initialize the object, the interface forces the code to follow a specific structure (the interface structure). The initialization fails here because we are not providing the parameters it expects
// we could've achieved this using types as well
myPersonObj = {};

// the difference between interface and types used to be very clear, nowadays it is usually a matter of convention and/or whether we want to use classes

/*

 We can have multiple interfaces with the same name, TS joins all the interfaces and we end with a single one whose properties are all of those separate interfaces

*/

interface Order {
  orderId: number;
  date: Date;
}

interface Order {
  isActive: boolean;
  isReadyToBeShipped: boolean;
}

interface Order {
  personInCharge: string;
  isUrgent: boolean;
}

// the type Order has all the attributes even though we did 3 different declarations
const aNewOrder: Order = {
  orderId: 100,
  date: new Date(),
  isActive: true,
  isReadyToBeShipped: false,
  personInCharge: "Louis",
  isUrgent: false,
};

/*

 Interfaces have the concept of extensibility, we can extend interfaces, in other words we can have a base blueprint for an interface and then create another one based of this blueprint
 we use the word extends to achieve this, we can extend multiple interfaces not just one

 interface A extends B

 interface A extends B, C

*/

interface OrderBluePrint {
  orderId: number;
  warehouseId: number;
}

interface UrgentOrder extends OrderBluePrint {
  isUrgent: true;
  // we can use literals
  providedSLA: "nightly" | "nbd";
}

const superUrgentOrder: UrgentOrder = {
  orderId: 2502056,
  warehouseId: 25991,
  isUrgent: true,
  providedSLA: "nbd",
};
