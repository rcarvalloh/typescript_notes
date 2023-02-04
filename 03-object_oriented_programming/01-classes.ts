// ##################### classes are fully supported in TS

// in a class we can define a properties

class Identification {
  name: string;
  lastName: string;

  // we are assigning a default value and assigning this variable as a private one
  private adminLevel = "GUEST";

  constructor(n: string, lname: string) {
    // same principle as another languages
    this.name = n;
    this.lastName = lname;
  }

  // we create a new method
  setAdminLevel(adminLevel: string) {
    this.adminLevel = adminLevel;
  }

  getAdminLevel() {
    return this.adminLevel;
  }
}

// we create a new object out of the class

const empl1 = new Identification("Rafael", "Carvallo");
empl1.setAdminLevel("ADMINISTRATOR");

// This keyword and javascript
// let's check the following example

// we are effectively passing the pointer to the method only
const receivedAccessLevel = { level: empl1.getAdminLevel };

// here this would print undefined, as the this keyword behaviour in JS is to use "this from that which is in charge of calling it", in this case what is calling the function is the object receivedAccessLevel.
// this is a confusing way of working that javascript has

console.log(receivedAccessLevel.level());

// if we wanted to have the output we must make sure that the method is called by the original object

const receivedAccessLevel2 = { level: empl1.getAdminLevel() };
// since the method is called and executed by empl1, we get the wanted attribute.

// Now there is a way to set the THIS variable objectively instead of subjectively and that is rewriting the methods of the class
class IdentificationFixed {
  name: string;
  lname: string;
  private adminLevel: string;

  constructor(name: string, lname: string) {
    this.name = name;
    this.lname = lname;
  }

  setAdminLevel(this: IdentificationFixed, adminLevel: string) {
    this.adminLevel = adminLevel;
  }

  getAdminLevel(this: IdentificationFixed) {
    return this.adminLevel;
  }
}

const empl2 = new IdentificationFixed("Luis", "Gomez");
empl2.setAdminLevel("CONTRACTOR");
const receivedAccessLevel3 = { level: empl2.getAdminLevel };

// what now happens is that typescript finds this as a violation as the this variable is being called outside of an instantiated object of the corresponding class. In other words, this is just making sure the method is called from an object whose type matches the class

console.log(receivedAccessLevel3.level());

// ################ shorthand notiation for constructors

// this is a shorthand constructor method, this avoids needing to declare the variable/type and the constructor, instead we can write it in this way and would be the same, we are effectively telling TS to create a function that has a constructor that takes 3 parameters and assign those parameters to the this object with public or private access
class ClassA {
  constructor(
    public name: string,
    public lname: string,
    private accessLevel: string
  ) {}
}

// longer version of ClassA
class ClassB {
  name: string;
  lname: string;
  private accessLevel: string;
  constructor(name, lname, accessLevel) {
    this.name = name;
    this.lname = lname;
    this.accessLevel = accessLevel;
  }
}

// ############## Access modifiers allow to set to parameters and methods what can access those
// public: the method/property can be accessed outside of the object
// private: the method/property can only be accessed from inside of the object
// readonly: used together with public/private keyword, it doesn't exist in javascript and it tells typescript to fail the compilation if a property is tried to be changed after initialized

class ReadOnlyTest {
  constructor(public readonly id: string) {}
}

// Inheritance

class BaseClass {
  constructor(private serviceLevel: string) {}
  reloadSystems() {}
}

class ExtendedClass extends BaseClass {
  // we are overriding the constructor
  constructor(serviceLevel: string, public name: string) {
    // super must be called before doing anything with the this keyword and this calls the original constructor, we must pay attention to satisfy the constructor requirements
    super(serviceLevel);
  }
}

// inheritance and private properties
// a private properties is only reachable from within the original class that defined it, a class that has inherited the attribute via inheritance can't directly make use of it.

class PrivateInheritance {
  constructor(private status = "ACTIVE") {}
}

class PrivateInherited extends PrivateInheritance {
  constructor() {
    // super must be always called as the first part of the constructor when inheriting
    super();

    // it not possible to access status because it is private
    this.status = "INACTIVE";
  }
}

