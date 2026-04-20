---
title: "Propositional and Predicate Calculus: 2.2 The Construction of Propositional Formulas"
slug: "construction-of-propositional-formulas"
date: 2026-03-10
postType: "reading"
dateDisplay: "March 10, 2026"
readingTitle: "Propositional and Predicate Calculus: 2.2 The Construction of Propositional Formulas"
readingAuthor: "Derek Goldrei"
readingPublishedDate: "2005"
readingUrl: ""
---

*Disclaimer: this book in particular is not in my wheelhouse. I am using these notes and reading posts to learn the material better. This post is going to be a bit sloppier and less refined than others I usually like to post.*

I am jumping straight to chapter 2 section 2 of this book, because chapter 1 and chapter 2.1 are just fluff introductions. 2.2 also feels pretty fluffy for that matter, but it is the first part of the book with some meat on it.

## What is covered in this section

### The general idea of the section

Chapter 2 of this book is all about formal propositional logic. In regular language, we may have simple propositions like:

- "Beau deployed code to the server"
- "The server is in a crash loop"
- "Users cannot reach the server"

We can also use logical connectives like AND, IF/THEN, OR, etc. to create other propositional statements from these like:

- IF "Beau deployed code to the server" THEN "the server is in a crash loop"
- IF "the server is in a crash loop" THEN "users cannot reach the server"

Formal propositional logic allows us to take these ideas we might communicate in language and gives us a set of rules for constructing propositional formulas that represent those propositional statements.

The general idea is that we will

- assign every proposition to be a variable like p, q, r
- we will have symbols for our connectives: ∧ (and), ∨ (or), ¬ (not), → (implies), ↔ (equivalence)
- we will use parentheses to organize our propositional statements with evaluation precedence

So now we can have propositional formulas like

- (p → r)
- (¬r → q)
- (q ∧ ¬p)
- ((p → r) ∧ (¬r → q) → (q ∧ ¬p))

Casually, any reader who has done high school algebra is going to intuitively understand how these formulas might work. If we know the truth value of each propositional variable, then we can evaluate the propositional formula to figure out whether the whole thing is true. Just like with PEMDAS!

But, even though the rules for building these propositional formulas may be intuitively clear, we need to be much more precise about the rules of formula construction if we want to derive any interesting results about a proof system etc.

That is what this section of the book does, it lays the foundation for the rest of the chapter by defining the formal language we will use to represent propositional statements and it shows us how we can then use that definition of the formal language to derive interesting results about the formulas.

For instance, the book shows us how to prove that every formula will have an equal number of left and right parentheses. This should be plain to see based on a few formulas, but at least for someone like me who has not done a lot of higher level math, it is not immediately clear how you could write a proof that shows that.

### How the book conveys the content

The section starts by giving a very quick overview of what a formal language is. It notes that it has a finite number of symbols and rules for its construction... but the book doesn't take pains to nail down what a formal language is — that isn't the topic of this book after all, so it goes straight to giving us a definition for a propositional formula.

It gives us a recursive structural definition for the language of propositional formulas as follows.

> Let P be a set of propositional variables, and let S be the set of connectives {∧, ∨, ¬, →, ↔}. A formula is a member of the set FORM(P, S) of strings of symbols involving elements of P, S and brackets ( and ) formed according to the following rules.
>
> 1. Each propositional variable is a formula.
> 2. If φ and ψ are formulas, then so are ¬φ, (φ ∧ ψ), (φ ∨ ψ), (φ → ψ), (φ ↔ ψ).
> 3. All formulas arise from finitely many applications of 1 and 2.

The book covers this definition in some more depth and provides some examples of propositional formulas and highlights that these formulas are precise where English can be ambiguous etc.

The book then goes on to do two more interesting things, it briefly provides an algorithm for recognizing strings that are valid formulas and it provides a proof showing how we can use mathematical induction on the length of a formula to prove results about them.

This section is very brief, and so it skips over a lot of the quagmires related to recognizing and parsing strings according to a grammar. As I mentioned above, this isn't a formal languages book after all! It does briefly mention parse trees, at least indirectly. But the book doesn't belabor the parsing, and it doesn't go out of its way to show that the grammar is not ambiguous or anything like that.

The example showing how to prove things about sentences in the formal language is also interesting but quick. The book shows how you can use mathematical induction on a formula to prove results about the formula. The interesting part here is that it shows you how you can define some sort of "length" to do induction over that also indirectly iterates over the parse tree of the sentence.

### Thoughts, feelings and reflections on this section

This section was really short and to the point. It establishes a formal language that we can use for the rest of the chapter, but it is very clear that the author doesn't want to get bogged down into formal language details like syntax trees, grammars, well formed formulas, different grammar complexities etc. After all, there are many whole books about those topics.

Personally, I am completely fine with how the author approached this section. While I find the formal language stuff very interesting, it is often a distraction from the actual system we are trying to understand by creating a formal language in the first place.

The section is just groundwork that is necessary for the rest of the chapter.
