import React from "react";

import AttributeSection from "./AttributeSection/AttributeSection";
import CharacterSheetActions from "./CharacterSheetActions/CharacterSheetActions";
import ClassSection from "./ClassSection/ClassSection";
import LevelSection from "./LevelSection/LevelSection";
import SkillSection from "./SkillSection/SkillSection";
import ToggleButton from "../Shared/ToggleButton/ToggleButton";

import { BASE_SKILL_POINTS } from "../../constants/base-skill-points.constant";
import { MAX_CHARACTER_LEVEL } from "../../constants/max-character-level.constant";
import { TOTAL_ATTRIBUTE_POINTS } from "../../constants/total-attribute-points.constant";

import { Attribute } from "../../enum/attribute.enum";
import { Class } from "../../enum/class.enum";
import { GenderPresentation } from "../../enum/gender-presentation.enum";
import { Skill } from "../../enum/skill.enum";

import { ICharacterMeta } from "../../interfaces/character-meta.interface";

import AttributeItem from "../../models/attribute-item.model";
import Character from "../../models/character.model";

import { serviceContainer, ServiceContext } from "../../services/provider";

import Calculations from "../../util/calculations";
import CharacterUtil from "../../util/character-util";

import "./CharacterSheet.scss";


function CharacterSheet(props: { characterMeta: ICharacterMeta, onCancel: () => void }) {

  const [isDirty, setIsDirty] = React.useState<boolean>(false);

  const [character, setCharacter] = React.useState<Character>(null);

  const [maxSkillRanks, setMaxSkillRanks] = React.useState(null);

  const [remainingAttributePoints, setRemainingAttributePoints] = React.useState<number>(TOTAL_ATTRIBUTE_POINTS);

  const [remainingSkillPoints, setRemainingSkillPoints] = React.useState<number>(BASE_SKILL_POINTS);

  const serviceContext: ServiceContext = React.useContext(serviceContainer);


  React.useEffect(() => {

    if (!character) {
      serviceContext.services.characterService.getCharacterById(props.characterMeta.id)
        .then((result: Character) => {

          const newCharacter = result ??
            new Character(
              props.characterMeta.id,
              {
                name: props.characterMeta.name,
                level: 1,
                avatarUrl: props.characterMeta.avatarUrl
              }
            );
  
          setCharacter(newCharacter);

          setRemainingAttributePoints(
            TOTAL_ATTRIBUTE_POINTS - Calculations.calculateSpentAttributePoints(newCharacter.attributes)
          );

          setRemainingSkillPoints(
            Calculations.calculateRemainingSkillPoints(
              newCharacter.level,
              new AttributeItem(Attribute.Intelligence, newCharacter.attributes.get(Attribute.Intelligence)).mod,
              newCharacter.skills
            )
          );

          setMaxSkillRanks(
            Calculations.calculateMaxSkillRanksForCurrentLevel(result.level ?? 1)
          );
  
          setIsDirty(false);
        });
    }
  }, [character, props.characterMeta, serviceContext.services.characterService]);


  async function handleSave(): Promise<void> {

    if (await serviceContext.services.characterService.saveCharacter(character)) {
      setIsDirty(false);
    }
  }


  function handleCancel(): void {

    props.onCancel();
  }


  function handleClassSelection(newClass: Class): void {

    setIsDirty(true);

    const newAvatar = CharacterUtil.getClassAvatarUrl(newClass, character.genderPresentation);

    setCharacter(
      character.clone(
        {
          avatarUrl: newAvatar,
          selectedClass: newClass
        }
      )
    );
  }


  function handleGetRandomAvatar(): void {

    setIsDirty(true);

    setCharacter(character.clone({ avatarUrl: CharacterUtil.getRandomAvatarUrl() }));
  }


  function handleToggle(currentValue: GenderPresentation, targetValue: GenderPresentation): void {

    if (currentValue !== targetValue) {
      setIsDirty(true);

      setCharacter(
        character.clone(
          {
            avatarUrl: CharacterUtil.getRandomAvatarUrl(CharacterUtil.getAvatarFilter(character.selectedClass, targetValue)),
            genderPresentation: targetValue
          }
        )
      );
    }
  }


  function updateAttribute(attribute: Attribute, newValue: number): void {

    setIsDirty(true);

    const newAttributes = character.attributes;

    newAttributes.set(attribute, newValue);

    setRemainingAttributePoints(TOTAL_ATTRIBUTE_POINTS - Calculations.calculateSpentAttributePoints(newAttributes));

    setRemainingSkillPoints(Calculations.calculateRemainingSkillPoints(
      character.level ?? 1,
      new AttributeItem(Attribute.Intelligence, newAttributes.get(Attribute.Intelligence)).mod, 
      character.skills
    ));

    setCharacter(
      character.clone(
        {
          attributes: newAttributes
        }
      )
    );
  }


  function updateLevel(newLevel: number) : void {

    const newCharacter = character.clone({ level: newLevel })

    setRemainingSkillPoints(
      Calculations.calculateRemainingSkillPoints(
        newLevel,
        new AttributeItem(Attribute.Intelligence, newCharacter.attributes.get(Attribute.Intelligence)).mod,
        character.skills
      )
    );

    setMaxSkillRanks(
      Calculations.calculateMaxSkillRanksForCurrentLevel(newLevel)
    );

    setCharacter(newCharacter);
  }


  function updateName(newName: string): void {

    setIsDirty(true);

    setCharacter(character.clone({ name: newName }));
  }


  function updateSkill(skill: Skill, newBaseValue: number): void {

    setIsDirty(true);

    const newSkills = character.skills;
    const targetSkillModel = newSkills.get(skill);

    newSkills.set(skill, targetSkillModel.clone({ baseValue: newBaseValue }));

    const newCharacter = character.clone(
      {
        skills: newSkills
      }
    )

    setRemainingSkillPoints(Calculations.calculateRemainingSkillPoints(
      newCharacter.level ?? 1,
      new AttributeItem(Attribute.Intelligence, newCharacter.attributes.get(Attribute.Intelligence)).mod,
      newSkills
    ));

    setCharacter(newCharacter);
  }


  return !!character && (
    <>
      <div className="character-sheet-wrapper">
        <div className="top-section">
          <div className="avatar-section-wrapper">
            <div className="avatar-wrapper">
              <img src={character.avatarUrl} alt="" />
            </div>

            <div className="avatar-actions">
              <button type="button" onClick={handleGetRandomAvatar}>
                Randomize Avatar
              </button>

              <button type="button" onClick={handleGetRandomAvatar} disabled={!character.selectedClass}>
                Set Class Avatar
              </button>

              <div className="gender-presentation">
                <aside>Select Gender Presentation</aside>

                <div className="toggle-buttons">
                  <ToggleButton
                    label="N/A"
                    state={!character.genderPresentation}
                    handleToggle={() => { handleToggle(character.genderPresentation, null) }}
                  ></ToggleButton>

                  <ToggleButton
                    label="&#9895;" // ⚧
                    state={character.genderPresentation === GenderPresentation.NonBinary}
                    handleToggle={() => { handleToggle(character.genderPresentation, GenderPresentation.NonBinary) }}
                  ></ToggleButton>

                  <ToggleButton
                    label="&#9792;" // ♀
                    state={character.genderPresentation === GenderPresentation.Female}
                    handleToggle={() => { handleToggle(character.genderPresentation, GenderPresentation.Female) }}
                  ></ToggleButton>

                  <ToggleButton
                    label="&#9794;" // ♂
                    state={character.genderPresentation === GenderPresentation.Male}
                    handleToggle={() => { handleToggle(character.genderPresentation, GenderPresentation.Male) }}
                  ></ToggleButton>
                </div>
              </div>
            </div>

            <LevelSection
              currentLevel={character.level ?? 1}
              maxLevel={MAX_CHARACTER_LEVEL}
              onChange={updateLevel}
            ></LevelSection>
          </div>

          <div className="attributes-section-wrapper">
            <div className="form-input">
              <label htmlFor="nameInput">Character Name</label>
              <input type="text" id="nameInput" value={character.name} onChange={(event) => { updateName(event.target.value) }}></input>
            </div>

            <AttributeSection
              attributes={character.attributes}
              onChange={updateAttribute}
              remainingAttributePoints={remainingAttributePoints}>
            </AttributeSection>

            <ClassSection attributes={character.attributes} selectedClass={character.selectedClass} onSelect={handleClassSelection}></ClassSection>
          </div>
        </div>

        <div className="bottom-section">
          <SkillSection
            skills={character.skills}
            attributes={character.attributes}
            maxSkillRanks={maxSkillRanks}
            remainingSkillPoints={remainingSkillPoints}
            onChange={updateSkill}
          >
          </SkillSection>
        </div>
      </div>

      <CharacterSheetActions onCancel={handleCancel} onSave={handleSave} isDisabled={!isDirty}></CharacterSheetActions>
    </>
  );
}

export default CharacterSheet;
