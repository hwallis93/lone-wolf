export enum Responsibility {
  DICE = "Dice",
  ENDURANCE_POINTS = "Endurance Points",
  GM = "GM",
  GOLD = "Gold",
  ITEMS = "Items",
  WEAPONS = "Weapons",
}

export enum Discipline {
  CAMOUFLAGE = "Camouflage",
  HUNTING = "Hunting",
  SIXTH_SENSE = "Sixth Sense",
  TRACKING = "Tracking",
  HEALING = "Healing",
  WEAPONSKILL = "Weaponskill",
  MINDSHIELD = "Mindshield",
  MINDBLAST = "Mindblast",
  ANIMAL_KINSHIP = "Animal Kinship",
  MIND_OVER_MATTER = "Mind Over Matter",
}

export interface Player {
  name: string;
  responsibilities: Responsibility[];
}
