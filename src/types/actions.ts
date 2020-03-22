export * from './aquireActions';
export * from './bellicoseActions';
export * from './manipulationActions';
export * from './movementActions';
export * from './observationActions';
export * from './speechActions';
export * from './supportActions';
export * from './usageActions';

// TODO: Create the action Interfaces dynamically

export interface StringActions {
  aquire: string[];
  bellicose: string[];
  manipulation: string[];
  movement: string[];
  observation: string[];
  speech: string[];
  support: string[];
  usage: string[];
}

export interface MapActions {
  aquire: Map<string, string>;
  bellicose: Map<string, string>;
  manipulation: Map<string, string>;
  movement: Map<string, string>;
  observation: Map<string, string>;
  speech: Map<string, string>;
  support: Map<string, string>;
  usage: Map<string, string>;
}
