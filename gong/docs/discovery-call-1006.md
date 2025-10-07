Oct 2, 2025
Call notes/Gong quick discovery call - Transcript
00:00:00
 
Anna Hewitt: Okay. So goal goal of this is to try to refine what we want in our call call notes product slashgong so that yes we'll do like some reexplaining when we talk to Mike but we can be like you know
Garrett McGrath: Hey,
Anna Hewitt: the full pack of details is in in this transcript including things that are most important to us or any visual aspects um and just what yeah what we want the end product to look like and scope.
Garrett McGrath: you want me to start?
Anna Hewitt: You you start.
Garrett McGrath: Okay. So the commercial team only the commercial team at Magnite has a gong subscription. Gong is a tool as we understand it for recording calls with customers. Uh it it records calls, it transcribes them and then it gives some level of customization in terms of um reporting back to various stakeholders across the across the company. Uh, it allows you to target certain keywords and concepts or follow certain keywords and concepts and customize email summaries of calls in in daily, weekly, monthly, whatever format. Uh, based on stakeholder preferences uh, for example, the summary that a CRO gets is different than the summary that an account manager gets.
 
 
00:01:26
 
Garrett McGrath: Um, but there's also some customization which allows I think any licensed user uh and we are readon users outside the commercial team which I'll talk about in a minute but a licensed user to uh customize the summaries that they get based on maybe accounts that they work on or concepts that are important to them this week or custom things that are called streams which you can define as stream as some number of variables, some boolean statement about something you want to make sure you highlight or follow uh or get notified of if it's called discussed in some other call that you're not on outside the commercial team. Uh I think the rest of magnite at least product for sure has readon licenses for gong which means as the name implies we can read summaries uh I'm sure that we can be forwarded or perhaps added to summaries uh we do not have the streams feature which means we can't customize uh and ask for what types of summaries we're looking for. um we can't create for example the CRO example we couldn't create a CPO example if if what that person wanted was different than the CRO summary email um etc. So for license reasons product I'm sorry Slack is going crazy for pro for license reasons product uh is limited in what they can do what product would like to do is stop reading email summaries every day because there are dozens of them uh and be able to qu
 
 
00:03:09
 
Garrett McGrath: create a system that mirrors gone but also hopefully goes a bit further in terms of making call notes uh queryable searchable uh probably combinable uh and gives us the ability to create various views at various levels based on various uh variables or or or desires what kind of information we're looking for and that will change dayto day or week to week and we need to be able to update those things easily um and to have a situation where in the future no one, not just the commercial team, but no one is speaking is talking to someone uh without recording it and creating a transcript that we would then be able to put into this system, this gong like system, but for the rest of the company, so that we can uh you know easily glean insights from what's going on in the industry, not just customers of ours that we talk to, but partner data partners as an example, etc. Um, and it's important to note that Gong does have an API. Uh, we don't quite yet know how extensive the API is.
 
 
00:04:23
 
Garrett McGrath: We do have access to it. Um, but given that it has an API and it's presumably somewhat robust, uh, we should have access to the raw materials of the of the recorded transcripts. Uh so what we're try what we're looking to do is build a productspecific kind of customized version of Gong that that uh uses that raw material and packages up summaries uh alerts etc to our needs as opposed to what's kind of out of the box for the commercial team uh on their license.
Anna Hewitt: Do it is the end end goal for any product manager, any user on the product team to customize um customize things themselves or are we trying to create an admin view initially where we and decide the initial reports.
Garrett McGrath: I would presume that an admin view is step one.
Anna Hewitt: Mhm.
Garrett McGrath: Um, and I don't know that we necessarily want an everyone view. Um, but we may decide to get there later on. Um I I don't think that the the bifurcation of types of summaries that we'll want to create is so is such a long list that that people would need individual summaries.
 
 
00:05:44
 
Garrett McGrath: You know there's product managers for a particular product product managers in a particular region product manage product management at various levels within the company.
Anna Hewitt: Mhm.
Garrett McGrath: um particular features that people are working on or particular features that are being being discussed in the market.
Anna Hewitt: Yeah.
Garrett McGrath: Um I mean the list of the the matrix of things that we would pro probably want to report on is not s not very long.
Anna Hewitt: Would we want I saw Gong has her predetermined trackers I think they call them. Are we trying to predetermine all of those things that we think people are interested in or we want it to be completely searchable or AIS to tell us what what our options are?
Garrett McGrath: I think the answer to that is probably dep probably depends on the the the difficulty of doing one versus the other. Um, if we have access to all the raw material via an API and we can pull it into into an LLM, we have a giant database that's constantly updating itself. Um, we can presumably we would want to sort of package up summaries for particular sets of stakeholders.
 
 
00:07:00
 
