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
| ![Vue](https://img.shields.io/badge/vue-2.2.x-brightgreen.svg "Vue Version") | ![BuildStatus](#buildstatus#) | ![Statements](#statements# "Make me better!") | ![Branches](#branches# "Make me better!") | ![Functions](#functions# "Make me better!") | ![Lines](#lines# "Make me better!")
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