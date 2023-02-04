/*

 Unions 

 Allows to define more than one possible type

*/

// this type can either be boolean or string or number
type multiType = boolean | string | number;

// we can define complex types using unions
type ObjectWithNameOrString = { name: string } | string;

// either a string can be stored or must be an object with name defined as a string
let myPdata: ObjectWithNameOrString = { name: "rafael" };
myPdata = "rafael";

/*

 Literals

 Allows to set specific values not just types that the variable/constant should contain 

*/

// the variable or data with this type must be either a number or the string ADM
type LiteralType = number | "ADM";

// fails because the only string that can be stored using this type is ADM
let literalTypeTest: LiteralType = "Some Other String";

/* 
 Intersections allows us to combine defined types
 this is closely related to interface inheritance, it is possible to achieve the result of the following example using interfaces as well

*/

// the readonly keyword here tells tyscript that once this object has this parameter defined it can't be changed
type Admin = {
  name: string;
  readonly privilege: "ADMINISTRATOR";
};

type CompanyUser = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & CompanyUser;

// the resulting type is a combination of all the attributes in both base types
const empl10: ElevatedEmployee = {
  name: "Rafael",
  privilege: "ADMINISTRATOR",
  startDate: new Date(),
};

// intersections can be used with other types not only object ones but the behaviour is slightly different
type Tr1 = string | boolean;
type Tr2 = number | boolean;

// Tr3 only allows to store the types in common in Tr1 and Tr2, the only type in common is boolean
type Tr3 = Tr1 & Tr2;

let anIntersectedVar: Tr3;

// fails because this is not a boolean
anIntersectedVar = 100;

// if there is no common type, it allows to store nothing (becomes never)

type Tr4 = string | boolean;
type Tr5 = number | null;

type Tr6 = Tr4 & Tr5;

// fails
let tr6Val: Tr6 = "test";
