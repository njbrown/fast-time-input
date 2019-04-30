# Fast Time Input

---

[![npm downlaods](https://img.shields.io/npm/dm/fast-time-input.svg?style=for-the-badge)](https://www.npmjs.com/package/fast-time-input)
[![npm version](https://img.shields.io/npm/v/fast-time-input.svg?style=for-the-badge)](https://www.npmjs.com/package/fast-time-input)
![npm type definitions](https://img.shields.io/npm/types/fast-time-input.svg?style=for-the-badge)
[![Renovate badge](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=for-the-badge)](https://renovatebot.com/)

---

Shortcodes for time input

---

Save time inputting dates by writing shortcut values and have them converted to time strings e.g. `130p => 01:30 PM`. It makes entering large amount of date entries really fast.

### List of features

- Converts shortcode times to time strings
- Displays time in 12 and 24 hours
- Specify AM `a` or `am` or PM using `p` or `pm`, defaults to AM e.g. `545p => 05:45 PM` and `220a => 2:20a`

### Installation

```shell
$ npm install --save fast-time-input
```

or

```shell
$ yarn add fast-time-input
```

### Examples Conversions

Single and double digits

```
1p => 1:00 PM
12p => 12:00 PM
13pm => 1:00 PM
```

Triple digits

```
130 => 1:30
125 => 1:25
```

Quadruple Digits

```
0530 => 5:30
1555 => 15:55
```

### Code Demo

```js
import * as fti from "fast-time-input";
result = fti.parse("130p");
consle.log(result);
```

prints "01:30 PM"

### Contributing

If you find any bugs or issues let me know.

### License

This project is licensed under the MIT License
