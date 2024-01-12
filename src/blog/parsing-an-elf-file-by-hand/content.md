This is a test


## testy testy
And some code 

```asm preview title="myexit-more-symbols.s"
# my first program, this is a comment

.globl _start
.globl _glob_foobar

.section .text aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa

_start:
	movq $60, %rax
_local_foobar:
	movq $3, %rdi
_glob_foobar:
	syscall
```

## testy testy

This is more of a test

Lets try an asset

![hand parsed elf object](parsed-elf-object.svg)