import test from 'ava';
import { Parse } from './parse';

const command1 = 'north';
const command2 = 'go north';

test('Command 1', (t: any) => {
  t.deepEqual(new Parse(command1), { action: 'north' });
});

test('Command 2', (t: any) => {
  t.deepEqual(new Parse(command2), { action: 'go', subject: 'north' });
});
