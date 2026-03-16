---
title: "Propositional and Predicate Calculus: 2.4 Logical Equivalence"
slug: "logical-equivalence"
readingTitle: "Propositional and Predicate Calculus: 2.4 Logical Equivalence"
readingAuthor: "Derek Goldrei"
readingPublishedDate: "2005"
readingUrl: ""
dateReadByMe: "March 15, 2026"
dateLastUpdated: "2026/03/15"
postOrder: 7
---

*Disclaimer: this book in particular is not in my wheelhouse. I am using these notes and reading posts to learn the material better. This post is going to be a bit sloppier and less refined than others I usually like to post.*

In section 2.2 of the book, we establish how to write formulas for propositional statements like (φ ∧ ψ) or ((φ ∧ ψ) → λ).

In section 2.3, Goldrei outlines how we interpret and evaluate these propositional formulas using truth assignments.

In section 2.4, we introduce the concept of logical equivalence between propositional formulas.

We say that two formulas A and B are logically equivalent (denoted A ≡ B) if the formulas evaluate to the same truth value under any truth assignment. In other words, two formulas are logically equivalent if they have the same truth value for any assignment of propositional values to true or false.

This section is relatively quick and heavy on exercises. It starts by introducing the definition of logical equivalence, then mainly focuses on enumerating many of the propositional logical equivalences that are common or useful.

For example

- De Morgan's laws: ¬(φ ∧ ψ) ≡ (¬φ ∨ ¬ψ) and ¬(φ ∨ ψ) ≡ (¬φ ∧ ¬ψ)
- Equivalences of (φ → ψ): (φ → ψ) ≡ (¬φ ∨ ψ) and (φ → ψ) ≡ (¬ψ → ¬φ)

While the book is teaching us a means to prove that these logical equivalences hold, it seems that the real goal is to give us a wide array of logical equivalences to use in order to re-arrange or reduce propositional formulas into a simpler or more manageable form.

The author is giving us the tools to prove that the kind of translations and arrangements of formulas that we would want to do in boolean algebra actually hold.

The connection to algebra is particularly interesting to me because I don't know that much about algebra. I know the basics you learn when you study it in high school, but I have no sense for where that subject matter goes as you dig deeper into it.

I think it would probably be quite interesting to learn a bit more about abstract algebra after finishing up with propositional and predicate calculus.

The section finishes out by showing that we can write any formula in conjunctive or disjunctive form using only ∧, ∨, ¬. It seems like this concept will be expanded on much more in the subsequent section.
