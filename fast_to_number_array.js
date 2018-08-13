const fastNum2ArrFnTemplate = strLength => `str => [
${
  Array.from(Array(strLength)).map((p, cursor) => {
    return `  parseInt(str[${cursor}])`
  }).join(',\n')
}
]`

const fastNum2ArrGenerator = strLength => eval(fastNum2ArrFnTemplate(strLength))

module.exports = Object.assign(
  {},
  ...[16, 17, 19].map(l => {
    return { [l]: fastNum2ArrGenerator(l) }
  })
)
