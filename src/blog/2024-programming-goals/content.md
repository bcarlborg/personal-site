For the past few years, I've set a loose intention or goal for the programming related concepts I want to learn in the new year.

Going into the 2024 I am continuing that tradition, but this year I am making my goals more concrete by writing out this post outlining what I would like to learn and how I plan to learn it. I am viewing this post as a roadmap for my goals that I can measure my progress against.

So, without further adieu, here are my programming related goals for 2024.

## Technical Writing Goals
One of my goals for 2023 was to setup this very site and publish a few blog posts. I am proud to say that I actually did it, but there is a lot that I want to improve and change about my writing process.

In 2023, I wrote posts about big and challenging concepts I was learning. This writing approach forced me to solidify difficult concepts I was learning as a I articulated them in each post. Unfortunately though, this approach required significant amount of time and energy to create each piece. Writing about concepts at the edge of my understanding, while rewarding, was ultimately too much effort to be sustainable. So, this year, I intend to try a slightly different approach.

My goal for the year is to write 20 short to medium length technical posts. This comes out to about 1 post every 2.5 weeks.

My hope is that by setting a goal to consistently write and publush short pieces at a faster cadence, I will build skills and habits that reduce the overall effort needed to write a technical piece.

## Programming Goals
In 2024, programming related goal is to learn all the intricacies of a single file type: the **ELF file**.

Depending on your background "ELF file" might sound obscure, silly, or just outright made up. Surprisngly though, this file type is the cornerstone of almost every program that is built and executed on a computer running Linux. 

ELF stands for **E**xecutable, **L**inkable, **F**ormat. While you will never see a file with a `.elf` extension, these files are actually very common. Whenever you compile a program down to a binary executable, that program is encoded as an ELF file. When you compile high level programming language files into object files that are later linked together, those are also object files. Any sort of shared library that is used by multiple programs on your computer is an ELF file.

ELF files are primarily used on Linux, but other operating systems like MacOS and Windows have similar file formats (Mach-O and PE respectively). Even though these are distinct from ELF, there is significant overlap in the design and functionality of these various file formats.

By the end of 2024, I want to:
- have an in-depth understanding of how the the programs I create are represented as object and executable ELF files
- be able to confidently explain the differnce between the various types of files that can be encoded as ELF files (executables, object files, shared libraries, etc)
- understand process that linker uses to combine multiple Object elf files together into one executbale file
- understand the process that the operating system uses to load and call dynamically linked library ELF files (like the C standard library)

To learn these concepts, I've come up with 4 projects that I believe will teach me the information I need to know.

### Project 1: Build a Significant Program in x86-64 Assembly Language.
Assembly programs are one level of abstraction above ELF files. An assembler takes an input program written in assembly language and outputs an ELF file. Assembly programs are the last human readable file format in the typical compilation process before ELF files and most of the content in an assembly program has a 1:1 correspondence with the content in an ELF file. I believe that I can learn a lot about ELF files by spending an extended period of time writing assembly programs and paying close attention to how those programs manifest as elf files

I would like the program I write in assembly to be "significant". While it is hard to describe precisely what that means, I think I will know it when I see it. The program should be hundreds to thousands of lines of code and the end program should perform some interesting functionality. While I haven't decided on the specific project yet, I am envisioning either a very simple terminal based text editor or video game.

### Project 2: Build an Elf File Viewer
Once I have spent some time working at the level of abstaction above ELF files, I would like to dive into the internal representation of ELF files by creating a program to "view" the contents of elf files. This program will take any ELF file as input and dump a human readable representation of the file's content. The program will behave much like `objdump`.

My hope is that this project will force me to dive into the ELF file spec and all of its nitty gritty details. By end of the project, I hope to be intimately familiar with the binary representation of ELF files.

### Project 3: Build an Assembler
After building a significant program in assembly and a program that dissects ELF files, I would like to connect the learnings from my first two projects and write an assembler. The assembler will take assembly files as input and output an ELF file. My hope is that this project will force me to completely round out my understanding of the abstractions that the assembler provides and the relationship between assembly programs and ELF executables.

For this project, I would like to recreate the core functionaity that is provided by `gas` (the GNU assembler). Obviously I will not recreate the entire functionality of the GNU assembler, but I hope that I can identify the core aspects of the program's behavior and recreate those.

### Project 4: Build a Linker
Finally, I would like to build linker that can combine object files into one executable. In a normal compilation process, each source file is compiled into its own object file, then those object files are all passed onto the linker which combines those object files into one single exectable.

While I understand the linker's job at a high level, the specifics of the linkers job are largely mysterious to me. For this project, I would like to recreate the core functionality of the `ld` command which is used to link ELF object files together on most Linux machines.

## Happy New Year
I'll try to post about my progress on these projects throughout the year!

✨ Happy 2024 ✨