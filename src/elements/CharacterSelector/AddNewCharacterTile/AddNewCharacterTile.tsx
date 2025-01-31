
import { v4 as uuidv4 } from 'uuid';

import { ICharacterMeta } from "../../../interfaces/character-meta.interface";

import addNewCharacterAvatar from "../../../assets/add-new-character.png";

import CharacterUtil from "../../../util/character-util";

import "./AddNewCharacterTile.scss";


function CharacterSelectorTile(props: { character: ICharacterMeta | null, addNewCharacter: (character: ICharacterMeta) => void }) {

  function handleSelect(): void {

    props.addNewCharacter(
      {
        id: uuidv4(),
        name: "New Character",
        avatarUrl: CharacterUtil.getRandomAvatarUrl()
      }
    );
  }

  return (
    <>
      <div className="character-selector-tile" onClick={handleSelect}>
        <div className="avatar-container">
          <img src={addNewCharacterAvatar} alt="" />
        </div>
        <span className="character-name">
          <span>Add a new character</span>
        </span>
      </div>
    </>
  );
}

export default CharacterSelectorTile;
