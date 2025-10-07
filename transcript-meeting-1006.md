Meeting Title: Gong API integration and product team insights exploration
Date: Oct 6

Transcript:
 
Them: Will leave it run-in the background. So in the meantime, what else could we do? Well, I thought one exciting interface is voice. So to save us a few minutes, I've already asked Codex to integrate with our real time API and our agents SDK. And I wanted to wire up all of this into the app, right here on this green little dot. At the bottom right of the screen. But what's great about the real time API is that it brings natural speech to speech into your app, but it also connects to any MCP server in the contact of that conversation. And so that really got me thinking, what else could we show you in this room turn into an MCP server? And then I thought, wait. We have a lighting system, so maybe we could wire up the lighting system of the venue over to an MCP server. So let me check out this task that I sent you Codex but this time in Codex cloud. So you can see here my prompt. I asked Codex to wire up this MCP server for this very specific model of lighting system I gave it, like, the the reference docs that I found, and I gave it the exact interface that I wanted to have for my UI to work. What's fascinating to me is, like, if you look at the logs, for instance, like, that's really the magic of, the agentic behavior of codecs. Like, I could have asked a teammate to do that, but because the task was very specific, now Codex is my teammate. And if you look at how it went through the process, it actually figured at some point that it needed to kinda find new information about command eight to move forward. So then he went ahead to fetch the GitHub doc again. Kind of really, like, operate and call tools along the way. That's really the magic of GPT five codecs. You can really let it go off, do some complex tasks, and and you'll see this, like, agentic behavior emerge. And then after that, I did one more turn to actually ask codecs to, like, include the readme information so I can understand how to run it. And sure enough, here is my MCP server. Now going back to, Code, what's very interesting sounds like the Xbox task just finished. We'll see that in a moment. Awesome. And now going back here, you can see that you have all of your local, but also your cloud tasks right here inside the Versus Code extension. So if I click on the build MCP server, for instance, this is the task I just showed you on Codex cloud. And here, I can actually apply all of the changes locally if I wanna test them. So I can just go ahead and click apply, and now all of the changes with this MCP server now included locally. Now I didn't wanna watch you I didn't want to let you watch me do NPS install here on stage. I just took that MCP server already, and I started to install all of the dependencies to make it run. So let's now put all of that to the test. But first of all, if we go back to our app right here, let's see if we can actually control this camera now with this Xbox controller. There we go. It works. That's pretty awesome. What's funny is, like, didn't even specify to codex which button should do but it figured that the joystick was probably a good idea. So that's that's actually perfect. But let's, do the real test now. Let's enter voice mode and see, what happens. So sorry in advance AV team, but we'll try to see if Codex figured this out, to control the lights. Hi there. Hello? Hi there. I can hear you loud and clear. Let me know what you need. Yeah. What do you see on the camera? I see a large audience in front of you, with rows of attendees seated and ready. The room is well lit, and the crowd stretches far back, feeling the space. That's right. Could you shine the lights towards the audience? There we go. I've just lit up the audience with a nice bright walk. They should be perfectly highlighted now. Can you, greet every Can you, greet everyone here in the room now? Absolutely.  
Me: Hey. How are you doing, Joseph?  
Them: Hey. Doing well. Nice to meet you.  
Me: Nice to meet you too, man. Heard good things.  
Them: Yeah. I like look, guys. Looking forward to this.  
Me: Yeah. Me too, man. This will be fun. I was just watching, on the other screen, I got the OpenAI dev day going. It's  
Them: Nice.  
Me: live right. Yeah. They just released, so they did the app SDK. So  
Them: How is it?  
Me: they're opening up, hey, Anna. How are doing? So they just opened up, the, ChatGPT. So  
Them: Mike.  
Me: they've tried to, like they opened it up so that as a developer, now we can get inside of it. So me and my buddy have been Joe gonna make the naturally useful dating app. He was in having tech talk to other chat GPTs, find you a match, So might be able to find a job. Yeah.  
Them: That's great.  
Me: So you did that one, and then the cool one, Anna, was telling you about  
Them: Yeah.  
Me: it, the agent the agent kit, which has been rumored about, which is I don't know if you ever seen n eight n, Neiden. It's kinda like a it's a UI system where you're just connecting nodes, you create agentic workflows.  
Them: I I think it's like Zap I think it's like a new age Zapier.  
Me: Yeah. So they just created their own called agent kit. Hey, Garrett. Good. Good. Just was just watching the,  
Them: Hey. Hey. How's it going?  
Me: AI has Dev Day going on. So they  
Them: I know. But alright. Corey had it up on his computer. Was just as just listening and sent and sending Adam just big screenshots of, like, 70% more productive.  
Me: Yeah. Yeah. Yeah. The the guy the guy  
Them: Anything you use so far?  
Me: what they just live coded in the last ten minutes on stage, the guy connected the camera above the thing, and they connected to an Xbox controller. And then using his voice, he connected it that he could tell it to turn the lights up and down. I'm like, dang it. That's pretty cool. Ten minutes. This guy's better than me, but hopefully, I can give you guys some cool stuff. So  
Them: Thing any big announcements so far?  
Me: so, app SDK, I was just telling them. So they're opening up chat so then you could bring in apps. It seems like it's just a step above like an MCP. Which is good. And then, my my goal has always been able get access to people's memories, like, so the way it knows you. Because I think you can do some cool stuff with that. So me and my buddy, Joke, we're gonna make the the  
Them: Go.  
Me: an actually useful dating app. We're we're just yeah. Because my chat knows me better than most, so better than I know myself sometimes, I think. So have that connect me with someone. That'd be nice. And then  
Them: So the only old age of mother  
Me: yeah.  
Them: of mothers doing the matchmaking.  
Me: Said it's an omnipresent AI. You know? So, that one and then the agent kit, which is gonna be pretty cool, I think. So, there's other versions of this, but n eight n is like a it's a UI. It's similar to Zapier. You know, you're just connecting nodes.  
Them: Yep.  
Me: And then straight into AI. So they did a the the woman on there, she did an eight minute demo. It was pretty cool. So, you know, those are good. They're useful. I I personally once I feel like once you learn, like, cloud code or cursor, just, like, easier to go to the source. But at the same time, those things are good. To, like, quickly spin up a prototype. It might be something we look at. I was trying to get access. I can't find the site yet, the agent kit, but  
Them: Okay.  
Me: yeah. Anyways so, yeah, excited to have you guys here. So I've got, like,  
Them: We have  
Me: a bunch of different ways  
Them: we have we have the the one prod the one that we've been talking about for  
Me: bunch  
Them: for a while with the call notes summaries and Gong, which we walk you through several latest thinking. So that can be, like, the the core of the hands on. And then I think in between we can do some just, like, high level, but we can probably start just pretty  
Me: Yeah.  
Them: pretty plain, and I'll start the transcripts also for us too.  
Me: Yeah. I got I got a roller running.  
Them: Just to make sure just to make sure we're all, like, set up and and starting from the same same point.  
Me: Cool. Let me pass over a GitHub. Okay. So, well, first of all, what do we got going? We got everyone's got cursor here. On the computers or k. Garrett, you got it. Justin, do you have cursor?  
Them: Yep.  
Me: Okay. Cool.  
Them: I have cursor, but I've I've used it very little.  
Me: Okay. Don't worry about it.  
Them: Is a lot of this is new to me.  
Me: No. That's what it that's what it worked for.  
Them: And I think yeah. So I think we all have cursor. We all know how to get codecs lit up. Within cursor I think we all created a a project folder  
Me: Excellent.  
Them: we at least just have something. And we have a transcript from our a discovery call that we just ran with each other, but it was it was sort of like a lightning round discovery call. And so we can see how I think it also left some open questions or, like, some to dos that that we probably have to go through in  
Me: Cool. Cool. Well, look, from my from my perspective, you we could do whatever you guys wanna do.  
Them: call.  
Me: My goal would be, you know, can you a little bit or whatever, but my goal is to get you guys hands on and then you know, learning. I think that's just gonna be the best way just using it.  
Them: Yep.  
Me: So, like, that So what I just sent out is  
Them: I mean, it we got 404.  
Me: oh, on that GitHub? Great. Welcome to my life. Just constant debugging. Okay. Is this public? Should be public. Oh, it's private. Hold on one second. Let me shift. Okay. Change visibility. It's public. Make this public. Red and understand. Okay. God, good. Loves its security. Okay. We should be public now. Try one more time to re read that page. Cool. So  
Them: Yeah. We're good.  
Me: Cool. So what you do, here, I'll just show you how to do this. So we're just gonna have cursor clone it down for us.  
Them: Should we open our project our our respective  
Me: So we have your designated project in cursor. Right? So basically, the way it would be, you know, let's pretend I'm in a new window. Open project. You guys I'll just put MGNT sold. Right here, I'm just creating a fresh project folder for you. Then I'll hop back over, but I'll show you. This is the way I like to just clone things down. I just have the AI doing. Right? So here, shift shift enter to give yourself a line break. I don't know if you guys know that one yet. And then  
Them: Yeah.  
Me: hey, GPT. Let's clone down the let's clone down this GitHub into the project folder. Please, and thank you. And then just tell it, press enter, and it'll bring it down. As long as we got the, permissions correct. And then so just do the same thing as as along with me, and then it you know, takes a second. But and, obviously, there's there's easier ways to do it. We could do it through the CLI, that type of stuff. But to me, it's just just get the AI to do everything.  
Them: Hold on. Alright. I think I need to  
Me: How's that work?  
Them: Yeah. One sec. And then, just go through is what we're is what we're doing just downloading some basic some basic things such that when we're going through this process later, it doesn't get tripped up because, oh, you don't have I don't know.  
Me: Yeah. That's a cool year too.  
Them: Latest stuff that you can click on installed.  
Me: I I put a couple, like, notes documents that we'll go over, but the main thing is now to show you the next step after we get this all listed in here.  
Them: I'm still I'm still looking at something else, so I'm not  
Me: Okay.  
Them: haven't done this.  
Me: Yeah. So I got a script in the read me setup that will have the AI run next, which will basically verify everyone's got, like, the correct like, a a fair a level of Python setup, a Node. Js, and then that kind of, that'll be enough for us to be able to hopefully, be able to walk things through without having to do constantly, like, pip install or an NPM package. Which is I'll walk you through those as we because we're gonna hit stuff where we'll have to install packages. But for the most part, just let AI do the work. You know? So  
Them: Garrett Garrett and Justin, where are you guys at? Typing out the frontier. You're you're good.  
Me: Okay.  
Them: Okay. Yeah.  
Me: Cool.  
Them: It looks like you're good.  
Me: Alright. So next, I would create a new press that plus button just create a new, new chat. We'll go over context engineering and select that in a minute. But  
Them: Can you actually talk about when you do new chats because in my last project, I think I just kept  
Me: Continued it. Right?  
Them: kept going through the same the same chat. So what's what are the trade offs  
Me: Well, let's get the script running, and then I'll walk you through it. Okay? So new chat,  
Them: do you know when to do a new chat?  
Me: and then get go read me. So you press this app button right here. And then just type in read me, and it should see that read me setup. And then click it, that'll bring that into your context.  
Them: Does it  
Me: And then just tell it, read the read me, and do the do the stuff. Sorry. I don't type much. It's Hey. Jack. Go ahead and read the ReadMe setup and do these scripts for me. Please, and thank you. Yeah.  
Them: Why say please and why say please and thank you for something that's so basic?  
Me: Oh, I, one day when the robots take over, I hope they they still like me. So, yeah, I'm just kidding. Actually, is, like, a positivity, Sam. Standpoint. So okay. So here's why. Let's go back to that context engineering. Question. So, alright. So the amount of tokens matters a lot when you're doing these things. And so if you're gonna continue a conversation, you're really gonna be squeezing in a lot of tokens. And that's fine, but you wanna stay on one track. So that other one, I set up as the GitHub age. That one we're gonna keep on GitHub And then what we brought over here, this guy is responsible now for running these execution scripts. Gonna take a fair amount of context. Or, I mean, it's a fair amount of tokens right here. So it's gonna read it. It kinda takes a little bit. These newer AIs are great, but they definitely are a little slower.  
Them: Okay. So each of these  
Me: So yeah.  
Them: Okay. So each of these have their own contacts contacts window.  
Me: Yeah. So now GBT five can handle up to a million tokens. But when you're in cursor, they limit you to 200 k, which is about right. Once you start messing past half million tokens, like, really, we'll go over it. But there's there's contact contacts windows the amount of full amount of tokens you could have in a conversation. And there's this idea of attention just like a human. You know, the more you have on your mind, the less you can put devote attention to things that matter. You always wanna be to get the best results, you always wanna have as little as little as necessary in the contacts window. So I don't know if you guys do one.  
Them: Do you have a rule of, like, when it gets to a certain percentage, you just start you start fresh?  
Me: Yeah. And then what I'll do is so does your guys' cursor they've been updated so you can see the little percentages down here? So mine says no. Wait. No. I lost you.  
Them: Yeah. Yeah. Mine already says 12%.  
Me: Screen stopped here. Cool. Yeah.  
Them: For the readmake  
Me: So yeah, so we'll let this run and now let's get into my little PowerPoint. Right? That I made. So the way I made this thing too was it's just cloud code. Right? So what I wanted to do here's the basic of well, here's what it looks like. So I took your your web page that you showed me the other day, I made a style guide off of that. That's in the thing. It's called the Mad Knight style guide. And then so just kinda I like I like the style. I was like, alright. Cool. I think  
Them: It's more like dev it's it was more like Devin's  
Me: oh, really?  
Them: I don't even think I gave it anything that I  
Me: oh, really? Okay. It looked like something you would make. So I was like, oh, I like this. The the purple and something like that. Alright. So we'll go over in a second. What I wanted to do, though, just show you guys kinda get a kickoff So, I had, Cloud Code make that one. What I'm gonna do over here is this is how I would use codec. Right here. Let me make it a little bigger so you can see. But k. Classic. Hat. So I'd go notes expanded. So it's the same thing as the at sign right here. The I think there's a backslash or whatever. That kinda indicates it's a page break. It's a full token, it knows to, like, know something else. And then I give it the Magnite style guide right here. And then I will tell codecs Hey, codecs. Make me a PowerPoint style web page. Call it index two dot HTML, the number two. Make it look cool. Follow the magnet style guide. You're using the notes 10 o six expanded as the content. Let's see what you come up with. It cool. Give me some cool animation and shit like that. Thank you. So it's a simple  
Them: And what are we what are we doing?  
Me: problem. Oh, no. You guys aren't doing this, bro. I was gonna put this happen.  
Them: Oh, like no. But what is  
Me: I'm gonna make another version  
Them: what but what is the what are we trying to get out of this?  
Me: Gonna make another version of this, and I'll show you the difference between codecs and Claude's results. So in my opinion, codex, which uses GPT five, is a little bit better with UI these days. It's a little bit better visually, but we'll see what the results are. Anyways, that's how you would make something like this is you give it, like, content in the sense of these notes, which is like my outline for random stuff I kinda wanted to show you guys. Right? These okay. So it started here. Right? Which is just just show you how quick this is. Right? I got couple links. Then I tell Claude to go expand it by using sub agents to research. Each of those to use to tell it to use the web tool, that type of stuff. That takes a while. That was, like, a fifteen minute process, so I figured I'd do it beforehand. It creates the content right here, which we're about to talk about. I combine the content with the style guide, and I tell it to make this. So where I wanted to start today while we're waiting for our computers over here to get set up, Looks like mine's done, but, I have everything installed anyways. Arna, where are you guys with that process?  
Them: I I couldn't follow that one read me prompt. I was doing the at read meeting. It wasn't it wasn't appearing for me.  
Me: Oh, when you typed in the, when you brought the code in or from GitHub?  
Them: So I I have the GitHub in the project on the left hand side, I started a new chat. And then I I just couldn't follow the the prompts that quickly.  
Me: Oh, oh, don't worry about it. No. All you gotta do is just give it a click that at sign right here. Type in read me setup. I'm sorry. I'm just quick. Yeah.  
Them: Read me set up.  
Me: So read me dash setup dot m d.  
Them: Yeah. I don't Yeah. I don't know why it's not  
Me: See your screen a little.  
Them: So the  
Me: I'll walk you through. Nice. Nice. Okay. Yeah. So click that at yep.  
Them: Yep.  
Me: Yep. Okay. Cool. Read me dash setup dot m d. So yours has in it hasn't set up your index yet, which is fine. So just no. No. You're good. Go back over. I'm good.  
Them: I'm good.  
Me: Go to the new chat. Yeah. You got it all into the project right there. So it just doesn't have your your indexes taking a little bit longer. Yeah. You're not unpaid. Right? Okay.  
Them: Okay.  
Me: That might take a little  
Them: I don't think no. I'm not.  
Me: Okay. It'll find it. So just tell type in, just hey, read the read me setup. Dot markdown. Yeah. Totally fine. It'll it'll find it. Mark down and do it. Got it.  
Them: Got it. Okay.  
Me: Okay. Now just tell it to execute the commands. Is it okay  
Them: Is it okay if I'm on Windows?  
Me: okay Totally. Just tell it x oh, yo. It's, okay. Yeah. Okay. I should don't worry about tell it to do execute the commands, and then for anything mac related, do do it, find the Windows equivalent. So I I believe yours is called I had to do this on someone's computer, like, a month ago. They'll figure it out, though. Okay. And I think  
Them: Okay. And I can Okay. And I can, I mean, I can follow along anyway the best I can?  
Me: I can follow Oh, yeah. Yeah.  
Them: Don't wanna slow slow down the whole session. So  
Me: Cool. So you're getting the Chocolatey, which is the package manager, install Node. J s. And then click the okay. Next time it brings up a command because you're gonna have to do a lot of We're just gonna allow it to run It used to be called yolo mode, so don't click to run yet. Click allow yeah. Use allow list far left. Left of yeah. Right there. Click down. Run everything. This will yeah. Continue. Sounds sounds scary, but yeah.  
Them: Got it. Speed everything up. Alright.  
Me: It's gotten when when they first made that thing, it was freaky because it was like that it could mess up your computer. This is, like, six months ago. Now it's pretty good.  
Them: Okay.  
Me: It's usually stay in your project folder, so like that. So yep. So you got Python 3.13. That's great. PIP is installing it. Good. Cool. So let it run. Alright. I'm gonna take back the, screen. Oh, yeah. Of course. Yeah. Anytime, guys. Know this is,  
Them: Yeah. Thank you.  
Me: moving a little fast, and then I sometimes forget I've come from. So you know, this these seem crazy when I first stopped in. You know, I'm literally about a year in now doing this, like, almost every day, but it it comes quick. But when you first go, remember being so scared of the command line, know, like the terminal thinking I was gonna mess up everything on my computer, you know. And so, we'll get you hopefully, we'll get you guys up quick. Alright. So speaking of so basically, earlier this year, this idea of vibe coding is now kind of all around. The it all started with this guy, Andre Carpathy, He's this brilliant engineer, and he just kind of on 02/02/2025, he was like, yeah. This is what I do now. Like, we called it Vibe Coding, and ever since then, it's kinda become this whole whole thing. You know, as you'll see, I basically don't type much. I use he uses Super Whisper. I use Whisper Flow, same thing. I recommend it. But, you know, it's like a I think it's $12 a month. Their free version gives you 2,000 words per per month. And then that might be a good way to start.  
Them: Yeah. I I asked IT to go through a security review for it, so we'll see.  
Me: Yeah. So, anyways, there was kind of like a joke when this kinda started. And then a lot of people made fun of him for it even though this guy's like a brilliant engineer and, like, at the forefront of LLMs. And since that tweet, it kinda created, like, a whole new style and, like, you know, now companies like yours, legit companies are looking at it. And I think it's a it's a great way for people to get into coding, to move quick, all the type of stuff we've been talking about. So let's move on. Prompt engineering. So, Claude put out this this, blog post couple months ago. It's kind of all stuff that we all kinda knew who was here, but it's prompt engineering is what goes into that text box. Right? So the question is, how do we get the best results from that. Right? Now what I'll tell him, Garrett, the way I kinda think of it, so I went to law school. So in law school, we use a writing pattern called IRAC. So issue rule analysis conclusion. So the way I always think of prompts is actually kinda similar to that, which is if you read all these there's a 150 page blog, if you read the whole thing. It's a good intro page. That. I don't expect you to read it. Right? But it's essentially comes down to just kinda breaking into that, which is okay. Hey. GPT. Here's my problem. Right? I need I want to get these scripts installed on my computer. The rule is follow this ReadMe dash setup. Analysis, we don't have much analysis for this one, but it's like, okay. Yeah. So I'm actually on a Windows right here. The scripts are for max. We need to do is find the Windows equivalent, etcetera, etcetera. That's kinda where I put the brain dump. Is. So after I set up, like, here's the issue slash goals of what we're trying to do, I give it kind of like a rule Follow these follow these notes. Follow this style guide, these types of things. Then I kinda just brain dump. And then when I come back at the very end, they so the beginning and end are probably the two most important parts of your prom. Because that's where the attention really pays attention beginning and end. Right? So at the end, I try to give it the bullet points of, hey. Remember these rules. Like, follow that read me. Do we're actually on a Windows, so make sure to find the Windows equivalent. Alright. Go run. You know? Something like that. That to me is what kind of there's a lot more we'll go through some better examples. Kinda prompting in general. You guys have access to this this version right here. It's index dot HTML in your thing. Wanna go back and look at it more. Just simple notes, know, The assigned rules and use, the assigned rule rules. Right? That used to be the big, like, hey. You are an expert sales analysis. Something like that. Like, giving it a persona, that works. People are moving away from that, though. It kinda limits it sometimes. So that's we'll discuss that one in a little bit. But I'm starting to move I used to be like, yeah. Hey. You are an expert codering in engineer. You're the best in the world. Whatever. A joke used to be telling you that it's Tuesday afternoon. Because that seems to be the the like, for some reason, like, if it thought it was a Friday, you'd get like, way more less good work, and it was a weird thing. But you know, I think the the models are just getting so much better, but it used to be a joke. Like, you know, you had to, like, trick it into doing things. They're getting better, though.  
Them: So why why did you get away from that?  
Me: Because of, how good trained they are,  
Them: For seven?  
Me: so if you say you are just a sales analyst, it I think it gets it only into that. Here's what the training data I should be looking at rather than, like, the world of stuff to be able to make different connections. It's still useful, but now I'm starting to find better results from just letting it, you know, just giving it the rules. Or, like, here's here's what the the issue is right here. So also also the the other thing is now, we'll go dive in and let me show you real quick. I'll pull I was gonna pull this up after the next section. Where we got it? Okay. Vit The system prompts. Right? So when you type something, there's also, like, these, like, hidden systems prompts. Now this is, like, the example of, like, the cloud code prompt right here. And these things are getting way longer and way better. Are the things you don't see when you use cloud code. It's submitted every time. So it goes through and this is like a brilliant prompt. I've done things where I, like, mess with a little bit, and all of a sudden, it messes everything up. I mean, look how long this business  
Them: And how did you get this, and how do we think about using using this?  
Me: Yeah. So these types of prompts. Right? Well, just start, I mean, it's to me, it's like understanding what is underneath the hood and then kinda trusting that Cloud Code has some of the best prompt engineers in the world. And that they're gonna be better than us. So kinda being like, I'm a little long with my prompts, but when I give it to it, like, you know, it's the planning folder, and it's I try to be simple instructions. You know? And trust that these prompts under the hood are next level. So, I guess since we're going to a prompt engineering, you know, because this is probably the best one out here. Right? So, you know, here's this is  
Them: We're there is some problem.  
Me: so someone hacked it. I mean, there's this guy named Pliny the liberator.  
Them: Where  
Me: He he's on Twitter. Yes. He's on x. I believe he's Pliny the elder, Pliny the liberator. He anytime a new model comes out, he, like his whole Twitter thing is he hacks it. Gets the system prompts out. So he got it out. This is a, lane chain, which is like an open source kind of like it's like an open source AI community. Right? And then they sell some products on the side. They recreated Cloud Code. So this is an open source version of Cloud Code. CloudCode is written on TypeScript. These guys made it on, Python. Right? So but what's fascinating about this one to explain how cloud code works is so that as you can see, it's a long prompt. This this system prompt under the hood. This is taken from Pioneer's hack thing. But here's the way it works. Okay. So the big thing under Claude is, as you can see, we start with the goal of it. But what makes Cloud Code work is the to do list tool. Right? So you it's given five tools. I think it's a to do list, a file reader, and then a write tool, and two other ones. Let's see. But the way he does the the the way Claude did its rules that are really effective, I would say, you do when it it's like how to do something. So positive prompting, plus a negative prompting. The negative prompts are just as powerful as telling it to do something. Right? So as you can see, don't use this tool for straight for single straightforward task. Task is trivial. Tracking. Can complete it. Purely conversational and informal. It's meant for so it's it's saying, don't use the file tracking tool and the to do list if it's a simple question. Which kinda has you know, sometimes you ask that, whatever. Then it gives after it gives the rules, it gives examples. I would put this into, like, still part of the rules, but you're starting to go in the analysis category. You know? So this one example when you use the do list, add a dark mode tab toggle. And then it's like, here's how your what your to do list would look like. One through five, So it breaks it into steps. Right? That to do list is the key because you're creating a loop with cloud code where it starts to knock off each task individually. That's what makes it different than, like, ChatGPT. It's like that. So we get more examples. I  
Them: Do we do we have those? Project through  
Me: I gave you the link to it, and then we could just process if you want. So it's a GitHub.  
Them: okay.  
Me: I think it's I think it's really interesting. It's a it's a little cocky  
Them: How do we how would we get it? Because we see like, I saw the HTML. I saw the me, but not the not this prompts.  
Me: Okay. Yeah. Here. If you guys wanna pull it down in your own file, go ahead and boom. Let me see. Okay. Cool.  
Them: And does this affect this lets us  
Me: So this is  
Them: this lets us see and control  
Me: is  
Them: clods cloud system prompts. If we use Codex as a company, it also effectively lets us steer codecs in a way that that we might like it, and almost doesn't matter that these are  
Me: Yeah. Cool.  
Them: cloud system prompts versus codex systems wrong. And so it's really just our ability to control this and see what's in it.  
Me: Yeah. This is just to see it. Right? You're not gonna be able to, directly edit it. Yourself, right, inside a cloud code. Now cloud code SDK, which is, it's basically cloud code as a as a thing if you wanted to build your own version of it. Right? I was talking to you guys about it. It's It's so they release a new one. People are getting good results. I haven't had time to play with it. It was released last week. Also, in dev day, they just released codex SDK. Right? So now we're gonna be able to build products with these codex or clot code. You still won't see these prompts in there. You won't be able to directly modify but this is under the hood. So understanding how this thing works, then building stuff. Now so the real way to build on top of this so I actually I was messing around with this one trying to build my own version, I started messing the system prompt. I actually realized it's better just to leave the system prompt b. And so the tools underneath in cloud code are the crucial part. Right? So tools are this is the to do list. It's the right tool.  
Them: And so is  
Me: Let me find you the  
Them: And so is the way to think about this that if we and you'll also have to talk to us about codecs versus cloud code if we're if we're as a company right now just using codecs. But is is the way I think about this that we should understand how these system prompts are constructed so that we know the best way to interact with them.  
Me: Yeah. I would say it's, it's not necessary, but I think it helps a lot. And, then especially because we're at a unique time. Right? The these things in the next five years, there's gonna be kids who don't what's under the hood, but they're it's gonna be so native to them. You know? So I think there's some power, at least for me, of understanding what's under the hood. Right? And it's like cloud code is, like, almost like it's like an alien piece of software. You know? If you told me it was ten years ago what it could do. Right? It's it's insane. And same as codecs, all that stuff. But it's and then what's brilliant, what I like about looking at this is this it's an amazing example of a, like, a top level prompt. So if you're gonna get good at prompting, this is a great example. Right? Then from there, understanding this new concept of tooling build giving your giving your AI agents as you build them the I the tools. Right? And when I first started building these agents, I would go really complicated and tools. And then what I've grown to is the way Claude does it, they got five tools in here. Like, you give that agent really broad and capable tooling that's generalized. It can then, like, really build its I mean, as you can see, it build anything, it's got five tools. Right? So it's got the list files tools, a read file tool, edit file tool, and a write file tool, and a write and then the to dos. Right? And then yeah, the tasks are how it builds out to to dos. Or it takes the to do list, turns them into tasks, individual things. So that's kinda like it's kinda wild. Like, it's so powerful, but it's very simple underneath it all. Even though this is long and stuff like that, but that's about it for clot code. So now  
Them: When you say that codex is  
Me: that it's that it's basically the same, and they changed some words  
Them: more or less similarly constructed?  
Me: for copyright purposes. You know? It's and that's the way this AI world works. It's like someone comes up with a breakthrough, everyone else copies. You know? And you just gotta keep running with it. And codecs, like, you know, so I was hoping today. I hope they do it. My favorite thing in cloud code is they have a plan mode I'll show you that in a little bit. It's shift tab tab, and then you get to plan. It doesn't it doesn't write anything, but it loads everything into the contacts. It gives you a plan, and then you press enter and execute, and it really keeps it on track. Codex doesn't have a plan mode, so bringing it back to they copy each other. That's like everyone's like, yo, CodeX like or OpenAI. Please start copying it. You know? Like, they know it's everyone knows what their system prompts are. It gets hacked the day of. So anyways yeah. So that's kind of prompt engineering right there. To me, you know, it's a it's a wider topic. It's best learned doing, you know, as we go right out different prompts like that, which we're gonna get to. Now the new one that Claude just put out last week, it's a really interesting blog. I I put the the link is in the the n g n t consult file. It's context engineering. This is a shorter blog. But it's the idea of prompt engineering over time. Right? So as you continue a conversation or as you have Cloud build it out, how can we best take advantage of that in cloud code 200 k tokens? I think it's about 236. Right? So like, I look at that was the deep agents. Let me grab Yeah. That's the one I brought down. Alright. So codex should be done, hopefully. Update plan. Alright. Cool. Yeah. So codex is done. But here's a cloud when I had it build out what we're looking at that that little besideshow. Contacts. So if we look at it, that system prompt we are just looking at is about 3,000 tokens. So one and a half percent of its total 200 k stuff. System tools is those right tools, those types of things. 6% of the overall context And then my MCP tools, I have nothing in, installed here. So, that's just point 6%. In another project, when I have, like, super base, like, takes up, like, fiber these MCP tools you got, they're really powerful, but you can't, unfortunately you can't just like keep installing them, like, permanently because it will clog up your context. And then so that that one took 15.7%. To build this PowerPoint right here, which, I mean, is a simple HTML. It's nothing creep.  
Them: So this is something so that's a a something that you can  
Me: Contacts usage. Right?  
Them: see at any project to understand what's your current context usage.  
Me: Context of usage. Right? And that was a single turn. Didn't even put it in plan mode. I just same thing we just gave to codecs. That I showed you guys. That was what I did over here. I just gave it those I gave it the, basically the outline and I gave it the, style guide and I'm like, just make me this thing. Right? So that's was 15.7. Now so, like, from a cons now going with this context engineering, what it is now is it's prompt engineering chain together. So, you know, if I'm going to let's make a little change. So there's no real animations other than the touch points. Let's go Hey, Claude. Great job. Thank you very much for that. Looks good. Now let's add in some animations as I scroll down, specifically in the context engineering. I wanna show how that all kinda works together in a visually animated way. Thank you. So positivity matters. I will, though, when I'm by myself, I will cuss it out sometimes, though. That's counterproductive because then it starts to say, oh, we need a we need make him happy. He's right. We need to reassure him. It's like, it's just wasted tokens at that point. Anyways, let that one work. In the meantime, let's take a look at what codex made. I think I gotta go. Okay. So it gave me buttons right here. Interesting. Vibe coded. Reality check. So that's stuck to it. It's interesting. I would tell it to get rid of this thing because it's really that's annoying, but anyways, environment operational tactics. This one really went off the rails. It didn't even use my outline. So that will happen. Wait. Let's bring it back. Okay. Like critical for messing the weak point of things. Yeah. Alright. That's kinda interesting. Contact synergies goes beyond the one prompt, creates the entire memory palace. I think it's oh, there's auto scrolling in here. That's a problem. I can hold it.  
Them: So this was just a quick a quick experiment on codecs versus  
Me: Yeah.  
Them: codecs versus cloud output.  
Me: It's kinda interesting because it it usually, I get better results. Like, with UI based stuff, and this is just pure UI. Now I was having to do HTML, which I don't normally write. I would write, like, a Next. J s project, which is like like web apps. And stuff like that. That's usually where I have codecs do it. It's pretty good. Anyways, go back to the this one. Let's see where we're lot is. Okay. So Claude's still working. Alright. So  
Them: Help us because it's a lot of window switches. So just  
Me: Yeah.  
Them: even if, like, it's sort of a train of thought for you, just help us, like, with every new window. It's, are we talking about the same thing, a new thing? Like, what's the  
Me: My bad. Yeah. Yeah. Okay. Yeah. It's cool.  
Them: sort of, like, the what's our frame of mind when we're looking at it and something?  
Me: Let's do this is context engineering created by Cloud Code. Remember, we have Cloud It's live updating it right now as it's coding. It was kind of oh, it just finished. Okay. So let's see what it said it did.  
Them: Because I in essence,  
Me: This is I'm trying to get  
Them: Because it because this is because just to sort of say it a lot for myself, we're sort of learning some foundational things, but by also using the coding but using the coding tools to also teach us about coding is is teaching us about what they can  
Me: It's kinda meta. Right? We'll get to building in a second. So  
Them: do as well.  
Me: but, yeah, so it says it did the animated thing. What I really wanted to see let's just go back to context. So we use we were at 15.7%, and now we got, we're up to 55%. Right? So it actually so that second message, the reason why that happens is because it takes everything it did in the first time around and also loads that into the second message. So we're bringing in double context each time. So it it's it's it's like exponentially getting bigger as you go through messages. So that's why you always got go ahead, Care.  
Them: Sorry. Good question. I've been bothering back and forth between my instance.  
Me: So these are called, hooks or slash commands.  
Them: Where did this window come from where you just typed context?  
Me: So you go backslash right there, the one with the  
Them: No. I I get that. But, like, the the one that you're actually typing in  
Me: Yeah. Oh, oh, gotcha. Yeah.  
Them: where did it come from?  
Me: Terminal.  
Them: How'd you get  
Me: Create new terminal. Right?  
Them: Oh, okay. Oh, okay. Okay.  
Me: Yeah. Yeah. Yeah. No. Isn't that an annoying one in in cursor? Yeah. So because you can install cloud code directly. I do have that too. But they did this update last week. So now it's I'm type some stuff. Well, okay. I don't like this UI. It's a glass UI. And then so it it just looks like shit in my opinion. So I've been just working off the regular terminal version.  
Them: Yep. Got it.  
Me: Of it. So they should they should clean that up next week, hopefully. And then yeah. So if you go to new terminal, you'll get this bottom one right here. Alright. So context engineering is that that concept of prompt to prompt to prompt. Understanding that you're not just bringing in a new message, it's taking all the history of your chat, bringing it back in. Because if it doesn't do that, then it has no historical reference. So if you ever build a chatbot, and you try to have it, you basically send in one prompt without, like, a history function behind it, It won't it it doesn't remember what was the last thing because it's just an individual API call. You have to send everything that you previously discussed in a chat with it. That exponentially fills up your contacts as you go. So it's really important that, you not only are you sending in that system prompt again, you're sending it in twice. Because it was in the prior conversation history. So just watch out for that. Alright. So now something that I find really useful is gonna be this thing called Ripper five. So what I used to do, it's five operational modes when I'm talking to specifically the cursor one. If I'm working with cloud code, I'm just like you're at you're either planning or executing. Now when I'm talking to cursor agent, think of it as a ripper. Our research innovate, is basically just brainstorming. Planning mode, execute, and then a review. Right? So there's three modes that are kinda like prepping the the AI in cursor that if you just say, hey. We're in a research mode. Do not write code. Just research this thing. It will basically fill up the context. Not fill it up, but, like, it will go go and research your code base or go out into the world and look at docs. And it will try to get get these research things in place. The innovate brainstorm, you don't have to use that I like it when we don't necessarily have a solution in place. It's like, I can't I don't directly know if I want this button here, if I wanna want it over here or tied into something. Right? That's where I tell it.  
Them: What other one other quick question. I've got this HTML file open. Ran all stuff to get there, all all well and good. The the perfect this is a super basic. The per the purpose of this page is literally just the text. Like, there are links to docs at certain points throughout the page that I've seen. But, like, in for example, if we look at mode one, nothing beneath that. Right?  
Me: Oh, yeah. There's no links. Yeah. Yeah.  
Them: Like, link links to it, etcetera.  
Me: Yeah. We we could I think in  
Them: I mean, I I I got it right.  
Me: yeah. Yeah. In the actual page over here, believe I got that. You can go command click on the things. Yeah. So you would wanna  
Them: Yep. Yep.  
Me: yeah. I could tell it, yeah. What was that? Slight four, slide three.  
Them: All good.  
Me: Oh, yeah. You got okay. So ripper five, you wanna see the actual, like, instructions, I used to use this as a system prompt. So ripper five dot m d is in your cursor right here. We can take a look at it,  
Them: No.  
Me: so I used to use this as, like, a very explicit system prompt. Problem is it takes forever to do this. Now so cloud 3.7, which is not being used anymore, it was very, like, you'd give it a question, and then it would just go and change your whole code base. You really need something to restrain it. That's where this was useful. You don't need to do it anymore. The the agent got a lot better at, understanding to restrain itself. But would still say from a telling it's a research and not do code or telling it to research brainstorm and plan for me or just like that. You'll see me doing that once we get to work right here. That's very powerful because it's you're rather than it researching and then doing executing code, which is a lot of tokens in a single turn, you're basically splitting that up and focusing it on, alright, let's figure out the best way to do this. And then once you once it gives you a plan that you like, you just tell it to go execute. You'll get better results that way. So we don't use it as a system prompt anymore. But it's very useful, like, way to think about how to control cursor. Cool. So that's that. Deep agents, which is what I was showing you over in that other one, which cloud code thing. That's a lane change deep deep agents concept. Right? Just detailed system prompt, planning tools, sub agents, file as system access. That's  
Them: Can we can we go back to the the, ripper framework? I think it's sort of familiar to to us. How do is this, just a way of of thinking and training up the team, or how do we  
Me: Yeah. Was your I think that that's best  
Them: how do we think about these modes and and applying these modes?  
Me: I'll show you once we get moving with something. Right? And then you'll you'll figure that one out. I wouldn't I think it's just it's a mental framework. Right? It's it's splitting your at the very least, split your agent the way it works. Into, like, a nonwriting or nondoing code, framework. It loads things into the context. Like the proper things, builds out a plan, it gives you the plan, and then you tell it to execute. You don't let it go and just run off and go change code. You're not gonna you're not gonna get great results with that. You know, what's nice with cursor, it gives you the ability to see the way the agent is thinking. Right? And if you just tell it like, hey. I got this button isn't working, Go fix it. Especially in larger project files, it will be like, okay. I went and changed this, but wait. It actually won't work now. And then but wait. Deeper in. And then it's basically just jumping conclusion to conclusion rather than actually thinking through something. So and we wanna force it to think through something. Take his time. Load those tokens into its context properly, executing once it knows the entirety of it.  
Them: Yeah. But this might be  
Me: So  
Them: You bet. This might be jumping ahead, would this look like having effect this would look like having a markdown file for each of these ones? To explain this is what we want you to do when you're researching. This is what we  
Me: Yeah. You definitely could. I don't think you  
Them: want you to do when you're innovating.  
Me: need to because so people use this so much. When Cloud 3.7, it's basically brought into the training because of the way when you use it, they get to bring that stuff into training data on the free modes. I turn that off because I deal with a lot of PII for law. But, anyways, the training data, it's basically been trained in on what each of these modes are. If you just say research, it will go and research. You I always tell it like, hey. Do not change code yet. You know? Sometimes it still gets overeager. GPT five codecs when it came out two weeks ago, that one was, like, impossible to get it from just running ahead and trying to change things. Things. It was it was, like, very annoying, then they did a little update to it, now it it will sit listen to your rules. So but, yeah, these are powerful. This is gonna be the one. Like, guys, we're working today. You're gonna see me all the time being like, hey. We're gonna research brainstorm in planning mode. Sometimes I'll just leave it out of research mode, whatever. I do it this is just and then all the way through execute. I don't even use review that much anymore, but you definitely could. But if you go if you go and make this, like, a so the way now is an agent side m d becomes your rules, and we just paste it in the ripper five. You might as well do it. So okay. Did it's gonna be very, very boring. Right? So let's go here. Use sonnet or now use GPT five because that'll take forever. Hey, g p t five. So take a look at at the what do you want it to do? So index two, what I wanna do is go and really switch up the style guide in here over to the OBZ style guide. Wanna change the way it looks. So, yeah, do that. Okay. So now I didn't say any research. Right? But because we have the ripper five in the rules protocol, it should do that. So it used to be curse called cursor dot rules, but now it's just agent dot m d. It goes that goes into the system prompt. And then creates the rules. So and it really slows it down because that is a lot of rules. Right?  
Them: Did you  
Me: You're right.  
Them: did you because I remember sort of an agent's MD file showing up in one of  
Me: No. No.  
Them: my projects. Does it create it automatically? How does it show up?  
Me: No. That's just something you need to know to do. So agent side MD is in a new way. So for codecs, and cursor, you can set your rules in the in the agents dot m d. And then it will read those and then set it as, like, it's, like, cursor rules. You can also do it, through the UI. I think believe it go cursor  
Them: So there's a whole So there's a whole there's a whole bit of best practices of markdown of standard markdown files to create that help put up the scaffolding of of your project. And some of those things you might reuse every project, and some of them are custom to your project.  
Me: Yeah. Yeah. So see how now we're in research mode right here? So this is why and then so it'd be like, alright. Yeah. Now enter enter plan mode. And so we'll just keep going. And then and so this was useful for clot three seven, when it wasn't as smart as it is, but these g p t five the 4.5 sonnet is insane how good it is. You really you really just need a a brainstorm a research brainstorm in plan mode. You just tell it without having it clog the system prompt with the agents folder. And then it will it'll kinda just present you a plan, and then we'll just say execute. Yeah. You don't even need  
Them: You saying it'll create those markdowns or it just doesn't need need them?  
Me: You don't even need them because it knows it. Yeah. If you just say we're research mode, don't change any code. You say it up top, you say at the bottom, it it will give you a really good  
Them: Yeah.  
Me: it will do the research. It will plan. It won't change any code yet. And you could, but, I mean so I like from I set you guys up with here's my basic rules. Right? These ones right up top. It's clear, easy to read logs. I I like emojis. Any any, like, good engineer will make fun of you for that. But, like, as, like, as rookies kind of, like, these terminal lines get so confusing. Granted, this cloud code, but if you're imagine looking through this and you're like, where is the error? And you don't even know where to start. Right? There's emojis really if you have a red x, red x next to something emoji wise, it's like, oh, yeah. That is the error. You know? Rather than rather than just a bunch of text. So I like that. I say use existing code patterns to the best of your abilities. That kinda keeps us in track. That's a double edged sword because if you have bad code in a place, it will just keep duplicating bad code. So that's something to watch out for. I actually had a project I was working on, right, where I had I had one database, that was bad, and then I worked did a lot of work to make the database good. And then but in the code, I had it referencing the bad database. And it kept like, days after I had made the I thought I made the clean migration, it kept writing in the old bad database. Things would break. I'd be like, why is this breaking? And it would constantly kept being because it was referring to the bay the bad database. And then I was like, what the hell is going on here? And then I realized because I had it using existing code patterns, deeper in the code, had reference to the the old database. So I was constantly thinking that was the correct way to go. So anyways, spent three or four days of dealing with a lot of errors I wouldn't need to if I didn't have that rule. Anyways, moving on. Completed code change is make implementation notes in the planning doc. Do not delete just added notes unless the doc starts with logs. So I always I use a lot of plans. If we were let's see if I got anything active over here. Deep agent test, sleep Python test. Yeah. So this one's a no one, but, like, There's not too many plants, but in here, it's just lots of plans. And then so what I wanted what I've realized now is as cloud code or codecs or cursor goes through, what I I don't want it to delete anything in the plan. I just wanted to create notes of where it did something and how it did it. That that one rule right there will enable it to do that. I don't even read this stuff after the plan's made. Right? But what it is is as I refer future agents, to the plan of like, hey. We're in phase four or whatever. It can go through and view how the other agent accomplish these things, where it's at. That kind of helps. And then yeah. Update. I this is my new one, update progress dot m d with brief session notes, date and date and time. It just becomes a log of work. We go. Saw someone doing that on GitHub, and I was like, oh, it's kinda interesting. So we'll see how useful it is in the long run. It adds one extra step. It's not that expensive in the long run. So that's been the latest. Yeah. So as you can see, 10:06. 11/17, it built a PowerPoint thing. You know, nothing crazy, but yeah. So anyways, let's see where we're at. I think  
Them: These are things for for us to consider what I mean, there's there's, like, completing the projects that we're trying to complete. That's we're also thinking about how to enable our 50 person product team. What are the what are the best practice  
Me: Yeah.  
Them: or the workflow that we think can help them?  
Me: Yeah. I think I mean, these these rules, just kinda like I did with you guys, I just set you up with a rules file. Right? And I think that, you know, and it's gonna everyone's different. So as you guys understand, these rules are very powerful. They can also screw things up. But that's why I try to keep them short and sweet rather than having the whole RIP or five protocol in there. So as you can see over here, like, alright. This is the plan it wants to go execute. Right? Which is, you know, it's cool, but we just went through it took a long time, and we really could've just went from research mode and tell it's a plan at the same time and then just go execute. So anyways, I'm gonna rip we'll rip her five out. As well tell it to execute. I'd execute. So it's gonna switch up the color scheme on the index. What we're looking at over here. We'll see how it does. Yeah. So gave you guys yes. These these are real agents of the deep agents, and that's about it for now. Now let's get let's get to have some fun. So that was me kinda just doing it. Let's let's talk about building something, and let's let's try to put these to work. I think it'll make  
Them: Mike, I just wanna say that that was helpful even though I think we'll probably have to, like,  
Me: Yeah.  
Them: read this transcript and ask the transcript questions. But I think I think this gave us probably all little light bulbs  
Me: I  
Them: about rolling this out to the broader team.  
Me: Alright. Cool. Yeah. Because I know for them, that's what we'll have to you guys will have to figure out a way to, you know, like, productize this knowledge and stuff like that. To me, though, it's just like, think building putting these things to practice, like, you'll see that in action, it'll really click in. That's where it'll stay. You know? So let's discuss. What do you guys wanna build today?  
Them: So, so we have so this is the project that, like, I've sort of talked to you in in bits and in bits and pieces. And I think I told you, we get the whole company gets dozens of what we call call notes every day. Which are some which are summaries that people used to handwrite after calls. And, and now they are somewhat automated through through Gong. That Gong generates the summaries and the attendees And there is an admin who using the Gong platform, can, I think can train train it on understanding topics and so that it can automatically, label something as I don't know, a contract negotiation or that the topic discussed was live sports?  
Me: Yeah.  
Them: Or something. The the platform seems very geared for the sales team, and being able to track deals and for you know, for leaders to be able to track sales progress. We wanted to take a stab at so leveraging the underlying Gong platform, but building something that is more relevant for product and for the product team. And some of the key ask that we've received from, from our stakeholders is the the ability for the senior leadership team to receive a different output than a product manager.  
Me: Yeah.  
Them: So being able to have different, different output per personas, and and an understanding of of teams And then there's, so it's made some, some high level. And then ad tech is a very jargon filled industry. And we're not sure how the best way to to train it on what we mean by very, very ad techy things or very magnet specific things maybe part of Gong has been tray trained on that, and we're we're sort of not fully clear on on, like, how how Gong works in that way. But so even just, like, thinking of these roles, it's, we're not even sure of just where the adjacent other markdowns that would be needed in order to support this support this project. And I think we can we can try to keep it simple at first of, like, let's focus on two personas as senior person and a junior person. And probably also looking for guidance of in something like this, would you try to just have it do one topic really, properly, or do you try to build  
Me: Yeah. So I'd start. Right? Well, the question is you can land, like,  
Them: like, the overarching  
Me: here's the way I'd start. Right? I take one transcript with that add jargon stuff, put it in the chat GPT, see how it can do, and then start prompt engineering. You know? Seeing what we can get out of it in a single prompt compared to the transcript. Right? Now do we have, well, of all, do we have API keys to Gong or no? Oh, we do.  
Them: We do. We do.  
Me: Okay. Can we play with it? And just on a read area so we're pulling it out.  
Them: We have we're not sure what what so we can probably if if we fall down anywhere, we can we can figure it out. We haven't tested anything?  
Me: Yeah. Okay. So GitHub has a  
Them: But  
Me: Okay.  
Them: what's the what's the best point to also, I I still just have it from the chat from our Slack.  
Me: Okay. Okay. So that that's  
Them: Have you have you put or where do we even put API keys?  
Me: Okay. So that that's now we're going to security. So there's this thing called the dot e n b. Right? So you just click the plus right here. And then we go dot e n b. Dot e n v.  
Them: We also have open a open we also have open API OpenAI API keys.  
Me: Nice. Okay. Cool. That's that's good. We'll we'll do that one. Gong.  
Them: Should they be in separate ENVs?  
Me: You just keep them in a single one.  
Them: Or  
Me: So we'll go Gong API and then an OpenAI.  
Them: So in the project  
Me: API key.  
Them: that we have that we created for our call our call project this Gong project,  
Me: Yeah.  
Them: we should just create a new folder, a new file,  
Me: Yeah. Just keep it in the root. It might get a little messy. Actually, yeah. No. Let's create okay. We'll go Gong. Yeah. Let's go Gong inside of it. And then drop that EMV into Gong. And then so we will need that. I'm gonna go grab let me go take a look at so GitHub has a Gong open source Gong m c c p server. So this might be the way to start. Let's see how good this works. So let me give it to the group. Okay. So we're gonna do the same thing.  
Them: I don't really  
Me: We go  
Them: I really don't think how do I even no. I've never mind figured out how  
Me: Yeah. Just kinda click it and then press enter on it.  
Them: to rename something.  
Me: Yep. Dot e m  
Them: You just call blank you just say dot e n b.  
Me: Yep. Dot e m v. So that's your security file. That will in this git ignore already set up, this gets a little complicated. But what goes to GitHub? Is you always block that dot e m v. It never goes up there, so that protects your keys. Sometimes I think this security  
Them: I feel, I'm seeing, like, a weird thing.  
Me: Yeah. Go ahead, chair.  
Them: I don't wanna surely.  
Me: घंटे  
Them: So once I I  
Me: Yeah.  
Them: I had just a TXT. Well, actually, it saved as something else. Like an RTF. And I had the open API keys, that we had just received this morning, and then I put it in there. But then when I saved it to an ENV,  
Me: Yeah. Exactly.  
Them: it, like, not due like, what does this mean?  
Me: Go ahead and delete everything above the OpenAI key that you pasted in there. Just delete. I have a command a and then, delete it all.  
Them: I don't  
Me: Yeah. Yeah. So type in open all caps, OpenAI,  
Them: And so then I should just start over with because I have the open API key in a secret.  
Me: underscore So we gotta yeah. I can't use spaces underscore. API key. Underscore key key equals and then, no space. Yeah. And then just paste. Cool. And and then so see how there's that white dot right there?  
Them: Enter.  
Me: Just so that means there's unsaved changes, right, next to your dot e m v on the tab.  
Them: Mhmm.  
Me: Just command s to save. That used to drive me nuts because sometimes the so even the AI won't be able to read it until you've saved it. So it's just a little  
Them: Okay. And then we should have something else that is Gong API key.  
Me: Exactly. That that's where we'll go with that one. And I'm gonna clone down let me take a look at this thing.  
Them: And so  
Me: So I So I liked whenever I'm doing research on stuff, like, in general, there's so much open source software out there. I'll go to GitHub's search bar sucks. So what you do is GitHub space and then  
Them: Are they  
Me: I This is just a made up one.  
Them: How did you just get Gong API key?  
Me: So it's just a for the moment.  
Them: Okay. Do you have an access? We have a we have the your you have we have the URL for API calls. We have an access queue. We have a secret.  
Me: Alright. Let's see what this guy's got right here.  
Them: So how do we how do we organize that in the file?  
Me: So MPM rebuild. Open. Gong access. Gong access secret. So we'll change our EMV into that. So this is a, MCP right here. Let me take a look at we'll do so MCPs will allow us to plug right into your data into an AI. Let me just take a look at the documentation. So Gong, now let's see GitHub. Gong API, server, Ruby client, That's the freaking website.  
Them: I think we have the we have the  
Me: Yeah. I'm just wondering if they got, like, a GitHub, Gong,  
Them: right we have the right docs  
Me: set up. So sometimes they have, like, cookbooks for devs.  
Them: This is what we were sent.  
Me: Oh, nice. Thank you. Documentation. Cool. Oh, API. Okay. Cool. So the other thing I'm gonna do, I'm gonna set up a new agent over here. I'm just gonna paste this in. GBT five. We're gonna create a a basic some type of probably the the MCP for Gong We're gonna do a basic kind of app with it. We've got keys. We're gonna get that all set up. What I want you to do is create like, an overall Gong docs Gong dash docs dot markdown. Fill it up with relevant research so that a future agent will know what to do with the Gong API as we're doing it. Thank you. Use the web search tool obviously and go to that web page.  
Them: Can you just pay  
Me: Yeah.  
Them: Can you just paste that should we follow along and  
Me: Yeah. Yeah. No need for us all to do it. So this is the way I just have it go off. It's gonna do a little research  
Them: paste exactly what you just  
Me: for us, using the web page. It'll create, like, a basic like a documentation thing. So rather than us constantly reading through this, it just creates a way for the AI to go through this, create, like, a basic one. Then with usually, it'll give us links so that a future AI when it needs to look at certain endpoints, it will then go and look stuff up. Itself. Okay. We got that. Let's take a look at the Gong MCP. Awesome. Explain me how this works and, specifically the authorization, with the Gong MCP. Thank you. So this is that. GitHub, we cloned down. I so it cloned it down. It has access to the ReadMe. I can either go to a new agent or I just kept it right here at 24% we should No. Just watch me do it. We'll set it up. Let's just figure out where we're gonna go with this. If  
Them: Should we should we be doing this? No. I can give up  
Me: we're gonna do the MCP. No. I'll get you guys going in a minute, once we figure out what we  
Them: No. I I can't do that on that. I'm just watching.  
Me: wanna do. So like the clone done, reputacts, we know how it works. Oh, cool. We got again. In the example. So Gong access key, Gong access secret, and then simple oh, this is really simple. It's just a single index. So this might be the quickest way for us to get get into it. And see how it works. Right? So am I allowed to look at the API key, or do we gotta do it on your computer?  
Them: I I think you're probably fine with our with our agreement. So  
Me: Yeah. Cool.  
Them: oh, yeah. It was just one. Was just we got this. Alright. So Oops. I got Slack's calling.  
Me: Nice. Okay. Cool.  
Them: Just search for Sarah. Yeah.  
Me: Okay. Oh, Take the secret. Alright. Cool. Okay. So basic off. Is it okay. Cool. Now let's set up I think it's dot Yeah. I think we can go which one is? Is it the dot m c p's? How do I set up local MCPs? One second. I gotta look at another project real quick. Open AI. Let's go. It went up. I can't remember exactly how to do yeah. There we go. Alright. So what I'm doing is I'm just looking at my old how do I get dot MCPs? Go to x cursor. Okay. Yeah. Dot cursor.  
Them: What are we trying to do?  
Me: Don't worry about it. Yeah. So, basically, I forgot how to get MCPs into cursor. It's just just a it's the dot m c dot cursor. So this is how you set up an MCP locally in cursor. So that it only works on this one. And then I'm gonna go m c p dot json and then  
Them: And this is for any time that we're  
Me: So, yeah, this is to set it up locally in our project.  
Them: bringing in an MCP.  
Me: Which I prefer to do. The other route is through the settings. You can do connection Right? And so what what the reason I like to do it locally is because then it doesn't clog my context across different folders. I just brought a Stripe one in solely so that okay. Cool. So now I'm gonna tell it to run it. SP. Okay. Where is the Orgs Reed and Gong MCP?  
Them: Stripe was just is just a placeholder from the last  
Me: Yep. Aggregate.  
Them: project, and then you're going to replace it with  
Me: Yeah. Okay.  
Them: Gong information?  
Me: Now it says to set up a docker, and then let me ask real quick. It's I'm gonna set it up with the ReadMe. .Com. And then it never likes to look at my e n b, but gonna tell it. Hey. Okay. So based upon the readmeet, what's the quickest way for us to get the MCP working? Do we have to dockerize it, or does it just run? Additionally, I've set up an ENV. Do we need the access key secrets in there? Can we just pass it to the curse dot cursor m c p dot json? What do you think? Thank you. So what's nice is when you're building these MCPs, you can set it up so that it's connected This gets meta, but it's like we're gonna have the Gong MCP connected directly into Cursor. Then I'm just gonna be like, hey. Find me a phone call from today. Just to make sure it works. Then from there, we could then start modifying the tools to build out for the for your guys' team. Right? First step though is just making sure we're we're connected. So this is an open source. Someone made a Gong MCP. It's not good by any means. Was just looking at it. I mean, it's got but it's got retrieval access what we're gonna do is go build some custom tooling, which is the fun part of these things. Yeah. So it's got list calls. That's really all we need. List calls and then retrieve trans And then from there, we'll create some custom things.  
Them: How do we How do we understand the this this random open source MCP for Gong versus the API documentations for Gong and  
Me: Yeah. Okay. So yeah. MCPs are  
Them: and under and understanding if we're being if we're limiting ourselves.  
Me: doorways AIs to access API endpoints. Very powerful tools. It's kinda like the next level. I've been building a lot of them, and they're very, very powerful because you're then you're just using rather than building your own what what it was, like, six months ago before a MCPs became really powerful like they are when it was, like, brand new. It was you would build your own chatbot that was connected into that had tool calls into the API. So would call tool call, get info, bring it back, then you'd be dealing with your own chatbot. That's great and everything, but at the end of the day, like, you're never gonna beat Cursor's chatbot or Claude as, like, a desktop app or something like that. So what we're doing is we're giving these, like, beautifully crafted prompts these chats, access to the information and cutting out the building your own chatbot step. To me, that's the next level of these things. But what's nice is once we have the MCP working, we'll know how, we'll have the access for it. And then we can also build dashboards and stuff like that. On the side. Because when it's all just API access inside of this index thing, So from here,  
Them: I guess, this is a a silly question, but was there any point in sharing the API docs?  
Me: Not yet. It will be.  
Them: If and telling it, hey. Go go look at these e a  
Me: No. So it it definitely so right. So there is  
Them: docs if we have the MCP.  
Me: endpoints I can see from here. So we're hitting the retreat transcription API endpoint somewhere in here. Yeah. So this is this one. Haven't seen the code for that yet. And then we're doing the well, the list call tools list calls. So it's like creating, like, here's all the calls available to you. And then it allows it to then go, like, go find a specific call. Right? And then it will do that with the with the call's name, which would probably be a date and a user participant. Then so go find those. And right now, this MCP, it looks like it can only just, like, hey. I had a phone call last Tuesday on auto you know, September 30. Get that phone call for me. And then it'll bring it in, the transcript, and then the AI, you would be like, k. Do an analysis, these types of things. That's good. It gives us access to it. What we really wanna do is build out you know, so as I'm looking at this, we got that's six calls, or six API points four more, Yes. I mean, there's a lot of API endpoints.  
Them: Are you saying that we're we're going to, like,  
Me: Yeah.  
Them: customize or add to that open source  
Me: Yep. Exactly.  
Them: MCP and make it our own? If this was just that this was just a jumping off point  
Me: Yeah.  
Them: We're not, like it's it's we're not using it out of the box. It just gets us on to step two.  
Me: Exactly. So the one of the big yeah.  
Them: Do you guys have also, do you  
Me: How you doing, Justin? You've been a little quiet.  
Them: Garrett, how are you guys doing?  
Me: This  
Them: Yeah. To be honest, I was I was struggling with that the whole first project of just getting all the requirements downloaded.  
Me: Oh, really?  
Them: It just kept prompting the ad to troubleshoot it, like,  
Me: Okay.  
Them: a good half hour. But yeah, it had some, like, wignette that was stuck, and it just kept asking me to  
Me: Yeah.  
Them: to say yes to everything even though it's set to run everything. So I had to kinda work through how to how to get it to  
Me: Hey. What  
Them: fix the wing it. And yeah, I I finally got that to work. What it's asking me to, like, authenticate a lot of stuff, like,  
Me: Oh, god. Yeah.  
Them: GitHub, so I So  
Me: Okay.  
Them: trying trying to, work through that while pay attention. It's  
Me: Bro, speak up, man.  
Them: was a solid talent.  
Me: Help you there, but alright. Sorry about that then. Yeah. That script was I thought you guys were on Macs, so my bad. I didn't realize it was Windows here too. So I set it up for Mac. Okay. Next time, you have a Mac and Window. We'll set it up.  
Them: It's all good. I, I just got Adam's you see Adam after jump off.  
Me: Okay. I'll keep them go.  
Them: But, thank you, Mike. Catch up here. Are you gonna are you gonna come back, or you're just gonna, or you'll say I haven't I haven't seen it three. I'm probably gonna come back. But Okay. I don't know. This is some prebid is not in some meaning that they be, and I have to go away. Okay.  
Me: Good to see you, Garrett. Open to see you again. Alright.  
Them: Thank you, Mike. Alright.  
Me: Let's keep going over here. Sorry about that, Justin. I thought I thought you're set up. But, yeah, I guess that would make sense on the windows. And then we got an auto reach over there.  
Them: Doesn't make  
Me: Let's yeah.  
Them: it does it make sense to try to solve that, or do we wanna con or  
Me: Kinda wanna keep running over here, and then I'm gonna put it on your guys' computers  
Them: yeah.  
Me: We're gonna pop it up to get up, bring it back. That's when we'll need to make sure everything works. But, honestly, Justin, we encounter the issues, it's nice to have all that stuff set up. It's not necessary, though, because we'll be able to install them individually if need be.  
Them: Okay. Sounds good.  
Me: This did you we'll find out. Yeah. Node. J s is really the only thing you're gonna need right here. It doesn't look like we're using any Python, so that's a good step. And that one was early, so Herzerclot. Okay. After saving. Alright. MCP. Alright. Cool. Here's what we're gonna do. Okay. Did that do it? Oh, your access secret here. Okay. So I use cursor tab right there. Cursor at least in the paid version, sometimes it will, like, read your project file and know what you need to do. Tab it in. It's gotten a lot better in the last couple months. Anyway, so that should work. Now let's see if we have access. Hey, g p t five. Do we have, do you have access to the Gong MCP If so, list the tools. Thank you.  
Them: Near to your test  
Me: Yeah. It probably won't work on this first one.  
Them: And you're you're testing the connection.  
Me: Because usually when I get it going, it will say enable. Might though. Now you get to see me debug. Is kinda like  
Them: Because because Because you only just put in the access key, so it may not.  
Me: yeah.  
Them: Is that, like, a is that, like, you had to  
Me: Yeah. Sometimes and then probably  
Them: wait a second? Or  
Me: I'm assuming we didn't have we had something not go, listed resources. So back in the Nicki AI Data Connect. Because that's Firestore. So go to cursor settings. So this is normally where you see your tools in MCPs. I've got a lot of a turn off docker Yeah. Magnet invalid config must be an object. Open Chase or oh, there's something wrong over here. The daytime. It's saying it's working. Is also why I'm starting to think that this, the progress report rule not be the best thing because it takes it adds, you know, another half minute. Okay. These are the Gong dash shocks. These are the ones that will to. That's the what the other AI agent went out. Grab just the research. We don't even need to really read it until we have, like, specific questions. But okay. So the Gong MCP works. Sick. Okay. Keep all yeah. List, how about we list, Gong calls that have occurred in the last five days? So today is October 6. Go back to October 1. And then if we have more than a 100 Gong calls, then don't go past a 100. Just show me the first 100. Thank you.  
Them: And like, we we haven't even gone through, like, giving it the contact or telling it what we're trying to do or doing any plan. The it seems like your first step is just considering trying to think about what are the  
Me: Yeah.  
Them: connections that we need to make and setting up the, like, the  
Me: Yeah. Now we're about to get to the project because we're we're actually  
Them: foundation before you before we actually get to the project building.  
Me: here. I'm just doing one more verification to make sure  
Them: Like, I'm just  
Me: Yeah. Yeah. So, normally, I wouldn't know  
Them: Like, I'm just trying to think, like, think mentally, like,  
Me: Yeah.  
Them: how do we how do we turn this into a repeatable framework for for us that it's if, if we need to connect to external SIF the first thing should just be, like, get those hooked up in whichever way, and it and and then you figure out later how you're  
Me: Yeah. And usually,  
Them: going to apply those connections to the project.  
Me: with the reason I'm I'm going a little backwards, normally, I'd say plan it out. Research it, then we'd start to do this type of stuff. What I wanna do here to make it kind of visual is because I knew there was this MCP server, then was like, okay. So OAuth takes a long time. Like, we got lucky right here. Like, OAuth is kinda like the process of getting these keys to work correctly with it.  
Them: What's  
Me: Fact that we got it up, like, I'm like, yes. Alright. Cool. Now what we get to do is now is the fun part, which is where we're gonna start to plan. And then we'll keep our plan kinda piecemeal so I could show you guys how we got the plan, then we're gonna take that like I talked about, the prompt engineering. We're gonna turn that into a detailed prompt. We're gonna go execute it. And then keep in mind that ripper five framework. Right? That's where that's about to come in. But what's cool about this is having it already hooked up as we get to see if the results really quick. A lot of times, this wouldn't have, you know, we planned and it'd take a while to get it hooked up. We got lucky with this one. So the fact that this guy already figured out how to get everything hooked up, Use local oh, wait. No. So let's see if I can reuse the Gong client directly. Right. I'm about to to fetch? Okay. Cool. Extracting formatting data. Cool. Okay. Yeah. It actually is working. I should've just said 10 phone calls. I wonder. Yeah. I was like, how many are you guys gonna have? But  
Them: Yeah. I was a little worried Yeah. Was a little worried when  
Me: hey.  
Them: we have a we have, like, a 200 person sales team around the world.  
Me: Okay. So we can actually go into like okay. So let's discuss okay. So first of all, how are we gonna if we're gonna build a tool that specifically for the product team, not the sales team. Right? How do we identify members of the  
Them: Mhmm.  
Me: product team to grab those things?  
Them: Justin, we can we can sort of talk out loud through this. It's less specific product members, and it's I think what we would envision is we're not necessarily sure if it's, like, anyone can go into it or if this is, like, an admin that sort of creates these different reporting views. But but  
Me: Yep.  
Them: directly, it's a way for someone to say, I am this level. Like, you know, like, I'm this persona. And I'm looking for  
Me: Yep.  
Them: insights about this topic. And we're unsure if, like, whatever that goal is is that, is that actually three things where it's like, what's your what's your team or your product line, and then what is the thing within that that you're interested in? So that, maybe maybe two different teams are interested in the same topic. They would receive different insights depending on what team they're on.  
Me: Okay. I hear you. Okay. So it seems like well, I'll ask if we got better entry points, but the way this tool works, right, is listing the calls. So you can see all your subject lines right here. I'll pull this once it's done, we're at 65. Once it's brought all 100, I'll pull this into a c  
Them: That's  
Me: probably use maybe I was putting in a markdown. Anyways, this is kinda like your entry point, and then the way it would work is you would then go like, be, like, based upon subject line topics, go find the transcript if you're doing something wide. Or you can go grab transcript from it. So imagine this, though. This is one week and you guys have 96 calls. The problem is if we just go and grab every transcript, that's gonna take a I mean, it's not that big of a deal, but, it's a lot of processing power. Right?  
Them: Yeah. Yeah. I wonder if so Gong has it's even actually something to check here. But I'm curious, does Gong just have  
Me: Yeah.  
Them: the summaries that we can access, or does it actually let us get the raw transcripts?  
Me: So that's what I was gonna say next is let's just take  
Them: Because Because the subject lines aren't going to give us probably that useful information because it's just gonna be the client name. But I wonder if if it's not too much processing to be able to scan summaries and then based on those summaries, oh, okay. They talked about this  
Me: Yeah. Out of all these, do you see any subject lines you think are  
Them: topic. Let's dive into the transcript for richer detail.  
Me: interesting? Or, yeah. Look on this side right here. Because I'm gonna grab a transcript next.  
Them: I don't know. They're all really  
Me: And then because this is gonna be kind of  
Them: hard  
Me: let me know if anything jumps out.  
Them: We're trying to think, like,  
Me: Yeah. Yeah. Exactly.  
Them: We're trying to think like, I don't even know what we should be looking for to  
Me: Yeah. Yeah. Exactly. It doesn't matter. How about Fubo?  
Them: something that we maybe are familiar with the topic.  
Me: Spring surf.  
Them: Maybe. Because maybe they would talk about live, and I would  
Me: Yeah. It doesn't matter. Yeah.  
Them: maybe Yeah. Try that one.  
Me: Because we'll we'll we're about to make some cool tools, but this is kinda like the discovery phase of, like, playing around with something. Hey. Get the transcript for this  
Them: Mhmm.  
Me: the 46, this Fubo SpringServe weekly call. For me and just bring it into this the the whole transcript. Thank you. So because there's two tool calls that we have available to us right now. We also have it looks like, in the forties for an API. Right? That we can actually all these can turn into tools, and the word gets really powerful is where you start to combine tools into composite tools.  
Them: Mhmm.  
Me: Which  
Them: This is how you judge the strength of that of that open source MCP is you're like, okay. Well, this MCP can do three things,  
Me: Yeah.  
Them: but their APIs clearly can do 40 things. So  
Me: Now that we you've got proof that, those keys work,  
Them: so we know that there's more to add.  
Me: we have an entry point into the API. Right? Now we could we could technically add all 46 of these. That's not the best way to build these. What we should do though is just design okay. So for your purposes. Right? And I so I think there's it's about time. Let's grab I'm gonna grab from granola real quick. This part of this the train the transcript. So let's go Okay. I'm just gonna get marked down. Okay. Okay. Insights about this topic. Where do we I'm 24. Okay. So what time is Right?  
Them: When I started the overview,  
Me: Yeah. Yeah. That's what I'm trying to go up of these connections to project. Okay. We have a 100 that can't go past okay. So this is when I started it. I think we will just take take from here. Down. And then we'll go sales plan. Gong. Oh, what do you want? Okay. Can you pass that over? You can email it to me or  
Them: We also have a a a discovery call that we did. Separately. Let me see if I can just drop it in here.  
Me: Okay. That's gonna work better than this.  
Them: I just texted it.  
Me: We talking in my text messages, or no. Cool. Got it.  
Them: Yeah.  
Me: Alright. It's been a little slow on me. There we go. Cool. Alright. Nice. Good. Okay. Empty. This often means no recording it. When we try transcript for okay. My question okay. My question is, so is the transcript thing not working? Or, or is it just that specific transcript is missing? Can you hit one other one, get me the transcript back? It doesn't matter which call it is. Thank you. K. We'll let that run. I just wanna get it to return a transcript, make sure that tool call works. If not, then we could just we'll have it look at the docs, correctly get the tool call to work. Okay. Now it's okay.  
Them: Mhmm. The transcript. And if because Gong has summaries, and then I believe and then there's raw transcripts. I've  
Me: Summary. Right? Because then we could use that to kind of create an index based upon things. That might be  
Them: also be curious if there's a summary that I could  
Me: a little bit more raw and easier to use. K. So Gong tool ideas, then we're gonna go, Gong dash docs. That's you guys.  
Them: Where did the Gong tool ideas come from?  
Me: And then we're gonna create a blank  
Them: Okay. That's our okay. That's our disagree.  
Me: plan. Yong. Upgrade dot n  
Them: Normally, the way that you and Corey taught me originally was have a text letter. And so what's the what do the similar thing?  
Me: Say again, like, a contact That is the best practice. I'm just moving quick.  
Them: What's your latest what's your latest best practice?  
Me: So, yeah, I get I get, Corey's a lot better. Go ahead, Justin.  
Them: Wait. So  
Me: Yep.  
Them: sorry. Said the ideas at markdown file was was us. When when you say it was us, what do you what do you mean by I I just sent him the discovery the discovery call. The arg when I arghemax.  
Me: Yeah. It was supposed to be something else. I mean, it's I promise I should probably just  
Them: Got it. And we we call that  
Me: rename it and  
Them: Got it. Okay.  
Me: yeah. Discovery106.markdown.  
Them: I took let's just call it discovery.  
Me: Ten o six dot markdown. Cool. Alright. We're good. Alright. 5, take a look at the discovery1006.markdown. That's a discovery call discussing Gong tools for the product team at, Magnite. What, then also what you have available to you is the gongdocs.markdown. That is a a quick research paper on the Gong API. We are messing around over here with the, Gong, an open source Gong MCP. We are looking to, make it much more powerful. Additionally, we may end up making a dashboard to review stuff. What we're we're initial discovery phase right now want you to, go and research in the discovery call research the key parts of what the good product would be here. List those out at the top of the blank plan, Gong upgrade dot markdown, Then from there, for those ideas, sketch out ways we can get it done using the existing API docs right there. Feel free to use the web tool to go into the Gong API and research deeper endpoints if you need to if need be. Okay? Thank you. Alright. So yeah.  
Them: Actually, just dissect. What you what you typed. Because I would I like, if this were me, I I definitely would have said, you know, hey. Read this transcript. Yeah. Read all the way through and help us with with this plan. And and you're you're framing it as, like, focused on on those  
Me: A little bit of both. Right? So it's open ended. MCPs are APIs. Right?  
Them: on the MCP itself.  
Me: And then UIs are just taking info from an API usually.  
Them: Mhmm.  
Me: In this case, we can just create, like, a a landing page, you know, if we want to. Or we can just have the MCP.  
Them: Yep. Yeah. And you're and you said we might build a dashboard to review stuff, and that's, like, thinking about what what would be useful for you over the course of building it.  
Me: Yeah. Yeah. It's basically just access  
Them: And to bake that into your plan of, like, what do I need to know that I'm  
Me: to, you  
Them: going in the right direction?  
Me: to what what visualize what your thing is. That's what I've learned with these MCPs, because it's kinda so under the hood. You're having an AI. Sometimes it's good to just know have the access to the info correctly. So we're gonna figure out some way to search for specific product team things. Right? And then so, like, that one's gonna be a pain in the butt to, like, go back and forth to the, hey. Use it  
Them: Mhmm.  
Me: Does it work now? Does it work?  
Them: Yeah.  
Me: Maybe, like, doing 22 calls. Where I graph that shows, hey, we got it, you know, or  
Them: Yeah. We talked Can you talk about why you said list up the top, let's see. Research the key parts of what a good product would be. And so you're you're just saying build build a plan.  
Me: Yeah.  
Them: You're separate talent. You're explicitly telling it to give ideas.  
Me: Based upon hopefully, upon what you guys discussed over here. Right?  
Them: For the good product should be.  
Me: So I'm kinda is what I'm saying where the ripper five went from, like, very structured to kinda, like,  
Them: Yeah.  
Me: it's like just a way to think about it. You know, I'm having to research these things based upon your discovery call based upon the docs, I wanted to kind of brainstorm. I didn't say the word brainstorm, I'm kind of like come up with some shit, you know, and then plan it out.  
Them: And what's the difference And what's the difference between telling it you say API docs  
Me: Yeah. That would be with the web tool. So  
Them: but then you also said research deeper endpoints if you need to?  
Me: that would just be where it goes and Google's it.  
Them: What was the web tool?  
Me: Question. Right? So remember I had to go and create this Gong dash docs. Let's take a look at that. Might as well well. So this is kind of like taking this whole page, which is a long page, Right? With all these different things right here. And then turning it into, like, a simple, like, here's where things are. Yeah. This thing. So you know, this is much shorter. See how we got all these different links right here? So these are like it allows it by saying I'm giving you access to the web tool. It can go if it thinks it needs something from one of these things, it could go and just do the search on it. On the web page. So that's kinda what's nice, you know. So it's like just short, easy to use documentation and then it could go do deeper research. On a specific endpoint if it thinks it's necessary. Yeah. So let's see what happens right here.  
Them: And not limiting effect  
Me: Yeah. Exactly. Because there could be something wrong there. You know, we had an AI make the  
Them: You're not limiting it to the to the API documentation we gave it.  
Me: like, a some you know, it's a SparkNotes thing for it. You know? Cheat sheet. So I'm gonna let that run. We're gonna come back over here, figure out if alright. Cool. We got a transcript. So the other one, for some reason, it was empty. Holy shit. Long.  
Them: Okay.  
Me: Alright. Transcript endpoint is working. From another recent call. Hi, Cheetah. It's been a long time. Whatever. Call ID 44 let's get me just figure out what the subject line of that was. So we'll go Gong test So it's bringing it into here. What I wanted to Where did I put the c p exam where did I put that example Oh, plan gone upgrade. Dash. Processing. Teslas. There we go. Okay. So this call came from Bell and Matt Magnide weekly meeting. Okay? So and then here's the transcript. Do you guys know who these guys are? Bell and okay. I'm just gonna  
Them: Yeah. And it sounds like a Canadian call.  
Me: we got plenty. I'm gonna stop it. Hey. Give me a quick summary of this phone call, please, and thank you. Give me a summary. Quick one. Thank you. So we're reaching forty We're reaching 48% of context. It gets a little slower right here. This typically when I start thinking about moving over to the next agent. And this guy this guy has kinda served his purpose anyways. Was just MCP test point just to make sure we got it all verified and working. Alright. So they're waiting on Amazon guidance split French, English, two channels. Right. The approach, recording versus setup, inventory. Does this stuff make sense to you guys, or  
Them: I mean, sorry. It's it's hard because it's like product managers care about insights into how the product is being used or product requests or issues with the product, but there's a whole bunch of calls that maybe aren't relevant to product managers that are just like everyone's now  
Me: Yeah.  
Them: just now recording every single interaction we have. So a problem with this project is that there is going to be so much noise. Learning how to  
Me: Yeah. No. So alright. So do you know let me I wonder if we can get users  
Them: how to go search for the right needles in this haystack.  
Me: listed. So maybe that's the way to do it. Right? You can look for stuff in your own range. Right? And then what we could do is on the product team, we have everyone's emails from the product team. Right? So we can use, like, hey. Here is the, the realm of people. If they had a call this week on Gong, bring them into our  
Them: They're not  
Me: yeah.  
Them: They're not that's a problem. They're not in these calls themselves. There's, like, the sales team, and people just have their own calls with their clients, and they  
Me: Okay. And, boy, were you  
Them: may or may not talk about products or topics  
Me: is what's relevant for you?  
Them: that that a product Yeah. And so and it may not even be, like, a strict map of, like, this person only cares about these topics or these like, it it can cross over with each other.  
Me: Okay. So okay. So we got two different problems. Right? We're gonna get data  
Them: Easily.  
Me: It's a it doesn't so it doesn't even matter who's on who's on the call. Because what that one is what's relevant to product team so we can understand feedback, those types of things.  
Them: No.  
Me: We're gonna get, like, a database that we'd be constantly updating of those things. So summaries probably would point us in the right way. Still gonna want transcripts, but it's not that bad.  
Them: And I'd be curious if I'd be curious if, like, can the summaries tell us can the summaries help elevate which calls matter, and then there's a next step of and now dig into that transcript because you've you've told me that  
Me: Okay. So let's, how about this? Let's so remember I said when,  
Them: that's the call that matters.  
Me: it's like the best way to test these thing your prompt engineering is using, like, ChatGPT. Right? So, let's try to come up with, like, some test prompts to see, like, what is, you know, something that matters. So, like, what is, like, a product perspective, what's, like, mattering? You know, we're not trying to come up with the whole realm. Of what that prompt is. But, like, what would be something from this call that you think would be relevant to pop up? Yeah. So here's your subjects. Right?  
Them: This particular call  
Me: It's a prime cave integration, targeting approach, Okay.  
Them: This one might be too far too  
Me: We can go get other ones. I'm just trying to get test data as quick as possible.  
Them: disconnected for us.  
Me: Okay. I'm gonna tell it.  
Them: Yeah. So one might have been So one might have been a good one. I know. Yeah. But maybe I can keep looking at it.  
Me: Hey, GBT. Give me okay.  
Them: Maybe I can keep looking at that  
Me: We're gonna use the Gong MCP. We're gonna get another transcript us. We're trying to get some test data accumulated. Then we have the test. So based upon the test list, I will give you where did I put that test list? Oh, there we Okay. Do you guys know of any calls recently that might be relevant to you guys? Again, what we're trying to do is just set up test data so we can print test And then  
Them: No. That's right. The problem is it I know. Wait. But just show me the list of the oh, yeah. Wait. Okay. We're looking at  
Me: Curiosity may be a magnet. Pluto, Wilkins, Spotify. That'd be kinda fun.  
Them: call again. Alright. No. No. I went. No.  
Me: Dow Jones,  
Them: Because it's like I I need to be able to  
Me: Disney.  
Them: ask it a question. No. Keep logging. I was just, like, No.  
Me: Adobe Magneite.  
Them: You're going. You're going.  
Me: Search  
Them: Try that Amazon nine five eight try the Amazon MacKnight biweekly because maybe that's a call I was in actually.  
Me: Nothing yet?  
Them: Do you see that? No. You're no. No. You're about to scroll scroll away from it. Do you hear me?  
Me: How do you  
Them: I don't think you hear us.  
Me: You're muted, I think. Or oh,  
Them: Mike, can you hear me? Us, Mike? No. We can  
Me: Oh, sorry. Now I I totally hear you guys. Magnet Amazon Magnet?  
Them: can hear we can hear us. Okay. No. Go up. There was a one that's in Amazon. Yeah. Yeah. I might have been in that call.  
Me: Yeah. Do this Amazon Magnide. Get us the transcript for it. Save it into the transcripts folder. Please en beg you. Okay. While that's pulling that one out, because that's good test data, and then what we're gonna do is some prompt engineering. Hopefully, it's relevant. Basically, the best way to test prompts is to use something you already know the answers to. Come up with a prompt, keep tweaking it until we get the correct answers from it. Then what we do is we try to use that prompt on something we don't know the answers in. And if we're getting stuff that seems relevant and correct, that usually means you're in the right direction. Then from there, could take that prompt, tie it in with tools correctly, into the MCP, and we might have something powerful. And then from there, what you guys are talking about, like this kinda like this AI that, like, surfaces relevant things to to you guys. Right? The product team. So it's like, you know, we could do email summaries that go to you guys on, like, like, end of day. So we had 10 calls. Here's relevant things for the product team that popped up. We can create a dashboard that would, like, kind of just take your stuff, create, So I get where we're going. We're kinda, like, data mining for relevant insights from sales team's calls. Right? In a way, Okay. Cool. Yeah. I like it. Yeah. So there's different ways we can go about it.  
Them: Yes.  
Me: The MCPs is nice because it's it's AI  
Them: Yep. Exactly.  
Me: tied into it. So this would be, like, a direct, like, get me this transcript. Let me see about this type of stuff. I wish it was a little quicker, but I can fetch the transcript for call and save it to the Gong thing. Alright. Let's go back over to our dude over here. Done term. Yep. Yeah. The issue with  
Them: So, Mike, at at what point do we have to provide you with a list of all the  
Me: Yeah.  
Them: things that we think the product team cares about?  
Me: Yeah. So I think we're about there.  
Them: As, like, input for  
Me: Yeah. So I think we're about there. Right? So, like, let's start that, like,  
Them: for the AI as it's doing its own analysis of the transcripts and the summaries.  
Me: let's see. One second. I wanted to see remember we sent this one on this research task?  
Them: Okay.  
Me: Gong plan upgrade. Let's see what it did. I keep all so key product outcomes. So based upon your guys' call, admin view to find initial reports in the control, expand later, personas, executive product team, team lead, deliverables. Google search, build a search purpose of Gong calls and transcripts. Taxonomy, and context files. Factors relevant to Magnite. Glossaries for v one. A client list where my product alias is mapping. Port builder validation reports, changes over time and heating up signals. Okay? Does that all makes that seem like in the right area of things? Just from an overall what you guys talked about  
Them: Y Second. So now Personas, yes. Deliverables, yes. Quirtables, searchable queries, yes. Yeah. The validation reports are examples of Okay. Yeah. That makes sense. And maybe we'd build out more of, like,  
Me: Cool. Okay. And then so this is the way it proposes based upon the docs.  
Them: the deliverables, but I think it's fine as a first first go.  
Me: Right? Using the Gong API MCP first. So off headers, boring shit. Core data ingesting. What does it wanna do? Pagination confirm? Syscanonical call records. So it wants a database. Schema, supplemental metadata, verifying tenant docs. Okay. User's team's directory, that would be useful. Limits and reliability, honor limits, three requests, 10,000 a day. Alright. That's totally useful. That's We could definitely do this. Yeah. Something as you get as you start building out more, just pay attention to rate limit. It gets it's so annoying when you mess that up. But so three requests a second, which is doable. You just gotta set up, the AI will do it for us, it's a rate limiter to make sure we don't send out 10 requests in a second. Start simple, SQLite, Postgres, which would be Prisma. Know. If you remember that one when we did that. Senses schedule a Chrome worker. I like that. That's for email reports daily, weekly. You want okay. Cool. So list calls, two transcripts, and then new tools. List users, list teams, trackers, get calls. This is the metadata part. Right? Oh, a webhook. So when a new call comes in, we'd autoload it to the database. Open questions, confirm a tenant docs. Appaginations. Okay. Alright. So this looks pretty good right here in my opinion. Alright. So I'm gonna go back here. Patient notes. Alright. Alright. So from an MVP perspective, let's see. Awesome. I bet I'll just build this. Have clogged coke, get it right at rip, I think. Do you guys like this idea? It's gonna so it's gonna basically go grab calls from, like, the last week, put it in a database, then we're gonna run AI and kind of, like, run it through those questions. So we could basically have cloud code go scaffold these things and then what we need to do is figure out, like, what these prompts are gonna look like. Are gonna be running against the database. Which kind of where we're talking right here is let's, like, you know, So that's why let's take a look at that transcript we brought in. Transcript saved. Okay. We got two something. K. It says it did it. Gong. Gong MCP. Vetch transcript added Save Gong transcript. Oh, created another transcript folder. Okay. Nope. That seems to be blank. Hey, buddy. The that transcript text file you made is actually blank. I moved it over to the transcripts folder inside of the Gong folder. Instead of at the root. But yeah, so that file is blank. Is that because, because the call file is blank from a transcript perspective, or is it just you mess up? Let me know. And now on your guys' discovery call, did you guys talk about, like, what makes what are the insights you're looking for? Like, those types of things would do you have much of that, or is that like, in this call right here, the discovery call?  
Them: We were trying to think just where to where to start. Like, did  
Me: We got  
Them: I think we were we were thinking of pulling down those tracker categories. The Gong tracker categories that our sales team uses and just  
Me: According to product.  
Them: through that list, see which ones are actually and then look at the so they have, like, these top line trackers, and then they have, like, subtrackers, I guess, could say, or like, keyword relationships that say,  
Me: Yes.  
Them: I don't know, not just live, but when you see live plus sports, put that in this tracker bucket. So you're gonna pull those down and then have, like, a a list of those  
Me: So do you have access to that right now? Like, the trackers?  
Them: we would then I guess, prompt the AI to go look for any transcripts.  
Me: Or what The  
Them: Yeah. That that would I well, I wonder if it would be in that we were sort of hoping it would be in the in our Gong API connection.  
Me: Okay.  
Them: And it's like that's the term that Gong uses. They call them trackers. So it's like, hey. Where are the MacKnight trackers?  
Me: Okay. Let's take a look.  
Them: Set up in Gong?  
Me: So in Gong, hey, GBT five. So there's in Gong, they got trackers in the dashboard. Do through the API, do we have access to the trackers? Trackers that Magnite sees in their dashboard or is that a custom tooling thing? That might be business logic on top of it. Which would make it not accessible through the API. We let's take a look. I'm gonna have it look at the GOM dash thing and then we'll do some research. Yeah. Because that would be the next step is if you could share that one with me.  
Them: We see it in the Gong UI.  
Me: Do you guys have access to that? The  
Them: And it's a Yeah. I guess I guess retail.  
Me: So your your Amazon call was a empty transcript.  
Them: And then just, like, set a shot.  
Me: So I wonder so I wonder do you guys when you're using Gong, do you have to, like, save a transcript? Like, specifically or, like, turn on a setting?  
Them: I saw I think I was in this meeting, and I thought it  
Me: Okay. Because notes is different than transcript.  
Them: it, like, looked like it was taking the notes.  
Me: I don't know how their API works, but some of these AIs do it that way to get around California two party recordings. So  
Them: Well, definitely, no. Like,  
Me: Yeah.  
Them: definitely knows that  
Me: Right? Yeah. Yeah. So I I just wonder if Gong, like,  
Them: What do you mean? It the print the whole group definitely knows that it was  
Me: so, like, in Zoom, unless you specifically, like,  
Them: transcribing.  
Me: press the button to say, we're recording, it it'll still take notes separately. So it because it has to create a transcript to then, create notes.  
Them: Yeah. Yeah. I thought it was.  
Me: But it won't actually save that transcript for you unless you, like, notified the other users that you're recording. Kind of it's a little it's like a legal loophole they try to exploit. Not a loophole, but it gets you around, like, the you have to make the other party knowing that you're recording in California.  
Them: You know, I was I was conflating it with a different call that I had where I knew Gong was. Was on maybe we could maybe we just find that call.  
Me: Pull a couple of transcripts for me and just save them into that transcripts folder inside of the Gong one. Okay? We just need some test transcripts.  
Them: But oh, but we're also trying to find  
Me: If it's empty, just move on to the next one. Just get you know, we need about five transcripts to play with. Thank you.  
Them: You can also for  
Me: Yeah. Let me know what it's called. We'll find it in. If it happened, last oh, cool.  
Them: for this call.  
Me: DB three sixty. Okay. Tesla is  
Them: Yeah.  
Me: DB3  
Them: Can you find a list of the trackers just I'm on I'm on Gong right now. I'm trying to look.  
Me: Use the Gong MCP and pull the transcript  
Them: Oh, take a look.  
Me: for this call with Matt between MagnideDV360, please. Thank you. Save the transcript to the transcripts folder inside of the Gong folder.  
Them: I see the trackers is, like, a drop down in the search.  
Me: You mind sharing the screen?  
Them: But I don't know if I can't I can't see  
Me: Don't you got it? Yeah. Cool.  
Them: the last Yeah. Where was I? Search with search.  
Me: Nice.  
Them: This is how we get the idea.  
Me: Okay. Let's see if they got it.  
Them: Call trackers to start. And  
Me: Yeah.  
Them: And, honestly, these relevant? But some some of them aren't relevant enough that we should just start with them. Yeah. And if you hover over a tracker, like, the little question mark, it'll show you some of the word relationships. Okay. So  
Me: That. But some of the other ones have more robust  
Them: that one's pretty like, managed service service and then the  
Me: tumor relations. This is gonna be period. Let's do an example. Why that says live could just mean the campaign is live. These trackers by itself aren't aren't fully built out, it seems. Okay. So what's good is so it seems like that's just like a plain word search that it does across  
Them: My  
Me: transcripts and then returns what's relevant within that. We get to access through that through the API So we can add that in. So if you guys want those trackers, now to do custom trackers, it says in your settings, can we can't go through the API. I can't set a custom tracker, but you guys can set it in the UI somewhere in the settings. Can add a word. Probably not. Not. So but what we can do is we create a list  
Them: We're not sure we're not sure if we have the level of access to create  
Me: of relevant ones for you guys, and add those to the tracker, Then in the API tool, whatever we build, we can use those custom ones that are relevant for you guys as part of our search.  
Them: So we we shouldn't try to just there's no way for us just to, like, build it directly into this product. We should  
Me: Yeah. So creates, like, a place to hit it.  
Them: need to have it like, truly  
Me: But I mean, because it's, like, it allows us to, like, auto  
Them: identify as a tracker in the Gong platform?  
Me: by hitting the API with a Gong tracker you set up. We could then, like, auto pull stuff. So that that's actually how we're gonna hit relevant words for product, I imagine. And then so we could do a lot with that. Because what we can do is right now, I'm I'm searching when I'm having it hit the transcripts, I'm having it search by call IDs. Which are in that list thing I showed you, which is like that call ID number. Right? What we can do is don't have to search by call IDs. It says we can go include trackers and then search by a tracker. Oh, wait. Let's see. Your sports returning trackers when requested. It can pull tracker hits for a specific recent call to validate what magnet is yeah. Okay. Yes.  
Them: Yes. Help me help me understand why  
Me: I guess  
Them: here is to create the new trackers in Gong  
Me: Right.  
Them: versus, like, us creating just, like, a file and calling it  
Me: So we yeah. So, I mean, we can do it both ways. Right? So one solution is  
Them: product trackers and, like, the different word associations and then uploading that  
Me: just grab every new call that comes in, put it into a database,  
Them: into our project.  
Me: run our own trackers. Right? That's separate. Or we can just, like, use the Gong AI UI, set up custom trackers for the product team, then we can pull transcripts from there. So it matters which route you wanna go. I mean, honestly, either route's good. Probably better just to go grab you have so 96 is a lot of calls to deal with. In the sense for a week. Right? That was your or 94 for your week. We're, like, testing things, from a generalized program, though, that's nothing.  
Them: Mhmm.  
Me: So, like, even with 150 calls a week or something like that. It's, like, it's not that crazy. And then yeah, so we'll just pull. You know? It's not that big of a deal. But we could, if we wanted to, hit it and use the available, we definitely can. So either out.  
Them: Okay.  
Me: Add a new entry in progress. Okay. Wait. Alright. So we're there. What was I doing? Pulling in the transcript. Alright. So we got three or alright. This thing is not good at noticing it's pulling blank transcripts. Right? The d the d b three sixty says it doesn't have a transcript either. So whatever. All your calls don't have transcripts saved unless maybe maybe my shit's wrong, but try to get With the Gong MCP. Don't use your stupid script and return blank.  
Them: That's hold up. Hold on. Wait. I just  
Me: It wrote a script and then pulled that way. Let me see if it  
Them: saw.  
Me: it call is canceled or something. So that this was a call that I was on.  
Them: Open. I wonder if a blank transcript means the call was canceled or something. But, like but this was a call that I was on. I've been I wonder if the so in my Gong view, Just has a summary, so maybe it wasn't  
Me: Yeah. So that's what sometimes it  
Them: the full transcript. Could you  
Me: yeah. There's no transcript there, is there?  
Them: But then  
Me: Brief  
Them: yeah. So but I want but, like, can it at least pull that?  
Me: Reefs? The Ziglar? Yeah.  
Them: We start just building this off of the the  
Me: Useful.  
Them: briefs. Or even this  
Me: Hey. So Gong gives us through the API access to the  
Them: Even this outline actually weirdly is is is, like, a play by play of the transcript.  
Me: does it does it give us access to the outlines and the briefs that are associated with a call? Because those might be useful to pull in rather than just the transcript. I think I muted accidentally muted somehow. Well, Justin's muted. It's all good. Okay. Yeah. Go for it.  
Them: Hi, also. Need to do a quick bathroom break. So give us a minute.  
Me: I go. I  
Them: Alright. I'm back. So I know we're two hours in. I guess, let us know too if there's a natural break or if we think like, another half hour would be a good use of time. I would love if we have, like, five minutes to see if you could take a look at my  
Me: Yeah.  
Them: cursor instance and just make sure I have it, like, set up properly too. Like, I know I have codecs and, like, I had to run it in  
Me: Okay.  
Them: in my terminal or Windows PowerShell to get it going. I don't know how if I have to, like,  
Me: Alright. Yeah.  
Them: reboot every time I I load up cursor or, like, what that  
Me: Yeah. So I was planning on going till 01:30.  
Them: procedure looks like. So  
Me: And then let's definitely get get a shared screen over there. I'm trying to figure out it right now.  
Them: that's what might have enough. Yeah.  
Me: I I'm like a dog with a bone. I went once you get me going on one of these things. So now, I'm trying to figure out if we can pull the the meeting briefs and outlines, which might be more useful. Than that. And then we'll hop over there. Once I get you this answer. Yeah. So go ahead Yeah. So go ahead and share your screen for the moment, and we'll just keep while this is going on. I'll walk you through. I just wanna see, first of all, what we got installed or not.  
Them: Okay. Yeah. Alright. Let's see here.  
Me: Okay.  
Them: Okay.  
Me: Okay. Verify the CLI. Good. You got that authenticated. It's good. Scroll up on that. Let me see where where we made it in. This k. What will happen? Get up. So that's all GitHub. Keep going up. That'll make your life a lot easier. Having this alright. Awesome. There were you doing it. Set them complete. Go down. Let me see that part. I just wanna see the list. K? Pib, get  
Them: Okay.  
Me: nice, TypeScript, globally installed. Perfect. Yeah. So you're all good to go there. Alright. So here's how you you wanna know how to use codecs a little bit better? Yeah. I've never  
Them: Alright. Awesome.  
Me: Yeah. I've codec. Yeah. So go into that I don't I don't really fully understand how  
Them: Yeah. I've never used  
Me: Yeah.  
Them: codecs. But I don't know if I'm supposed to, like,  
Me: Yeah. Now  
Them: don't I actually don't really fully understand how that, like, works with  
Me: No. It's it's the most powerful. Right? So  
Them: cursor.  
Me: well, actually, we're about to get there. Right? But so what I do is I use Cursor to help me plan  
Them: If I need it at all at this point.  
Me: brainstorm research, those things. I'll have it write big planning docs, I deliver those big planning docs to as you guys saw me at the beginning with the index. Right? Like, I deliver those. You would deliver, like, a bigger plan, to Codex. I think with Codex or clog code, those are, like, for big tasks where you want it to work for like fifteen, twenty, sometimes thirty minutes. You know? You just let it run. Then when I'm cleaning after I'm done with that, there will usually be some types of bugs. I use  
Them: Mhmm.  
Me: cursor again to do one off stuff, smaller stuff. Yeah. So that's your MCP tools if you wanna add any of those in. Let's see. You got you're on the free mode so far, right, on cursor or oh, you're an enterprise. Oh, hell yeah. Cool. Awesome. So let's go back go down to that terminal at the bottom.  
Them: That's saying That's saying enterprise plan.  
Me: Call nodes project. Yeah. And then just type in codecs. Let's see what happens here.  
Them: Yep.  
Me: Nice. Okay. Yes. You got it. So, what you're you're in from a directory perspective, what you wanna remember with these CLI tools, is you wanna be in your working directory. You don't wanna launch you can launch codecs from, like, your desktop.  
Them: Cool.  
Me: But that gives everything sub subfolder below your desktop. It gets access to. Or, like, the dangerous one is to launch it from your user menu, right, which gives it access to full computer. It could, like it's actually kinda useful sometimes to, fix things or whatever. But what you wanna be working is, like, this project right now, you're in  
Them: K.  
Me: in the in this call notes project directory. Right? And so codecs on will only have permissions to work on things that directory and below it. Right? So that protects your the rest of your computer if it  
Them: Mhmm.  
Me: something up, whatever. So in in cur Cursal, when you launch a terminal, you're automatically in this directory right here. And then so by running codecs, it has access to the whole file right here and below. Remember that agents dot m d that refers to the rules for a cursor and codecs uses it as its rules. Right there. So if you wanna change any rules at your agent's.md right there, Yeah. So let's see. What can we  
Them: Right. Got it. And then you open  
Me: So yeah.  
Them: OpenAI API key  
Me: The  
Them: I guess, would be the benefit to adding that in here  
Me: yeah. So then it would so, basically, it would start  
Them: versus it already accessing, like, the LLMs?  
Me: your your enterprise so Cursor is paying for your the API access. You put your own key in, that key starts paying for it. I don't know how you guys corporate stuff works. But it's it's better just use Curserv on the enterprise plan. That's supposed to be pretty awesome. If you like like, let's say so in my case, when so I just use cursor, and then I hit, like, a usage limit every month. And then I basically just, like, pay cursor more, but it used to be before they allowed us to do more, I'd have to put my open AI key in. Then I was paying OpenAI directly. So yeah. Yep.  
Them: Got it. Got it. Okay. Isn't it also Can you say if we're if we're just asking the cursor chat to do things, that could be using  
Me: Yeah.  
Them: those different models. But we're at if we're actually integrating AI into the  
Me: That's when you put in the body MB. Right? Yeah. That's where those e API keys. Now so, Justin, I thought when we were doing this,  
Them: product, we're building. That has to be  
Me: this actually would've helped. So I thought you guys were on the free program. Didn't realize you guys were paying. So take a look at that. See that agent bottom right in your context box?  
Them: I see.  
Me: For the AI. So now you're on you have an auto. Click on the auto. Or see next to it the auto. Yeah. Right there. Click that.  
Them: Yep.  
Me: K. Now that I know you're paying for it, don't use auto. Click on it.  
Them: Are the autos?  
Me: Don't  
Them: Yep.  
Me: Oh, yeah. Work. Yeah. So you wanna be you wanna use pick models based upon what you're doing. Right? So 4.5 sonnet. Is, the best one going right now. And then Gemini three point o is probably gonna come out in the next two weeks. That will probably be the best one.  
Them: So  
Me: GPT five, I really that's kinda I consider my daily driver, so I have to pay attention to cost. Because I pay for I always so I pay $20 a month. I use that up in, like, three days, and then I have to, like, pay my own stuff when I use Cursor. So I like to use GBT 5 is a dollar 50 per million tokens in. $10 output, million tokens out. G Claude, 4.5 is $3 per million tokens in. $15 per million out. So slightly more expensive So I use g p c five for most things when I need, a lot of horsepower, that's when I go to clog, 4.5. So those yeah. Those then the GPT five high, thinking it's good. You you really don't need it that much. Just tell it to think harder with the regular one.  
Them: Okay.  
Me: It would it's it's a a reasoning principle of how long it will spend thinking about something. If you got a big task, use it. But at that point, just hop over to codex and use codex because code like, you got a really complicated task that you think needs, like, a lot of thought and a lot of tokens to go into it, codex is your answer right there. That thing is really powerful. Yeah. So but, yeah, in general, as you over here,  
Them: Okay.  
Me: Yeah. And then, I mean, don't know, if you guys enter right plan allows you use that max mode. The max mode, like, you ever got a problem you run into that you can't figure out,  
Them: Cool. Appreciate it.  
Me: Like, turn on that max mode. It gets pricey, though. So I don't know how your enterprise works. Yeah.  
Them: Yeah. We should find out how  
Me: I mean, it's not that pricey, but, like,  
Them: Yeah. We should find out how how that works. Anna, do you know how our  
Me: so Corey, Anna's husband, one time, he we we had a problem.  
Them: our enterprise plan works from a cost standpoint?  
Me: Couple months ago. Could not figure out how to debug something. He put it on max. It it was, like, $50, and it solved it. You know, like an hour later. It's like but sometime you know, sometimes it's like, you hit something where you just can't figure it out, and it's just like, hey. I'm just gonna spend it. So  
Them: Yeah.  
Me: as far as No. No. No. No. This is why I'm here, man.  
Them: Nice. Alright. I appreciate the help. I don't wanna derail  
Me: Yeah. Absolutely. Well, fuck. Let's get you  
Them: too much, but just  
Me: let's do, what can we get you guys?  
Them: glad it's set up properly.  
Me: How about this? Send it into codecs. Do remember that one I did earlier? Just give you a hands on feel. I promise hands on. It's been mostly me just doing shit now. But, yep, share again share again your screen.  
Them: Sure.  
Me: Okay. So, here's what I'm thinking. What we'll do is, so we'll reference that the that index dot HTML. Remember how we did we we didn't have the links working or the when we click them? So what we should do, let's send it through. So the goal is gonna be you're gonna send it through codecs,  
Them: Yep.  
Me: and then tell it to tell it to modify make all the links work. So, like, for each section, we can click on a web link, and it will go to the web page. You're gonna need to refer to the notes 10 o six expanded for the, things. So so remember to start,  
Them: Okay. Are you are you just doing that because we  
Me: Kinda nice. Yeah. But yeah, it just basically just show I just want Justin to get  
Them: because we as just as, like, a test of codex doing some  
Me: do it and then just so you can feel a little more comfortable in it.  
Them: or because we actually wanted to open the links as, like, a  
Me: So remember to use that at sign yep. Yeah. Exactly. In that terminal. So at So at  
Them: I'll do this down here.  
Me: Yep.  
Them: I would do notes dash 10 o o six  
Me: Expanded dot markdown, I think, has the links too. And then  
Them: And that's the markdown or the expanded one?  
Me: don't know if you can click it, but you could press tab. When it's the highlight Yeah. And then now use that backslash Yeah. That'll work.  
Them: Like a wrist tab. Oh, perfect.  
Me: Yeah. That'll work too. I I believe try, try shift enter or shift return. I don't know if it's gonna work or not on a Windows, but okay. Press escape. Okay. That didn't work. So cancel it. Yeah. Okay. Cool. Alright. So anyways, sometime on Windows, it doesn't work, but you can get it to do a page break. That's just kinda like you know? So it makes it easier to read. Oh, shift enter. Oh, what did I say? Command oh, my bad. Yeah. Shift enter is page break, right, for you guys?  
Them: Oh, I think it's just just enter, I think.  
Me: Yep.  
Them: Yeah. Alright. So it's notes dash  
Me: Yep. No. So it's already so it's reading it. So command escape  
Them: oops. And then shift enter. No. That work?  
Me: Exactly. Oh, we gotta get another file in.  
Them: You're just trying to get a do, like, an be able to say something about the file, and then you wanna, like, give in  
Me: Oh, cool. Yeah. And then now put at, now we gotta do at index HTML.  
Them: of what to do.  
Me: Yep. Yep. And then another page break. Then now kinda give you your additional context. Which is the goal. We wanna add in the make all links clickable.  
Them: And they  
Me: In index dot h m l.  
Them: Yeah.  
Me: And then, like, you know, comma, refer to refer to the notes for the actual links. Yep.  
Them: Alright. Let's send it. Mike, is it necessary or just a really good practice to identify the  
Me: Yeah.  
Them: specific files that you're referring to because I found myself just, like,  
Me: So you can do either or. Right? I I think it it helps. So it will do you're saving in a tool call.  
Them: talking generally of, like, look at my transcript or, like,  
Me: So it's basically gonna do a list files if you don't give the exact ones. Right?  
Them: Mhmm.  
Me: Go ahead and always approve for this session. Just want to let it run. Yeah. If you know it, if you don't know it, not a big deal. I mean, it's not that much  
Them: So you're saying it's the best practice to actually to identify the file. You're  
Me: more tokens, but, I just I've known, like, pointed at the right one if you know exactly what it is. Yeah. Yep.  
Them: Got it. It's because of the because you're thinking token man sent.  
Me: Yeah. Always improve for this session. So  
Them: For some reason, it's  
Me: you gotta do that. When you're first time using Codex, it will have, like,  
Them: keeps having me  
Me: a lot of these. I wonder if we can go let me see on codex real quick. Yeah.  
Them: Just a similar to the issue I was having earlier.  
Me: Okay.  
Them: Where I had to keep typing in why?  
Me: Well, for this session, we're just gonna have it do it. I'll show you what to do after this. K. Plan MCV. Hey, g p t five. We got a blank plan m c p upgrade dot markdown. Write out a detailed plan on how we're going to bring in the get call briefed tool, and the, outline tools. Okay? Thank you. Now we Will hard stop at ten minutes.  
Them: Heart's up. I've I feel like we shouldn't Steps. Mike, know you mentioned this  
Me: Yeah. Okay.  
Them: something around this a little earlier, but  
Me: Yeah. We should get  
Them: how do you know when  
Me: okay. MCPs when when you want, like, the direct access to that API. Right?  
Them: you need an MCP? In  
Me: Right? So like, this yeah.  
Them: Is it sorry. Just to to try to do it in things that we we would under understand.  
Me: Yeah. So I would, like,  
Them: If anything involves any APIs,  
Me: okay. So, I would look up and feel like  
Them: then you stop there and be and say, like, well, that's m then that's MCP.  
Me: I would be like Gong MCP, Google. You know? Like, is there anytime I'm working with something, it's like anytime you wanna get data from something, if you find yourself copy pasting something, from something to another, it's basically just like the ability for the the AI to go do that for you instead of you copy pasting data into AI.  
Them: So  
Me: It's, it's gonna do that be able to split that bridge. The we're so early in the game. A lot of them don't have MCPs, but they're coming out every day. There's this website called cursorrules.com or cursor.rules. Yeah. Here. I'll just send it to you guys. This one is is so it's an open source website not associated with Kerker. Oh, wait. Hold on. Cursor. Wait. Is it curse about directory now? Yeah. It's cursor.directory now. And so this one has a great list of all the MCPs. So I would always just kinda, like, search see if what you're doing. Has an MCP. Then, like, a lot of the MCPs kinda suck at the moment, but some of them are really good. So you wanna look at, like, what the tools are. Here we go. Cursor.directory. So this website's pretty cool.  
Them: But I If we're looking at anything where the system where the external  
Me: Exactly.  
Them: system we're trying to connect to has an API already. Then the next question is, do they have an MCP, or do I have to build an MCP? To plug in those APIs? If we have internal systems that all talk to each other with  
Me: Yeah. Especially because if you guys have internal  
Them: APIs,  
Me: tools that are talking API to API in a way, like someone already did that,  
Them: then the natural point is, well, it's just an it's just an MCP or  
Me: you can pretty quickly spin up like a MCP that kinda like hops in the middle of it.  
Them: multiple internal MCPs.  
Me: To look at those types of things. So because you just it's just like a way yeah. It's just like a doorway into the APIs for the an instruction manual for the AI to access it. So yeah, it took me a lot of understand MCPs myself, and now I'm like, all about them because it's it becomes really powerful once you do it.  
Them: Okay.  
Me: Most of them are only read only access, which is still useful.  
Them: Got it.  
Me: But the the really pass so, like, Superbase is a database that you do a lot of my stuff. Right?  
Them: Yeah.  
Me: On and the ability for the AI to write use the right tool to write into the database is very powerful because it not only does it like, you'll update, like, the database or do migrations for me, then it it's, like, basically, it's like, oh, this is exactly how I need to write it because it will try to write something. It will error. It will be like, oh, we need need to do this because it's doing in itself. You get what I'm saying? Rather than us guessing writing the code, MC by doing with the MCP, it sees the schema itself. So that's a great place. You know, the email MCP  
Them: Mhmm.  
Me: are getting really cool. That's like the future of like having an AI hooked up to your, to your email. Be able to, like, write you right now, it's just drafts, to do list, like, those things. But these are kinda like the beginning of it all. So yeah, let's get you what would be take a look at this cursor dot directory thing. For, for me, guys. Like, just click in there, and then there's a list of MCPs. Look as well with the eight minutes we got left.  
Them: Can we just put ten minutes? Because this feels just, like, general for us to keep keep in mind, but mostly  
Me: Okay.  
Them: this Gong thing is sort of unique as an external system. Mostly, we're working with internal systems or, like, direct, like, partner integrations.  
Me: Yep.  
Them: But let's let's, nail down next steps with this project in in general.  
Me: Yeah.  
Them: And also, like, how we maybe how we get  
Me: So here's what it is. I will upload  
Them: how we can use what you built and maybe that we can play around with it separately as well.  
Me: I'll go to GitHub. I'll send it to you guys later today once I've cleaned it up. I'll give you a read me. Hopefully, it's gonna be easier this time, Justin. You point you point Cloud 4.5 ad and be like, hey. Can you connect this this MCP server? And then at the very least, now, what we have is the ability to list  
Them: K.  
Me: transcripts. And then if a transcript's available, we have that. What I'm about to show you guys is well, let's say, so I got a brief plan MCP upgrade right here. I was gonna have codex go and and basically build in the tool to get us outlines. Right? So if we can get that in, Oh, wait. What is this?  
Them: That's because it we don't it wasn't  
Me: Yep. It has to do different m c p or API  
Them: MCP wasn't reliably gang as back outlines  
Me: tool point to pull out the outlines because a lot of the transcripts, like, don't have the transcript.  
Them: needed, like, itself, and so we have to build something to go get the outlines  
Me: We're was kind of like, I would have thought the transcript tool was broken but for the fact that we got one, I just had to pull seven different ones that were all blank. So yeah, we got one out of the seven. It's kinda crazy.  
Them: Mhmm.  
Me: Anyways, let's get scrapes. Yeah. Okay. Plan MCP upgrade. Here. I'll take back the screen. Wait. Before before I leave that, Justin, how's how's your side looking with cursor? I mean, with Claude. Sorry. Codex. Like, that's just that. No. Just say share your screen  
Them: It's like a bunch of code now, but there's no like, next step. It just fell asleep.  
Me: Nice scrolls. Keep scrolling out.  
Them: Esperar  
Me: Proposed Oh, really? Oh, that's kinda odd.  
Them: So  
Me: The original tweet. Yeah. So it was odd.  
Them: So that's as far down as it goes.  
Me: Needs action. Missing. Click And I click into the terminal and just press  
Them: Yeah. So if I go up, need to edit to add the user.  
Me: enter. Because usually, it would be it might have rate  
Them: And then I go down, and that's where it stops.  
Me: it might have rate limited itself. Okay. Running PowerShell. Yeah. Now it's running that command for you. Fortunately, it's trying to find that initial tweet, and then it's running a Python inline edit script. So million ways to skin the Yeah. Yeah. Alright. Now here's not I'm gonna Yeah. I'll share real quick. I mean, same thing. Right? So it's just  
Them: Okay.  
Me: I had cursor build us a planning thing,  
Them: Alright.  
Me: which is this  
Them: You can take over here.  
Me: get calls brief, get calls outline, outline summarizing the call flow, more calls, brief for one or more calls. Range point, next steps, entities, hit, source link. So it's pulling the metadata from the stuff separately at the call. We'll use the primary source, attendance, interactions. K. Call brief call ID string. Okay. Actually, this missed step on one thing. Hey. So the with this one is if the transcript's missing, we're still not gonna get the metadata surrounding the call. Right? So we need to figure that out. It seems like not all of the calls have transcripts, they all do have outlines and, note briefs. How do you propose getting those ones when it doesn't actually have a transcript? Let me know and update the plan. Thank you. So what I'm looking for here was what, what endpoints it used. Right? So I was using this calls transcript. I was hoping it was gonna grab from some other endpoint. It said it found. What it's doing is it wants to grab the transcript then create the things. I guess okay, so maybe it actually would. So it would pull these other things that come with the transcript. Right? So we go from list, you then do an ID call, and we'd get call ID title recap, Okay. So we want that recap. Key point, next steps. Anyways, the trackers, we would see those things would pop up. And then links to the page, which is the one thing that we're getting returned. Okay. So it's doing an edit right now. Set this criteria. And no failures. Okay. Cool. K. We got three minutes. So this is the way it works. Right? So we get we get a good plan. I caught it on one mistake, right, after review. And then now I just come over to Codex or Cloud Code. Plan, MCP, upgrade, Woah. Hey. Codex, take a look at the plan. MCP upgrade. We are adding in a tool points that we can get the calls briefs and the calls outlines, which essentially are the same thing but we're adding two tool calls to our MCP. Think deeply, Let me know if you got any questions, but I think this should be pretty straightforward. Also, you got access to the Gong Gong dash docs is, is a brief docs breakdown. Gong Dash Docs. And you could use a web search tool and hit the Gong b two API itself if you need more info, but the plan should take care of it. Thank you. Yep. Then this will work probably for about ten, fifteen minutes, and then maybe we have the tool. Hopefully working. If not, then I go back over to cursor agent. On the side and then kinda figure out what's working, what's not working. Then get it to work. So with this tool to make it usable for you guys, what I what I'm gonna do is add in, like, you needed a little instruction manual that so that's what's missing from that guy's open source version. Right? And then so, anyway, so I'm gonna give you that instruction manual. Hopefully, these tools work, and then I'll send you guys a GitHub link. And then this is very basic. It's not gonna be good by any means, but we should be able to get, you know, if you have a call and it has a transcript or an outline, we should be able to retrieve that. So Alter. Yeah. Yeah. And the key is we were able to list calls. Right?  
Them: And that's, like, the first step, and then it would be building the  
Me: Okay. So what's it saying here?  
Them: design the methods of how we want it to  
Me: Max one of the two. Normalization, I think to double check or invitation. Oh, did I leave ripper five in the agents? Okay. Oh, yeah. So it's because I didn't save this. It's it was in that remember the ripper five? Its rules for codecs thought it was it needed to do research. Before it once you confirm the summaries, endpoint or that they were fine to skip it for v one. Endpoint availability.  
Them: I'll k. I unfortunately have to jump. But Mike, this was this was awesome. Definitely going to watch  
Me: Excellent, man. Yeah. I I had a lot of fun. Thank you very much.  
Them: this recording, like, several times.  
Me: Shoot me an email if you ever got any questions or anything like that. Okay? So we're just gonna keep this very  
Them: Extracting grass as much and looking forward to round two at some point.  
Me: like it. Yeah. Alright. See you.  
Them: Alright. I appreciate that.  
Me: Alright. Cool. Well, anyway, so this should be ready.  
Them: That's good. Alright. Thank you. Bye, Anna.  
Me: I appreciate it. This is cool.  
Them: Bye.  
Me: I hope I hope they got some usefulness out of it.  
Them: Thank you. Oh, I know. I know. I'm sure. And this is I mean, I was overwhelmed sometimes I'm still overwhelmed, and I'm realizing that, like, I, you know, I have been doing things. Right. And so this is also this  
Me: Yeah.  
Them: reinforcing. Like, a big takeaway for me this round was  
Me: Yeah. I think most most  
Them: when to use the cursor chat into codecs, and I'm  
Me: of it is their like, big task.  
Them: it was interesting to me, like, how much you actually did just  
Me: CodexClot. Right? Think that way. But everything around it,  
Them: in the chat by itself.  
Me: hit the code the cursor check. I find it just very useful and you could control that one. Because it's like, once you send off the cloud cloud code or codex, like, you're kinda stuck here for the next ten, fifteen minutes, like, letting it do its thing. So it's super powerful, but for speed purposes, cursor chat's the way to go. Yeah.  
Them: Okay. Okay. If if there if you're trying to, like,  
Me: Yes.  
Them: fix something or to or, like, give it feedback, Like, I was redoing the labels project  
Me: Yeah. For something like that. Right? Because that one's, that one's just prompt engineering.  
Them: and I was trying to teach it, like, this is why you're wrong. Like, can you update it? Do you think  
Me: Unless it's yeah. That one  
Them: that's best to do in in cursor?  
Me: just god. That one was was frustrating. Did you cut down the training data on that one yet? Like, to something  
Them: I know. I've redone. This is, like I think I'm on round three. I I  
Me: Oh, yeah. See, I still think we gotta get down to, like,  
Them: I I yeah. I  
Me: 300 rows. Like,  