Garrett McGrath: We need to probably do some stakeholder interviews to figure out, you know, what those five or six buckets may be. Um but I think ultimately if it's queryable and extensible to basically any query um that would be a second level of of desired functionality.
Anna Hewitt: Should we go through um those different levels and do do we imagine that like this looks like a report builder and it's something to describe the topic this is what I'm looking for and then it's the level of insights and that's when you have the sort of the person user persona so what should what persona should we start with.
Garrett McGrath: That probably makes sense. Yeah. Well, let's there would be I mean let's go let's go with the the hierarchies that exist already.
Anna Hewitt: Mhm.
Garrett McGrath: There would be executive team, senior leadership team. There would be uh particular product teams that are organized by product. Uh there are a handful of products that are cross team and and crossplatforms or cross tools. Um and whether or not we would want to do whether or not we want to get down to like PM1 versus PM2 or you know I doubt it.
 
 
00:08:26
 
Anna Hewitt: Yeah. Just pro like team. Um so executive, product leader, team lead, product manager.
Garrett McGrath: Yep. Yep. And then the other access would be product our product uh catalog thing the things that people work on. Um probably topics within the industry broadly because we have audience like for example we have audience products uh but you know the topic of audience and identity in the industry touches a lot of different companies and a lot of different conversations. So a product manager who who focuses on our audience products again just for an example would probably like to know when when things are being discussed at the commercial level that could you know impact their product could be complimentary to their product could be competitive uh or is just you know a an industry awareness topic.
Anna Hewitt: Yeah. Should the industry topics be prepopulated because then that would be sort of similar to the gong trackers.
Garrett McGrath: Yeah, I I think that the commercial team created those those buckets.
Justin Sous: Yeah.
Anna Hewitt: Yeah. Yeah.
 
 
00:09:43
 
Garrett McGrath: Uh, and that's likely a good thing to do because, you know, too much free form, you're just going to get chaos.
Anna Hewitt: So the one the only free form is what the user types in in general at the top of like I'm looking for stuff around live sports, but live might also be one of those industry trackers.
Garrett McGrath: Right.
Anna Hewitt: And so in which case it could be like I don't know DAI is the topic but live is the is the industry industry topic.
Garrett McGrath: Yep.
Anna Hewitt: Yeah.
Garrett McGrath: I think we'll also have to have the concept of um either external companies and or external uh trade bodies, you know, something's being discussed at tech lab, something's being discussed at premed or NAI. Um you know, and it and it intersects with blank product topic. Uh likewise, you know, um thinking out thinking out loud, since we're gonna just build this custom, we could also have it look at external sources that aren't callotes, you know, blog posts, LinkedIn posts.
Anna Hewitt: Yeah.
Garrett McGrath: Um, you know, we could easily we could easily give it keywords, give it concepts, give it give it places to look and you could and you'd be able to pull it pull in kind of a news feed as
 
 
00:11:08
 
Anna Hewitt: Mhm.
Garrett McGrath: well as a um, you know, what's happening in your particular product as as it pertains to a commercial conversation.
Anna Hewitt: Yeah. Ad Exchanger, Ad Week, Media Post, other other competitor blogs like Pomatic, Index, Freewheel, Trade Desk, all of their blogs, the the current
Garrett McGrath: Yeah. And I I I've done a teeny bit about amount of work personally that kind of looks like that. And I know that I know that you can set up an MCP to go look at URLs and and and for particular topics or particular days and and pull in posts related to blank.
Anna Hewitt: That's cool. Do we um uh is there a more limit is now there is is there a more limited scope of what we'd want to do as a V1 to to out?
Garrett McGrath: Yeah, it probably doesn't involve what I just said.
Anna Hewitt: Does it mean does it mean um does it mean that we pick a particular topic and do it across the different levels?
Garrett McGrath: Yeah, that's fine.
Anna Hewitt: And um do you think we need to train it on what it means to pick up, you know, li live sports information or um privacy regulation?
 
 
00:12:41
 
