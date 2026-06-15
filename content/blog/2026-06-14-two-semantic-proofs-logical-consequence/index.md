---
title: "Propositional and Predicate Calculus: Section 2.6, Exercise 2.72"
slug: "two-semantic-proofs-logical-consequence"
date: 2026-06-14
postType: "reading"
dateDisplay: "June 14, 2026"
readingTitle: "Propositional and Predicate Calculus: Section 2.6, Exercise 2.72"
readingAuthor: "Derek Goldrei"
readingPublishedDate: "2005"
readingUrl: ""
---

In this post I give 2 variants of a solution to a single exercise in Goldrei's *Propositional and Predicate Calculus*. The problem is not the most interesting problem in the book, and the solutions are not particularly novel… but I spent maybe 2 months working on these 😅

I had a few motivations for zoning in on one one single problem for so long.

The first motivation was to develop a deeper understanding of the content. After finishing chapter 2, I realized that I only had a superficial understanding of the concepts that were outlined in the chapter. I wanted to go deeper, and I felt that really working through some exercises would get me there. While reading the book, I had been working through the exercises in my head, but of course you never end up doing that as well as you think (as my dad told me thousands of times growing up!). So I adhered to the age old advice that the exercises are where all the learning happens!

The second motivation was to improve my proof writing ability. I truly do not have strong proof writing abilities and I've never really learned how to write proofs well. I've always felt very uncertain about my proofs and my approach towards them thus far has been to throw a bunch of rambling logical sounding statements at the proof until some "confidence bar" feels like it's been met. I think the reason for this is that I've only ever written proofs during exams. I've never taken the time to go from a correct proof to a good proof. So in going through this exercise, I was hoping to develop and cultivate that taste in writing proofs.

And finally, I wanted to get experience applying the theory of this book. Ultimately, this whole book is about sound and justified reasoning. Of course the book is about formal reasoning not about writing general proofs in prose… but building up some experience writing robust and sound non-formal proofs is closely related to the project of this book. In working on these proofs, I wanted to start building out my mental model for what proof writing really is. I want to start creating a taxonomy for different kinds of proofs, their structures, and their techniques.

So, with that backstory and explanation out the way, let me give you an overview of how I've structured this post. I have two sections to this post, the first section has the problem and the two proofs I wrote. The second section has my thoughts about the proofs: my attempt to categorize them, contextualize them, and frame them more generally. I assume most readers are going to be more interested in the latter half than the first, and should feel encouraged to skip there directly.

## The problem

```
Given the following premises:

1. Τ ⊨ (φ ∨ ψ)
2. Δ,φ ⊨ θ
3. ψ ⊨ θ

Show the following conclusion: Τ,Δ ⊨ θ
```

## Proof 1: Universal Generalization Semantic Proof

One approach is to reason about an arbitrary truth assignments which satisfies `Τ` and `Δ`. If we can show that this arbitrary truth assignment, with the premises being true, also must satisfy `θ`. After doing that, we can generalize the result to show it is the case for all truth assignments satisfying `Τ,Δ` and thus show `Τ,Δ ⊨ θ` holds.

Suppose we have an arbitrary truth assignment `υ` that satisfies `Τ` and `Δ`. We will show that, given our premises, this truth assignment must satisfy `θ`.

First, because `υ` satisfies `Τ` and `Δ`, we know by premise 1 that this `υ` must satisfy either `φ` or `ψ`. We can show that in either of these cases, `υ` will satisfy `θ`.

Case 1: If `υ` satisfies `φ`, then premise 2 tells us that `υ` satisfies `θ` as well. This is the case because we know from how `υ` was defined that satisfies `Δ`, and so premise 2 tells us that `υ` will satisfy `θ`.

Case 2: `υ` satisfies `ψ`, then premise 3 directly tells us that `υ` will satisfy `θ`.

