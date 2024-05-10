---
title: Errors vs Exceptions
date: 2023-05-31
tags:
    - Software Engineering
    - Programming Langauge Design
---
This posts explores the differences between errors and exceptions, and why they should be handled differently.


## Errors
Errors are invalid states of your program that should not occur or situations that the developer does not expect to happen. If such a situation occurred, it is not something that can be fixed / dealt with by the program itself, usually the developer needs to fix these issues.

For example, OOM (out of memory) error is a classic situation that can happen which the developer does not expect, and the program will not be able to deal with this issue and resolve it.


## Exceptions
Exceptions are various possible undesirable states of your program that can occur. If such a situation occurred, it is expected for the program itself to deal with it or give users the choice on how to move forward. Otherwise known as recoverable errors.

In a sense you can think of exceptions as error states that a program can recover from, and since it can be recovered from, it should be made as easy as possible to do so, therefore it should be treated as a return value rather than an Error that is thrown.

For example, user input validation error is a classic situation that can happen in a program that takes user inputs, which the developer expects. The program should be able to deal with this situation, and this is usually dealt with by asking users to fix their inputs before trying again.


## It is not always black and white
There are many times where an error can be treated as an exception and times where an exception should be treated as an error.

One such example is lost of internet connection. If your app supports offline usage, then the lost of internet connection might just be an exception and you notify your users that their changes won't be synced until they regain their connection. However if your app must have an internet connection, then it should be treated as an error where the user should not be allowed to do anything until they regain connection.


## Programming Language support
Many programming languages support errors/exceptions as a concept but rarely enforce their difference at a language level.

For example, languages like JavaScript treats everything as "exceptions" that can be caught with a `try/catch` block even if the error is not recoverable.

Rust on the other hand is a great example of a programming language supporting this distinction at the language level. Where exceptions can be returned and treated just as values in their `Result<T, E>` type, while errors that are unrecoverable can be left to `panic`.


## Why should we handle Errors vs Exceptions differently?
Only Errors should be thrown like how it was intended to be used, while Exceptions should be **returned** as a value, so that users can deal with exceptions easily in a sequential manner without having to deal with non-deterministic / jumpy control flows like JavaScript's `try/catch` block.