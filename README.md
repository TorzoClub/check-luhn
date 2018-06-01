# check-luhn

bank card number luhn check

# example

```javascript
const check = require('check-luhn')
const correct_card = '6225365271562822'
const incorrect_card = '6225365271562823'

check(correct_card) // true
check(incorrect_card) // false

```
