import test from 'ava';
import { Select } from './select';

test('Class is correct', async (t: any) => {
  const select = new Select();
  t.deepEqual(select instanceof Select, true);
});

// test('Class response is correct', async (t: any) => {
//   const select = Select.YNQuestion('yes or no');
//   t.deepEqual(select, true);
// });
