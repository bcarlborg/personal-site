For the past few years, I've tried to set some loose intention or goal for what I learn about programming in the year. But the goals had all been quite flimsy -- not very specific and difficult to measure. For example, in 2021, my goal was to "learn more about operating systems". A noble goal, but not specific enough to be useful. While I did "learn about operating systems" in that year... did I learn as much as I wanted to? what specific information did I learn? Are there any specific projects or achievments I can point to? Hard to say.

Going into the new year (2024), I'd like to try something new. This year, I am going to write out my goals and outline what I would like to learn and what I would like to accomplish. I hope that I can create a roadmap for my goals that I can measure my progress against.

## Technical Writing Goals
One of my goals for 2023 was to setup this very site and start writing posts on this site. I am proud to say that I actually did it, but there is a lot that I want to improve and change about my writing process.

In 2023, I chose to write posts about big challenging concepts that I was wresting with. A result of this was that my posts were very long, somewhat obtuse and very difficult to write. While I did enjoy writing these, this year, I want to take a different aproach and focus on writing shorter posts more frequently.

So, my goal for the year is to write 20 technical pieces (~ 1 post every 2.5 weeks).

My hope is that by forcing myself to write so many more posts, I will learn a process and develop skills that make technical writing easier and more natural.

## Programming Goals
In highschool, I had an English teacher who began class everyday by telling us: "It is through the specific that we understand the universal." This year, I am going to pay heed that wisdom and focus my extra-curriculur programming energy on one specific type of file: an **ELF file**.

Depending on your background "ELF file" might sound obscure, silly, or just outright made up, but I assure you, they are the cornerstone of almost every program that is built and executed on a linux computer. Almost every executable binary programs on a linux computer (`grep`, `bash`, `java`, `gcc`, `gdb`, etc.) is an ELF file. The C standard library is a collection of ELF files. Any of the object or executable files that are created by your compiler on linux are ELF files. They are everywhere.

ELF stands for **E**xecutable, **L**inkable, **F**ormat. Whenever you compile a program down to a binary executable that your compuer will run, that binary is encoded as an ELF file. When you compile high level programming language files into object files that are later linked together, those are also object files. Any sort of shared library that is used by multiple programs on your computer is an ELF file. ELF files are primarily used on Linux, but other operating systems like MacOS and Windows have similar file formats (Mach-O and PE respectively). Even though these are distinct from ELF, my understanding is that there is significant overlap in the design and functionality of these various file formats.

At this point in time, that is about the extent of my knowledge about these files, but by the end of 2024, I want to:
- have an in-depth understanding of how the the programs I create are represented as object and executable ELF files
- be able to confidently explain the differnce between the various types of files that can be encoded as ELF files (executables, object files, shared libraries, etc)
- understand process that linker uses to combine multiple Object elf files together into one executbale file
- understand the process that the operating system uses to call dynamically linked library (like the C standard library) during program execution

In past years, I have approached learning new concepts by finding books to read and courses to follow, but this year, I want to take a more project oriented approach to my learnig. I've come up with 4 projects that I believe will help me learn what I am looking to:

### Project 1: Build a Significant Program in x86-64 Assembly Language.
Assembly programs are one level of abstraction above ELF files. An assembler takes an input program written in assembly language and outputs an ELF file. Assembly programs are the last human readable file format in the typical compilation process before ELF files and most of the content in an assembly program has a 1:1 correspondence with the content in an ELF file. I believe that understanding the ins and outs of assembly programs will help me understand the primitives of programs need to be encoded into ELF files.

I would like the program I create to be "significant". While it is hard to describe precisely what that means, I think I will know it when I see it. The program should be hundreds to thousands of lines of code and the end program should perform some interesting functionality. Currently, I am imagining that this program will be some text based program that can run in the terminal. While I haven't decided on the specific project yet, I am envisioning either a very simple text editor program or a text based video game.

While it is not directly related to ELF files, I am also hoping that this project will give me exposure to some of the other core operating system interfaces like system calls.

### Project 2: Build an Elf File Viewer
Once I have spent some time working at the level of abstaction above ELF files, I would like to dive into the internal representation of programs in ELF files by creating a program to "view" the contents of elf files. This program will take any ELF file as input and dump a human readable representation of the data in the file. The program will behave much like `objdump`.

My hope is that this project will force me to dive into the ELF file spec and learn all of the nitty gritty details about the file layout. I am hoping that by end of the project, I will be intimately familiar with the binary representation of ELF files.

### Project 3: Build an Assembler
After building a significant program in assembly language, and building a program that dissects the internal representation of an ELF file, I would like to connect the concepts together and build an assembler. The assembler will take assembly files as input and output an ELF file. My hope is that this project will force me to completely round out my understanding of the abstractions that the assembler provides and help me understand all of the ways in which assembly can be transformed into an ELF file.

For this project, I would like to recreate the core functionaity that is provided by `gas` (the GNU assembler). Obviously I will not recreate the entire functionality of the GNU assembler, but I hope that I can identify the core aspects of the program's behavior and recreate those.

### Project 4: Build a Linker
Finally, I would like to build linker that can combine object files into one executable. In a normal compilation process, each source file is compiled into its own object file, then those object files are all passed onto the linker which combines those object files into one single exectable.

While I understand the linker's job at a high level, the specifics of the linkers job are largely mysterious to me. For this project, I would like to recreate the core functionality of the `ld` command which is used to link ELF object files together on most Linux machines.