import test from 'ava'
import check from '../index'

test('由 factory 方法出来的函数们并不相等', t => {
  t.false(check.factory() === check.factory())
})

test('包括 factory 方法出来的 check 函数都不共用同个 fast_toNumberArray', t => {
  const factoryCheck = check.factory()
  factoryCheck.fast_toNumberArray.clear()

  const set_arr = [30, 31, 32]
  factoryCheck.fast_toNumberArray.init(set_arr)

  set_arr.forEach(set_item => {
    t.false( check.fast_toNumberArray.hasOwnProperty(set_item) )
  })
})

test('输入必须是字符串类型', t => {
  [6225365271562822, 1.1, null, undefined, {}, [], NaN, Infinity].forEach(value => {
    t.throws(() => check(value), TypeError)
  })
  t.throws(() => check(), TypeError)

  t.notThrows(() => {
    check('6225365271562822')
  })
})

function incorrectTest(prefix) {
  test(`${prefix} 正确的卡号 '6225365271562822'`, t => {
    t.true(check('6225365271562822'))
  })

  test(`${prefix} 错误的卡号 '6225365271562823'`, t => {
    t.false(check('6225365271562823'))
  })
}

incorrectTest('normalToNumberArray ', check.factory())

const fast_check = check.factory()
fast_check.fast_toNumberArray.init([15, 16, 17, 18, 19])
incorrectTest('fastToNumberArray ', fast_check)
