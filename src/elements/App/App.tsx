import * as React from "react";

import CharacterSelector from "../CharacterSelector/CharacterSelector";
import CharacterSheet from "../CharacterSheet/CharacterSheet";

import { ICharacterMeta } from "../../interfaces/character-meta.interface";

import { ServiceProvider } from "../../services/provider";

import "./App.scss";


function App() {

  const [activeCharacter, setActiveCharacter] = React.useState<ICharacterMeta>(null);


  function handleSelect(characterMeta: ICharacterMeta): void {

    setActiveCharacter(characterMeta);
  }


  function renderActiveSection(): React.ReactNode {

    return (!!activeCharacter ? renderCharacterSheet() : renderCharacterSelector());
  }


  function renderCharacterSelector(): React.ReactNode {

    return (
      <CharacterSelector onSelect={handleSelect}></CharacterSelector>
    );
  }


  function renderCharacterSheet(): React.ReactNode {

    return (
      <CharacterSheet characterMeta={activeCharacter} onCancel={() => { setActiveCharacter(null) }}></CharacterSheet>
    );
  }


  return (
    <ServiceProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="main">Policies & Polyhedrons</h1>
          <span className="tagline">Character Builder</span>
        </header>
        <section className="App-section">
          { renderActiveSection() }
        </section>
      </div>
    </ServiceProvider>
  );
}

export default App;
