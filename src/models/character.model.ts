import { Class } from "../enum/class.enum";
import { GenderPresentation } from "../enum/gender-presentation.enum";

import { CharacterOverrides } from "../interfaces/character-overrides.interface";

import { AttributeBlock } from "../types/attribute-block.type";
import { SkillBlock } from "../types/skill-block.type";
import CharacterUtil from "../util/character-util";


class Character {

  get attributes(): AttributeBlock {

    return this._attributes;
  }
  private _attributes: AttributeBlock;


  get selectedClass(): Class {

    return this._class;
  }
  set selectedClass(newClass: Class) {
    // TODO: minimum requirements

    this._class = newClass;
  }
  private _class: Class;


  get genderPresentation(): GenderPresentation {

    return this._genderPresentation;
  }
  set genderPresentation(newValue: GenderPresentation) {

    this._genderPresentation = newValue;
  }
  private _genderPresentation: GenderPresentation;


  get id(): string {

    return this._id;
  }
  private _id: string;


  get name(): string {

    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
  private _name: string;


  get avatarUrl(): string {

    return this._avatarUrl;
  }
  set avatarUrl(newUrl: string) {

    this._avatarUrl = newUrl;
  }
  private _avatarUrl: string;


  get skills(): SkillBlock {
    return this._skills;
  }
  private _skills: SkillBlock;


  constructor(
      id?: string,
      name?: string,
      avatarUrl?: string,
      genderPresentation?: GenderPresentation,
      selectedClass?: Class,
      attributes?: AttributeBlock,
      skills?: SkillBlock
  ) {

    this._id = id;
    this._name = name;
    this._avatarUrl = avatarUrl;
    this._genderPresentation = genderPresentation;
    this._class = selectedClass;
    this._attributes = attributes ?? CharacterUtil.generateDefaultAttributeBlock();
    this._skills = skills ?? CharacterUtil.generateDefaultSkillBlock();
  }


  clone(overrideValues?: CharacterOverrides): Character {

    return new Character(
      this._id,
      (overrideValues?.name !== undefined) ? overrideValues.name : this._name,
      (overrideValues?.avatarUrl !== undefined) ? overrideValues.avatarUrl : this._avatarUrl,
      (overrideValues?.genderPresentation !== undefined) ? overrideValues.genderPresentation : this._genderPresentation,
      (overrideValues?.selectedClass !== undefined) ? overrideValues.selectedClass : this._class,
      (overrideValues?.attributes !== undefined) ? overrideValues.attributes : this._attributes,
      (overrideValues?.skills !== undefined) ? overrideValues.skills : this._skills
    );
  }
}

export default Character;
