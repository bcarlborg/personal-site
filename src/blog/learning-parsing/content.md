## 👀 The obsession

For some time now, I’ve had a mild obsession with parsing and parsers.

Yes, parsers, the programs that do glamorous work of reading and interpreting JSON and XML strings or protobuf byte streams. Parsers are not new and exciting technology, they are not a hotbed of new research and innovation, but there is something about this topic that keeps pulling me back in.

## 🤔 Why does parsing have such a hold on my interest?

I think parsing, as a subject matter, has two qualities that make it particularly compelling to me.

Firstly, [parsers are everywhere](https://beau-carlborg.com/blog/parsers-and-encoders-everywhere.html). Most every program has a parser somewhere in it. If you zoom out enough, you will eventually see that every program reads and processes inputs. By virtue of the fact that computers are sequential machines, that input will be some form of a list of bytes that you need to extract structured information from. That input might be command line options, or an http request, or the text of a program, but you will need some form of a parser to help you extract the structure of that text.

Secondly, parsing algorithms and implementations are conceptually just one layer above a deep well of computer science theory. When you learn about different parsing algorithms, they are explained in the context of grammars, automata and regular expressions. As you dig into those algorithms and the theory behind them, you touch on rich theoretical concepts like ambiguity and decidability.

I think that these two qualities combined make the subject a bit like catnip for me. I get brought back to the subject by how common parsers are, and when I start thinking about them, I get sucked in by the deeper theoretical questions.

## 🗺️ How I am going to finally “learn parsers”

I’ve been curious about the subject for a long time, but have never really put in the effort to just dig in and actually learn how it all works. Mostly, I think that is because parsing is a tough subject matter with a lot of breadth and depth.

I am not just interested in learning how to write one or two different types of parsers, I really want to understand the underlying structure and connection between the different types of parsers. I want to have an intuition for parsing problems and algorithms in a way that helps me evaluate which parsing algorithm is best tailored for a particular parsing problem.

I think an iterative approach to learning about parsing algorithms will be the best way to build the knowledge and intuition I am looking for. An iterative process is one in which you repeat the same cycle of steps over and over until you achieve the desired outcome. For example, if you wanted to draw a picture of the view from your window, an iterative approach might be trying to draw the picture multiple times. The first picture is just a sketch, and every subsequent picture gets slightly better as you internalize the image that you want to draw.

For parsing, I think this will mean learning all of the canonical parsing algorithms, multiple times over. Conveniently, there is a book that covers just this! [Parsing Techniques: A Practical Guide](https://www.amazon.com/Parsing-Techniques-Practical-Monographs-Computer/dp/1441919015). The book gives a great overview of the many different parsing algorithms and their implementations.
My goal is essentially to read this book multiple times over at varying levels of depth, starting with a high level overview, and going progressively deeper on each pass through.

## 🦎 What I’ve done so far

I’ve actually already done my first pass through the book!

I spent most of January reading through the book Practical Parsing. I tried to read enough of the book to internalize each of the algorithms, but I didn’t worry too much if something didn’t fully click. I was just trying to do a first pass over the algorithms to get a lay of the land. This first pass through the book was useful because it convinced me that nothing magical was happening in any of these algorithms and helped me clear up many of my unknown unknowns. It also helped me identify the gaps in my understanding about the subject matter.

My biggest realization and takweawya was that I need to a invest a bit more in understanding the automata theory that underlies parsing if I really want to have an intuitive understanding of the subject.

## 🔭 What’s next

So, for my next steps to learn about parsers, I am going to be doing a review of the theory behind parsing.

I found a book called [Automata Theory, Languages, and Computation](https://www.amazon.com/Introduction-Automata-Theory-Languages-Computation/dp/0321455363/) that seems to be an excellent overview of the theory that backs parsers. There are three chapters in the book that explore regular languages and finite automata and three chapters in the book that explore context free languages and push down automata.

I think that going through these chapters in the book will help me build up the knowledge I was missing he first time I tried to read practical parsing. I hope that immersing myself in the theory behind parsing will make my second read through of practical parsing much more effective.

Wish me luck! 🪩
