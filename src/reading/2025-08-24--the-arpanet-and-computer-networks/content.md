This is a speech by Lawrence G Roberts, given in the year 1988 in which he describes the development and evolution of the ARPANET. Before Roberts begins his speech, Frank Kuo gives him a short introduction, describing him as the father, but not the inventor of the internet. Given what I know about the ARPANET, I think that description is apt.

### Robert G Lawrence

There are many people who were involved in the creation of the ARPANET. There were visionaries like [J. C. R. Licklider](https://en.wikipedia.org/wiki/J._C._R._Licklider) who were communicating the possibilities of a world wide system of connected computers while the technologies were in their infancy. There were academics like [Leonard Kleinrock](https://en.wikipedia.org/wiki/Leonard_Kleinrock) who laid the mathematical theoretical groundwork that would be needed to model and analyze networks of the future, and there were inventors like [Donald Davies](https://en.wikipedia.org/wiki/Donald_Davies) who sketched designs for protocols and systems that closely resemble the ones that we use today.

Roberts played a different role in the creation of the ARPANET though. While he was director of the Advanced Research Projects Agency he drove the development and implementation of the first wide area computer network in the world, the ARPANET. Based on my understanding of the story, he was sort of the glue that held all of those inventors and ideas together at the right time.

In this speech, he recounts the process of developing the ARPANET and provides details here and there about relevant aspects of its implementation. Reading this speech brought a few ideas into focus for me.

### The ARPANET as an Evolution of Phone Networks

The first idea that stuck with me while reading this speech was that the ARPANET really was a modification or extension of the existing phone network. Before diving into references like these, I think I just assumed the ARPANET was a brand new technology, unlike anything that had come before. But as I've learned more about the project and how it was built, I've come to see that is not the case.

At the time that the ARPANET was created, there were alreadye extensive telecomunications networks spanning the entire country. You could connect over the phone to most major locations in the country. The ARPANET did not create a new separate network, they created a different way of using the existing network.

The ARPANETs key invention was to add computers to the exisitng phone lines. These computers connected to the phone lines were called Interface Message Processors (or IMPs for short). Each IMP was connected directly to another IMP with a phone line connection that was held open indefinitely. The IMPs would send "packets" of binary data over the phone lines where each packet was a small chunk of binary data addressed from one computer to another.

This was a different way to utilize the existing phone lines. Before these IMPs, phone lines could only be used to establish a connection between two participants. When you dialed up someone, the Telco was responsible for setting a number of switches in the network to create a single line of open communication between you and the person you dialed.

The ARPANET changed this paradigm by having IMPs as the switching nodes in the network. The IMPs would be "switching" and forwarding data for each and every packet that was being sent over the network. This is what is refered to as packet switching.

So again, the thing that clicked for me when reading this was that the ARPANET was an incremental improvement on top of the existing communication networks, specifically, an evolution of the way that you perform switching in the network. It was not a ground up reconstruction of a nation wide communication network. The ARPANET engineers were not putting telephone poles and copper wires up, they were designing a set of computers to put at key points inside the network.

### Timesharing Computers Enabled the ARPANET

While it is only mentioned a handful of times in this speech, many articles and papers discusing the ARPANET talk about the importance of timesharing. While I haven't dug deep enough into the history and timelines to be sure of this, I think that people are refering to the invention and deployment of operating systems like [Multics](https://en.wikipedia.org/wiki/Multics).

Somewhat concurrently with the invention of the ARPANET, there was a major change happening in the computers that people used. The computers of the time were large mainframe machines that were used for batch processing jobs. Programs were given to the machine to be executed for a long period of time and produce a result. But that design and usage was slowly changing.

New "time sharing" operating systems allowed many users to connect terminals to the same mainframe computer and multiplex its computation. So instead of running one batch program and producing a result, the computers were now concurrently driving many peoples terminals and running each person's programs. The computer would quickly switch between one task and the other to provide the illusion that each person was using their own computer.

This invention was essential for a computer to be connected to a network in a meaningul way.

While the speech doesn't expand on this substantially, my guesses as to why timesharing was so critical are that, (1) the user interface provided my timesharing computers with terminals allows you to just as easily connect to a computer down the hall, or connect to a computer across the country, and similarly, from the computers perspective, it doesn't matter if it is receiving and sending inputs and outputs to a computer down the hall or across the country. And (2) the abillity for computers to interact with peripheral devices that all have very different latencies and properties was probably essential for a computer to be connected to the ARPANET. Before timesharing, computers just executed programs in their own isolated environment, but after timesharing, a whole stack of technology was built out for computers to communicate with the outside world.

### Some Other Interesting Notes
This was a great read! There were a one or two other details that caught my eye and I wanted to mention.

It is always interesting and surprising that new technologies are met with such hostility. After reading primary sources about both Ethernet and ARPANET, in both cases, the inventors describe the initial idea being met with lots of resistence and even anger. In this piece, Roberts states, "I learned a major lesson from that experience: People hate to change the basic postulates upon which considerable knowledge has been built." I think there is a lot of truth to that.

Many people often have the same idea at the same time independently. I am obviously not the first person to notice this, but it is always so surprising. In the story of the ARPANET, many people independently had the idea to evolve the phone networks by using some form of packet switching. When you look at the designs and ideas that those people came up with, they are all eerily similar. It is always neat and somewhat magical when an idea just seems to be in the air waiting for people to notice it like that.

Anyways, this was a great read! You can probably get through it in about 20 / 30 minutes. Always fun to learn more about these pivotal moments in technology.
