export enum Control {
  COMBAT = "Combat",
  DICE = "Dice",
  ENDURANCE_POINTS = "Endurance Points",
  GOLD = "Gold",
  BACKPACK = "Backpack",
  WEAPONS = "Weapons",
}

export interface Player {
  name: string;
  controls: Control[];
}

export interface Discipline {
  name: string;
  tldr: string;
  description: string;
}
