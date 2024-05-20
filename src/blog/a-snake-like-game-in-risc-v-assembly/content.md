_This is only a short blurb about the project. I wrote more about the specifics of the implementation on the project's github [👉here👈](https://github.com/bcarlborg/snake-game-in-riscv-assembly)_

I built a version of the classic snake game in RISC-V assembly! The program runs on qemu's emulated RISC-V [virt computer platform](https://www.qemu.org/docs/master/system/riscv/virt.html). The program is written at an embedded level. This means that there is no operating system running to support the program. The game software is responsible for knowing the system's memory map, communicating directly with devices, managing interrupts, and more!

(Some people might reasonably take issue with this definition of "embedded" considering that the virt platform is a system that can only be run in an emulated environment... but these are just the terms we are going to roll with.)

I was interested in this project because I wanted to learn more about how software interfaces directly with the computer system it runs on. This project was a great way to dip my toes into this lower-level of software development. I will definitely be taking on similar side projects in the future, this one was a lot of fun!

![snake like game demo](snake-final-demo.gif)