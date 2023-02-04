/*

 Generics allows us to write reusable code in an easier manner 

 */

// let's say we want to build a promise and we want that Typescript notice if we do something not allowed with the resulting type of that promise

// we are telling typescript that the promise will return a number, generics are always enclosed in <>
const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});

// we can create and use our own generic functions/types
// typescript infers in this case that what we want to return is the intersection between the 2 objects
// the word extends adds a constraint to a generic, here we are telling T type can have any inner structure as long it is an object while U can by any type
function mergeObjects<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// TS complains here because we are passing any other thing that is not an object
console.log(mergeObjects(100, { id: 25052, accessLevel: "ADMIN" }));

// Generics allows TS to infer the right types

// let's write the a function that works with any type that has the parameter length in it

type LengthAttribute = {
  length: number;
};

function getAndPrintLength<T extends LengthAttribute>(param: T): [T, boolean] {
  console.log(`The length of the param is: ${param.length}`);
  return [param, true];
}

// this function will work with with any type that has a length parameter in it

// works
getAndPrintLength("my name is rafael");

// also works
getAndPrintLength([1, 2, 3, 4]);

// won't work as numbers do not have the length parameter
getAndPrintLength(100);

/*

 keyof
 allows us to specify a parameter that must be a key of a passed object, this is useful in situation where we want to avoid errors where we are referencing keys that don't really exist in a parameter sent to a function

*/

// let's assume we have a function that requires an object and we require a second parameter that must be a key of said object

function extractAndCovert<T extends object, U extends keyof T>(
  objt: T,
  key: U
) {
  return `Value: ${objt[key]}`;
}

// won't work
console.log(extractAndCovert({ name: "myname" }, "lastName"));

// will work
console.log(extractAndCovert({ name: "myname" }, "name"));

/*

 Generics and classes

*/

// we can define generics with classes to make sure the class is reusable for different types of data

// for instance let's define a class that can return any kind of data
class ReturnAnyKindOfData<T> {
  private data: T;
  returnData(): T {
    return this.data;
  }
}

// this class works with any kind of data and ts would still have meaningful details
const aStringObjt = new ReturnAnyKindOfData<string>();

// another example is a generic class that allows us to store and retrieve items from an array
interface ArrayStorage<T> {
  putItem(item: T): void;
  deleteItem(item: T): void;
  getItems(): Array<T>;
}

class ItemStorage<T> implements ArrayStorage<T> {
  private itemStore: Array<T> = [];
  putItem(item: T) {
    this.itemStore.push(item);
  }
  deleteItem(item: T) {
    this.itemStore.splice(this.itemStore.indexOf(item), 1);
  }
  getItems() {
    // return this.itemStore -> this won't work we must remember arrays are memory references, would return the memory reference not a copy of the object
    return [...this.itemStore];
  }
}

// a class that can store numbers
const numberStorage = new ItemStorage<number>();

// a class that can store strings
const stringStorage = new ItemStorage<string>();

// a class that can store booleans and strings
const boolStringStorage = new ItemStorage<boolean | string>();

// a class that can store objects
const objectStorage = new ItemStorage<object>();

// would fail
numberStorage.putItem("astring");

// would work
boolStringStorage.putItem(true);
boolStringStorage.putItem("a string");

// the above code would not work for non primitives as those are reference based

// this would not delete anything, as objects being reference based are not the same when we define it again, even if the data is the same
objectStorage.putItem({ name: "myname" });
objectStorage.deleteItem({ name: "myname" });

// only way to fix this with this class would be to first create a variable and store the object  in this variable (which effectively is just storing its memory address)

const myTestObject = { name: "myname" };

// this would work
objectStorage.putItem(myTestObject);
objectStorage.deleteItem(myTestObject);

// alternatively we could just write a generic class with type constraints
class PrimitiveStorage<T extends string | number | boolean>
  implements ArrayStorage<T>
{
  private itemStore: Array<T> = [];
  putItem(item: T) {
    this.itemStore.push(item);
  }
  deleteItem(item: T) {
    this.itemStore.splice(this.itemStore.indexOf(item), 1);
  }
  getItems() {
    // return this.itemStore -> this won't work we must remember arrays are memory references, would return the memory reference not a copy of the object
    return [...this.itemStore];
  }
}

// will fail
const anotherObjectStorage = new PrimitiveStorage<object>();

// will work as this is now a primitive
const anotherStringStorage = new PrimitiveStorage<string>();

/*

 Generic utilities

*/

// Partial type tell TS that our object will eventually have all the attributes that are defined in the type or interface definition. Effectively it is a wrapper that makes all of the attributes optional

interface ShippingOrder {
  orderId: number;
  dateOfCreation: Date;
}

// Here TS complains because we are not providing all of the attributes the interface defines
const anOrder: ShippingOrder = {};

// here it works thanks to the Partial utility
const anotherDifferentOrder: Partial<ShippingOrder> = {};

// one thing to remember is that the type of a wrapped type is Partial, we must use type casting to return or treat the object with its right type

// Readonly type utility is useful with arrays and objects, it allows to produce an error during runtime if we try to change, add or remove elements

const aReadOnlyArrayOfNames: Readonly<string[]> = ["name1", "name2"];

// this will fail during compilation time
aReadOnlyArrayOfNames.push("name3");
