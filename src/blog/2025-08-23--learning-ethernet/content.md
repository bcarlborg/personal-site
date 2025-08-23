I recently realized that [I don’t really get networking](www.beau-carlborg.com/blog/i-dont-get-networking.html), but I decided I would try to fix that by learning about some concrete networking technologies.

The first technology I decided to dig into was Ethernet. I chose ethernet because it is one of the most used networking technologies, and because it has been around for quite some time. I decided to learn about the first version of Ethernet (called 10BASE5). My original intent was to learn about all of the technical and implementation details, but I ended up learning more about the history and narrative behind the invention.

One note I want to mention before diving in. One source in particular for this piece was fanstastic, and deserves being mentioned up at the top. [How Ethernet was Invented](https://ieeemilestones.ethw.org/w/images/6/6e/Ref2_IEEE_Annals_1994.pdf) is a piece written by the inventor himself and published in one of the IEEE Annals. It was an absolute joy to read and added so much personality to my understanding of this technology.

## When and Why was Ethernet Created

Like many things in computer technology, ethernet was invented at Xerox PARC.

Robert Metcalfe was the primary driver of the invention, but many others were involved in the process as well. Metfcalfe first came up with the idea around 1973 at the same time that xerox was developing the Alto Computer. The Alto was one of many very important evolutions in computers around the late 60’s and early 70s. This was really the period of time in which computers were transitioning from being  giant machines that needed an entire basement and many operators to work to smaller devices that a single person might use. The Alto wasn’t the first personal or mini computer, but it very innovative in its form and functionality.

One of the key innovations of the Alto was that it came with networking capability. It was designed to connect to other Altos that were in reasonably close vicinity.  Before the Alto, networking was though of more as a means to connect the very large mainframe computers across large distances. These networking needs were handled by the ARPA-NET and other related networking technologies. Broadly, this type of networking was called Wide Area Networking or WAN.

But the vision for networking in Altos was different. It was imagined that you could have multiple Altos in the same business or university, all connected together, able to share data and messages over a network. Ethernet was created to serve this purpose. This scale of networking, connecting multiple machines all in close vicinity is became known as Local Area Networking or LAN.

## The Main Innovation Behind Ethernet

I think the easiest way to understand what made Ethernet new and interesting at the time is to compare it to what came before. Take this next part with a grain of salt! I haven’t gone deep enough into networking history to be 100% sure about these next statements, but I think directionally, I have things right.

Before the ethernet, most networking technologies were essentially a direct connection between two devices.

- With the ARPANET, each link in the network had a Interface Message Processor or IMP computer on each side of the link. The line was “full-duplex” meaning that there were two physical connections in the line, one for bits moving in each direction.
- With telephone lines, a direct connection would be established between the two callers for the duration of their call. Some combination of operators and computers would switch circuits such that there was a direct line between the two callers. These were also full-duplex lines such that data flowing in each direction was physically separated.
- The connections between mainframe computers and the many terminals on their network were also, sort of, point to point connections. In these cases, many terminals would actually be connected to the same wire that went back to the mainframe. But the mainframe would coordinate communication over the wire, essentially asking each terminal one at a time, “do you have any data you would like to send?”. By having the mainframe be the single arbitrator and ensure that only one device was talking at a time, it was effectively always a conversation between two devices on the same line.

So how was ethernet different?

Metcalfe’s idea for ethernet was that you could have multiple computers all using a single connection, and at any point in time, any one of those computers could talk to another. He threw away the assumption that a network link had to establish a direct link between two devices, and instead designed a network in which many devices would all share the same medium.

Metcalfe compared this shared medium that all the hosts would be connected to with the outdated but charming concept of Luminiferous Ether. This was a word from the 19th century idea the ether was an omnipresent medium all around us through which light travels. In Metcalfe’s new network, all the hosts would be connected to each other directly, and when one host wanted to talk to another, they would essentially broadcast their message into the “ether” and eventually wait for a response targeted to them to come back through this “ether”.

Metcalfe didn’t pull this idea out of thin are though, his design for ethernet was heavily inspired by an earlier network created for use in the Hawaiian islands called ALOHA. The ALOHA system was designed to allow many computers to communicate using radio over the same radio spectrum. It had important differences from Ethernet, but Ethernet is very clearly and explicitly inspired by ALOHA, so it bears mention.

## Managing the Shared Medium

To get into more specifics about how ethernet worked, we need to get a bit more precise about the topology of the network.

In the first versions of ethernet, you had many computer connected directly to a single shared coax cable.

```
│              shared coax cable            │
├──────────┬───────────┬──────────┬─────────┤ 
│          │           │          │         │ 
           │           │          │           
           │           │          │           
           │           │          │           
  ┌────────┴─┐   ┌─────┴────┐   ┌─┴────────┐  
  │ computer │   │ computer │   │ computer │  
  │    A     │   │    B     │   │    C     │  
  └──────────┘   └──────────┘   └──────────┘  
                                               
```

I think its worth emphasizing at this point that none of the hardware that was used in these original systems looks anything like the ethernet hardware we see today. The shared COAX cable was a very large and thick (often yellow) cable, and each of the connections of the lines from the computer into the coax cable had to be established through what was called a “vampire tap.” I highly recommend [this video](https://www.youtube.com/watch?v=bAcSnwmB_4Q] and [this blog post](https://www.mattmillman.com/projects/10base5/] of people setting up a network using the original wires and attachments to get a sense for what this all actually looked like. It is pretty neat.

But back to the network topology! So you have many computers all connected to the same shared coax cable. That means that when computer A wants to talk to computer C, it will create a message and send those bits into the wire, the data will pass through the shared coax cable and be delivered to every other host on the network.

**Multi-Acces**

This is the first challenge of the ethernet topology and implementation: every message sent is received by every host on the network. We say that the network is “multi-access.” To deal with this, every message sent out to the ethernet needs to have an address for both the sender and the receiver. That way, any host can ignore incoming messages that aren’t addressed to them. In the first version of ethernet, I believe these addresses were 8 bit numbers, but over time, they evolved into the MAC addresses that we know today, 48 bit numbers.

**Carrier Sense and Collision detection**

The other challenge of the shared medium structure of ethernet is that in theory two hosts can broadcast their messages at the same time. So while computer A is transmitting a message, there is nothing stopping computer B from also transmitting a message. When this happens, the two message “collide” and become garbled. Each message becomes corrupted.

Ethernet solves this problem using a few different tools. The first is called carrier sense. Carrier sense effectively means that any host can detect when the network is active by listening for data. This helps us deal with collisions in two ways. First, each host can sense the carrier before attempting to send a message. That way, hosts only send data when the line is clear. This goes a long way to preventing collisions. But, that doesn’t completely cover our bases. It is also possible that two hosts could read the line as clear and start transmitting at approximately the same time. In this case, the collision wouldn’t happen until the messages were already half way out the door. This is where the second aspect of carrier sense comes into play. When any host is transmitting, it also must be receiving  other data being sent into the network at the same time. That way, both senders will detect the collision and can notify everyone on the network to ignore the garbled data.

However! there is some subtlety to making this work. There is an edge case that needs to be handled to make collision detection work. Imagine that two hosts transmit at the same time, but are physically very far away in the network. Imagine they are far enough away that both hosts are able to completely send their message out onto the network before they start receiving the colliding message. In that case, the collision detection method would not work.

Ethernet deals with this problem by imposing both a minimum frame size for the messages sent out onto the network as well as a maximum physical size of the network. By constraining the physical network size and ensuring that each transmission must have some minimum size, you can guarantee that any two messages sent at the same time will have a collision detected.

**Carrier Sense, Multi-Access with Collision Detection aka CSMA/CD**

When people talk about how ethernet solved the shared medium problem, they will say it did so with CSMA/CD. This is one of the core innovations of the early ethernet system.

## Was Early Ethernet Successful?

At first, ethernet had a very mixed reception. Metcalfe describes many people being unsure about the system from its inception and early development onto its release and announcement outside of xerox.

Many people worried about the unwieldy nature of ethernet.

Unlike networking protocols that came before, a lot could go wrong in the process of transmitting a frame out to the network. There could be a collision, some bits could be corrupted and lost. I didn’t really go into in this post, but even when there weren’t collisions, the protocol didn’t provide strong guarantees that the received data matched the transmitted data.

People didn’t totally understand the use case.

When the alto was released, it included ports for removable storage devices, so if you needed to transfer data from one alto to another, why not just load it into some storage and run it to the other room. This is one of those criticisms that just feels silly today, but you can sort of imagine the thinking behind it.

But! Ethernet was fast and it scaled.

Ethernet was way faster than the networking technologies that came before. Metcalfe describes that systems being used before ethernet had a bandwidth of ~50 Mbps while the very first version of ethernet had a bandwidth of ~2.8 Mbps.

Furthermore, ethernet allowed new hosts to be added to the network. If you wanted to add a new host to the network, you could just create a new connection to the shared bus and attach your host. By today’s standards, this was actually quite difficult. You would need to create a “vampire tap” into the coax cable to add the new host. My understanding is that was actually somewhat difficult to do. But it was possible!

## What Happened with Ethernet Next?

This post only really describes the initial version of ethernet that Metcalfe invented.

The first document describing ethernet was a 1973 memo the Metcalfe wrote within xerox. By 1976, xerox had put in a patent application for the technology and Metcalfe published a paper describing the system. By 1980, the technology was out in the open, and Metcalfe created a spec of the technology that others could use to develop networks, this was called the DIX standard of etherent. And finally, by 1983, IEEE created the 802.3 standard for ethernet.

By the time the IEEE standard of ethernet was created, the system had a bandwidth of around 10Mbps and the thick coax cables became the standard. Each ethernet link could be around 500meters large, and so this version of ethernet became known as 10BASE5.

Later on, the technology for the coax cables evolved and 10BASE2 was invented. It is conceptually the same, but uses thinner wires that are easier to work with. However, the size of the network had to be reduced down to 200 meters.

After that, ethernet took a somewhat dramatic turn with 10BASE-T. the thick coax cables were replaced with standard twisted copper pair wires (the same general style we use today), and the shared bus topology was replaced with a star topology.

As time went on, the shared medium of ethernet went away altogether. By the 90s, hosts all connected directly to a network switch. The switch would buffer messages and send them to the correct host. The switches removed the shared medium and the need for CSMA/CD.

Spiritually, the original ideas behind ethernet really lived on in the wifi standard. Instead of the shared medium for hosts being a copper wire, the share medium became radio waves.

## And that’s it!

I really enjoyed learning a bit about the original version of ethernet. It is always fun to dive into these inventions from the Xerox Parc days, at a time when computers were rapidly changing from giant mainframes to smaller personal and mini computers.

I really find it fascinating that the first version of ethernet had this quality of being a shared medium with all of the hosts needing to be aware of the potential for collisions and garbling their data.

I also can’t overstate how fun it was to read How Ethernet was Invented article by Metcalfe himself and the original Ethernet Xerox memo. Both of those accounts give a very personal touch to the whole technology. Those kind of narratives always help the ideas behind a technology stick in my head.

At some point, I would like to write a post about how ethernet evolved over time and get into all of the details about how switches work! It really is ironic that the core innovation of ethernet (the CSMA/CD) is not needed in contemporary ethernet because of switches. I’d love to explore that more fully at some point in the future

## Sources
Sorry I didn't tag all the facts I refence in this article with annotations! But here are the sources I referenced when researching this topic. For whatever reason, I felt like I was able to find some really high quality resources when learning about this piece! I highly recommend at least poking throught these.

References
- 1973: [The Original Internal Xerox Memo for Ethernet](https://ieeemilestones.ethw.org/w/images/a/af/Ref1_PARC_Ethernet_Memo_1973.pdf) 
  - Metcalfe's first memo announcing the idea for ethernet within Xerox
- 1976: [Ethernet: Distributed Packet Switching for Local Networks](https://dl.acm.org/doi/pdf/10.1145/360248.360253)
  - Metcalfe's paper which he released describing ethernet publically for the first time.
- 1980: [The Ethernet](http://decnet.ipv7.net/docs/dundas/aa-k759b-tk.pdf)
  - The "blue book" standard for ethernet.
  - Metcalfe helped create this ethernet standard after ethernet was released by xerox.
  - This came out before the official IEEE standard was created.
  - I find this to be the most readable specification of the standard
- 1983: IEEE 802.3 Standard (sorry I can't find the link to the pdf of this anymore)
  - This is the first version of the 802.3 standard for ethernet.
  - 802.3 is still the standard for ethernet, but it has evolved and expanded significantly over time to encompass all of the changes in the technology.
  - For my purposes, I found this spec too dense, I much prefered the DIX standard mentioned directly above.
- 1994: [How ethernet was Invented](https://ieeemilestones.ethw.org/w/images/6/6e/Ref2_IEEE_Annals_1994.pdf)
  - A publication in IEEE Annals in which Metcalfe describes the creation of ethernet.
  - Can't recommend reading this enough!
- publication date unknown? -- [IEEE milestone: Ethernet Local Area Network](https://ethw.org/Milestones:Ethernet_Local_Area_Network_(LAN),_1973-1985)
  - The IEEE page that marks ethernet as an official "milestone" in computational history.
  - I hadn't heard of these milestones until I started learning about ethernet.
  - Just think of them like unesco world heritage sites but for computers.
- 2004: [Computer Networks: A Systems Approach -- Section 2.3: Multi-Access Networks](https://book.systemsapproach.org/direct/ethernet.html)
  - This is a very high quality free textbook on networking!
  - This section describes the original Ethernet implementation and goes into more detail about the technical parts of the specifictaion than I did
- 2015:[2015: Building a 10BASE5 "Thick Ethernet" Network](https://www.mattmillman.com/projects/10base5/)
  - A cool project in which someone builds a 10BASE5 network and connects modern devices to it.
  - Fun read.
- 2020: [Retro 10base5 Thicknet and 10base2 Thinnet network](https://www.youtube.com/watch?v=bAcSnwmB_4Q)
  - A video showing a 10BASE5 network being hooked up.
  - I though this was a really neat way to see the actual hardware being used!
- And a large number of ethernet and networking wikipedia pages! I don't remember which ones specifically.