Thus, we have shown that this arbitrary `υ` which satisfies `Τ` and `Δ` also satisfies `θ`. Universal generalization allows us to say from this that all truth assignments which satisfy `Τ` and `Δ` satisfy `θ`, which is equivalent to `Τ,Δ ⊨ θ`.

## Proof 2: Set Theoretic Semantic Proof

We are reasoning about these logical consequence statements by thinking about their underlying semantics. By that, we mean that we are considering the truth assignments which satisfy the propositional formulas and sets of propositional formulas.

A logical consequence statement essentially says that, the set of truth assignments that satisfy the formulas on the left hand side of the turnstile must be a subset of those that satisfy the formulas on the right hand side of the turnstile.

For some reason, I find that this subset style reasoning about the logical consequence statements is more intuitive to me.

What we can do for a proof approach is to convert our language of logical consequence on these propositional formulas into set theoretic statements.

To do that, we will need to establish a bit of machinery.

First, we will define a function `M` which takes as input a formula or set of formulas, and returns the truth assignments that satisfy them.

Second, for a logical consequence statement, `A ⊨ B`, we declare that as being equal to `M(A) ⊆ M(B)`.

We can also expand formulas inside of `M` inputs into their component parts such as `M(a ∨ b) = M(a) ∪ M(b)` `M(a ∧ b) = M(a) ∩ M(b)`

With all of that set out, we can now re-write our premises and our conclusion

(1) `M(Τ) ⊆ M(φ ∨ ψ)` (2) `M(Δ,φ) ⊆ M(θ)` (3) `M(ψ) ⊆ M(θ)`

And our conclusion: `M(Τ,Δ) ⊆ M(θ)`

For the proof, we will essentially apply a list of algebraic transformations to the left hand side of the conclusion to turn it into the right hand side.

1. `M(Τ,Δ) = M(Τ) ∩ M(Δ)` — definition of `M`
2. `M(Τ) ∩ M(Δ) ⊆ M(φ ∨ ψ) ∩ M(Δ)` — premise 1 and monotonicity of `⊆`
3. `M(φ ∨ ψ) ∩ M(Δ) = (M(φ) ∪ M(ψ)) ∩ M(Δ)` — definition of `M`
4. `(M(φ) ∪ M(ψ)) ∩ M(Δ) = (M(φ) ∩ M(Δ)) ∪ (M(ψ) ∩ M(Δ))` — distributivity of `∪` over `∩`
5. `(M(φ) ∩ M(Δ)) ∪ (M(ψ) ∩ M(Δ)) ⊆ M(θ) ∪ (M(ψ) ∩ M(Δ))` — premise 2 and monotonicity of `⊆`
6. `M(θ) ∪ (M(ψ) ∩ M(Δ)) ⊆ M(θ) ∪ (M(θ) ∩ M(Δ))` — premise 3 and monotonicity of `⊆`
7. `M(θ) ∪ (M(θ) ∩ M(Δ)) = M(θ)` — absorption

which, if expanded out with an application of the transitive property gives us `M(Τ,Δ) ⊆ M(θ)` — which is exactly our conclusion.

## What makes these proofs semantic

If you had to identify the common thread between these proofs, you might say that both are *semantic proofs about logical consequence*.

**What does semantic mean anyways?**

When you look up the definitions of semantics, I find that you end up in one of two places. You might end up with an extremely vague definition: semantics means meaning. Or you may end up with a very specific or narrow definition in which semantics is about models and structures that satisfy something or other.

When trying to understand these proofs, I spent a lot of time trying to build and understanding of semantics that I felt could help me describe what precisely makes these two proofs semantic in nature.

**My understanding of the semantics of formal languages**

Let's start with that vague definition of semantics: semantics means meaning. If you are discussing the definition of a word or trying to figure out what was conveyed by a sentence, then you are discussing the semantics of that thing. If we take that definition over to our formal language of propositional logic, or any formal language for that matter, what we get is that semantics refers to how you evaluate a sentence from the language.

