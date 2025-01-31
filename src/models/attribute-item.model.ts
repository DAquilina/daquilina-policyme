import { Attribute } from "../enum/attribute.enum";

import Calculations from "../util/calculations";


class AttributeItem {

  get mod(): number {
    return Math.floor((this._value - 10) / 2);
  }


  get label(): string {

    return this._label;
  }
  private _label: string;


  get targetAttribute(): Attribute {

    return this._targetAttribute
  }
  private _targetAttribute: Attribute;


  get value(): number {

    return this._value;
  }
  private _value: number;


  constructor(attribute: Attribute, initialValue: number) {

    this._targetAttribute = attribute;
    this._label = Object.keys(Attribute)[Object.values(Attribute).indexOf(this._targetAttribute)];
    this._value = initialValue;
  }


  decrement(): number {

    if (Calculations.isValueIsValidForPointBuy(this._value - 1)) {
      return Calculations.calculatePointBuyCost(this._value, --this._value);
    }

    // If the new value isn't value, do nothing
    return 0;
  }


  increment(): number {

    if (Calculations.isValueIsValidForPointBuy(this._value + 1)) {
      return Calculations.calculatePointBuyCost(this._value, ++this._value);
    }

    // If the new value isn't value, do nothing
    return 0;
  }
}

export default AttributeItem;
