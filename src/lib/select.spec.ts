import test from 'ava';
import { Select } from './select';

const select = new Select();

test('Class is correct', async (t: any) => {
  t.deepEqual(select instanceof Select, true);
});

test('Class is correct', async (t: any) => {
  const select = Select.YNQuestion('yes or no');
  const response = await Select.YNQuestion('yes or no');
  t.deepEqual(select, true);
});
