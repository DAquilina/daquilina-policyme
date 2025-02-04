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
  }, [serviceContext.services.characterService]);


  function handleSelect(character: ICharacterMeta): void {

    props.onSelect(character);
  }


  function renderCharacterList(): React.ReactNode {

    const nodes = characterList?.map((character: ICharacterMeta) => {

      return <CharacterSelectorTile key={character.id} character={character} onSelect={handleSelect}></CharacterSelectorTile>
    }) ?? <></>;

    return nodes;
  }


  return (
    <>
      <div className="character-selector-list">
        {renderCharacterList()}

        <AddNewCharacterTile key="add-new" character={null} addNewCharacter={handleSelect}></AddNewCharacterTile>
      </div>
    </>
  );
}

export default CharacterSelector;
