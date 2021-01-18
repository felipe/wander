import test from 'ava';
import { Item } from './item';

const item1 = {
  description: 'It is a simple barrel.',
  durability: 1,
  messages: {
    usage: ['How do you use a barrel?'],
  },
  name: 'Barrel',
  outcomes: {
    usage: [
      ['winery', 'wine'],
      ['refinery', 'oil'],
    ],
  },
  quantity: 1,
  taken: true,
  value: 1,
};

const item2 = {
  description: 'This cloak makes you invisible.',
  hidden: true,
  name: 'Invisibility Cloak',
  outcomes: {},
  quantity: 1,
  taken: false,
  value: 1,
};

const item3 = {
  description: 'A sparkling chest made of gold.',
  durability: 1,
  items: ['holyGrail'],
  messages: {},
  name: 'Golden Chest',
  nameAlias: ['gold chest', 'chest'],
  outcomes: {},
  quantity: 1,
  taken: true,
  value: 1,
};

test('Check item name', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getName(), 'Barrel');
});

test('Check item description', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getDescription(), 'It is a simple barrel.');
});

// Should be moved to items
// test('Check item description, with contents', (t: any) => {
//   const i1 = new Item('goldenChest', item3);
//   t.deepEqual(
//     i1.getDescription(),
//     'A sparkling chest made of gold. It contains a holyGrail'
//   );
// });

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
  const i2 = new Item('invisibilityCloak', item2);
  t.deepEqual(i2.isHidden(), true);
});

test('Verify item is taken', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.wasTaken(), true);
});

test('Verify item responds to its alias', (t: any) => {
  const i3 = new Item('goldenChest', item3);
  t.deepEqual(i3.hasAlias('gold chest'), true);
  t.deepEqual(i3.hasAlias('chest'), true);
  t.deepEqual(i3.hasAlias('coffer'), false);
});

test('Take Item', (t: any) => {
  const i2 = new Item('invisibilityCloak', item2);
  t.deepEqual(i2.wasTaken(), false);
  i2.take();
  t.deepEqual(i2.wasTaken(), true);
});

test('Get Usage Message', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getUsageMessage(), 'How do you use a barrel?');
});

test('Get Durability', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getDurability(), 1);
});

test('Get Usage Outcome for tiles with outcomes', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getUsageOutcome('winery'), 'wine');
  t.deepEqual(i1.getUsageOutcome('refinery'), 'oil');
});

test('Get Usage Outcome for tiles without outcomes', (t: any) => {
  const i1 = new Item('barrel', item1);
  t.deepEqual(i1.getUsageOutcome('livingRoom'), null);
});

test('Get Usage Outcome for no tile', (t: any) => {
  const i2 = new Item('invisibilityCloak', item2);
  t.deepEqual(i2.getUsageOutcome('livingRoom'), null);
});
