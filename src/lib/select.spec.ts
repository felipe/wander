import { test } from 'ava'
import { Select } from './select'

let select = new Select()

test('Class is correct', async t => {
  t.deepEqual(select instanceof Select, true)
})