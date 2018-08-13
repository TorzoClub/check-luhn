const num2arr = str => {
  const arr = []
  for (let i = 0; i < str.length; i++) {
    arr[i] = parseInt(str[i])
  }
  return arr
}

const allAdd = arr => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i])
  }
  return sum
}

const bitSum = num => (num < 10) ? num : allAdd(String(num))

const bitCompute = (numArr, cursor) => {
  let sum = 0
  for (let i = 0; i < numArr.length; i++) {
    sum += (i % 2) ? numArr[i] : bitSum(numArr[i] * 2)
  }
  return sum
}

// 取出最後一位作爲校驗碼，剩下都反轉
// 反轉的數組傳入後按位相加，偶數位都要 ｘ 2，奇數位直接參與相加
// 相加後得到的总和 ＋ 校验码 能被 10 整除
const luhnCheck = num => {
  if (typeof(num) !== 'string') {
    throw TypeError('Expected string input')
  } else {
    num = num2arr(num)
    return 0 === ((
      num.pop() + bitCompute(num.reverse(), 0)
    ) % 10)
  }
}

module.exports = luhnCheck
