import { Attribute } from "../enum/attribute.enum";
import { Skill } from "../enum/skill.enum";


export interface ISkillOverrides {
  baseValue?: number;
  isGeneric?: boolean;
  specifier?: string;
  targetAttribute?: Attribute;
  targetSkill?: Skill;
}
