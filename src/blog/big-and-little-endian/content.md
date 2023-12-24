Big Endian and Little Endian are phrases used to describe two approaches for laying out data in an ordered list of bytes. Despite using these terms over and over for years, I still manage to get these confused in my head. I can never remember which is which.

My primary goal for this post is self-serving -- I hope that by writing this, I will finally solidify this concept and avoid all future confusion.

## Ordered Byte (or Bit) Sequences
Most often, with computers, the base hardware you are dealing with is an **ordered sequence of bits or bytes**. If you are dealing with memory or storage, you have access to a list of memory addresses that each can hold a byte. When dealing with memory, the order of the bytes corresponds with the memory addresses of each byte of memory. If you are dealing with a network interface, you will have some stream of bytes or bits where the order of the bytes is determined by either the order in which the data arrives or by some explicit count associated with each byte.

## Multi-Byte Data
Suppose we have a 32-bit number, and we wish to store that number in memory. There are two ways we could put this number into memory. We could put the most significant byte of our data into our first-byte location or the least significant byte into the first location. Big and little-endian are names to describe these two approaches to laying out your data. Big-endian means you put the most significant byte of your data first in your sequence of bytes, and little-endian means you put your least significant bytes first.

![An image showing encoding a 32 bit number using bit and little endian ordering](image1.png)


## Wtf Does Endian Mean Anyways
I think the root of my confusion around these two names is the word "endian". What end does it refer to? and what does it mean for an endian to be big or little? 🥸

Where do these terms come from anyway? The [wikipedia article](https://en.wikipedia.org/wiki/Endianness) for endianness tells us:

> Endianness is primarily expressed as big-endian (BE) or little-endian (LE), terms introduced by Danny Cohen into computer science for data ordering in an Internet Experiment Note published in 1980. The adjective endian has its origin in the writings of 18th century Anglo-Irish writer Jonathan Swift. In the 1726 novel Gulliver's Travels, he portrays the conflict between sects of Lilliputians divided into those breaking the shell of a boiled egg from the big end or from the little end.

Futher reading on a prof-core asthetic [website](https://www.ling.upenn.edu/courses/Spring_2003/ling538/Lecnotes/ADfn1.htm) from UPenn tells us

> The terms \[...\] were introduced by Danny Cohen in 1980 in Internet Engineering Note 137, a memorandum entitled "On Holy Wars and a Plea for Peace", subsequently published in print form in IEEE Computer 14(10).48-57 (1981). He borrowed them from Jonathan Swift, who in Gulliver's Travels (1726) used them to describe the opposing positions of two factions in the nation of Lilliput. The Big-Endians, who broke their boiled eggs at the big end, rebelled against the king, who demanded that his subjects break their eggs at the little end.

Engineering note 137 can be read [here](https://web.archive.org/web/20220414034332/http://www.networksorcery.com/enp/ien/ien137.txt).

I can acknowledge that this is funny, but I wonder how much time and energy has been wasted disentangling these two names 🌝.


![An image showing to endian eggs oriented in the big and little endian fassion](image2.png)

## How I Will Keep These Straight
To avoid confusing myself and others, I will try to avoid using the words "big and little endian” and instead use "least and most significand byte first" to describe byte ordering for any data I need to represent.

After writing this, I can confidently say that I am a bit less confused about these two terms. Hopefully you are too 🤗
