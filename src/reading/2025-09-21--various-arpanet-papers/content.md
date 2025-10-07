For the past month or so, I've continued reading more and more papers about the ARPANET. At first, I started by reading a few overview or historical pieces like [The ARPANET and Computer Networks](https://beau-carlborg.com/reading/the-arpanet-and-computer-networks), but quickly realized I wanted to get more details from primary sources.

As I researched, I ended up building quite the archive of reports, specifications, speaker notes, and papers related to the project from over the years. These are only a small subset of the total amount of documentation related to this project, but I feel like understanding how these papers and their authors fit into the project helped me understand the story of the ARPANET, and by virtue of that, the foundations of the modern internet.

## Visionary Pieces by J.C.R. Licklider

Licklider was a visionary in the field of computation. While computers were still in their infancy, and well before they had reached broad adoption, Licklider was envisioning a world in which computers would radically transform how our day-to-day life works.

Licklider became the head of the Information Processing Techniques Office at ARPA. This office would eventually be the one to drive the ARPANET project, but its initial goals were to research and investigate the roles that computers and humans could play in defense projects.

Licklider was only in this role for a few years, and it seems that he eventually passed the baton to more engineering-oriented people who could execute on the large projects they were undertaking. But it strikes me that his vision for how computers could augment human life was the spark that got this project underway.

I read two of his papers while researching the ARPANET:

