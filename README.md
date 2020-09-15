<p align="center">
<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
<img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo">
</a>
</p>

# Vue Layout Designer
A Vue 2.x drag-and-drop grid layout designer, based on [Gridster.js](http://dsmorse.github.io/gridster.js)

![Screenshot](docs/img/vue-component-demo.gif)

---
| Vue | Build | Statements | Branches | Functions | Lines
| ------ | ------ | ------ | ------- | ------- | ------
| ![Vue](https://img.shields.io/badge/vue-2.2.x-brightgreen.svg "Vue Version") | ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") | ![Statements](https://img.shields.io/badge/Coverage-26.13%25-red.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-15.79%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-34.88%25-red.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-27.62%25-red.svg "Make me better!")
---

## Installation

~~~
npm i @thefoot/vue-layout-designer --save
~~~

## Usage

```javascript
import LayoutDesigner from '@thefoot/vue-layout-designer';

export default {
    ...
    components: { LayoutDesigner },
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
[Component Demo](https://thefoot.github.io/vue-layout-designer/)

## Contributing
Contributions welcome, please read [CONTRIBUTING](docs/CONTRIBUTING.md) and [CODING-STANDARDS](docs/CODING-STANDARDS.md).

## Credits

### Author
- [@TheFoot](https://github.com/TheFoot)

### Contributors
- .

## Licence
[MIT](LICENCE.md)