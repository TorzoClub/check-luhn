const fast_toNumberArray = require('./fast_to_number_array')

// 之所以不用 `arr.split('')` 这样的方式，还是考虑到速度的问题
const toNumberArray = str => {
  const arr = []
  for (let i = 0; i < str.length; i++) {
    arr[i] = parseInt(str[i])
  }
  return arr
}

// 因为 evenBitSum 的关系，此時 num 肯定是 2 位的，也就是大于等于 10
// 并且按位相加的关系，也就是说它的值范围会是 10 ~ 19 之间
// 故可以采用下面 `1 + (num % 10)` 的优化策略
const allAdd = num => 1 + (num % 10)

// 如果相乘后的值小於 10 的話，則直接返回值。否則要執行個位數和十位數的相加
// `(num < 5)` 即 `((num * 2) < 10)`
const evenBitSum = num => (num < 5) ? (num * 2) : allAdd(num * 2)

const bitCompute = numArr => {
  let sum = 0
  for (let i = 0; i < numArr.length; i++) {
    sum += (i % 2) ? numArr[i] : evenBitSum(numArr[i])
  }
  return sum
}

// 取出最後一位作爲校驗碼，剩下都反轉
// 反轉的數組傳入後按位相加，偶數位都要 ｘ 2，奇數位直接參與相加
// 相加後得到的总和 ＋ 校验码 能被 10 整除
const luhnCheck = num => {
  if (typeof(num) !== 'string') {
    throw TypeError('Expected string input')
  }

  if (fast_toNumberArray.hasOwnProperty(num.length)) {
    // fast_toNumberArray 中如有相關加速函數，則調用它
    num = fast_toNumberArray[num.length](num)
  } else {
    num = toNumberArray(num)
  }

  return 0 === ((
    num.pop() + bitCompute(num.reverse())
  ) % 10)
}

module.exports = luhnCheck