**[Man-Computer Symbiosis](https://groups.csail.mit.edu/medg/people/psz/Licklider.html)** from 1960. The piece was written a few years before any of the committees, organizations, or projects related to the ARPANET kicked off, and it doesn't even describe a system of connected computers, but it does describe the potential for humans and computers to work together to solve problems. In spite of the limitations of the hardware that was around when Licklider wrote this, he was able to grasp a future world in which computers could be used by humans as a cooperative tool during their problem-solving process. So even though this piece isn't explicitly about the internet, I like that it paints a picture of computation and thought that largely came true.

**[The Computer as a Communication Device](https://internetat50.com/references/Licklider_Taylor_The-Computer-As-A-Communications-Device.pdf)** from 1968. This piece was published once the ARPANET project was already underway, but my understanding is that these were ideas he had been communicating through shorter, more informal pieces for many years before. I found this piece somewhat shocking to read. In this piece, he sketches many of the use cases and interactions that anticipated the internet’s role in our lives. He outlines different use cases for computers connected together over the internet. He describes how people will be able to meet together virtually, and how computers could stand in place for humans in certain interactions. This paper was truly mind-bending to me because it feels like Licklider had somehow peeked into the future.

## Theoretical Work by Leonard Kleinrock

The ARPANET constituted a completely new way to communicate over telephone wires. Unlike the system before, the ARPANET had computers as entities in the system rather than people, and the data sent over the network consisted of small packets of data as opposed to circuit-switched analog voice data.

This new system had a fundamentally different architecture than anything that had come before, and in order to analyze and interpret the network, the existing theoretical models of communication systems needed to be updated. Leonard Kleinrock is largely credited as the creator of the theoretical models that would be used to understand a modern computer network.

While learning about the ARPANET, I read his piece [Information Flow In Large Communication Nets](https://www.lk.cs.ucla.edu/data/files/Kleinrock/Information%20Flow%20in%20Large%20Communication%20Nets.pdf) from 1961. I believe this may have actually been his PhD thesis. In it, he creates a theoretical model representing a "store-and-forward" networking system in which communication lines are switching between delivering short messages between many hosts. He helps us answer questions around what the effective capacity of communication lines in such a system could be and also gives tools for predicting how much storage capacity will be needed at the various nodes in the system.

This piece was written well before the ARPANET project kicked off, but Kleinrock's work would become essential as the project began and would be frequently cited by others creating the eventual ARPANET system.

## Independent Research into Distributed Networks by the RAND Corporation

While the ARPANET was the first project to successfully create a distributed system of connected computers, there were multiple investigations into the same idea that happened concurrently and independently. One such investigation was carried out by the RAND Corporation on behalf of the Department of Defense.

Before the ARPANET project was initiated, the U.S. Department of Defense contracted the RAND Corporation to investigate the feasibility of a distributed computer communication system that would be resilient to a nuclear attack.

In 1962, Paul Baran created a report titled [On Distributed Communications Networks](https://web.archive.org/web/20250826213518/https://www.rand.org/content/dam/rand/pubs/papers/2005/P2626.pdf). This piece describes how a system of computers could be connected in a "distributed" design using routing algorithms to forward messages through the system to their final destination. It goes into some depth explaining the resiliency of this distributed model and explains how the system could be tolerant to certain links or nodes going offline.

Ultimately, the Department of Defense did not pursue this project due to a number of bureaucratic and funding issues. The work was classified and wouldn't be shared with the people working on the ARPANET project until things were significantly underway.

## Independent Research into Message-Switched Networks in the UK

Yet another example of concurrent and independent research into message-switched computer networks was done in the UK for the National Physical Laboratory by Donald Davies. In 1966 he published a paper: [Proposal for a Digital Communications Network](https://web.archive.org/web/20250826124931/https://www.dcs.gla.ac.uk/~wpc/grcs/Davies05.pdf) that describes a message-switched system of communication between computers.

This piece is largely recognized as coining the phrase "packet" to describe the individual messages that computers would send to each other in such a system. This piece also outlines the format and shape of such a packet, and the design will feel familiar to anyone who has studied subsequent versions of message-based protocols.

Similar to the report on distributed communication systems from the RAND Corporation, this report would be shared with the individuals working on the ARPANET project once things were well underway.

## ACM Symposium Presentations in 1967

In 1967, a conference happened in Gatlinburg, Tennessee, that would bring together all of the groups that had independently been working on these early computer networks.

At this conference Lawrence G. Roberts (who had become the head of the Information Processing Techniques Office at ARPA) gave a presentation titled [Multiple Computer Networks and Intercomputer Communication](https://web.archive.org/web/20250323190011/https://nobbyville.com/Internet/Multi-net-inter-comm.pdf) in which he outlined the high-level plan for the ARPANET. He described using a message-switched system to connect multiple computers using the existing telephone network and gave a brief description of the protocols that would be needed for such a system.

This piece is not significant because of the content in the presentation, but rather it is significant because at this event, many of the individuals working on various forms of message-switched networks independently would finally meet and exchange ideas.

My understanding is that Paul Baran, who was working in the U.K. on a packet-based system, attended this event, and somebody aware of the research done by the RAND Corporation into computer-based communication networks was also attending.

At this event, all of these individuals were finally able to share and collaborate on the work they had done.

## Initial Designs for Interface Message Processors

Following the ACM presentation, work would continue on the ARPANET and the goals and requirements for the system would be further clarified.

Eventually, ARPA would contract with a company called Bolt Beranek and Newman Inc. (BBN) to build Interface Message Processors (IMPs). In the ARPANET system, IMPs are the core internal nodes. IMPs are the computers that are actually connected to the telephone network and are responsible for sending and receiving packets of data.

There are a few documents related to these early designs, but I particularly enjoyed reading [Initial Design for Interface Message Processors for the ARPA Computer Network](https://web.archive.org/web/20250202022757/https://apps.dtic.mil/sti/tr/pdf/AD0682905.pdf). This report outlines much of what would eventually become the core ARPANET architecture.

Of course, there would be many revisions and updates between this initial proposal and the final system, but the core essence of the ARPANET is captured in this document. This document outlines the computer hardware that would be involved, and it describes the core protocols that would be used to facilitate communication in the system.

## Papers and Reports Further Specifying the ARPANET

Once the ARPANET was active and in use, various aspects of the network would subsequently be further refined and specified.

There are a handful of pieces I found helpful to understand the protocols that were settled on for the ARPANET after the initial report.

**[BBN 1822: Interface Message Processor, Specifications for the Interconnection of a Host and an Imp](https://web.archive.org/web/20250726005428/https://walden-family.com/impcode/BBN1822_Jan1976.pdf)**: This report is effectively the formal specification for how a computer connects to the ARPANET. It describes how a computer that is connected to an Interface Message Processor can format messages to be delivered through the ARPANET and how a computer can receive messages from the ARPANET. If you were a person working on building a driver or program that would allow a particular computer to use the ARPANET, this is the report you would use. You will often hear the protocols outlined in this document referred to as the Host-to-IMP protocols.

**[BBN TR-89: The Interface Message Processor Program](https://web.archive.org/web/20250915145549/https://walden-family.com/impcode/Technical_Information_Report_89.pdf)**: This report describes the protocols that are used to send and forward messages within the ARPANET. Specifically, it describes how IMPs connect to each other and communicate with each other. This set of protocols is often referred to as the IMP-to-IMP protocols. This is helpful for understanding what sorts of systems the ARPANET had in place to try and deliver messages reliably and to avoid overloading the network.  
**[Host to Host Protocol for the ARPA Network](https://upload.wikimedia.org/wikipedia/commons/2/22/McKenzieNCP1972.pdf)**: The previous two reports describe how a host can talk to the ARPANET and how IMPs inside the ARPANET can talk to each other; the final missing piece is a specification for how hosts will communicate with each other. This paper describes that host-to-host protocol. Sometimes, this protocol is simply referred to as the ARPANET host-to-host protocol; other times it is referred to as the Network Control Program (NCP). In many ways, NCP is the spiritual predecessor to the Transmission Control Program, which eventually became the Transmission Control Protocol, or TCP.

## Overview of Application Programs in the ARPANET

Most of the papers and reports I've described so far mainly cover the underlying principles or infrastructure of the ARPANET, but none cover what people were actually using the ARPANET for.

My understanding is that the early ARPANET was sort of the wild west. It was people at different research institutions trying all sorts of different types of communication between their devices. But eventually, some more established application protocols did emerge.

I found presenter notes from a lecture series at Harvard that cover some of the different application-level programs that people were using on the ARPANET: [Host to Host Protocols](https://walden-family.com/am254/vol3-4-walden-host-host-protocols.pdf) by David Walden in 1975.

These lecture notes give a decent high-level overview of the ARPANET, describe the challenges of working with the ARPANET, and also describe some of the application protocols that emerged, like TELNET and the File Transfer Protocol (FTP). I like this piece because it gives a good overview of what people were doing with the ARPANET.

## Take-aways and Reflections

- So much concurrent and independent work. The idea was in the air.  
- So many different personas. The visionaries, the engineers, the mathematicians, the government spooks, the big telcos. The whole story does feel operatic in a certain way.  
- So many of the core ideas were set right from the beginning; they got a lot right up front.
