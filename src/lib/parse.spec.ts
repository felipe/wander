import { test } from 'ava'
import { Parse } from 'wander'

let command1 = "north"
let command2 = "go north"
// let command3
// let command4
// let command5
// let command6
// let command7
// let command8
// let command9

test('Choice:object', t => {
  t.deepEqual(new Parse(command1), {"action": "north"})
})

test('Choice:object', t => {
  t.deepEqual(new Parse(command2), {"action": "north"})
})
