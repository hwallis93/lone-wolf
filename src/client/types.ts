export enum Responsibility {
  GM = "GM",
  GOLD = "Gold",
  ENDURANCE_POINTS = "Endurance Points",
  ITEMS = "Items",
  WEAPONS = "Weapons",
}
export interface Player {
  name: string;
  responsibilities: Responsibility[];
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
