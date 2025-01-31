import { CHARACTER_CLASS_IMAGES } from "../constants/character-class-images.constant";
import { CHARACTER_MISC_IMAGES } from "../constants/character-misc-images.constant";
import { CLASS_MINIMUM_REQUIREMENTS } from "../constants/class-minimum-requirements.constant";
import { DEFAULT_ATTRIBUTE_VALUE } from "../constants/default-attribute-value.constant";
import { ORDERED_ATTRIBUTES } from "../constants/ordered-attributes.constant";
import { SKILL_ATTRIBUTES } from "../constants/skill-attributes.constant";

import { Attribute } from "../enum/attribute.enum";
import { Class } from "../enum/class.enum";
import { GenderPresentation } from "../enum/gender-presentation.enum";
import { Skill } from "../enum/skill.enum";
import SkillModel from "../models/skill.model";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";


class CharacterUtil {

  static doesCharacterMeetMinimumRequirementsForClass(className: Class, characterAttributes: AttributeBlock): boolean {

    let requirementsMet = true;

    const classMinimumRequirements = CLASS_MINIMUM_REQUIREMENTS.get(className);

    ORDERED_ATTRIBUTES.forEach(
      (targetAttribute: Attribute) => {

        requirementsMet = requirementsMet && (characterAttributes.get(targetAttribute) >= classMinimumRequirements.get(targetAttribute));
      }
    );

    return requirementsMet;
  }


  static generateDefaultAttributeBlock(): AttributeBlock {

    return new Map<Attribute, number>(
      ORDERED_ATTRIBUTES.map((attribute: Attribute) => {

        return [attribute, DEFAULT_ATTRIBUTE_VALUE];
      })
    ) as AttributeBlock;
  }


  static generateDefaultSkillBlock(): SkillBlock {

    return new Map<Skill, SkillModel>(
      Object.values(Skill).map((skill: Skill) => {

        return [skill, new SkillModel(skill, SKILL_ATTRIBUTES.get(skill), 0)]
      })
    ) as SkillBlock;
  }


  static getAvatarFilter(className?: Class, genderPresentation?: GenderPresentation): string {

    let filter = "";

    if (className && genderPresentation !== GenderPresentation.NonBinary) {
      filter += className;
    }

    if (genderPresentation) {
      filter += `-${genderPresentation}`;
    }

    return filter;
  }


  static getClassAvatarUrl(className: Class, genderPresentation?: GenderPresentation): string {

    return CharacterUtil.getRandomAvatarUrl(CharacterUtil.getAvatarFilter(className, genderPresentation));
  }


  static getRandomAvatarUrl(filter?: string): string {

    const set = [...CHARACTER_CLASS_IMAGES, ...CHARACTER_MISC_IMAGES].filter(
      (imageUrl: string) => {

        if (filter) {
          return imageUrl.includes(filter);
        }

        return true;
      }
    );

    return CharacterUtil._generateImageUrl(set[Math.floor(Math.random() * set.length)]);
  }


  private static _generateImageUrl(targetFile: string): string {

    const prefix = process.env.PUBLIC_URL || `.`;

    return (`${[prefix]}/assets/character-images/${targetFile}`);
  }
}

export default CharacterUtil;
