import SkillModel from "./skill.model";

import { Class } from "../enum/class.enum";
import { GenderPresentation } from "../enum/gender-presentation.enum";

import { ICharacterOverrides } from "../interfaces/character-overrides.interface";
import { IModel } from "../interfaces/model.interface";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";

import CharacterUtil from "../util/character-util";


class Character implements IModel {

  get attributes(): AttributeBlock {

    return this._attributes;
  }
  private _attributes: AttributeBlock;


  get avatarUrl(): string {

    return this._avatarUrl;
  }
  private _avatarUrl: string;


  get genderPresentation(): GenderPresentation {

    return this._genderPresentation;
  }
  private _genderPresentation: GenderPresentation;


  get id(): string {

    return this._id;
  }
  private _id: string;


  get level(): number {

    return this._level;
  }
  private _level: number;


  get name(): string {

    return this._name;
  }
  private _name: string;


  get selectedClass(): Class {

    return this._class;
  }
  private _class: Class;


  get skills(): SkillBlock {
    return this._skills;
  }
  private _skills: SkillBlock;


  constructor(
      id: string,
      defaultValues: ICharacterOverrides
  ) {

    this._id = id;

    this._spreadValues(defaultValues);

    if (!this._attributes?.size) {
      this._attributes = defaultValues?.attributes ?? CharacterUtil.generateDefaultAttributeBlock();
    }

    if (!this._skills?.size) {
      this._skills = CharacterUtil.generateDefaultSkillBlock();
    }
  }


  clone(overrideValues?: ICharacterOverrides): Character {

    return new Character(
      this._id,
      {
        avatarUrl: this._avatarUrl,
        attributes: this._attributes,
        genderPresentation: this._genderPresentation,
        level: this._level,
        name: this._name,
        selectedClass: this._class,
        skills: this._skills,
        ...overrideValues
      }
    );
  }


  stringify(): string {

    return JSON.stringify(
      {
        id: this._id,
        name: this._name,
        avatarUrl: this._avatarUrl,
        genderPresentation: this._genderPresentation,
        selectedClass: this._class,
        attributes: Array.from(this._attributes),
        skills: Array.from(this._skills)
      }
    );
  }


  private _spreadValues(values: ICharacterOverrides): void {

    this._avatarUrl = (values?.avatarUrl !== undefined) ? values.avatarUrl : this._avatarUrl;
    this._attributes = (values?.attributes !== undefined) ? values.attributes : this._attributes;
    this._genderPresentation = (values?.genderPresentation !== undefined) ? values.genderPresentation : this._genderPresentation;
    this._level = (values?.level !== undefined) ? values.level : this._level ?? 1;
    this._name = ((values?.name !== undefined) ? values.name : this._name) ?? "";
    this._class = (values?.selectedClass !== undefined) ? values.selectedClass : this._class;
    this._skills = (values?.skills !== undefined) ? values.skills : this._skills;
  }


  static parse(stringifiedCharacter: string): Character {

    const data = JSON.parse(stringifiedCharacter);

    return new Character(
      data.id,
      {
        ...data,
        attributes: new Map(data.attributes),
        skills: new Map(
          data.skills?.map(([skill, skillData]) => {
  
            return [skill, SkillModel.parse(skillData)];
          })
        )
      }
    );
  }
}

export default Character;
