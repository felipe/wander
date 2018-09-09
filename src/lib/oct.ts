const chalk = require('chalk');

export interface Oct {
    // Description
    name: string;
    description: string;

    // Value
    value: number;

    // Objects
    objects: string[];

    // Location
    exits: string[];
    top_left: Oct | MapSquare | MapOct | null;
    top: Oct | MapSquare | MapOct | null;
    top_right: Oct | MapSquare | MapOct | null;

    left: Oct | MapSquare | MapOct | null;
    right: Oct | MapSquare | MapOct | null;

    bottom_left: Oct | MapSquare | MapOct | null;
    bottom: Oct | MapSquare | MapOct | null;
    bottom_right: Oct | MapSquare | MapOct | null;
}

export class MapSquare implements Oct {
  name = "";
  description = "";
  value = 0;
  objects: string[] = [];

  exits: string[] = [];

  top_left: Oct | MapSquare | MapOct | null = null;
  top_right: Oct | MapSquare | MapOct | null = null;
  bottom_left: Oct | MapSquare | MapOct | null = null;
  bottom_right: Oct | MapSquare | MapOct | null = null;

  top: Oct | MapSquare | MapOct | null = null;
  left: Oct | MapSquare | MapOct | null = null;
  right: Oct | MapSquare | MapOct | null = null;
  bottom: Oct | MapSquare | MapOct | null = null;

  constructor(name: string,
              description: string,
              value: number, objects: string[],
              top: Oct | MapSquare | MapOct | null = null,
              left: Oct | MapSquare | MapOct | null = null,
              right: Oct | MapSquare | MapOct | null = null,
              bottom: Oct | MapSquare | MapOct | null = null) {
                
    this.name = name;
    this.description = description;
    this.value = value;
    this.objects = objects;

    this.top = top;
    if(top != null) { this.exits.push("top"); }
    this.left = left;
    if(left != null) { this.exits.push("left"); }
    this.right = right;
    if(right != null) { this.exits.push("right"); }
    this.bottom = bottom;
    if(bottom != null) { this.exits.push("bottom"); }
  }

  printFullDescription() {
    console.log(this.getTextFullDescription());
  }

  printExits() {
    let exitsText = this.getTextExitList();
    if(exitsText.length === 0) {
      console.log(`There are no exits.`);
    } else {
      console.log(`Exits are: \r\n ${exitsText}`);
    }
  }

  getTextExitList() {
    let exits = "";
    this.exits.forEach((exit, index)=>{
      exits += `${chalk.bold(exit)}`;
      exits += (index == this.exits.length) ? ", " : "";
    });
    return exits;
  }

  getTextFullDescription() {
    return this.description + " " + this.getTextObjectList();
  }

  getTextObjectList() {
    let objects = "";
    this.objects.forEach((object)=>{
      objects += `There is a ${chalk.underline.bold(object)} here. `;
    });
    return objects;
  }
}

export class MapOct extends MapSquare {
  constructor(name: string,
              description: string,
              value: number,
              objects: string[],
              top_left: Oct | MapSquare | MapOct | null = null,
              top: Oct | MapSquare | MapOct | null = null,
              top_right: Oct | MapSquare | MapOct | null = null,
              left: Oct | MapSquare | MapOct | null = null,
              right: Oct | MapSquare | MapOct | null = null,
              bottom_left: Oct | MapSquare | MapOct | null = null,
              bottom: Oct | MapSquare | MapOct | null = null,
              bottom_right: Oct | MapSquare | MapOct | null = null) {
    super(name, description, value, objects, top, left, right, bottom);
    this.top_left = top_left;
    this.top_right = top_right;
    this.bottom_left = bottom_left;
    this.bottom_right = bottom_right;
  }
}
