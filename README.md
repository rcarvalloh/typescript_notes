Typescript annotations

# Typescript

It is just a compiler that takes .ts files and converts it to Javascript, it must be installed using npm, then all the .ts files can be compiled using tsc command, Typescript is a superset of Javascript, meaning it is based on it and extends it. However, the code compiled, in the end, is pure Javascript.

One has to understand that Typescript only helps during developement, during compilation, it doesn't help on runtime.

The value of typescript lies on all the features it adds while writing-compiling code such as:

- Types
- Next-gen Javascript features (which get translated into regular javascript compatible with old systems)
- Interfaces
- Generics
- Decorators

Typescript compiler is also highly configurable

We can initialize a typescript project using:

tsc --init

this creates a tsconfig.json file where are the compiling configuration options are set, additionally, when there is a tsconfig.json file, the command tsc will compile all .ts files inside the folder where it is located.
