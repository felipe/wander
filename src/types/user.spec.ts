import test from 'ava';
import { Item } from './item';
import { User } from './user';

const userID = 'this-should-bea-uuid';

const user1 = new User(userID);

test('User ID should match', (t: any) => {
  t.deepEqual(user1.getId(), userID);
});

test('User Name should match', (t: any) => {
  t.deepEqual(user1.getName(), userID);
});

test('Check one item in inventory', (t: any) => {
  const user2 = new User(userID);
  const item1 = new Item('mop', {});
  user2.addToInventory(item1);
  t.deepEqual(user2.checkInventory('mop')!.getId(), 'mop');
});

test('Two items in inventory', (t: any) => {
  const user2 = new User(userID);
  const item1 = new Item('mop', {});
  const item2 = new Item('bucket', {});
  user2.addToInventory(item1);
  user2.addToInventory(item2);
  t.deepEqual(user2.listInventory(), 'mop, bucket');
});