// if we wanted to achieve the same effects as private but making the property available to any class that inherits we must use the protected keyword

class ProtectedInheritance {
  constructor(protected status = "ACTIVE") {}
}

class ProtectedInherited extends ProtectedInheritance {
  constructor() {
    super();
    this.status = "INACTIVE";
  }
}

// we can override methods, the way to do this is to write a method with the same name as the base class and this one will be used instead of the base one.

class OverridedClass {
  constructor(protected myName: string) {}

  // function that we will override
  displayName(this: OverridedClass) {
    console.log(this.myName);
  }
}

class OverridingClass extends OverridedClass {
  constructor(myName: string) {
    super(myName);
  }

  // this method will be used instead of the inherited one
  displayName() {
    console.log(`Your name is ${this.myName}`);
  }
}

// Getters and setters
// allows to define the logic to get and set values from private/protected properties

class ReportedElements {
  constructor() {}
  // this is a standard sintax when using getter and setter
  private _currentReport: string;
  // this is a getter
  public get currentReport(): string {
    return this._currentReport;
  }
  // this is a setter
  public set currentReport(value: string) {
    this._currentReport = value;
  }
}

// we can get the currentReport without calling a method
let myReports = new ReportedElements();

myReports.currentReport = "925fnc9";
console.log(myReports.currentReport);

// #################### static methods and properties
// Used when we want a class that has methods/properties that can be accessed without instantiating an object and that are common to any object instantiated, this is good for utility functions that we need grouped in a class.

class MyUtilities {
  public static addNumbers(...numbers: number[]) {
    return numbers.map((a, b) => a + b);
  }
  public static restNumbers(...numbers: number[]) {
    return numbers.map((a, b) => a - b);
  }
}

MyUtilities.addNumbers(1, 2, 3, 4);
MyUtilities.restNumbers(10, 20, 40);

// properties can also be static ones.
// One thing to consider is that we can't access static properties from an instantiated method, in other words, a static property can only be accessed from a static method.

// the only way to access a static property from a static method is to use the class name

class StaticTestTwo {
  public static var1 = 100;
  public myInstantiatedMethod() {
    // this would fail because var1 doesn't exist in the instantiated object
    console.log(this.var1);
    // this would work
    console.log(StaticTestTwo.var1);
  }
}

// ############## Class abstraction
// allows us to make sure the exact implementation needed for the class is done when inheriting

abstract class AbastractionClass {
  abstract methodThatMustBeOverrided(this: AbastractionClass): void;
  abstract anotherMethodThatMustBeOverrided(this: AbastractionClass): string;
}

// here we are making an abstract class, this class when inherited requires that the class that extends it overrides the abstract methods, the first one must return nothing and the second must return a string

// ######### Private Constructors
// We can make private the constructor, which only allows accesing via the static methods, this disables the usage of the keyword new

class myPrivateConstructorClass {
  private constructor() {}
}

// if we tried to create an object out of the previous class would fail
const prConstObjt = new myPrivateConstructorClass();

// this is useful, for instance, when we want to follow the design pattern called singleton, where we want to make sure there is only an instance of the class and is the same instance used by everyone

class mySingleton {
  // here we will store the mySingleton only instantiated object
  private static instance: mySingleton;
  private constructor() {}
  // this is the code that allows us to get the object and/or create one if it doesn't exist
  public static getInstance() {
    // here this refers to the class itself not an instantiated object, if it doesn't exist we create the instance, since we are called the constructor from the class itself we have access to it
    if (!this.instance) {
      this.instance = new mySingleton();
    }
    return this.instance;
  }
}

// we can now call the method getInstnace and everytime we call it we will get the same instance always

let singletonInstance = mySingleton.getInstance();

interface ACompleXInterface {
  getVal(a: number, b: number): void;
  getVal(a: string, b: string): string;
}

class SpecialClass implements ACompleXInterface {
  constructor(public ax: number) {}
  getVal(a: number | string, b: number | string): any {
    if (typeof a === "string" || typeof b === "string") {
      console.log(a);
    }
    if (typeof a === "number" || typeof b === "number") {
      console.log(a + b);
    }
  }
}

function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

let t = loggingIdentity("coco");
