import React from "react";

import DecrementButton from "../../Shared/DecrementButton/DecrementButton";
import IncrementButton from "../../Shared/IncrementButton/IncrementButton";

import "./LevelSection.scss";


function LevelSection(props: { currentLevel: number, maxLevel: number, onChange: (newLevel: number) => void }) {

  const [canDecrement, setCanDecrement] = React.useState(true);
  const [canIncrement, setCanIncrement] = React.useState(true);


  React.useLayoutEffect(() => {

    setCanDecrement(props.currentLevel > 0);
    setCanIncrement(props.currentLevel < props.maxLevel);
  }, [props.currentLevel, props.maxLevel]);


  function decrementLevel(): void {
  
    handleUpdate(props.currentLevel - 1);
  }


  function handleUpdate(newLevel: number): void {

    props.onChange(newLevel);
  }


  function incrementLevel(): void {

    handleUpdate(props.currentLevel + 1);
  }



  return (
    <>
      <div className="level-wrapper">
        <p className="label">Level</p>

        <div className="level-value-wrapper">
          <DecrementButton isDisabled={!canDecrement} onClick={() => { decrementLevel() }}></DecrementButton>

          <span className="level-value">{props.currentLevel}</span>

          <IncrementButton isDisabled={!canIncrement} onClick={() => { incrementLevel() }}></IncrementButton>
        </div>
      </div>
    </>
  );
}

export default LevelSection;
