interface Menu {
  subMenu: string;
  menuItems: MenuItem[];
}

interface MenuItem {
  itemName: string;
  itemBasePrice: number;
  itemImage: string;
  isCustomizable: boolean;
  customisationMenu?: CustomisationMenu[];
}

interface CustomisationMenu {
  title: string;
  required: boolean;
  options: { name: string; price: any }[];
  optionsAreFree: boolean | string;
  maxSelections: number;
}

const standardSides = [
  { name: "Fries", price: 2.0 },
  { name: "Salad", price: 1.5 },
  { name: "Coleslaw", price: 1.0 },
  { name: "Cream Brocolli", price: 3.5 },
]

const fakeMenu:Menu[] = [
  {
    "subMenu": "chicken",
    "menuItems":
    [
      {
        "itemName": "Chicken Chop",
        "itemBasePrice": 7.8,
        "itemImage": "https://i.ytimg.com/vi/uvArf37jxfQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDfyox3XqgPYJiXz0Wrd8MXEQUraQ",
        "isCustomizable": false,
        "customisationMenu": []
      },
      {
        "itemName": "Chicken Cutlet",
        "itemBasePrice": 9.9,
        "itemImage": "https://www.marcellinaincucina.com/wp-content/uploads/2021/05/italian-chicken-cutlets-1-2.jpg",
        "isCustomizable": true,
        "customisationMenu": [
          {
            "title": "First side",
            "maxSelections": 1, // instructions will say "select 1"
            "required": true,
            "options": standardSides,
            "optionsAreFree": true, // can be true, false or "custom"
          },
          {
            "title": "Second side",
            "maxSelections": 1, // instructions will say "select 1"
            "required": true,
            "options": standardSides,
            "optionsAreFree": true, // can be true, false or "custom"
          },
          {
            "title": "Additional sides",
            "maxSelections": 4, // instructions will say "select 1"
            "required": false,
            "options": standardSides,
            "optionsAreFree": false, // can be true, false or "custom"
          },
        ]
      }
    ]
  },
  {
    "subMenu": "spaghetti",
    "menuItems":
    [
      {
        "itemName": "Striploin Carbonara",
        "itemBasePrice": 12.8,
        "itemImage": "https://tarateaspoon.com/wp-content/uploads/2021/11/Steak-Linguini-with-Olives-Horiz.jpeg",
        "isCustomizable": false,
        "customisationMenu": []
      },
      {
        "itemName": "Filet Mignon",
        "itemBasePrice": 9.8,
        "itemImage": "https://whatmollymade.com/wp-content/uploads/2023/03/steak-pasta-8.jpg",
        "isCustomizable": false,
        "customisationMenu": []
      }
    ]
  }
]

export { fakeMenu };
