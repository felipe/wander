import test from 'ava';
import { Select } from './select';

test('Class is correct', async (t: any) => {
  const select = new Select();
  t.deepEqual(select instanceof Select, true);
});
