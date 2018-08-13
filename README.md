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

**> 2,000,000** ops/sec in Windows 7 Intel Core i5-4460

```
C:\Users\vec\Desktop\check-luhn>npm run benchmark

> check-luhn@0.2.0 benchmark C:\Users\vec\Desktop\check-luhn
> node ./benchmark.js

check-luhn#CorrectCard x 2,119,066 ops/sec ±0.17% (105 runs sampled)
check-luhn#IncorrectCard x 2,149,912 ops/sec ±0.10% (109 runs sampled)
Fastest is check-luhn#IncorrectCard
```
