import test from 'ava'
import check from '../index'

test(`正确的卡号 '6225365271562822'`, t => {
  t.true(check('6225365271562822'))
})

test(`错误的卡号 '6225365271562823'`, t => {
  t.false(check('6225365271562823'))
})

test('输入必须是字符串类型', t => {
  t.throws(() => {
    check(6225365271562822)
  }, TypeError)

  t.notThrows(() => {
    check('6225365271562822')
  })
})
