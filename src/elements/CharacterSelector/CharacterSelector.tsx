import React from "react";

import AddNewCharacterTile from "./AddNewCharacterTile/AddNewCharacterTile";
import CharacterSelectorTile from "./CharacterSelectorTile/CharacterSelectorTile";

import { ICharacterMeta } from "../../interfaces/character-meta.interface";

import { serviceContainer, ServiceContext } from "../../services/provider";

import "./CharacterSelector.scss";


function CharacterSelector(props: { onSelect: (character: ICharacterMeta) => void }) {

  const [characterList, setCharacterList] = React.useState<Array<ICharacterMeta>>([]);

  const serviceContext: ServiceContext = React.useContext(serviceContainer);

  React.useEffect(() => {

    async function updateCharacterList(): Promise<void> {
  
      setCharacterList(await serviceContext.services.characterService.getCharacters());
    }

    updateCharacterList();
  }, [characterList, serviceContext]);


  function handleSelect(character: ICharacterMeta): void {

    props.onSelect(character);
  }


  return (
    <>
      <div className="character-selector-list">
        {
          characterList?.map((character: ICharacterMeta) => {

            return <CharacterSelectorTile character={character} onSelect={handleSelect}></CharacterSelectorTile>
          })
        }

        <AddNewCharacterTile character={null} addNewCharacter={handleSelect}></AddNewCharacterTile>
      </div>
    </>
  );
}

export default CharacterSelector;
