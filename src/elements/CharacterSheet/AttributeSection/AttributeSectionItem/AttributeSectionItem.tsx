import AttributeItem from "../../../../models/attribute-item.model";
import Calculations from "../../../../util/calculations";
import DecrementButton from "../../../Shared/DecrementButton/DecrementButton";
import IncrementButton from "../../../Shared/IncrementButton/IncrementButton";

import "./AttributeSectionItem.scss";


function AttributeSectionItem(props: { attribute: AttributeItem, remainingAttributePoints: number, onChange: (newValue: number) => void }) {


  function handleDecrement(): void {

    props.onChange(props.attribute.value - 1);
  }


  function handleIncrement(): void {

    props.onChange(props.attribute.value + 1);
  }


  function isTargetValueValid(targetValue: number): boolean {

    return (
      Calculations.isValueIsValidForPointBuy(targetValue) &&
      (Calculations.calculatePointBuyCost(props.attribute.value, targetValue) <= props.remainingAttributePoints)
    );
  }


  function renderModifier(): React.ReactNode {

    const prefix = (props.attribute.mod >= 0 ? "+" : "-");

    return (
      <>
        <span className="prefix">{prefix}</span>
        <span>{Math.abs(props.attribute.mod)}</span>
      </>
    );
  }


  return (
    <>
      <div className="attribute-wrapper">
        <div className="attribute-modifier">{ renderModifier() }</div>
        <span className="attribute-label">{ props.attribute.label }</span>
        <div className="attribute-value">
          <DecrementButton onClick={handleDecrement} isDisabled={!isTargetValueValid(props.attribute.value - 1)}></DecrementButton>
          <span className="attribute-magnitude">{ props.attribute.value }</span>
          <IncrementButton onClick={handleIncrement} isDisabled={!isTargetValueValid(props.attribute.value + 1)}></IncrementButton>
        </div>
      </div>
    </>
  );
}

export default AttributeSectionItem;
