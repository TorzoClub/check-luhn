# check-luhn

bank card number luhn check

# Install

```sh
npm install check-luhn
# or
yarn add check-luhn
```

# Example

```javascript
const check = require('check-luhn')
const correct_card = '6225365271562822'
const incorrect_card = '6225365271562823'

check(correct_card) // true
check(incorrect_card) // false

```

# Performance

**> 3,400,000** ops/sec in Intel Core i5-4460 (Windows 7 Professinal 64bit, Node v8.11.3)

```
C:\Users\vec\Desktop\check-luhn>npm run benchmark

> check-luhn@0.2.5 benchmark C:\Users\vec\Desktop\check-luhn
> node ./benchmark.js

check-luhn#CorrectCard x 3,515,237 ops/sec ±0.31% (92 runs sampled)
check-luhn#IncorrectCard x 3,467,781 ops/sec ±0.16% (95 runs sampled)
Fastest is check-luhn#CorrectCard
```
