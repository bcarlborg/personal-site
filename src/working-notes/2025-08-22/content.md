I don’t feel confident in my understanding of networking.

### I Don’t Know the Things I Know About Networking

When I reflect on it, the things I know about networking are all pretty squishy. The things I know aren’t based on factual knowledge, they are things I’ve heard in passing or absorbed through the ether.

Some examples of this:

- Networking is often the slowest link in your system.
- TCP and HTTPs connections are costly to create.
- Networking within the datacenter is reasonably fast.
- DNS is a pain.

Most of these aren’t things I have any real experience or concrete knowledge to back up, they are just tidbits that wormed their way into my brain somehow. I believe that there is truth to these ideas, but none of these ideas are concrete or specific enough for me to actually apply them or interogate them in any meaningul way. They are just catchy little sayings.

### Learning How the Computer Works

Over the past few years, I had a goal to “learn how the computer works.” What I was trying to do was build a passible understanding of all of the layers of the stack from hardware up to software. I think I need to embark on a similar network flavored journey.

By the time I felt that I had "learned how the computer worked" I knew enough to be convinced that there wasn’t anything mystical about each layer of abstraction in my computer. I knew that it was just engineered systems the whole way down. 

I learned about the taxonomy of different CPU architectures and ISAs. I learned how to think about the memory hierarchy and how locality of data and access affects performance. I learned how reading and writing to disk works. And what happens when you make system call or receive an interrupt. I learned about process scheduling and inter process communication. And the list goes on. Each layer mayb be complex and advanced, but they aren't magic, and I could dig into those layers if I had to.

Before going through that exercise, I had understandings like

- Interpreted languages are slower than compiled languages.
- You don’t need to think about assembly because compilers and cpus have such advanced and clever mechanics for optimizing your program.

Those sorts of pithy statements have truth behind them, they don’t just appear out of nowhere. But they are generalizations. What I got out of “learning how the computer works” was a framework and mental model computers that allowed me to ask the right questions and figure out if those statements apply to my situation. I learned how to know what I don't know and ask the right questions.


### Learning the Networking Stack

So, my plan is to emulate the experience and "learn how networking works." I am going to spend some time learning about each of the networking layers from the bottom up.

First, I’d like to learn about some of the physical technology that backs networks. I want to establish an understanding a learn about a handful of different link layer technologies and protocols. My hope is that by learning about these, I can have a half decent understanding about what to expect when two computers are communicating directly with each other. Specifically, I’d like to learn a bit about:

- ethernet: twisted copper cabling + 802.3 data link protocols
- wifi: radio commutation + 802.11 data link protocols
- something fiber: I don’t even know enough about fiber to articulate what I want to learn

A layer up in the stack, I’d like to build up my understanding of IP. My mental model about what happens as your data hops from local network to local network is sketchy at best. I’d like to learn about:

- How routing decisions between network segments are made
- How the “state” at various routing points in the internet is updates as new hosts and interconnect points go online and offline

We will see how long my interest in this lasts... but I am determined to move past my shoddy understanding to something more useful!