Anna Hewitt: like do you think it needs to be um trained on the right words or do we want it to sort of use the same I don't know what the right word is like same approach to just like collecting topics yeah like first it's just like it's basically keyword keyword
Garrett McGrath: Uh, I mean my my instinct is you just described a V1 versus a V2 or three. Yeah, I think V1 is whatever the raw material is that we can get from the Gong API, we pull that in. We have a reasonable matrix of persona and and topics. Uh, and then some way to customize um I mean I think it's probably all going to be email but you know frequency and you know maybe there's some sort of concept of length if if we can do summaries or I know we can do summaries but doing summaries um but we'll just need to define you know a reasonable v1 because we could could make it pretty complicated.
Anna Hewitt: Mhm.
Justin Sous: With the different personas in mind, are we expecting to offer different end deliverables for those personas?
 
 
00:13:59
 
Justin Sous: For example, for the executive leadership persona, do we expect to be able to deliver something else than to the product manager level?
Garrett McGrath: Yeah. Yes.
Justin Sous: And we have to define what those
Garrett McGrath: Yeah. We have to define what those are. And we probably should not assume that the Gong API, let me say it say it another way. We probably have to build some logic that that can articulate between what's important to an executive versus what's important to a product manager.
Anna Hewitt: Mhm.
Garrett McGrath: Or probably the other way around is product managers get more of the kitchen sink. Executives get executive summaries.
Anna Hewitt: Yeah. Do we want um let's describe a bit of what our ideal output is to an atom or a business line leader. There's um a clear a clear headline with no more than five takeaways. um with with or um and then details on each of those bullets with more information and no more than five sub bullets under each of those categories.
Garrett McGrath: Yep.
Anna Hewitt: And it's um uh uh impa impactful insights um with specific data points uh if they make the point stronger.
 
 
00:15:32
 
Anna Hewitt: um highlighting wins or opportunities or concerns and anything that has changed any tren any major changes and trends I think that's important for um anything else for a senior senior view
Garrett McGrath: Oops. Well, this is not not an answer to your question, but as you were speaking, I was thinking because we do have read only access to Gong and we have this API, I hope that it's safe to assume that for any topic, be it executive summary or PM more detail, we can always link back to the summary email from Gong if they want more information.
Anna Hewitt: Yeah, being able to refer addit references.
Garrett McGrath: Yeah.
Anna Hewitt: I think that's what um and then also for the exact summary being able to um synthesize trends across multiple uh reference points. um but still articulating um uh clients na naming the clients that are important but it doesn't have to do client specific things um
Garrett McGrath: Yeah, I I think being able to track particular clients or companies platforms will be important. Um, but yeah, agreed. Um, another thing I just thought of when you were speaking, and this is definitely like a V3 idea, if it if it can be trained to understand the relative importance or impact of a particular thing, it would be really cool if you could do that over time.
 
 
00:17:07
 
Garrett McGrath: Meaning, you know, this got talked about in March, it got launched in October, so and so signed on to it in November. you know, we may this may be an opportunity or a threat.
Anna Hewitt: Mhm. Mhm. Yeah. Something is heating up.
Garrett McGrath: Yeah.
Anna Hewitt: Also when you were you were saying that um a if a topic isn't knowing that a topic is important and it's changing in importance also knowing that certain clients are more important than others and whether we just hardcode
Garrett McGrath: 100%
Anna Hewitt: that in the beginning of the top our top cl our top clients. Um, oh, it's important for the transcript to know that we care about media owners, publishers as distinct from buyers, also distinct from partners.
Justin Sous: Right.
Garrett McGrath: Yeah. Yeah. There are media owners, publisher, publishers. There's buyers which are often interchangeably that term is often interchangeably used for buying platforms which are DSPs, demand side platforms or agencies or advertisers who are the actual buyers. And all and all of them are clients of ours.
 
 
00:18:23
 
