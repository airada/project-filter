# ProjectFilter
A multi-select dropdown with search and autosuggestions that filter through project cards. 
Project-filter was originally made to showcase portfolio projects. It uses a simple search bar/multi-select dropdown to filter relevant projects using tags. The multi-select function is **not** mutually exclusive (projects must contain all selected tags in order to be displayed).

# DEMO
![ProjectFilter demo gif](https://media.giphy.com/media/DfJQUjyKfdWNfW0Q5n/giphy.gif)  

Website demo: [jasmineirada.com/project-filter](https://jasmineirada.com/project-filter/)

# Features
- Free to use, open-source, fully customizable
- Mobile-first responsive design, working across multiple browsers and devices
- Simple and user-friendly interface
- Allows for multiple (non-mutually exclusive) selection
- Gives auto-suggestions with each key-press
- Can use keyboard keys:   
    - arrow keys to navigate options
    - backspace to delete last selected tag
    - enter/return key to submit search input
- Alert message animation for searched items not found
- Clear All button

To be added:
- Auto-complete
- Option to minimize all tags (only showing first *X* number of tags when there are several selections.)
- More subtle feedback animations
- Themes (different color palettes)

To do:
- Publish project as an NPM package

# Getting Started
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5, and styled with [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) version 4.5.2.

Follow [this link](https://angular.io/guide/setup-local) for instructions on how to install Angular. Angular is required to run and build this project.

**About Components**  
There are two Angular components: filter and project-preview. CSS Files can be edited to suit user's preferred design.

```
Filter:             Handles the searching and selection, and displays the selected tags and dropdown options.  
Project-preview:    Displays project information such as tags and title. Links to project website in another tab.
App:                Contains both filter and project components. Receives event trigger to display projects based 
                    on filtered skill tags.  
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Jasmine Irada** - *Initial work* - [airada](https://github.com/airada)

See also the list of [contributors](https://github.com/airada/project-filter/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
