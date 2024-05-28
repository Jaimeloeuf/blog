---
title: AngularDart Pitfalls part 1, Components not showing up!?!
date: 2019-04-25
tags:
    - AngularDart
    - Web Development
    - Software Engineering
---
![AngularDart](./1.webp)

So you just started learning how to build Single Page Applications in AngularDart. As you work on the tutorials, you want to create a new component or add some features to the existing ones, but after just 1 edit, the component just disappears!?!

Being shook, you check your "webdev serve" output but it shows that all is working and there are no errors in your window console too… Ugh why did it disappear? Well its most likely because of the below reasons!

You did not set the directives you need to use in the `@Component` decorator!

```typescript
// Example code taken from the "Tour of the Hero" tutorial
@Component(
    selector: 'my-hero',
    templateUrl: "hero_component.html",
    styleUrls: ['hero_component.css'],

    // Note the directives being included below.
    // Always include directives needed in your template!
    directives: [coreDirectives, formDirectives])
```

```html
<div *ngIf="hero != null">
    <h2>{{hero.name}}</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
        <label>name: </label>

        <!-- Note the ngModel directive used below!
             If the directive is not included, it will not work
             and will fail silently instead! -->
        <input [(ngModel)]="hero.name" placeholder="name">

    </div>
    <button (click)="goBack()">Back</button>
</div>
```

## Solution
1. Always remember to set the directives that you need to use in the `@Component` decorator if not the tag in the template wont work!
1. Check if the tag u selected in the selector is correct
1. Note that: The template will just "fail silently" with no warnings or errors shown if the above is not done!
