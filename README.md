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

# Command line

```
G:\my-pkg\check-luhn>check-luhn 6225365271562822
true

G:\my-pkg\check-luhn>check-luhn 6225365271562999
false

G:\my-pkg\check-luhn>check-luhn 6225365271562822 6225365271562822 6225365271562822
true

G:\my-pkg\check-luhn>check-luhn 6225365271562822 6225365271562822 6225369999999999
false
```

# Performance

**> 5,400,000** ops/sec in Intel Core i5-4460 (Windows 7 64bit, Node v8.11.3 64bit)
<br>
**> 14,900,000** ops/sec using `fast_toNumberArray` in Intel Core i5-4460 (Windows 7 64bit, Node v8.11.3 64bit)

```
C:\Users\vec\Desktop\check-luhn>node benchmark.js
check-luhn#CorrectCard x 5,475,450 ops/sec ±0.13% (97 runs sampled)
check-luhn#IncorrectCard x 5,655,244 ops/sec ±0.35% (96 runs sampled)

Fastest is check-luhn#IncorrectCard

check-luhn#CorrectCard with fast_toNumberArray x 14,943,990 ops/sec ±0.33% (92 runs sampled)
check-luhn#IncorrectCard with fast_toNumberArray x 14,949,358 ops/sec ±0.11% (94 runs sampled)

Fastest is check-luhn#IncorrectCard with fast_toNumberArray
```
