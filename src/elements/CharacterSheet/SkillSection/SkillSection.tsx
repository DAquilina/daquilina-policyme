import React from "react";

import SkillSectionItem from "./SkillSectionItem/SkillSectionItem";

import { Skill } from "../../../enum/skill.enum";

import SkillModel from "../../../models/skill.model";

import { SkillBlock } from "../../../types/skill-block.type";

import "./SkillSection.scss";
import AttributeItem from "../../../models/attribute-item.model";
import { AttributeBlock } from "../../../types/attribute-block.type";


function SkillSection(
    props: {
      attributes: AttributeBlock,
      maxSkillRanks: number,
      remainingSkillPoints: number,
      skills: SkillBlock,
      onChange: (skill: Skill, newValue: number) => void
    }
) {

  function handleChange(skill: Skill, newBaseValue: number): void {

    props.onChange(skill, newBaseValue);
  }


  function renderSkills(): React.ReactNode {

    const skillNodes = Object.values(Skill).map(
      (skill: Skill) => {

        return renderSingleSkill(props.skills.get(skill))
      }
    );

    return (
      <>
        <div className="skill-section-wrapper">
          { skillNodes }
        </div>
        <aside className="remaining-skill-points">Skill Points Remaining: {props.remainingSkillPoints}</aside>
      </>
    );
  }


  function renderSingleSkill(skill: SkillModel): React.ReactNode {

    return (
      <SkillSectionItem
        key={skill.name}
        attributeBonus={new AttributeItem(skill.targetAttribute, props.attributes.get(skill.targetAttribute))}
        maxSkillRanks={props.maxSkillRanks}
        remainingSkillPoints={props.remainingSkillPoints}
        skill={skill}
        onChange={(newBaseValue: number) => { handleChange(skill.name, newBaseValue) }}>
      </SkillSectionItem>
    );
  }


  return renderSkills();
}

export default SkillSection;
