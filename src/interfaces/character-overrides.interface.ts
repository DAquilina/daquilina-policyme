import { Class } from "../enum/class.enum";
import { GenderPresentation } from "../enum/gender-presentation.enum";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";


export interface ICharacterOverrides {
  attributes?: AttributeBlock;
  avatarUrl?: string;
  genderPresentation?: GenderPresentation;
  name?: string;
  level?: number;
  selectedClass?: Class;
  skills?: SkillBlock;
}
