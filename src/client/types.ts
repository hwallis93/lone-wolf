export enum Control {
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
