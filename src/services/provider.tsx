import React from "react";

import { CharacterService } from "./character.service";


const serviceContainer = React.createContext(null);
const Provider = serviceContainer.Provider;

type ServiceContext = {
  services: {
    characterService: CharacterService
  }
};

const services = {
  characterService: new CharacterService("DAquilina")
};

const ServiceProvider = (props: { children: any }) => {

  return (
    <Provider value={{ services }}>{props.children}</Provider>
  );
}


export { serviceContainer, ServiceContext, ServiceProvider };
