<p align="center">
<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
<img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo">
</a>
</p>

# Vue Component Template
A template for creating a single Vue 2.x component for distribution via NPM, using Rollup/Babel.

![Screenshot](docs/img/vue-component-demo.gif)

---
| Vue | Build | Statements | Branches | Functions | Lines
| ------ | ------ | ------ | ------- | ------- | ------
| ![Vue](https://img.shields.io/badge/vue-2.2.x-brightgreen.svg "Vue Version") | ![BuildStatus](#buildstatus#) | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!")
---

## Installation

This is a template repository. To create a new repository based on this one, click on the "USE THIS TEMPLATE" button:

![Use This Template](docs/img/use-this-template.png)
 
Alternatively to work on this repository directly:
~~~
git clone git@github.com:TheFoot/vue-component-template.git
~~~

To install and use the NPM package within your project:

~~~
npm i @thefoot/vue-component-template --save
~~~

## Usage

```javascript
import HelloWorld from '@thefoot/vue-component-template';

export default {
    ...
    components: { HelloWorld },
    ...
};
```

### Props
| Name | Attribute | Type     | Default | Description |
|------|-----------|----------|---------|-------------|
| name | name      | `String` | "World" |             |

### Methods
| Name | Description |
|------|-----------|
| reverse | Reverses the `name` prop for display |

### Events
| Name | Description |
|------|-----------|
|  | |

## Demo
[Component Demo](https://thefoot.github.io/vue-component-template/)

## Contributing
Contributions welcome, please read [CONTRIBUTING](docs/CONTRIBUTING.md) and [CODING-STANDARDS](docs/CODING-STANDARDS.md).

## Credits

### Author
- [@TheFoot](https://github.com/TheFoot)

### Contributors
- .

## Licence
[MIT](LICENCE.md)