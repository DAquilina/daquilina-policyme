import { Attribute } from "../enum/attribute.enum";
import { Class } from "../enum/class.enum";
import { AttributeBlock } from "../types/attribute-block.type";

export const CLASS_MINIMUM_REQUIREMENTS = new Map<Class, AttributeBlock>(
  [
    [
      Class.Alchemist,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 15],
          [Attribute.Wisdom, 10],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Artificer,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 10],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 10],
          [Attribute.Intelligence, 15],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Barbarian,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 15],
          [Attribute.Dexterity, 10],
          [Attribute.Constitution, 12],
          [Attribute.Intelligence, 1],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Bard,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 12],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 15]
        ]
      )
    ],
    [
      Class.Cavalier,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 13],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 13],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 10]
        ]
      )
    ],
    [
      Class.Cleric,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 10],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 15],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Druid,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 10],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 15],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Fighter,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 14],
          [Attribute.Dexterity, 10],
          [Attribute.Constitution, 10],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Gunslinger,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 14],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 10],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Monk,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 12],
          [Attribute.Dexterity, 12],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 12],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Oracle,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 16],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Paladin,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 13],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 10],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 13],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Ranger,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 8],
          [Attribute.Dexterity, 13],
          [Attribute.Constitution, 8],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 13],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Rogue,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 16],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 12],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Samurai,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 14],
          [Attribute.Dexterity, 10],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 8],
          [Attribute.Charisma, 8]
        ]
      )
    ],
    [
      Class.Sorcerer,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 16]
        ]
      )
    ],
    [
      Class.Summoner,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 10],
          [Attribute.Wisdom, 13],
          [Attribute.Charisma, 13]
        ]
      )
    ],
    [
      Class.Swashbuckler,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 8],
          [Attribute.Dexterity, 14],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 10],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 12]
        ]
      )
    ],
    [
      Class.Warlock,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 7],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 16]
        ]
      )
    ],
    [
      Class.Witch,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 7],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 8],
          [Attribute.Intelligence, 15],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ],
    [
      Class.Wizard,
      new Map<Attribute, number>(
        [
          [Attribute.Strength, 1],
          [Attribute.Dexterity, 7],
          [Attribute.Constitution, 7],
          [Attribute.Intelligence, 16],
          [Attribute.Wisdom, 7],
          [Attribute.Charisma, 7]
        ]
      )
    ]
  ]
);