Anna Hewitt: Yeah. And so having having a list of top clients and maybe the V1 of this is we we could decide whether we want this publisher waiting or whether it's going to grab in at everything. But eventually it could be either a standard list of top clients in each um persona or the user can can put that in their own waiting.
Garrett McGrath: It would definitely be pretty easy to come up with a top 20 CL client listening in each of those categories. So, I don't think that's that's Yeah.
Anna Hewitt: Yeah, that might be a separate like file of just like follow follow this rule of top the top clients file.
Garrett McGrath: Yeah. And it'll have to be aware of the fact that these clients often have multiple names. um you know they have acronyms or oh omicom is often OMG that's the same thing and multiple variations of things
Anna Hewitt: Yeah.
Justin Sous: Right.
Anna Hewitt: Yeah. So, that's one of the to-dos is to build out top clients. Um, do we have another file that's the top um the topics that we that we don't want it to be limited to, but we wanted to pay extra attention to like anam an example was I I tried
 
 
00:19:37
 
Garrett McGrath: yeah Um, and maybe Yeah.
Anna Hewitt: to look for live and then I realized we use live in so many different contexts. It's this seat is live. This deal is live. he lives in in Philadelphia. And so it had no concept of actually what I meant.
Garrett McGrath: Yeah. 100%. Like so much of what we do depends on the language that we use and the way we talk to each other that you know a really boring word like live you'll have no context for so we will have to give it contextual awareness of I mean maybe it's in conjunction with some other word like Right.
Anna Hewitt: Yeah, it's like deal. De deal is and PMP that might be different than um we signing a contract.
Garrett McGrath: Exactly. And if you if you say live all by itself, it doesn't necessarily mean some live event on TV. But if you say streaming or clear line in live, that's very likely what you do mean.
Anna Hewitt: He has So there's maybe um it could recommend whether we have a separate file that is like um a a glo I don't know glossery or like terms terms guide.
 
 
00:21:03
 
Garrett McGrath: Yes. And that should be dynamic in the future. But maybe for V1, it's just a static list of terms and their variations.
Anna Hewitt: Yeah. And we don't have to do everything. We can just pick the handful of the ones that we're going to test out.
Garrett McGrath: Yeah. Yeah. Yeah, I mean just like clients, I'm sure we can come up with a top 15 list of topics that, you know, useful.
Anna Hewitt: Yeah. Another file of Magnite um platforms.
Garrett McGrath: Yeah, definitely. And there and their various different names.
Justin Sous: right?
Garrett McGrath: And also that made that made me think of and I'm sure this is also not the one. It's gonna at some point to have some awareness of like if people say curation or curator curator is a product curation is an action you know and you know to human beings that seems pretty straightforward but I'm not
Anna Hewitt: Mhm.
Garrett McGrath: sure if it would I mean um maybe smart enough to know that Yeah,
Anna Hewitt: But maybe that could be part of the Magnite products, not just our platforms, but also things that have a proper a proper name like your clear line.
 
 
00:22:21
 
Anna Hewitt: Yeah. That it should know is different from any other similar words.
Justin Sous: The trackers in gang are kind of interesting in that. So there are the tracker names and then it shows the different words and phrases that ladder up to that tracker name.
Garrett McGrath: right.
Justin Sous: So we could probably provide it something similar, some word association, um certain phrases. So it's not just like live, it would have to be live TV and it would have to be SPO deals, you know, words together that ladder up to a larger tracker name.
Garrett McGrath: Thanks.
Justin Sous: There's also maybe this is a V3 too, but it looks like Gong is recommending trackers. Maybe there are when it's finding a certain topic being repeated throughout transcripts, but is not a tracker name, it can recommend one.
Garrett McGrath: That's interesting.
Anna Hewitt: And um Justin was also your suggestion that maybe we could maybe with the Gong API we could just borrow borrow some of Gong's um trackers and the and how it's already bucketed relevant.
Garrett McGrath: I think that's start for sure.
 
 
00:23:31
 
Justin Sous: It's a good place to start. Some of them might not be as relevant for product, but I think a good place to start. And we can probably add a few more.
Garrett McGrath: Yeah, I mean it's important to note that at the moment even mine is gone lots of people across the company get these call notes and they're just a summary of a call and you know that you gota kind
Anna Hewitt: Should we feed it examples of um
Garrett McGrath: of have to scan through it to figure out if there's something important to you or not.
Anna Hewitt: maybe one of the gong call note summaries just as like a that could be the equivalent of like product manager level that it's pretty detailed But we use Ryan Kenny's exact summary as just like this is exact level language.
Garrett McGrath: Yeah. Yeah. And we have several of the examples.
Anna Hewitt: Yeah.
Garrett McGrath: We have Ryan's Yeah.
Anna Hewitt: Yeah. Like like your your summaries that you send.
Garrett McGrath: We have We have mine, Ryan. the band.
 
 
00:24:33
 