If you are discussing the formal language of arithmetic that we all learn in school, semantics tells you how `6 ÷ 2 + 1 × 4` evaluates to `7`. The semantics of that formal language encodes the meanings of the number symbols, the meanings of each of the operators, the rules for ordering of operations and precedence of operators etc.

Similarly, when we are discussing the formal language of propositional logic. The formal language tells us how to write valid sentences like `φ ∨ ψ` or `(α ∧ β) -> (α ∨ β)`. The semantics tell us how we can evaluate those sentences into a true or false value. Just like with the arithmetic sentences, the semantics for this propositional logic will tell us how to reduce these sentences down to one value.

However, there is one subtle difference in the semantics of the arithmetic language we learn in school and this propositional language. In the language of arithmetic in the paragraph above where every number symbol has a commonly agreed upon meaning (we all know what `1` and `2` and `99` mean), these propositional logic sentences use symbols for the atomic propositions like `φ`, `ψ`, `α`, and `β` which can refer to any proposition. So the semantics of any propositional sentence requires that we have a truth assignment: A mapping of the propositional atoms to their true or false values.

But, once you have this truth assignment for the propositional values, the semantics for this propositional language are just the same. We need rules for evaluating the sentences. Rules for parsing the sentence into operations with a particular order and precedence, and descriptions of the operators like `∧` and `->`.

So, this gives us two components to the semantics of this propositional language. The rules for combining propositions according to the connectives, and the truth assignment: mapping of propositional atoms to true and false values.

**Teasing out a definition of semantics**

If I wanted to make this definition of semantics a bit more concrete, I might define it like this. (FYI, this is just my sketchy thinking about how we can define semantics… I don't want to give the impression)

We start by establishing that we are defining the semantics for a particular formal language `𝐿`. I won't go into the details about how we define a formal language. But essentially, it gives us the rules for creating valid sentences in the language. It will involve sets of valid symbols and rules for creating valid sentences (a grammar) etc.

Once we have that formal language `𝐿`, we can discuss the semantics, or meaning, of any particular sentence `α` from that language.

For a propositional formula `α`, the meaning of the formula is determined by a function `𝑓` which accepts the formula as well as a truth assignment `𝑚` which maps each atomic proposition in the language to a true or false value. So `α`'s value is determined by `𝑓(α,𝑚)`.

Some observations about this. The function `𝑓` is effectively an interpreter. It takes in a program (the formula) and some essential runtime inputs (the truth assignment) and evaluates the program returning a final result. Here the logic of the connectives and how they work is all hand waved away into the definition of the function `𝑓`.

**Why these proofs are semantic**

And so, with all of that defining out of the way, we can now discuss why our proofs are semantic. The proofs reason about logical consequence in terms of the truth assignments that might satisfy the formulas or sets of formulas on either side of the logical consequence operator. We then use mathematical reasoning or we use the algebra of sets to make assertions about the information regarding truth assignments from our premises, and we derive the conclusion from those.

So, put simply, truth assignments are one of the essential elements involved in the semantics of the formal language of propositional logic we are working with. Our proofs both reason about logical consequence through truth assignments that satisfy formulas and sets of formulas. It is that reasoning about truth assignments, a semantic concept, that makes these proofs… semantic!

## In Conclusion

I learned a lot from creating these two proofs, but creating them and understanding them took so much longer than I expected.

I figured that it would take me maybe a week or two to go through all of the exercises in this section of the book that I was working on. And I did have shallow solutions to each of them in about that amount of time. But really creating and understanding these two proofs took so much longer. Specifically, contextualizing them and convincing myself that they were truly complete and valid is what burned the most time.

I think this whole project was worth it though. I suspect that getting comfortable writing proofs that feel correct is challenging and time-consuming no matter how you approach it. And I do think that working on these proofs and really reasoning through what is meant by "semantic" was incredibly valuable.

I think I will try to do a few more write-ups of solutions to different proofs in this section and chapter 2 of the Goldrei book before I go further.
