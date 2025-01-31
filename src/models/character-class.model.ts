import { Attribute } from "../enum/attribute.enum";

import { AttributeBlock } from "../types/attribute-block.type";


class CharacterClass {

    get name() {

        return this._name;
    }
    private _name: string;


    private _minimumAttributeRequirements: AttributeBlock;


    constructor(name: string, minimumRequirements: AttributeBlock) {

        this._name = name;
        this._minimumAttributeRequirements = minimumRequirements;
    }


    getMinimumRequirementForAttribute(attribute: Attribute): number {

        return (this._minimumAttributeRequirements?.get(attribute) ?? 0);
    }
}

export default CharacterClass;
