export * from './types/choice'
export * from './types/oct'
export * from './types/meta'
export * from './types/mapOct'
export * from './types/mapSquare'

export * from './lib/parse'
export * from './lib/select'
export * from './lib/wander'

import { Wander } from '.'

const wander = new Wander();
wander.start();

// // Cottage (Start)
// const cottageName = "Cottage";
// const cottageDescription = "You are standing in a small cottage.";
// const cottageObjects = [ "Fishing Pole" ];
//
// // Garden Path
// const gardenPathName = "Lush Garden Path";
// const gardenPathDescription = "You are standing on a lush garden path. There is a cottage here.";
// const gardenPathObjects = [ "Rose Bush" ];
//
// // Fishing Pond
// const fishingPondName = "Fishing Pond";
// const fishingPondDescription = "You are at the edge of a small fishing pond.";
// const fishingPondObjects = [ "Fish" ];
//
// const fishingPond = new MapSquare(fishingPondName, fishingPondDescription, 1, fishingPondObjects);
// const gardenPath = new MapSquare(gardenPathName, gardenPathDescription, 1, gardenPathObjects, null, null, null, fishingPond);
// const cottage = new MapSquare(cottageName, cottageDescription, 1, cottageObjects, null, null, gardenPath);

// cottage.printFullDescription();
// cottage.printExits();

// gardenPath.printFullDescription();
// gardenPath.printExits();
//
// fishingPond.printFullDescription();
// fishingPond.printExits();
