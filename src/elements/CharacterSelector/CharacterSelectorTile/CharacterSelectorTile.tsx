import { ICharacterMeta } from "../../../interfaces/character-meta.interface";

import "./CharacterSelectorTile.scss";


function CharacterSelectorTile(props: { character: ICharacterMeta | null, onSelect: (character: ICharacterMeta) => void }) {

  return (
    <>
      <div className="character-selector-tile" onClick={() => { props.onSelect(props.character)}}>
        <div className="avatar-container">
          <img src={props.character.avatarUrl} alt="" />
        </div>
        <span className="character-name">{props.character.name}</span>
      </div>
    </>
  );
}

export default CharacterSelectorTile;
