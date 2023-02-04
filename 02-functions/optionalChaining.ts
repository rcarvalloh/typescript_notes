// Optional chaining allows us to call a method/function/property on the result of a previous call only if the method/function/property exists.

const anObject = {
  nestedParameters: {
    name: "my name",
    moreDetails: {
      id: 100,
    },
  },
};

// we can read this as:
// does anObject exist? if so, access nestedParameters
// does nestedParameters exist? if so, access moreDetails
// does moreDetails exist? if so access id

console.log(anObject?.nestedParameters?.moreDetails?.id);

// related to optional chaining is the concept of Nullish Coalescing
// this allows us to set a default value to a variable/const if the passed value is either null or undefined.

let something = null;
const myReceivedData = something ?? "DEFAULT_VALUE";

// this differs from the sintax when using logical or, because that sintaxs sets the default value everything time there is a falsy statement.

// all of the tools above are useful when we define classes or functions that receive that from other systems and as such, we will only know at run time about the specifics of the data received.
