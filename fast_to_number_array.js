
// 生成加速函數的代碼字符串
const fastNum2ArrFnTemplate = strLength => {
  let elements = Array.from(Array(strLength)).map((p, cursor) => {
    // 等效于 `parseInt(str[${cursor}])`， 這麼寫是提高执行效率
    return `  str[${cursor}] * 1`
  })

  // 因為一位是校驗碼，故捨去
  elements.pop()

  // 反轉
  return `str => [
    ${elements.reverse().join(',\n')}
  ]`
}

// 生成加速函數
const fastNum2ArrGenerator = strLength => eval(fastNum2ArrFnTemplate(strLength))

module.exports = new class {
  init(length_list) {
    length_list.forEach(l => {
      this[l] = fastNum2ArrGenerator(l)
    })
    return this
  }
  clear() {
    Object.keys(this).forEach(key => {
      delete this[key]
    })
    
    return this
  }
}
