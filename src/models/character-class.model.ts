import { Attribute } from "../enum/attribute.enum";
import { ICharacterClassOverrides } from "../interfaces/character-class-overrides.interface";

import { IModel } from "../interfaces/model.interface";

import { AttributeBlock } from "../types/attribute-block.type";


class CharacterClass implements IModel {

    get name() {

        return this._name;
    }
    private _name: string;


    get minimumAttributeRequirements(): AttributeBlock {

        return this._minimumAttributeRequirements;
    }
    private _minimumAttributeRequirements: AttributeBlock;


    constructor(name: string, minimumRequirements: AttributeBlock) {

        this._name = name;
        this._minimumAttributeRequirements = minimumRequirements;
    }


    clone(overrideValues: ICharacterClassOverrides): CharacterClass {

        return new CharacterClass(
            (overrideValues.name !== undefined) ? overrideValues.name : this._name,
            (overrideValues.minimumAttributeRequirements !== undefined) ? overrideValues.minimumAttributeRequirements : this._minimumAttributeRequirements
        );
    }


    getMinimumRequirementForAttribute(attribute: Attribute): number {

        return (this._minimumAttributeRequirements?.get(attribute) ?? 0);
    }
}

export default CharacterClass;
