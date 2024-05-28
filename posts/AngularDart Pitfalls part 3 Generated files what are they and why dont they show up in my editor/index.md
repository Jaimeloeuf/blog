---
title: AngularDart Pitfalls part 3, Generated files?? What are they and why don't they show up in my editor?
date: 2019-08-01
tags:
    - AngularDart
    - Web Development
    - Software Engineering
---
![AngularDart](./1.webp)

### The heck is **"some_component.template.dart"** ???

![whut](./2.gif)

When you are building your AngularDart web application, you may have noticed that you are required to import a generated template file. Which for a component named **my_component.dart** a corresponding file named **my_component.template.dart** will also be generated.

When you need to use certain components or code from a file like **my_component.dart**, often times, you would be asked to import the **my_component.template.dart** file instead. This is because your component is only ready for import after the DDC ([DartDevC](https://dart.dev/tools/dartdevc), the AngularDart to JavaScript transpiler) has transpiled (transpilation is just like compilation but instead of compiling to machine code, it compiles to another language like JavaScript for example) it, into the template file.

On Component.template.dart files:
1. The DDC (Dart Development Compiler) will create the some_component.template.dart file for the corresponding some_component.dart file, IN THE similarly named directory in the build parent directory!!!
1. So make sure that when you try to import it, make sure its from the same folder as the normal .dart file as the editor cannot intelligently tell you where is it!!!
1. Angular uses code generation to generate Dart code from Angular template syntax during compilation. Other components and routers can then import the generated code. The code contains factory methods that are required by the router to create component instances.
1. The generated dart codes for the templates are then transpiled into JS code to run in browsers with the dart2js compiler.
1. If you cannot import the template.dart file, it means that either you are not importing from the correct directory (check where’s your dart module) OR it means that there are errors in your .html template which causes the generation to fail silently in .dart_tools/build/generated [Link](https://stackoverflow.com/questions/52470048/template-dart-file-not-being-created/52470585#52470585)
1. [References](https://stackoverflow.com/questions/50317847/what-does-somecomponent-template-dart-import-in-angulardart-point-to) → as mentioned in this link, no official docs for this yet.
1. [Open issues](https://github.com/angulardart/angular/issues/1107) → Seems like only certain IDE supports the finding of auto generated template.dart files, but still not supported by the dart-analyzer.


To go into more details, [click this link to read the full issue](https://github.com/dart-lang/pana/issues/213)!

The Angular compiler generates component factories behind the scenes when you build the app. To access the factory you need to import the generated component template file. Until you’ve built the app, the generated files don’t exist. Use the thing in the link to disable the errors to calm your linters and static analyzers down!

![outstanding](./3.gif)

Thanks for reading the articles from this series on AngularDart again! Hope you found this useful/helpful and saved you from pulling out all your hair!