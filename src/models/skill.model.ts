import { Attribute } from "../enum/attribute.enum";
import { Skill } from "../enum/skill.enum";

import { IModel } from "../interfaces/model.interface";
import { ISkillOverrides } from "../interfaces/skill-overrides.interface";


class SkillModel implements IModel {

  get baseValue(): number {

    return this._baseValue;
  }
  set baseValue(newBaseValue: number) {

    this._baseValue = newBaseValue;
  }
  private _baseValue: number;

  get isGeneric(): boolean {

    return this._isGeneric;
  }
  private _isGeneric: boolean;


  get specifier(): string {

    return this._isGeneric ? this._specifier : "";
  }
  private _specifier: string;


  get name(): Skill {

    return this._targetSkill
  }
  private _targetSkill: Skill;


  get targetAttribute(): Attribute {

    return this._targetAttribute;
  }
  private _targetAttribute: Attribute;


  constructor(skill: Skill, targetAttribute: Attribute, baseValue: number, isGeneric = false, specifier = "") {
  
    this._targetSkill = skill;
    this._targetAttribute = targetAttribute;
    this._baseValue = baseValue;
    this._isGeneric = isGeneric;
    this._specifier = specifier;
  }


  clone(overrideValues: ISkillOverrides): SkillModel {

    return new SkillModel(
      (overrideValues?.targetSkill !== undefined) ? overrideValues.targetSkill : this._targetSkill,
      (overrideValues?.targetAttribute !== undefined) ? overrideValues.targetAttribute : this._targetAttribute,
      (overrideValues?.baseValue !== undefined) ? overrideValues.baseValue : this._baseValue,
      (overrideValues?.isGeneric !== undefined) ? overrideValues.isGeneric : this._isGeneric,
      (overrideValues?.specifier !== undefined) ? overrideValues.specifier : this._specifier
    );
  }


  static parse(data: any): SkillModel {

    return new SkillModel(
      data._targetSkill,
      data._targetAttribute,
      data._baseValue,
      data._isGeneric,
      data._specifier
    );
  }
}

export default SkillModel;
