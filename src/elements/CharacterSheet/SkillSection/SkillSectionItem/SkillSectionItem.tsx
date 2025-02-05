import React from "react";

import DecrementButton from "../../../Shared/DecrementButton/DecrementButton";
import IncrementButton from "../../../Shared/IncrementButton/IncrementButton";

import AttributeItem from "../../../../models/attribute-item.model";
import SkillModel from "../../../../models/skill.model";

import "./SkillSectionItem.scss";


function SkillSectionItem(
    props: {
      attributeBonus: AttributeItem,
      maxSkillRanks: number,
      remainingSkillPoints: number,
      skill: SkillModel,
      onChange: (newBaseValue: number) => void
    }
) {

  const [canDecrement, setCanDecrement] = React.useState(true);
  const [canIncrement, setCanIncrement] = React.useState(true);

  React.useLayoutEffect(() => {

    setCanDecrement(props.skill.baseValue > 0);
    setCanIncrement((props.skill.baseValue < props.maxSkillRanks) && (props.remainingSkillPoints > 0));
  }, [props.skill, props.maxSkillRanks, props.remainingSkillPoints]);


  function handleDecrement(): void {

    props.onChange(props.skill.baseValue - 1);
  }


  function handleDiceRoll(): void {

    let DC = prompt("What is the target DC to beat? (number)", "15");

    if (!isNaN(+DC)) {
      const dieResult = Math.floor(Math.random() * 20) + 1;
      const total = dieResult + props.skill.baseValue + props.attributeBonus.mod;

      alert(
        `You rolled a ${dieResult}, and adding your relevant skills points and your ${props.attributeBonus.targetAttribute} modifier brings that to ` +
        `a total of ${total}. ${(total >= +DC) ? "That's a success! Well done!" : "That's a failure. Better luck next time!"}`
      );
    }
    else {
      alert("The DC has to be a number. Please try again.");
    }
  }


  function handleIncrement(): void {

    props.onChange(props.skill.baseValue + 1);
  }


  return (
    <>
      <div className="skill-section-item">
        <span className="skill-name">{props.skill.name}</span>

        <div className="base-value-group">
          <DecrementButton isDisabled={!canDecrement} onClick={handleDecrement}></DecrementButton>
          <span className="skill-base-value">{props.skill.baseValue}</span>
          <IncrementButton isDisabled={!canIncrement} onClick={handleIncrement}></IncrementButton>
        </div>

        <span>+</span>

        <div className="attribute-bonus-group">
          <span className="attribute-bonus">{props.attributeBonus.mod}</span>
          <span className="relevant-attribute">({props.skill.targetAttribute})</span>
        </div>

        <span>=</span>

        <span className="total">{props.skill.baseValue + props.attributeBonus.mod}</span>

        <span className="dice-wrapper">
          <button type="button" onClick={() => { handleDiceRoll() }} className="dice-button sm" title="Roll a check with this skill">&#9856;</button>
        </span>
      </div>
    </>
  );
}

export default SkillSectionItem;
