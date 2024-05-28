---
title: How to combat Climate Change as a Software Developer?
date: 2020-02-13
tags:
    - Software Engineering
    - Climate Change
---
![img](./1.webp)

As a concerned member of our species and a human who does not want to die, I also work as a Software Developer and consultant. What? How are those 2 related? Well it’s not just those 2, it is about every combination of not wanting to die and the job you hold. In this article, let us explore what we can do in order to help combat the impacts of Climate Change as concerned members of humanity even if it is just a little and how we can do that by just doing our jobs as usual!

Too often, I feel helpless when I read and consume news about our Climate and the consequences that will be beared by my generation and the next. And it is really easy for me to just sit there feel helpless and mindlessly consume some more content / entertainment to help me cope with the feeling of despair. I want to help, but well thanks to the way our brains are wired, I tend to think negatively and feel that no matter what I did, the impact would be so small that it would be negligible in the grand scheme of things. If you feel that way too, please do allow me to share with you how I dealt with it and what I am doing to contribute to the fight against destroying our planets, regardless of how small the effort is, because something is always better than nothing!


### tl;dr Write better and more efficient software!
This article is inspired by an article written by the author of the popular npm package [chokidar](https://www.npmjs.com/package/chokidar) which is widely downloaded (17,502,821 weekly downloads and probably much more when you are reading this) and used by companies across the world to power the internet!

Here is the link to it to his article ["How to save 32TB of traffic every week with one NPM package"](https://paulmillr.com/posts/chokidar-3-save-32tb-of-traffic/?source=post_page-----f27e04078465--------------------------------)


## What can you do?
As a software developer / consultant, one of the EASIEST way to help, is simply to be better at our jobs… what do I mean? Well, let us be better at our jobs and write not just better, but also more efficient code! How often do we think about the environmental impact of the software that we write? Perhaps by doing simple optimization, we can use less CPU compute cycles and less system memory, and in turn, run our code on a cheaper VM/Smaller-container which in turns means less emissions from the server’s operation!

You might think that this might not be worth it, as the gains from this would be so small that the carbon offset do not make that much of a difference, but… by doing this, not just are you taking a stance and combating climate change as you work, you are also sharpening your software development skills and in some cases, spending less money on development machines and cloud usage! It is a win, win, win solution and what better way to get yourself motivated to do so?

Well that’s great and all, but how do I go about doing that? Is there any specific places I can start from? Well of course, I am not going to leave you hanging just like that. I’ve gathered a list of things that I personally do in my own development that may offer you a easy starting point going in.

Here are the examples:

1. As discussed in the linked article from Chokidar’s author, create Smaller packages/libraries when sharing it on the internet! Packaging your packages to be smaller is really useful in reducing the amount of bandwidth used when it is downloaded and in turn reduces the carbon footprint from downloads! Libraries like Chokidar which are wildly popular and widely used, even a small change in size can have significant impacts!
1. When using docker for your applications, use the whitelisting method in your dockerignore file, to SPEED UP development process by minimizing build context file transfer and also waste less CPU + memory building your docker images! Here’s a [Stackoverflow answer](https://stackoverflow.com/questions/45118244/how-to-delete-files-sent-to-docker-daemon-build-context/45118985#45118985) explanation on build context and the build process, and in the last paragraph of this [reference](https://docs.docker.com/reference/dockerfile/#dockerignore-file), you can see how to do whitelisting!
1. Implement caching in your applications when calling certain external APIs or for client facing APIs. This way, not just do you reduce bandwidth used, you also add a layer of cascading failure prevention by ensuring the data is always available via cache even if it is not the latest and greatest!
1. Use better search/sort algorithms to process datasets faster! Well, this is simple, by doing this, you reduce the CPU cycles and Ram needed for the computation. You can save money AND reduce carbon footprint AND get familiarised with this type of algorithms which ALWAYS pops out in technical interviews!
1. This is a tough one, but don’t get a overpowered pc because it will create higher carbon footprint. Yes some of you love your overpowered beasts, but other than the brag factor, is it honestly really worth your money? If you average out the price, you can easily be paying $7 EVERY. SINGLE. DAY. for a PC that you just use for running your text based coding environment… 😂 spend that money on something better my friends, you are better than that and you’ll thank yourself for all that sweet sweet cash you saved.
1. The list goes on and on, but I’m sure you get the point. Write better and more efficient software to help the environment AND become a better developer!

From the examples, we can see how even simple actions, can not just benefit the environmental impact, it can also improve our code quality and development time! *Nobody loves slow build time… right? 😂

Some of you might be thinking now, hey… wait a minute, in your examples, the benefits are only reaped when the usage scales up and reap the benefits from [Economies of scale](https://www.investopedia.com/terms/e/economiesofscale.asp). If I work at a small company, perhaps a startup, does that mean that this does not apply to me, and I should focus on just getting it working instead of doing it the better and correct way?

Well, you are right, surely most of us do not write software or work on software that have impacts at this level, but more often that not, code that are used everywhere were projects that started out as experiments by hobbyists and in the case of startups, where the startup manage to scale humongously in a relatively short period of time. So it is always better be on the right side of history, as someone who is known writing good efficient code than someone couldn’t care and just got the job done without thinking it through and letting others handle the mess.

If you are in a startup, more often than we would like to admit, once the code is working it will probably not be revisited/touched or re-written for a very very long time, possibly even forever. Thus it’s even more important to get it right the first time. YOU, can make better engineering decisions and write more efficient code, to ensure future code built on top of what we did today to be more efficient as their impact and usage grows!

Remember, We are not just writing better quality code to help combat the impacts of climate change, We are also writing better and more efficient code, to help us grow as software engineers further and potentially save some money!

![img](./2.webp)

> Think harder.
>
> Don’t worry, it’s actually good for us 😊

Well I hope that you were able to see the benefits of simply becoming a better programmer in our fight against the pressing Climate Change issue and I sincerely wish you the best down your path of self-improvement too!

Using this as my motive, it has helped me tremendously in becoming a better developer whilst knowing that I am doing my part. And as for the cherry on top, I would dare say that because of my improved coding skills and projects which implements and showcases these efforts, I was even able to get scouted by big tech companies like Amazon and Singapore GovTech and received great offers from other companies too!

If I can do it, so can you, thus before we end of today’s sharing journey, I would like to issue you a challenge.

> I challenge you to think harder, and to write better and more efficient code. To become a better programmer while doing our part combating climate change via simple daily actions!

THAT'S IT AND THANK YOU so much for reading through and coming along this journey.