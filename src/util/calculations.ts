import { BASE_SKILL_POINTS } from "../constants/base-skill-points.constant";
import { DEFAULT_ATTRIBUTE_VALUE } from "../constants/default-attribute-value.constant";
import { POINT_BUY_TABLE } from "../constants/point-buy-table.constant";
import { SKILL_POINTS_PER_INTELLIGENCE } from "../constants/skill-points-per-intelligence";
import SkillModel from "../models/skill.model";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";


class Calculations {
  /**
   * Determines the cost to increase an attribute from the initial value to the given target value.
   * If the value is decreasing, will instead indicate the number of points returned by returning
   * a negative number.
   *
   * @param initialValue
   * @param targetValue
   */
  static calculatePointBuyCost(initialValue: number, targetValue: number): number {

    if (!Calculations.isValueIsValidForPointBuy(targetValue)) {
      return 0;
    }

    let totalCost = 0;

    const modifier: number = (initialValue > targetValue) ? -1 : 1;

    for (let index = initialValue; index < targetValue; index += modifier) {
      totalCost += POINT_BUY_TABLE[index];
    }

    return totalCost * modifier;
  }


  /**
   * Determines the number of remaining skill points available based on the user's intelligence modifier and how many points they have already spent.
   *
   * @param intelligenceModifier 
   * @param skills 
   */
  static calculateRemainingSkillPoints(intelligenceModifier: number, skills: SkillBlock): number {

    let totalAvailablePoints = BASE_SKILL_POINTS + (intelligenceModifier * SKILL_POINTS_PER_INTELLIGENCE);

    skills.forEach((skill: SkillModel) => {

      totalAvailablePoints -= skill.baseValue;
    });

    return totalAvailablePoints;
  }


  /**
   * Determines the total number of attribute points which have been allocated for the given set of attributes.
   *
   * @param attributes 
   * @returns 
   */
  static calculateSpentAttributePoints(attributes: AttributeBlock): number {

    let spent = 0;

    attributes.forEach((value: number) => {

      spent += Calculations.calculatePointBuyCost(DEFAULT_ATTRIBUTE_VALUE, value);
    });

    return spent;
  }


  /**
   * @param value
   * @returns Whether or not the given value is valid for the defined point-buy system
   */
  static isValueIsValidForPointBuy(value: number): boolean {

    // As configured the value is valid if it has an associated cost
    return (POINT_BUY_TABLE[value] !== undefined);
  }


  /**
   * Returns a pseudo-random number, emulating rolling a die of the given magnitude.
   *
   * @param modifier The bonus (or penalty) to be added to the result of the roll
   * @param magnitude The number of sides on the die
   * @returns
   */
  static rollDice(modifier?: number, magnitude?: number): number {

    return (Math.floor(Math.random() * (magnitude ?? 20)) + 1 + (modifier ?? 0));
  }
}

export default Calculations;
