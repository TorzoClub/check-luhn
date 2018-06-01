const bitSum = num => {
  num = String(num)
  if (num.length > 1) {
    return num.split('').reduce((a, b) => parseInt(a) + parseInt(b))
  } else {
    return parseInt(num)
  }
}

const isOdd = num => (num % 2) !== 0

const bitCompute = (numArr, cursor = 0) => {
  const val = parseInt(numArr[cursor])

  if (cursor === numArr.length) {
    return 0
  } else {
    return bitCompute(numArr, cursor + 1) + (isOdd(cursor) ? val : bitSum(val * 2))
  }
}

// 取出最後一位作爲校驗碼，剩下都反轉
// 反轉的數組傳入後按位相加，偶數位都要 ｘ 2，奇數位直接參與相加
// 相加後得到的总和 ＋ 校验码 能被 10 整除
const luhnCheck = num => {
  if (typeof(num) !== 'string') {
    throw TypeError('Expected string input')
  } else {
    num = num.split('')
    return 0 === ((
      parseInt(num.pop()) + bitCompute(num.reverse())
    ) % 10)
  }
}

module.exports = luhnCheck
