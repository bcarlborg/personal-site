---
title: "Propositional and Predicate Calculus: 2.5 The expressive power of connectives"
slug: "expressive-power-connectives"
date: 2026-03-22
postType: "reading"
dateDisplay: "March 22, 2026"
readingTitle: "Propositional and Predicate Calculus: 2.5 The expressive power of connectives"
readingAuthor: "Derek Goldrei"
readingPublishedDate: "2005"
readingUrl: ""
---

*Disclaimer: this book in particular is not in my wheelhouse. I am using these notes and reading posts to learn the material better. This post is going to be a bit sloppier and less refined than others I usually like to post.*

With the foundations we've established about propositional formulas and their equivalence in the previous parts of the chapter, this section shows us how we can think more generally about logical connectives beyond ¬, ∧, ∨.

This chapter begins by showing how we can specify logical operators relative to a truth assignment function. This definition gives us flexibility in a few different ways. For one, it allows us to specify logical operators with any mappings from propositional inputs to propositional outputs that we might want. It also allows us to specify logical operators that work on more than just 1 or two inputs. This is possible because truth assignment functions are simply f: {T, F}^n → {T, F} where n is the number of arguments.

With the new found ability to create any truth function we may want, we are then asked to think about the expressive power of the logical connectives we are using. We are asked to think about whether or not particular sets of connectives can represent the formulas of every truth function we might wish to use. The book says a set of connectives is "adequate" if they can represent every possible truth function.

The author goes on to show that ¬, ∧, ∨ are adequate by showing how you could build a propositional formula from the truth table of any propositional function using only those connectives. This construction of a propositional formula from the truth table is the [Disjunctive Normal Form](https://en.wikipedia.org/wiki/Disjunctive_normal_form) and in an exercise, you show that a similar construction from a truth table into [Conjunctive Normal Form](https://en.wikipedia.org/wiki/Conjunctive_normal_form) is possible.

Once we have one adequate set of connectives, we can show that other sets of connectives are adequate by showing that each of the connectives from a different adequate set like ¬, ∧, ∨ can be transformed into the operators in the set whose adequacy we are trying to prove.

The section finishes in a direction I found particularly interesting by showing that even for sets of connectives that are not adequate, we can often still extract some interesting results about how expressive an operator is.

The book frames an example and a few exercises that ask us to think about how many propositional formulas of n arguments can be represented using a particular operator.

I remember learning for the first time that you can represent all logical formulas only using the NAND logical operator (and I remember going through [Nand to Tetris](https://www.nand2tetris.org/) to really drive that idea home!). While it is a simple result, and it's easy to convince yourself of the adequacy of that one operator informally, I still found it rewarding to see how you can prove that same result with an actual proof.
