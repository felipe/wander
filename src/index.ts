import * as Oct from './lib/oct';

// Cottage (Start)
let cottage_name = "Cottage";
let cottage_description = "You are standing in a small cottage.";
let cottage_objects = [ "Fishing Pole" ];

// Garden Path
let gardenPath_name = "Lush Garden Path";
let gardenPath_description = "You are standing on a lush garden path. There is a cottage here.";
let gardenPath_objects = [ "Rose Bush" ];

// Fishing Pond
let fishingPond_name = "Fishing Pond";
let fishingPond_description = "You are at the edge of a small fishing pond.";
let fishingPond_objects = [ "Fish" ];

let fishingPond = new Oct.MapSquare(fishingPond_name, fishingPond_description, 1, fishingPond_objects);
let gardenPath = new Oct.MapSquare(gardenPath_name, gardenPath_description, 1, gardenPath_objects, null, null, null, fishingPond);
let cottage = new Oct.MapSquare(cottage_name, cottage_description, 1, cottage_objects, null, null, gardenPath);

cottage.printFullDescription();
cottage.printExits();

gardenPath.printFullDescription();
gardenPath.printExits();

fishingPond.printFullDescription();
fishingPond.printExits();
