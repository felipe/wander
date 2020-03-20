import test from 'ava';
import { Item } from './item';

const item1 = {
  description: 'It is a simple barrel.',
  name: 'Barrel',
  quantity: 1,
  value: 1,
  messages: {
    usage: ['How do you use a barrel?']
  }
};

const item2 = {
  description: 'This cloak makes you invisible.',
  name: 'Invisibility Cloak',
  hidden: true,
  quantity: 1,
  value: 1,
  taken: false
};

test('Check item name', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getName(), 'Barrel');
});

test('Check item description', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getDescription(), 'It is a simple barrel.');
});

test('Verify item is not hidden', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.isHidden(), false);
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

test('Verify item is hidden', (t: any) => {
  const i2 = new Item('invisibility_cloak', item2);
  t.deepEqual(i2.isHidden(), true);
});

test('Take Item', (t: any) => {
  const i2 = new Item('invisibility_cloak', item2);
  t.deepEqual(i2.wasTaken(), false);
  i2.take();
  t.deepEqual(i2.wasTaken(), true);
});

test('Get Usage Message', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getUsageMessage(), 'How do you use a barrel?');
});
