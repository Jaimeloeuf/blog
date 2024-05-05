---
title: Named exports are better than default ones (mostly)
date: 2022-08-11
tags:
    - Software Engineering
    - Programming Langauge Design
    - JavaScript
    - TypeScript
---
## tl;dr
This article talks about the difference between the different module export types, [Default vs Named exports](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) in [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), and why named exports are the preferred option in most cases.

Prefer named exports over default exports as named imports are explicit and have better type/editor support.


## What is a default export?
ES6 module `default` exports comes from replicating the functionality of exporting modules in the CommonJS spec. Let's take a look at the following piece of code:
```javascript
// src/components/SomeComponent.js
export default class SomeComponent {
    ...
}
```

You can import it this in another file with:
```javascript
// src/App.js
import SomeComponent from './components/SomeComponent';
```

After importing it you can use it however you like in App.js. The important thing is that you don't have to use `SomeComponent` as the name of imported code. It can be literally anything, because there's no strict convention here.


## What is a named export?
A named export is where you export a symbol like a variable or function name:
```javascript
// src/components/SomeComponent.js
export class SomeComponent {
    ...
}
```

You can import it this in another file with:
```javascript
// src/App.js
import { SomeComponent } from './components/SomeComponent';
```

To import the same component that is now defined as a `named` export, you would need to use the same exact name as it is defined in the source file.


## The case for named exports
Named exports should be preferred over default exports for the vast majority of cases with some exceptions, and the main reason for preferring it is due to the naming requirements during import, where named exports enforce the use of the same name. This section explores all the implications of this difference to make the case for using named exports by default.

### Importing named exports is less buggy
Named exports are explicit and are stricter because the names are defined in the exporting files and naming consistency is enforced.

The code works perfectly but is wrong on so many levels:
```javascript
import Angular from "react";

function HelloComponent() {
  return Angular.createElement("div", null, "Hello World");
}
```

This can happen and diving deeper, it is becauase it's difficult to figure out what is being imported when a module only has a default import.

Just imagine using an unfamiliar module like `const list = require("./list")`, in this context, what would you expect `list` to be? It's unlikely to be a primitive value but it could logically be a function, class, or other type of object and how will you know for sure?

You need to make a side trip by either opening the file and looking for the export or opening the documentation for it.

In either case, this now becomes an extra bit of information you need in your brain to avoid a second side trip penalty when you need to import from `list.js` again.

If you are importing a lot of defaults from modules then either your cognitive overhead increases or the number of side trips increases. Both of which are suboptimal and frustrating.

Names should be consistent throughout all files. If something is an Apple in one file, it shouldn't be called Orange in another file. An Apple should always be an Apple.

By using named exports, you can precisely indicate what you are importing without having to worry about importing the wrong thing as most editors will warn you about it and allow you to jump to its definition directly:
```javascript
import { React } from "react";

function HelloComponent() {
  return React.createElement("div", null, "Hello World");
}
```

If you would like to use a different name for whatever reasons (e.g. avoid duplicate names in the same namespace), you can still do so explicitly:
```javascript
import { React as SomethingElse } from "react";

function HelloComponent() {
  return SomethingElse.createElement("div", null, "Hello World");
}
```

You can also group imports with a new namespace to avoid naming collisions:
```jsx
// src/components/UI.js
export function Button { return <button>Something</button> }

// src/App.js
import * as Buttons from './components/UI';

// A function with the same name as the one in Buttons.js
const Button = () => <button>Something</button>;

function App () {
    return (
        <Button />
        <UI.Button />
    )
}
```

In summary, these imports are explicit and have better type/editor support


### It is confusing when the same package uses both default and named exports
Ever paused wondering if you have to do something like this:
```javascript
import { React, createRef } from 'react';
```

Or this:
```javascript
import React, { createRef } from 'react';
```

That pause is bad developer experience and can break your flow, worse still if you ignore it and import the wrong thing.


### Cleaner export aggregation
Named exports are helpful if you use [barrel files](https://adrianfaciu.dev/posts/barrel-files/), i.e. combining exports in a index.js file within a folder to make import source easier.

With named exports
```javascript
// index.js barrel file
export { Title } from "./components/title";
export { Navigation } from "./components/Navigation";
```

With default exports, it is a two step process:
```javascript
// index.js barrel file
import Title from "./components/title";
import Navigation from "./components/Navigation";
export { Title, Navigation };
```


### Name matching problems
Named exports require consuming modules to at least specify the name what they are importing from a module, allowing us to easily search symbols like `LinkedList` for example, and once found, should refer to the same LinkedList everywhere.

Default exports do not enforce their imported names, this means that naming imports increases your cognitive load as you need to determine the correct naming convention and make sure that every other developer working on the same application will use the same name for the same thing.

You can, of course, allow each developer to use different names for the same thing, but that introduces more cognitive overhead for the team

Importing a named export means at least referencing the canonical name of a thing everywhere that it's used and even if you choose to rename an import, it is done explicitly where the canonical name is first referenced:
```javascript
import { LinkedList as MyList } from "./list.js";
```

When naming is consistent across a codebase, you're able to easily do things like:

1. Search the codebase to find usage information.
1. Refactor the name of something across the entire codebase.

It is also possible but alot more difficult, complicated and error-prone to do this when using default exports and ad-hoc import naming.


### Importing the wrong thing
Named exports in JavaScript modules have a particular advantage over default exports in that an error is thrown when attempting to import something that doesn't exist in the module.

Consider this code:
```javascript
import { LinkedList } from "./list.js";
```

If LinkedList doesn't exist in list.js, then an error is thrown. Furthermore, tools like IDEs and ESLint can easily detect missing references before any code is executed.


## Exceptions: The case for default exports
There are times where using default exports is just easier and just because most of the times named exports should be preferred, it does not mean that it is a hard and fast rule where default exports are 'banned'.

### VueJS components
When using VueJS [SFCs (Single File Components)](https://vuejs.org/guide/scaling-up/sfc.html), these are compiled to give a single default export and cannot be changed.

See this [github issue](https://github.com/vuejs/vue-loader/issues/1234) and this [specific comment by Evan You](https://github.com/vuejs/vue-loader/issues/1234#issuecomment-409020334) on why Vue components will always be default exports.

### Lazily loaded modules
When lazily importing modules with the async `import` function, the code is always alot cleaner to write, and these can happen quite often when doing code splitting / lazy loading different view components.

There is also the case when lazy loading view components in `vue-router`, where it is much easier to do a default import rather than parsing out the named export.

Other tools such as those that are used when developing React apps, does not accomodate named exports convention. For instance when lazy loading React components. It's a code design decision made by React team. At the end you have to write something like the following, in order to lazy load your React component:
```jsx
// With named export
const LazyComponent = React.lazy(() => import("./LazyComponent").then(({ default: component }) => component));

// With default export
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App {
    return (
        <div>
            <Suspense fallback={<div>Loading ...</div>}>
                <LazyComponent />
            </Suspense>
        </div>
    )
}
```


## Conclusion
Since it is generally better to be explicit than implicit, what something does, what something should be called, etc., should always be made explicit whenever possible. Therefore, use named exports wherever you can, and fallback to default exports only in very specific edge cases where it will be more cumbersome to do a named export.

More specific advice:
1. For Vue JS UI components where it is 1 file per component defined using SFCs, use default exports as this is set by Vue and cannot be changed.
1. When writing TS/JS modules, always use named exports.


## References & Credits
1. <https://rajeshnaroth.medium.com/avoid-es6-default-exports-a24142978a7a>
1. <https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/>