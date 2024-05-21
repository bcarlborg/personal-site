_The code for this project can be found [👉here👈](https://github.com/bcarlborg/snake-game-in-riscv-assembly)._

## The Project
I built a version of the classic snake game in RISC-V assembly! This is a project I have been chipping away at since the beginning of the year, and now that it is wrapped up, I am super excited to share it!

This is a very bare bones implementation of snake. The game begins as soon as the program starts, and the program halts when your snake dies. The snake changes direction when the W A S D keys are pressed and the snake dies when it collides with itself or with a wall. Food appears at random locations across the map, and your score increases one point at a time as your snake consumes food.

The project runs on qemu's emulated RISC-V [virt computer platform](https://www.qemu.org/docs/master/system/riscv/virt.html). The game is written at an embedded level. This means that there is no operating system running to support the program. The game software is responsible for knowing the system's memory map, communicating directly with devices, managing interrupts, and more!

(Some people might reasonably take issue with this definition of "embedded" considering that the virt platform is a system that can only be run in an emulated environment... but these are just the terms we are going to roll with.)

![snake like game demo](snake-final-demo.gif)

## Why do this project?
There were two reasons I was interested in starting this project.

Firstly, I wanted to become more familiar with a modern assembly language. Before this project, the only assembly language I had worked with in earnest was a much older 8-bit assembly language for the 6502 CPU. While I learned from working with that language, I felt that I could benefit from seeing what assembly languages being designed today look and feel like.

After a few false starts with other architectures like x86 and arm, I decided to implement my game in RISC-V assembly. I chose RISC-V because the entire RISC-V platform is very well documented and because there are an abundance of educational materials available for the architecture.

The second reason that I was interested in this project is that I wanted to get familiar with writing software that interacts directly with a computer system. Usually, in software development, we rely on the operating system to manage and abstract away the hardware that our code is running on. I wanted to peel away some of those layers and learn how to create a program that can directly utilize the underlying system. I was curious about what the interface do devices on the computer system is. I wanted to learn how a program interacts with those devices over the course of a full program's execution.

Running my program on the emulated RISC-V virt platform in Qemu was the perfect way to get some initial exposure to programming directly for a computer system. The virt platform is a computer platform that is meant to be emulated -- there are no real physical risc-v virt computer systems. Without going into too much detail about what the virt computer system is, it is suffice to say that it is similar to programming a true physical computer system but with dramatically simpler devices that make the system easier to emulate and program for.

## What I learned 
This project was a great way to dip my toes into this lower level of software development and I learned a lot while making it. I'll list some of the learnings that have stuck with me most from the project:

_Starting with a "blank canvas" was very difficult._

I wanted to understand how the computer system worked from the ground up. So I didn't want to start with some sort of template or starter code. I wanted to understand how to appropriately configure and start up qemu to run my program. I wanted to learn how each device worked and what each device's startup sequence was. I wanted to really write my program from the ground up.

And so, I wrote all of the software for this program myself. Sure, I used many other reference programs to guide my development, but I tried to never write new functionality unless I could explain how it worked.

Taking this approach for the project, meant that I really got to deeply learn the system... But it also meant that I spent a long time toiling away getting everything setup while seeing very very little progress in my project. But once I had learned how to organize my project, how to configure qemu, and how to utilize all of the devices I needed the application logic for the game itself came together quite quickly!

_Assembly language is repetitive._

This almost goes without saying but, assembly language is very verbose. Oftentimes, the most frustrating part of writing it is simply how many lines of code you need to repeat to get anything done.

Were I to do a similar project in RISC-V assembly again, I would spend some time investing in macros and snippets to make the process of writing code a bit less repetitive.

_I wish I had invested in better error reporting._

Bugs in my program would usually show up as the game simply hanging. Often times, it took quite a bit of time to find the bug. Sometimes, the issue it was invalid assembly (loading or storing from an invalid address or some such mistake) and other times, the issue was invalid game logic causing an infinite loop.

The RISC-V platform I was using could support relatively useful error reporting. When an invalid instruction was run, an exception could be raised and your program would be interrupted with a code indicating the type of invalid instruction that caused the exception. I never made good use of this facility.

I wish I had taken the time to build our a simple error reporting procedure to run when the system panicked. Having that starting point for debugging would have been incredibly useful.

_You can do a lot without dynamic memory allocations._

My snake program does not use any dynamic memory allocation! Most of the logic for the program is written in temporary registers and stack variables. A small amount of game state has statically allocated sections of data. But I never needed to build out a dynamic memory allocation system.

_Bootloaders are witchcraft._

One benefit of running my program using an emulated computer system with Qemu was that my program would simply be loaded directly into the system ram when qemu started. On a real physical system, my program would need to be saved on some form of persistent storage like flash and a bootloader program would be responsible for initializing the ram on your system and brining your program from flash into memory.

I really wanted to learn more about bootloaders, but ultimately decided that setting up or building a bootloader was beyond the scope of the project. Bootloaders seem like a fascinating rabbit hole that I will like like fall into sometime later.

_Devices and Interrupts are not that scary._

The two aspects of writing a program at this level that intimated me most were devices and interrupts. There are parallels for each of these concepts at higher levels of the stack, but I was mostly very unsure how my program would use these two interfaces. The process of setting up my first device and configuring my first interrupt was very difficult, but once I had those, the rest followed easily.

When it comes down to it, devices are not so different from "magic global variables" that you see in some software. Each devices is represented to your program as a list of memory addresses. By writing specific values to those addresses, your device will do different things. The hard part is figuring out what values cause which behaviors.

Similarly, once they were set up completely Interrupts are not so different than event handlers in higher level languages. You effectively tell the system that when an interrupt occurs, program execution should jump to a specific function and start executing there. Once that function returns, your program will resume where it left off. This is somewhat of an understatement... but not by much.

_Assembly is not the lowest level of abstraction and your cpu is not what it looks like._

While working on this project, I was surprised how many times I touched upon very complex abstractions/implementations that the CPU creates for software executing on the machine. Wether it was out of order execution order or CPU caches for memory, I don't know enough about CPU design to describe the kinds of abstractions that I was bumping up against well, but I know they are there now.

Before this project, I felt like programming in assembly was about as low of level abstraction as a programmer could reasonably learn. Now though, I feel even more mystified by the kinds of optimizations that a CPU provides to the software running on the system.

## In Conclusion
This was a fantastic project! I spent many months getting everything working, but ultimately I learned a lot. This project gave me that special kind of confidence that you feel when you learn how to write software a new lower level of abstraction than you previously could. There is something empowering about knowing that even at the lowest levels of the software stack, there is no magic.