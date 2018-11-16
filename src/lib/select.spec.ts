import test from 'ava';
import { Select } from './select';

const select = new Select();

test('Class is correct', async (t: any) => {
  return t.deepEqual(select instanceof Select, true);
});
