import test from 'ava';
import { Item } from './item';

const item1 = {
  description: 'It is a simple barrel.',
  name: 'Barrel',
  quantity: 1,
  value: 1
};

test('Check item name', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getName(), 'Barrel');
});

test('Check item description', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getDescription(), 'It is a simple barrel.');
});

test('Check if item is destroyed', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.isDestroyed(), false);
});

test('Destroy item', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.isDestroyed(), false);
  i1.destroy();
  t.deepEqual(i1.isDestroyed(), true);
});
