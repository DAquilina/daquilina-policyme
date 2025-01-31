import { Attribute } from "../enum/attribute.enum";
import { Skill } from "../enum/skill.enum";

import SkillModel from "../models/skill.model";


class SkillItem {

  get targetAttribute(): Attribute {

    return this._targetAttribute;
  }
  private _targetAttribute: Attribute;


  get targetSkill(): SkillModel {

    return this._targetSkill
  }
  private _targetSkill: SkillModel;


  get baseValue(): number {

    return this._value;
  }
  set baseValue(newValue: number) {

    this._value = newValue;
  }
  private _value: number;


  constructor(skill: SkillModel, targetAttribute: Attribute, initialValue = 0) {
  
    this._value = initialValue;
    this._targetAttribute = targetAttribute;
    this._targetSkill = skill;
  }


  decrement(): void {

    if (this._value > 0) {
      this._value--;
    }
  }


  increment(): void {

    this._value++;
  }
}

export default SkillItem;
