
// 生成加速函數的代碼字符串
const fastNum2ArrFnTemplate = strLength => {
  let elements = Array.from(Array(strLength)).map((p, cursor) => {
    // 等效于 `parseInt(str[${cursor}])`， 這麼寫是提高执行效率
    return `  str[${cursor}] * 1`
  })

  // 因為最後一位是校驗碼，故捨去
  elements.pop()

  // 反轉
  return `str => [
    ${elements.reverse().join(',\n')}
  ]`
}

// 生成加速函數
const fastNum2ArrGenerator = strLength => eval(fastNum2ArrFnTemplate(strLength))

module.exports = class FastToNumberArray {
  constructor(length_list) {
    if (Array.isArray(length_list)) {
      this.init(length_list)
    }
  }

  // 判斷是否存在加速函數
  // 為什麼在原型中還加入了此方法？
  // 因為執行了 clear 方法后在實例中的 inRange 會被刪除掉
  inRange() {
    return false
  }

  // 更新 inRange 函數
  // 因為是寫入實例中，所以不會覆蓋掉在原型鏈上的 inRange
  updateInRage(length_list) {
    const exp = length_list.map(l => {
      return `(nl === ${l})`
    }).join(' || ')

    this.inRange = eval(`nl => ${exp}`)
  }

  // 初始化加速函數
  init(length_list) {
    if (!Array.isArray(length_list)) {
      throw TypeError('length_list is not Array')
    }

    this.clear()

    length_list.forEach(l => {
      this[l] = fastNum2ArrGenerator(l)
    })

    this.updateInRage(length_list)

    return this
  }

  // 清除實例中所有屬性，包括 inRange
  clear() {
    Object.keys(this).forEach(key => {
      delete this[key]
    })

    return this
  }
}
