import test from 'ava';
import { Item } from './item';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';

const userID = uuidv4();

const user1 = new User(userID);

const item1 = {
  description: 'It is a simple barrel.',
  name: 'Barrel',
  quantity: 1,
  value: 1
};

const item2 = {
  description: 'It is a simple mop.',
  name: 'Mop',
  quantity: 2,
  value: 1
};

test('User ID should match', (t: any) => {
  t.deepEqual(user1.getId(), userID);
});

test('User Name should match', (t: any) => {
  t.deepEqual(user1.getName(), userID);
});

test('Check one item in inventory', (t: any) => {
  const user2 = new User(userID);
  const i1 = new Item('mop', {});
  user2.addToInventory(i1);
  t.deepEqual(user2.checkInventory('mop')!.getId(), 'mop');
});

test('Two items in inventory', (t: any) => {
  const user2 = new User(userID);
  const i1 = new Item('1', item1);
  const i2 = new Item('2', item2);
  user2.addToInventory(i1);
  user2.addToInventory(i2);
  t.deepEqual(user2.listInventory(), '1x Barrel\r\n2x Mop');
});