Anna Hewitt: Yeah. So we have some sty.
Garrett McGrath: Um, yeah.
Anna Hewitt: So we have some style guides for exact level and just just as a default we can send the um just any call note as sort of like the the product manager level.
Garrett McGrath: Yep.
Anna Hewitt: Okay. So another file that's going to be sty style by user persona and then it can write a prompt based on those templates or write a markdown. Okay. So B1 will be um one do we want to be one topic to make sure it does one topic really well or it should or that that might risk that we're like building it for one topic.
Garrett McGrath: Yeah, I would say five to 10.
Anna Hewitt: Let's do let's do five to 10. We'll our we'll think about what do we want to list those out right now just so we come up with it in case we have to do other supporting materials
Garrett McGrath: Uh are we talking about five to 10 products, industry topics? Like which which list are we talking about?
Anna Hewitt: whatever I guess the thing that a user would type in not the unless we want to uh bubble it up to just be one and the same as a product area or a team.
 
 
00:26:02
 
Garrett McGrath: I think so the latter, you know, and well, I mean, tell me if you disagree.
Anna Hewitt: We we just want to we want to make it general like the audience team and anything about audience.
Garrett McGrath: I think at at the start. Yeah.
Anna Hewitt: Yeah. No, because I I was I was also trying to think of like something that I could validate and for me the only thing that I could validate is is live stuff, but that would be that could also be one the same as an industry topic.
Garrett McGrath: Yeah. Yeah. So, a list of product teams that we have and descriptions of the things the products and the things that they focus on. um a list of industry terms that are probably used in conjunction with of each of those groups.
Anna Hewitt: Oops. Oops.
Garrett McGrath: Um a list of our products that relate well that's kind of what the product teams list would be to the degree that there are products that are cross team or don't fit neatly into that bucket.
 
 
00:27:12
 
Garrett McGrath: like should try just have a a bespoke or distinct awareness of what all of our products are just for reference. Um, what else?
Anna Hewitt: What? But like let's let's try to pick what are the five what are the five like reports that we're going to generate to show to show to Adam of like okay we're do we did a live live sports atom view CPO view and a live sports product manager view like and then what are the four other examples or even just pick you know two more examples.
Garrett McGrath: Well, certainly buyers and sellers. Um, and and and is that too broad? I mean, should it be agencies, hold, publishers? Um, yeah, DSPs.
Justin Sous: Yes, is
Anna Hewitt: But do we want to pick a more specific topic or we want to because then I'm worried it's so broad that it's that then we have to do more training of what do we care about right now?
Garrett McGrath: Yeah, look at some current ones.
Anna Hewitt: It could be um I don't know. Um uh cur like it could be curator.
 
 
00:28:33
 
Anna Hewitt: I'm just trying to think like top of mind things that someone could look at and know if it's relevant or things that if you saw it in a col like if I could validate that a live sports report is good. What's something you know something in either of your worlds?
Garrett McGrath: Well, my the rest of my world currently is external stuff. It's it would be Yeah.
Anna Hewitt: Which one would be gong maybe?
Garrett McGrath: Yeah. I mean, if it wasn't gone, it probably came from me. Um, but I mean, you know, broadly speaking, there's audience identity, um, audience creation products that we have, um, curation, curators, uh, buyers and sellers. It's very broad. You're right. Um, but maybe maybe DSPs isn't too broad.
Anna Hewitt: But that's like what about because then is it just going to capture every DSP call or what or what about
Garrett McGrath: Yeah. Um I mean it'd be great if if it had some notion of competitor or competitiveness that is cross reference with a product or a company. Um yeah.
Justin Sous: That could be some pre-loaded context. We could provide it potentially.
Garrett McGrath: Uh, I got to go.
Anna Hewitt: How about that's okay. I think we did I think we did pretty good.
Garrett McGrath: Yeah. Yeah. And and maybe even if we risk training it against one thing, maybe maybe instead of five or 10, it's two.
 
 
Transcription ended after 00:30:30


This editable transcript was computer generated and might contain errors. People can also change the text after it was created.