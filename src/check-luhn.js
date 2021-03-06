// FastToNumberArray 比 toNumberArray 具有更快的執行效率
// 但是內存有限只能緩存幾種常見長度
const FastToNumberArray = require('./fast_to_number_array')
// fast_toNumberArray 配置
const fast_toNumberArray = new FastToNumberArray([16, 17, 18, 19, 20])

// 以便外部可以定制 fast_toNumberArray 的範圍
luhnCheck.fast_toNumberArray = fast_toNumberArray

// 將數字字符串捨去最後一位后轉為數字數組并反轉
const normalToNumberArray = num => {
  const arr = []
  for (let i = num.length - 2; i >= 0; i--) {
    // num[i] * 1 等效于 parseInt(num[i] * 1)
    arr.push(num[i] * 1)
  }
  return arr
}

// 用來識別 fast_toNumberArray 中是否存在加速函數，如果存在則調用它
// 不存在則調用普通的 toNumberArray
const toNumberArray = num => {
  if (fast_toNumberArray.inRange(num.length)) {
    return fast_toNumberArray[num.length](num)
  } else {
    return normalToNumberArray(num)
  }
}

// 因為 evenBitSum 的關係，此時 num 肯定是 2 位的，也就是大於等於 10
// 並且由於按位相加的關係，它的值範圍會是 10~ 19 之間
// 故可採用下面 `1 + (num % 10)` 的優化策略
const allAdd = num => 1 + (num % 10)

// 如果相乘后的值小於 10 的話，則直接返回值。否則要執行個位數和十位數的相加
// `(num < 5)` 即 `((num * 2) < 10)`
const evenBitSum = num => {
  if (num < 5) {
    return num * 2
  } else {
    return allAdd(num * 2)
  }
}

// 按位相加
const bitCompute = numArr => {
  let sum = 0
  for (let i = 0; i < numArr.length; i++) {
    sum += (i % 2) ? numArr[i] : evenBitSum(numArr[i])
  }
  return sum
}

// 取出最後一位作爲校驗碼，剩下都反轉
// 反轉的數組傳入後按位相加，偶數位都要 ｘ 2，奇數位直接參與相加
// 相加後得到的总和 ＋ 校驗碼，能被 10 整除
function luhnCheck(num) {
  if (typeof(num) !== 'string') {
    throw TypeError('Expected string input')
  }

  return 0 === ((
    // num[num.length - 1] * 1 等效于 parseInt(num[num.length - 1])
    bitCompute(toNumberArray(num)) + (num[num.length - 1] * 1)
  ) % 10)
}

module.exports = luhnCheck
