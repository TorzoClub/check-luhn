import test from 'ava'
import check from '../'

test('输入必须是字符串类型', t => {
  [6225365271562822, 1.1, null, undefined, {}, [], NaN, Infinity].forEach(value => {
    t.throws(() => check(value), TypeError)
  })
  t.throws(() => check(), TypeError)

  t.notThrows(() => {
    check('6225365271562822')
  })
})

test(`正确的卡号 '6225365271562822'`, t => {
  check.fast_toNumberArray.clear()
  t.true(check('6225365271562822'))
})

test(`错误的卡号 '6225365271562823'`, t => {
  check.fast_toNumberArray.clear()
  t.false(check('6225365271562823'))
})

test(`fast_toNumberArray 正确的卡号 '6225365271562822'`, t => {
  check.fast_toNumberArray.init([15, 16, 17, 18, 19, 20])
  t.true(check('6225365271562822'))
})

test(`fast_toNumberArray 错误的卡号 '6225365271562823'`, t => {
  check.fast_toNumberArray.init([15, 16, 17, 18, 19, 20])
  t.false(check('6225365271562823'))
})
