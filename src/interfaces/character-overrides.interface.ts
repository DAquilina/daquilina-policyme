import { Class } from "../enum/class.enum";
import { GenderPresentation } from "../enum/gender-presentation.enum";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";


export interface CharacterOverrides {
  name?: string;
  avatarUrl?: string;
  genderPresentation?: GenderPresentation;
  selectedClass?: Class;
  attributes?: AttributeBlock;
  skills?: SkillBlock;
}
