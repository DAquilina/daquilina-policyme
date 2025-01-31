import ClassTile from "./ClassTile/ClassTile";

import { CLASS_MINIMUM_REQUIREMENTS } from "../../../constants/class-minimum-requirements.constant";

import { Class } from "../../../enum/class.enum";

import { AttributeBlock } from "../../../types/attribute-block.type";

import CharacterUtil from "../../../util/character-util";

import "./ClassSection.scss";


function ClassSection(props: { attributes: AttributeBlock, selectedClass: Class, onSelect: (targetClass: Class) => void }) {

  function checkMinimumRequirements(targetClass: Class): boolean {

    return CharacterUtil.doesCharacterMeetMinimumRequirementsForClass(targetClass, props.attributes);
  }


  function getClassArray(keyValuePair: [Class, AttributeBlock]): Class {

    return keyValuePair[0];
  }


  function handleSelect(selectedClass: Class): void {

    props.onSelect(selectedClass);
  }


  function isSelected(targetClass: Class): boolean {

    return (targetClass === props.selectedClass);
  }


  function renderClassTiles(): React.ReactNode {

    const classArray = Array.from(CLASS_MINIMUM_REQUIREMENTS, getClassArray);

    const classTiles = classArray.map((targetClass: Class) => {

      return (
        <ClassTile
            key={targetClass}
            targetClass={targetClass}
            isDisabled={!checkMinimumRequirements(targetClass)}
            isSelected={isSelected(targetClass)}
            onSelect={handleSelect}
          > 
        </ClassTile>
      );
    });
    
    return classTiles;
  }


  return (
    <>
      <div className="class-section-wrapper">
        { renderClassTiles() }
      </div>
    </>
  );
}

export default ClassSection;
