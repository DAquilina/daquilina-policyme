import { ICharacterMeta } from "../interfaces/character-meta.interface";

import Character from "../models/character.model";


export class CharacterService {

  private readonly _userId: string;

  private _characterCache: Array<Character>;

  private _isCacheValid: boolean = false;

  private get _url(): string {

    return `https://recruiting.verylongdomaintotestwith.ca/api/${this._userId}/character`;
  }


  constructor(userId: string) {

    this._userId = userId;
  }


  clearCache(): void {

    this._isCacheValid = false;
  }


  async deleteCharacter(characterId: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this._removeCharacterFromCache(characterId);

      resolve(true);
    });
  }


  async getCharacterById(characterId: string): Promise<Character> {

    return new Promise((resolve, reject) => {

      resolve(this._characterCache?.find((cachedCharacter: Character) => {

        return (cachedCharacter.id === characterId);
      }));
    });
  }


  async getCharacters(): Promise<Array<ICharacterMeta>> {

    if (this._isCacheValid) {
      return Promise.resolve(
        this._characterCache.map((character: Character) => {

          return this._serializeCharacterMeta(character);
        })
      );
    }
    try {
      const response = await (await fetch(this._url)).json();

      // DEBUG
      console.log(response);

      this._characterCache = response.body.map((data: string) => {

        return Character.parse(data);
      }) ?? new Array<Character>();

      // DEBUG
      console.log(this._characterCache);

      this._isCacheValid = true;

      return Promise.resolve(
        this._characterCache.map((character: Character) => {

          return this._serializeCharacterMeta(character);
        })
      );
    }
    catch(error) {
      console.error(error);
    }
  }


  async saveCharacter(character: Character): Promise<boolean> {

    try {
      this._updateCharacterInCache(character);

      await fetch(
        this._url,
        {
          method: "POST",
          body: JSON.stringify(this._characterCache.map((character: Character) => {

            return character.stringify();
          })),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );

      return Promise.resolve(true);
    }
    catch(error) {
      console.error(error);

      return Promise.reject();
    }
  }


  private _removeCharacterFromCache(characterId: string): void {

    this._characterCache = this._characterCache.filter((cachedCharacter: Character) => {

      return (cachedCharacter.id !== characterId);
    });
  }


  private _serializeCharacterMeta(character: Character): ICharacterMeta {

    return {
      id: character.id,
      name: character.name,
      avatarUrl: character.avatarUrl
    };
  }


  private _updateCharacterInCache(character: Character): void {

    const existingCharacterIndex = this._characterCache.findIndex((cachedCharacter: Character) => {

      return (cachedCharacter.id === character.id);
    }) ?? -1;

    if (existingCharacterIndex === -1) {
      this._characterCache.push(character);
    }
    else {
      this._characterCache = [
        ...this._characterCache.slice(0, existingCharacterIndex),
        character,
        ...this._characterCache.slice(existingCharacterIndex + 1)
      ];
    }
  }
}
