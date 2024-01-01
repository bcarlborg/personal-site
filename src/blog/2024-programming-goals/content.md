For the past few years, I've set a loose intention or goal for the programming-related concepts I want to learn in the new year. In previous years, I didn't put these goals down on paper and never put these goals out in the public. For 2024, I am making my goals more concrete by writing a post outlining what I would like to learn and how I plan to learn it. 

## Technical Writing Goals
One of my goals for 2023 was to set up this site and publish a few blog posts. I am proud to say that I actually did it, but there is a lot that I want to improve and change about my writing process.

In 2023, I wrote posts about challenging concepts I was learning. With this approach to writing, each post required a significant amount of time and energy. While rewarding, writing about concepts at the edge of my understanding was ultimately too much effort to be sustainable. This year, I am setting a goal for technical writing that will emphasize a different approach.

My goal for the year is to write 20 short to medium-length technical posts. This comes out to writing one post every 2.5 weeks.

I hope that by setting a goal to consistently write and publish short pieces at a faster cadence, I will build skills and habits that reduce the overall effort needed to write a technical piece.

## Programming Goals
In 2024, my programming-related goal is to dive deep into the intricacies and uses of a single file type: the **ELF file**.

Depending on your background, "ELF file" might sound obscure, silly, or just outright made up. Surprisingly, this file type is the cornerstone of almost every program built and executed on a computer running Linux. 

ELF stands for **E**xecutable, **L**inkable, **F**ormat. While you will never see a file with a `.ELF` extension, these files are very common. Whenever you compile a program down to a binary executable, that program is encoded as an ELF file. When you compile high-level programming language files into object files that are later linked together, those are also object files. Any shared library used by multiple programs on your computer is an ELF file.

ELF files are primarily used on Linux, but other operating systems like MacOS and Windows have similar file formats (Mach-O and PE, respectively). Even though these are distinct from ELF, there is significant overlap in the design and functionality of these various file formats.

By the end of 2024, I want to:
- have an in-depth understanding of how the programs I create are represented as object and executable ELF files
- confidently explain the differences between the various types of files that can be encoded as ELF files (executables, object files, shared libraries, etc.)
- understand the process that the linker uses to combine multiple Object ELF files together into one executable file
- understand the process that the operating system uses to load and call dynamically linked library ELF files (like the C standard library)

To learn these concepts, I've come up with 4 projects that I believe will teach me the information I need to know.

### Project 1: Build a Significant Program in x86-64 Assembly Language.
Assembly programs are one level of abstraction above ELF files. An assembler takes an input program written in assembly language and outputs an ELF file. Assembly programs are the last human-readable file format in the typical compilation process before ELF files, and most of the content in an assembly program has a 1:1 correspondence with the content in an ELF file. I believe that I can learn a lot about ELF files by spending an extended period of time writing assembly programs and paying close attention to how those programs manifest as ELF files

I want the program I write in assembly to be "significant." While it is hard to precisely describe that, I will know it when I see it. The program should be hundreds to thousands of lines of code, and the end program should perform some interesting functionalities. While I haven't decided on the specific project yet, I am envisioning either a simple terminal based text editor or video game.

### Project 2: Build an ELF File Viewer
Once I have spent some time working at the level of abstraction above ELF files, I would like to dive into the internal representation of ELF files by creating a program to "view" the contents of ELF files. This program will take any ELF file as input and dump a human-readable representation of the file's content. The program will behave much like `objdump`.

I hope this project will force me to dive into the ELF file specs and their nitty-gritty details. By the end of the project, I hope to be intimately familiar with the binary representation of ELF files.

### Project 3: Build an Assembler
After building a significant program in assembly and a program that dissects ELF files, I would like to connect the learnings from my first two projects and write an assembler. The assembler will take assembly files as input and output an ELF file. I hope this project will force me to completely round out my understanding of the abstractions that the assembler provides and the relationship between assembly programs and ELF executables.

For this project, I would like to recreate the core functionaity provided by `gas` (the GNU assembler). Obviously, I will not recreate the entire functionality of the GNU assembler, but I hope I can identify the core aspects of the program's behavior and recreate those.

### Project 4: Build a Linker
Finally, I would like to build a linker that combines object files into one executable. In a normal compilation process, each source file is compiled into its own object file, then those object files are all passed onto the linker, which combines those object files into one single executable.

While I understand the linker's job at a high level, the specifics are largely mysterious to me. For this project, I would like to recreate the `ld` command's core functionality, which links ELF object files together on most Linux machines.

## Happy New Year
I'll post about my progress on these projects throughout the year!

✨ Happy 2024 ✨