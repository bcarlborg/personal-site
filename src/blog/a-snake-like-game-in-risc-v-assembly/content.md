_The code for this project can be found [👉here👈](https://github.com/bcarlborg/snake-game-in-riscv-assembly)._

## The Project
I built a version of the classic snake game in RISC-V assembly! This is a project I have been chipping away at since the beginning of the year, and now that it is wrapped up, I am super excited to share it!

The project runs on qemu's emulated RISC-V [virt computer platform](https://www.qemu.org/docs/master/system/riscv/virt.html). The game is written at an embedded level. This means that there is no operating system running to support the program. The game software is responsible for knowing the system's memory map, communicating directly with devices, managing interrupts, and more!

(Some people might, reasonably, take issue with this definition of "embedded" considering that the virt platform is a system that can only be run in an emulated environment... but these are just the terms we are going to roll with.)

![snake like game demo](snake-final-demo.gif)

## Why do this project?
I started this project because I wanted to get familiar with writing software that interacts directly with a computer system. Usually, in software development, we rely on the operating system to manage and abstract away the hardware that our code is running on. I wanted to peel away some of those layers and learn how to create a program that can directly utilize the underlying system.

TODO(expand section)
write about being interested in learning how interrupts and devices work in more depth. Interrupts are a very different program flow. Wanting to which devices were involved with the regular operation of the cpu.

TODO: wanting to learn more about qemu.

TODO: learning the target for a compiler.

## What I learned 
This project was a great way to dip my toes into this lower-level of software development and I learned a lot while making it. I'll list some of the learnings that have stuck with me most from the project:

### Creating the game was easy, setting up the foundation was hard.
TODO(flesh out this section):
- Writing all of the code for the game came relatively quickly after I decided how to architect it. Setting up the foundation for the development.
- Learning how everything fits together was hard.
- Starting with a truly blank canvas was hard

### Assembly language is repetitive.
TODO(flesh out this section):
- writing the same function prologue and epilogue over and over was a chore.
- I think I could have enjoyed the process a lot more by investing in some simple tooling.


### You can do a lot without dynamic memory allocations.
TODO(flesh out this section):
- mostly used the stack
- only needed a few small statically allocated chunks of memory.

### I wish I had invested in better error reporting.
TODO(flesh out this section):
- I was so focused on getting things working... I wish I had taken the time to get simple error reporting working sooner.

### Bootloaders are witch-craft.
TODO(flesh out this section):

### The QEMU source code is quite helpful.
TODO(flesh out this section):

### Interrupts are not that scary:
TODO(flesh out this section):