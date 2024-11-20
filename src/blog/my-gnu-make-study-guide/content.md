I have a love hate relationship with make.

On one hand, It is one of my favorite tools. I can confidently rely on it because I know the vast majority of distros are likely to have it, meaning, wherever I am working, it will probably be accessible to me. When it is setup well, the interface for invoking make is just simple.

On the other hand, writing makefiles has been tripping me up since day one. At first, the language and syntax of makefiles seems simple and austere, but the more you learn, the more you realize how many dark nooks and sharp edges are in the details. Every time I come back to writing makefiles, I feel like I have to relearn all sorts of oddities to get comfortable again.

I created this “study guide” in an attempt to really solidify my understanding of the core knowledge you need to write makefiles. My hope is that through the process of writing these notes, I will have familiarized myself enough with the tool to avoid being so flustered the next time I come back to using the tool.

I hope others get some value out of this post... But I mainly created this to help myself solidify some concepts — that is why I am calling this post a study guide.

_For someone interested in learning make well, I would recommend (the surprisingly well written) make documentation!_

## Make as a build system

### 🏭 **Make is a _build automation system_ (AKA _build system_).**

- A build system is program or set of programs that automates your _build process_.
- Your build process it the sequence of all _build tasks_ required to generate the correct output artifacts from your input source files.
- A build task is the smallest unit of work in your build process, these tasks can not be broken down into smaller tasks. Build tasks may call one or many _build tools._
- Build tools are programs that accept source files as input and generate output files or initiate some side effect based on your input source files.
- A build is a single execution of your build process.
- references:
  - [A Model and Framework for Reliable Build Systems](https://arxiv.org/abs/1203.2704): Provides a thorough model that allows us to define what a build system is an how one works. The terms and definitions I use to describe build systems and their component parts come from this paper.

### 🕰️ Build Systems use a Dependency Graph to Build your Project

- Build systems are able to plan and execute a build of your project faster than a naive script by using information about the structure of your project.
- Build systems use an internal model of your project’s build dependency graph.
  - The build dependency graph is a directed acyclic graph (D.A.G.) that specifies which inputs each build artifacts or side effect depends on.
- Build systems have different mechanisms for deriving your project’s build dependency graph.
  - Some build systems (like make) require the programmer to elaborate and specify the project’s build dependency graph.
  - Other’s automatically derive the build dependency graph of your project based on the contents of your source files.
- Build systems use this dependency graph to implement two features that can make your builds run faster. _Incremental Builds_ and _Parallel Builds._
  - In an incremental build, results from from previous builds are used in the current build.
    - Effectively, intermediate build results are cached for use in future builds.
    - The build system you use is responsible for figuring out which cached build artifacts are stale and need to be reconstructed for the current build
    - Make is an incremental build system by default.
  - In a parallel build, multiple build tasks of the build process are run at the same time.
    - Builds typically involve many steps, many of which are independent from each other and can be run concurrently.
    - The build system you use is responsible for identifying which build tasks are appropriate to run in parallel.
    - Make can be configured to run build tasks in parallel.
- References:
  - [A Model and Framework for Reliable Build Systems](https://arxiv.org/abs/1203.2704): provides a specific model of how build system use dependency graphs and how build systems evaluate wether or not nodes in that graph are out of date.
  - [Forward build Systems, Formally](https://arxiv.org/abs/2202.05328): Describes a build system that can derive a project’s build dependency graph from the source the project.

### 🧑‍⚖️ Make creates its internal dependency graph by reading the _rules_ in a Makefile.

- The Makefile encodes each dependency in their build system with a rule.
- Makefiles are an example of declarative code, they specify all of the dependencies in your project and how to build each dependency rather than specifying how to execute the build step by step (like you would in an imperative language )
- Each rule has a targets (the outputs), zero or many prerequisites (the dependencies), and a recipe (the code for the build task). The basic syntax of a rule is as follows:

```
target: prerequisite1 prerequisite2 ...
  recipe-line-1
  recipe-line-2
  ...
```

- Simple rules describe a single node in the build dependency graph. More general rules can be written to describe many different parts of the dependency graph.
- Makefiles also support a number of other programming constructs like variables, functions, pattern matching and shell globbing, but it is useful to remember that these constructs only exist to help you write better rules.
- To run make, you specify the target (or targets) you would like make to build, and make will consult the rules in your makefile to determine which recipes to run.
  - Link to section on how make plans and executes a build.
- references:
  - Make documentation — [Chapter 2: An introduction to makefiles](https://www.gnu.org/software/make/manual/make.html#Introduction)

## Simple Make Syntax

### 📜 Simple rules:

- A simple rule specifies a file to build as its target and has one or many files as prerequisites.

```
target: prerequisite1 prerequisite2 ...
  recipe-line-1
  recipe-line-2
  ...
```

- Make determines that the target needs to be built by consulting the file system for information about the target and the prerequisites.
  - If the target file does not exist, the target must be built.
  - If any of the prerequisites do not exist, the target must be built.
  - When the last update timestamp of any one of the prerequisites is newer than the last update timestamp of the target, the target must be rebuilt.
- The recipe for a rule is a sequence of shell script lines of code.
  - If the target is a file in the file system, then those shell script lines should create the target file using the prerequisite files.
- An example of a few simple rules that compile c files and link the outputs to make an executable.

```
main: main.o helper.o
  ld -o main main.o helper.o

main.o: main.c helper.h
  gcc -c -o main.o main.c

helper.o: helper.c
  gcc -c -o helper.o helper.c
```

- Example running make against file

```
# Print out the directory contents before running make
> tree ./
./
├── Makefile
├── helper.c
├── helper.h
└── main.c

# Build main target
> make main
gcc -c -o main.o main.c
gcc -c -o helper.o helper.c
ld -o main main.o helper.o

# Try to build the main target again, but nothing happens
# because everything is up to date
> make main
make: `main' is up to date.

# Print the directory content again so we can see the files
# make generated.
> tree ./
./
├── Makefile
├── helper.c
├── helper.h
├── helper.o
├── main
├── main.c
└── main.o
```

- references:
  - Make documentation — [Chapter 2: An introduction to makefiles](https://www.gnu.org/software/make/manual/make.html#Introduction)

### ✏️ Simple Variable Assignment:

- Make supports variables as a way to make writing rules cleaner, allowing for re-used strings between rules.
- The basic syntax for variable assignment is as follows

```
variable_name=variable_value

# whitespace before and after '=' is ignored, so this is equivalent
variable_name = variable_value

# as is this
variable_name        =        variable_value
```

- Variable names can be any sequence of characters not containing the following characters ‘:’, ‘#’, ‘=’ or whitespace.
  - However, variable names with upper and lower case letters, numbers, and underscores are recommended
- All variables in make have values that are strings. There are no other datatypes for variables.
  - The beginning of the string value starts after the `=` character and any whitespace that follows it.
  - For clarity,
- Some variable assignment examples

```
# name gets the string value "beau carlborg"
name = beau carlborg

# location gets the value "oakland" (leading whitespace is is ignored)
location =            oakland

# occupation gets the string value "software    engineer" (internal whitespace preserved)

location = software    engineer

# age gets string value "42" (notice it is a string not a number)
age = 42

# Common practice is to not use spaces around the `=` in an assignment
CC=GCC
```

**📖 Basic variable reference:**

- The syntax for referencing a variable is as follows:

```
$(variable_name)

# or alternatively
${variable_name}

# Or, for single character variable names only
$v
```

- ⚠️ The single character variable reference is a common source of bugs for those new to writing make files

```
# This may look like a valid variable reference for the variable foo
$foo

# But, in fact, make treads this reference as if it were
$(f)oo
```

- Variable names can be referenced in targets, prerequisites or recipes

```
TARGET_NAME=main
PREREQUISITE_NAMES=main.o helper.h helper.o
LINKER=ld

$(TARGET_NAME): $(PREREQUISITE_NAMES)
  $(LINKER) -o $(TARGET_NAME) $(PREREQUISITE_NAMES)
```

- There are ways to
- references:
  - Make documentation — [Chapter 6: How to Use Variables](https://www.gnu.org/software/make/manual/make.html#Using-Variables)

### 🤖 Basic Automatic Variables:

- All of our rules have been static so far, meaning the the target file and all of the prerequisite files are explicitly listed
  - Later on, we will introduce syntax that allows for rules where the targets and prerequisites to be determined when make is run.
  - For those kinds of rules, we need a mechanism to reference the target and prerequisite names that make derived for us in our recipes.
  - Make provides automatic variables to help with this.
- Within every recipe, make assigns the following _Automatic Variables_ for you based on the targets and prerequisites in your rule. These variable references will likely have different values in every rule’s recipe.
  - `$@`: the name of the target file that caused the rule to be run
  - `$^`: the name of prerequisites (separated by a space — even if they were separated by other whitespace in the rule declaration)
  - `$<`: the name of the first prerequisite
  - **`$?`**: the name of all prerequisites that are newer than the target
  - (and more! but these are the basics and the ones you see most commonly)
- Examples

```
main: main.o helper.o
  ld -o $@ @^

main.o: main.c helper.h
  gcc -c -o $@ $<

helper.o: helper.c
  gcc -c -o $@ @^
```

### 🎰 Basic Function Invocation

- Make provides a set of functions that can modify text values. Functions can be invoked anywhere that that a variable can be referenced
- The basic function invocation syntax is as follows

```
$(function_name argument1,argument2,argument3)

${function_name argument1,argument2,argument3}
```

- In a function call, the function name and the arguments are separated by one or many whitespace characters and the function arguments are separated by commas
  - ⚠️ this syntax makes passing (1) leading whitespace in your first argument (2) a comma in any of your arguments (3) an unmatched parenthesis in your arguments rather difficult.
  - The make documentation gives to basic solutions, to this problem, but they are far from pretty.

### 💹 Common functions

- Some of the more common and generally illustrative basic functions
- `$(wildcard pattern)`: The wildcard function will match a pattern against your current working directory, and expand into a list of the files that match the wildcard pattern.

  - Pattern will use \*, ? and […] characters for matching — just like the bourne shell
  - ⚠️ Wildcard is matched against your working directory! Not the makefile’s directory. Most of the time, you are invoking make from the directory that the Makefile is in, but if not, you may not get the results you expect.

```
# If you current directory has these files
# ./
# ├── Makefile
# ├── test1.txt
# ├── test2.txt
# ├── test3.txt
# └── testA.txt

# Var1 would get value "test1.txt test2.txt test3.txt testA.txt"
VAR1=$(wildcard *.text)

# Var2 would get value "test1.txt test3.txt"
VAR2=$(wildcard test[13].text)

# Var2 would get value "test1.txt test2.txt test3.txt testA.txt"
VAR2=$(wildcard test?.text)
```

- `$(shell shellscript_command)`:
- The shell command will perform command expansion of a shell command in the makefile, meaning the function will evaluate to the text that executing the shell command sends to std out

```
# contents will equal the data in the file foo
contents=$(shell cat foo)
```

- `$(subst *from*,*to*,*text*)` - replaces every occurrence of the text in argument `from` with the text in argument `to` in the text in argument `text`

```
# VAR1 would get value "hola world"
VAR1=$(subst hello,hola,hello world)

# VAR2 would get value "CompA.tsx CompB.tsx CompC.tsx"
VAR2=$(subst .jsx,.tsx,CompA.jsx CompB.jsx CompC.jsx)
```

- `$(patsubst pattern,replacement,text)` - patsubst is very similar to subst, but it allows for including a `%` wildcard character in the pattern argument that can be used in replacement argument.

```
# VAR1 would get value "new_test1.txt new_test2.txt test3.pdf"
VAR1=$(patsubst %.txt,new_%.txt,test1.txt test2.txt test3.pdf)
```

- `$(dir names…)` - get the dir of multiple paths

```
# VAR1 would get value "foo/ foo/bar/ ./"
VAR1=$(dir foo/ foo/bar/baz.txt ./blamo)
```

- `$(notdir names…)` - get the filename part of multiple paths

```
# VAR1 would get value "text baz.txt blamo"
VAR1=$(dir foo/text foo/bar/baz.txt blamo)
```

## Syntax for More General Rules

### 🤡 phony targets:

- So far, in each of our rules, our target has been a file that the recipe of the rule creates. Sometimes it is useful to create a rule whose target does not correspond to any file.
- When a target does not correspond to a file, we call it a phony target.
- These can be useful in a number of situations
  - They allow you to run build tasks whose utility is that there recipe performs some useful side effect.
  - They allow you to create a rule which runs many other rules
- Some examples of common phony targets

```
# all is a common phony target that typically has all of the major
# artifacts of a project as its dependencies
all: executable test-bench documentation

# clean is a common phony target whose recipe will remove all
# intermediate files created by other build rules
clean:
  rm -rf ./bin/*

# In previous projects that involved uploading binaries to external
# devices like fpga's or eeproms, I've used an upload phony target.
upload: executable
  loadFileToExternalDevice --device=fpga executable
```

- ⚠️ If a file is created in the same directory as the make file with a name of a phony target, it is possible for your phony targets to stop executing (because a file with that target name exists and is up to date).

  - Make provides a directive that can be used to explicitly mark a target as phony, telling make not to consult the file system for a file with that name.

```
.PHONY clean
clean:
  rm -rf ./bin/*
```

### 🎨 Wildcard rules:

- Often times, you want to create a rule that applies to every target or prerequisite matching some pattern in a directory.
- You can do this in make using wildcard characters in the target or prerequisite section of a rule.

```
# using a wildcard rule to make a list of prerequisites that includes
# each chapter text file in the current directory
book.txt: chapter*.txt
  cat $^ > $@
```

### 🏵️ Pattern rules:

- Similar to wildcard rules, pattern rules allow you to write rules that are more general than basic rules.
- Pattern rules allow you to create a rule that for any target matching a particular pattern. That pattern can also be referenced in the prerequisite list of the rule.
  - This connection between target and prerequisite using the pattern match is a powerful way to create dependencies that are named based on the target itself
- Like with wildcard rules, automatic variables are essential so that you can reference the specific target and prerequisites for which the rule is being executed in the recipe.

```
# This pattern rule tells make that the dependency for any file ending
# in .o is a file with the same base name ending in .c
%.o: %.c
  gcc -c -o $@ @^
```

### 🫥 Built-in Rules:

- By default, make also references a number of built-in rules beyond those you define in your Makefile when you invoke it.
- There are two built-in rules that you may still come across or shoot yourself in the foot with.
- A rule for compiling .o files from .c files. According to the make documentation, “_n_.o is made automatically from *n*.c with a recipe of the form `$(CC) $(CPPFLAGS) $(CFLAGS) -c`.”
- A rule for compiling executables from their corresponding .o files. According to the make documentation: “*n* is made automatically from *n*.o by running the C compiler to link the program. The precise recipe used is `$(CC) $(LDFLAGS) *n*.o $(LOADLIBES) $(LDLIBS)`.”
- These default rules can be disabled by passing either the -r or --no-builtin-rules flag when make is invoked.

### 👬 Multiple targets per rule:

- In all of the rules up to this point, we have only had one target per rule. Make also has affordances for specifying multiple targets for a single rule.
- There are two different variants of multiple target rules
- Independent multi target rules are equivalent to writing the same rule once for each target.

  - These are simply a nice syntax affordance for condensing multiple rules that have the same dependencies and recipe
  - When the recipe is run `$@` will be set to one of the the targets

```
output1 output2 output3: prereq1 prereq2
  compile -o $@ $^

# The above rule is equivalent to these three rules
output1: prereq1 prereq2
  compile -o $@ $^

output2: prereq1 prereq2
  compile -o $@ $^

output3: prereq1 prereq2
  compile -o $@ $^
```

- Rules with multiple targets can also be grouped target rules

  - the `$:` separator between targets and prerequisites indicates that the targets should be treated as grouped targets.
  - These rules are useful when you have one rule that updates multiple targets at the same time.
  - If any one of the group targets are out of date, then the rule will be run again.
  - $@ will be set to the name of the particular target that triggered the rule to execute.

```
foo bar biz &: baz boz
        echo $^ > foo
        echo $^ > bar
        echo $^ > biz
```

🦏 Order-only prerequisites:

- The default interpretation of prerequisites in rules is that make should run the recipe whenever any one of the prerequisites has an update timestamp that is newer than that of the target.
- Order-only prerequisites allow you to specify prerequisites for a target that should only cause an execution of the recipe if the order only prerequisite doesn’t exist. Once the order only prerequisite exists, any subsequent updates to it will not cause make to execute the rule again
- Order only prerequisites are separated from normal prerequisites with a | character

```
# the bin/ directory is an order only prerequisite here. As long as it
# exists, no updates to it will cause the rule to re-run
executable: main.o | bin/
  ld -o executable main.o

main.o: main.c
  gcc -c -o main.o main.c

bin/:
  mkdir bin
```

## Other Useful Syntax

### 👨‍🍳 make syntax for recipes

- make executes each line of code in the recipe in its own sub shell. However, it does do some processing on the recipe lines first.
- Breaking up recipe lines
  - Lines in a recipe can get long, if you want to break the line up with a newline in the makefile, but still have it executed by make as one shell line, a \ character can be placed at the end of the line.
- Suppressing recipe echoing
  - By default when make executes a recipe, it echoes every line of shell it executes to the terminal. This behavior is called recipe echoing.
  - If a line in a recipe begins with the @ character, then recipe echoing of that line will be suppressed.

```
# In this example, when the rule is run, the echo command will be
# executed, causing "building the book!" to be echoed, but make will
# not print "echo "building the book!" to stdout
book.txt: chapter*.txt
  @echo "building the book!"
  cat $^ > $@
```

- Ignoring errors in recipe lines
  - By default, make executes recipe lines one after another. If one of the recipe lines exists with a non zero status code, then make will abort execution of the rest of the rule.
  - If you want to prevent aborting on errors for a particular shell line, prefix the line with `-`. This will tell make to continue to the next line of the recipe even if this line errors out.
- Escaping $ character in make recipes
  - By default, make will read any $ character in a recipe as beginning a reference to a make variable.
  - If you want to escape the $ character, and have make pass it on to the shell command, you can add a second $ character in front of the $.

### 🧟‍♂️ Different types of variable assignment

- By default, variables in makefiles do not store the evaluated right hand side value from the variable declaration. Instead, they store the right hand side value as it was specified, and then evaluate that when the variable is referenced.
- These variables are referred to as recursively expanded variables

```
random=$(shell echo $$RANDOM)

all:
  @echo $(random)
  @echo $(random)

# Running make all against this makefile will output two different
# random numbers. Because make executes the function from the declaration
# every time the variable is referenced.
```

- The other type of variable assignment is known as simply expanded variables. These variables right hand sides are evaluated at declaration time and that evaluated value is stored in the variable
- This variable style can be more intuitive in certain situations

```
random:=$(shell echo $$RANDOM)

all:
  @echo $(random)
  @echo $(random)

# Running make all against this makefile will output the same number twice
# Because make executes the function during the declaration and assigns the
# output to the variable.
```

## Other Bips and Bops

### 🛶 Make executes each recipe line in its own sub shell

- When make executes a recipe, it executes each line of the recipe in its own sub shell.
- ⚠️ This means that setting shell variables or changing directory in a make file recipe will not affect following lines.
  - This can be confusing to new Makefile authors who expect the entire recipe is executed like a shell script

### 🏚️ Creating a prerequisite that is always out of date

- Sometimes it is useful to have a prerequisite on a rule that is always out of date. This will ensure that the rule is always run even when the target is up to date
  - This can be useful when debugging to see what happens when a rule is run.
  - This can also be useful if you have a rule that updates a file every time the recipe is run
- This can be done by creating a dependency that is always out of date, and adding it as a prerequisite on any rules you always want run.

  - Another alternative is to mark your target file as .PHONY. But that is (1) confusing because phony targets usually don’t have an associated file (2) and also not going to work if your target is a pattern target (you can’t mark a pattern as phony).

```
# the force target has no dependencies and no rule,
# and thus can never be created and will always be out of date
FORCE:

# Every time make has log.txt as a goal or a prerequisite of another
# rule, it will consider log.txt out of date.
log.txt: FORCE
  echo "MAKE BLAMO" > foobar.txt

# This is the same as the above, but using a pattern rule instead.

%.txt: FORCE
  echo "MAKE BLAMO" > foobar.txt
```

### 👩‍👩‍👧‍👦 using multiple makefiles

- There are two approaches to using multiple makefiles in a project
- Including makefiles
  - It is possible to include the rules from another makefile in your project by using the include directive.
  - Conceptually, you can imagine that calling the include directory expands all of the content of the included make files directly into your makefile where the include directive is.

```
include some_makefile.mk some_other_makefile.mk
```

- This can be useful if your project has shared variables that every makefile should use, or if your makefile includes a lot of boiler plate.
- Recursively calling makefiles
  - You can invoke make in a recipe in your current makefile by calling $(MAKE).
  - Invoking this command is the same as calling make on the command line:

```
subsystem:
  cd subdir && $(MAKE)
```

- By default, when you invoke make recursively in this way, no information from your current Makefile is communicated to the recursively run Makefile.
- It is possible to share variables from the calling Makefile to the recursive callee makefile by using the export directive

```
my_exported_var:=foobar
export my_exported_var

subsystem:
	cd subdir && $(MAKE)

# Now when make is executed in subdir, the variable my_exported_var will
# be defined during the execution of the subdir Makefile
```
