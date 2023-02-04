/*

 Decorators

 Decorators in TS/JS are executed on class/function definition, allows us to override or do things behind scenes before making the class/function available for usage

*/

// First class decorator

// By convention function decorators are named with the first letter being a capital one, the decorator must accept at least one parameter and what is passed to this parameter is either the class or function being decorated

function Logger(decorated) {
  console.log(`...`);
  console.log(`${decorated}`);
}

// Decorators execute when the class is defined not when it is executed/instantiated
@Logger
class SomeClass {
  constructor() {}
}

// we would get the log out from the decorator before we make use of the class we just created. Decorators are usually used like this to enrich the class with metadata (it is quite common in some frameworks like nestjs)

// Decorator Factory
// Is a function that takes parameters and returns another function that is the actual decorator that will be used

// this is used to enrich a base function
function LogToCloud(logString: string) {
  return function (func: Function) {
    console.log(`${logString}`);
    func();
  };
}

// here we are executing the decorator function that returns another function that is the actual decorator we will use
@LogToCloud("LOGGING...")
class SomeAnotherClass {
  constructor() {}
}

/*

Decorator nesting, we can apply multiple decorators, the decorators are executed in the following order:

 - Inner Function in a decorator is executted bottom up
 - Outer statements in a decorator factory are executed in definition order



 @dec1() <- The function that generated the actual decorator gets called first
 @dec2()

 dec1
 dec2 <- The botton decorator gets called first

 """
 When multiple decorators apply to a single declaration, their evaluation is similar to function composition in mathematics. In this model, when composing functions f and g, the resulting composite (f ∘ g)(x) is equivalent to f(g(x)).

As such, the following steps are performed when evaluating multiple decorators on a single declaration in TypeScript:

The expressions for each decorator are evaluated top-to-bottom.
The results are then called as functions from bottom-to-top.
 """
*/

// Property Decorators

// this limits the decorator to be called only for classes, might look a little bit confusing but this means the Type T must be something that can be instantiated (new), that takes N amount of positional parameters (...args) those parameters can by of any type (any[]) and must return an object (: {}) - This is the sintax we will typically use when using generics related to class decorators
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}

@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
bug.reportingURL;

/*

 Decorator received parameters depend on how it is called

*/

/*

Parameters for class decorators. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition

Class decorators only receive a single parameter, the constructor of the class

*/

// More documentation https://mariusschulz.com/blog/mixin-classes-in-typescript#:~:text=If%20you%20define%20a%20constructor,arbitrary%20values%20as%20constructor%20parameters.

function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  /**
   * Takes a class and modifies it to work as a singleton factory
   */
  return class extends constructor {
    private static _instance;
    private constructor(...args: any[]) {
      super(...args);
    }
    static get instance() {
      if (!this._instance) {
        this._instance = new constructor();
      }
      return this._instance;
    }
  };
}

@singleton
class UserDBConnector {
  constructor() {}
  queryDb(query: string): void {}
}

const userDb = new UserDBConnector();

/*

 Parameters for method decorators

*/

// Parameters for parameter applied decorator

// Paramters for accessor decorator

// Parameters for property decorators
