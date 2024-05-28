---
title: AngularDart Pitfalls part 2, Template failures
date: 2019-05-01
tags:
    - AngularDart
    - Web Development
    - Software Engineering
---
![AngularDart](./1.webp)

Most people like myself started learning AngularDart by following the official tutorial to build the "Tour of the Heroes" app. After following a few more code examples we get a bit more confident and start to experiment with things like creating new Components or editing the older ones, and that is where we face some issues where our component template fails…

## UGH...

Some of the problems you would see:
1. Failure during build with error in "some_component.template.dart" file.
1. Failure during build with "cannot access ..." failure in the "some_component.template.dart" file. Where the "..." represent a variable or object property name.
1. Template/Component cannot load even if there is no build error.
1. When the build works fine but rendering fails and browser console shows: "EXCEPTION: NoSuchMethodError: invalid member on null: 'property'"

If any of the above sounds like your problem than fret not because I’ve got the solution! But first let us go through what are some of the problems causing these issues.

## Problem
These problems are usually caused by our templates trying to access variables/values/component-properties that are not available in the context of the template. Which basically means that the value accessed does not exists in your component class.

Either because your class does not have that property anymore after a code change or because you did not create the value in the first place, or even possibly because you spelled the **value name** wrongly in your template!


## Solution
Simple! Either add in the missing field, assign a value to that field or spell it correctly in the template to access the variable! If these still don’t solve the problem, make sure that the value stored in the field is not **null**, either with a default value assignment, or a null check.

Tip: When displaying property values from the Component object, make sure to always check for null values using the `*ngIf` coreDirective.

To do the check, remember to add coreDirective or 'ngIf' into the list of providers in the "Component" decorator for that view Class.

Remember that if the value to be displayed is null, angular will either fail to parse it on build, or rendering will fail on the fly!

Thanks for reading! Hope this article helps, and if you need any help, leave a comment down below! Goodbye and see you in the next article!