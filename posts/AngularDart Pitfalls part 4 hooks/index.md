---
title: AngularDart Pitfalls part 4, hooks??
date: 2019-08-02
tags:
    - AngularDart
    - Web Development
    - Software Engineering
---
![AngularDart](./header.webp)

In this post, we will make sense of hooks (lifecycle hooks / router hooks / third party hooks), what are they and why are they needed?

Let's start with, What the hell are hooks…

> Hooks are function invocation that are run at specific points on the timeline of a component’s creation.

Okay, what you just read is the official definition, but I know, it might be pretty confusing and hard to understand when you don’t have that much experience dealing with stuff like that.

If you started out developing on AngularDart without any prior experience with other S.P.A (Single Page Application) frameworks, you might find the documentation on Hooks to be rather confusing and lacklustre.

So here it is, an article for the people who started with AngularDart as their first SPA framework just like me and are confused/bored the hell out by the AngularDart docs.


## Basically
Hooks are just the things you use to define when a certain piece of user / your code should run.

If you are familiar with the Event Driven asynchronous software model from languages from JavaScript to C# then,

> Hooks are essentially events emitted at a specific time in point.

It can also be thought of like Webhooks.

Essentially Hooks allow you to program actions to execute at a specific point in time such as, when your component is first loaded or when your component is removed or whatever! And when they are ran depends on what type of hook you are using.

For example, using a lifecycle hook, means that you want to register some code to run at a certain point in the life cycle of the component, like running an API call to fetch data in the Component Created lifecycle hook!

And that’s it! That’s all there really is to hooks. Hope you managed to learn something new and found the explanation easy to understand!