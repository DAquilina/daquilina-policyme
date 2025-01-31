import { Attribute } from "../enum/attribute.enum";
import { Skill } from "../enum/skill.enum";

export const SKILL_ATTRIBUTES = new Map<Skill, Attribute>(
  [
    [Skill.Acrobatics, Attribute.Dexterity],
    [Skill.AnimalHandling, Attribute.Wisdom],
    [Skill.Arcana, Attribute.Intelligence],
    [Skill.Athletics, Attribute.Strength],
    [Skill.Deception, Attribute.Charisma],
    [Skill.History, Attribute.Intelligence],
    [Skill.Insight, Attribute.Wisdom],
    [Skill.Intimidation, Attribute.Charisma],
    [Skill.Investigation, Attribute.Intelligence],
    [Skill.Medicine, Attribute.Wisdom],
    [Skill.Nature, Attribute.Intelligence],
    [Skill.Perception, Attribute.Wisdom],
    [Skill.Performance, Attribute.Charisma],
    [Skill.Persuasion, Attribute.Charisma],
    [Skill.Religion, Attribute.Intelligence],
    [Skill.SleightOfHand, Attribute.Dexterity],
    [Skill.Stealth, Attribute.Dexterity],
    [Skill.Survival, Attribute.Wisdom]
  ]
);
