import test from 'ava';
import { Choice } from './choice';

const choice1 = new Choice('Name');
const choice2 = new Choice('Complex Name');
const choice3 = new Choice('Something', 'Value');

test('Choice:object', (t: any) => {
  t.deepEqual(Object.keys(choice1).length, 2);
});

test('Choice1:key', (t: any) => {
  return t.deepEqual(choice1.name, 'Name');
});

test('Choice1:value', (t: any) => {
  t.deepEqual(choice1.value, 'name');
});

test('Choice2:key', (t: any) => {
  t.deepEqual(choice2.name, 'Complex Name');
});

test('Choice2:value', (t: any) => {
  t.deepEqual(choice2.value, 'complex_name');
});

test('Choice3:key', (t: any) => {
  t.deepEqual(choice3.name, 'Something');
});

test('Choice3:value', (t: any) => {
  t.deepEqual(choice3.value, 'value');
});

test('Choice:build', (t: any) => {
  const items = ['x', 'y', 'z'];
  const choices = Choice.build(items);
  t.deepEqual(choices, [new Choice('x'), new Choice('y'), new Choice('z')]);
});
