import { test } from 'ava'
import { Choice } from 'wander'

let choice1 = new Choice('Name')
let choice2 = new Choice('Complex Name')
let choice3 = new Choice('Something', 'Value')

test('Choice:object', t => {
  t.deepEqual(Object.keys(choice1).length, 2)
})

test('Choice1:key', t => {
  t.deepEqual(choice1.name, 'Name')
})

test('Choice1:value', t => {
  t.deepEqual(choice1.value, 'name')
})

test('Choice2:key', t => {
  t.deepEqual(choice2.name, 'Complex Name')
})

test('Choice2:value', t => {
  t.deepEqual(choice2.value, 'complex_name')
})

test('Choice3:key', t => {
  t.deepEqual(choice3.name, 'Something')
})

test('Choice3:value', t => {
  t.deepEqual(choice3.value, 'value')
})
