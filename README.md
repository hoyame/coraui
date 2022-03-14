# FiveM-CoraUI
Library written in typescript to create menus on FiveM

# Discord : https://discord.gg/Em3Fn9Amyv

# Example 
## Create menu
```ts
import { CoraUI } from "./menu/menu"

CoraUI.openMenu({
  name: 'Menu F5',
  subtitle: "Menu intéractions",
  glare: true,
  buttons: [
      { name: 'Am', onClick: () => console.log(15641)},
      { name: 'Checkbox', checkbox: (checked1: boolean) => {
          console.log('boolean', checked1)
      }},
      { name: 'Am 2', onClick: () => {
          console.log('amonaguyem')
      }},
      { 
        name: "Glace", onClick: () => null, 
				slider: ["Chocolat", "Vanille", "Rien"]
      },
      { name: 'Test', onClick: () => CoraUI.openSubmenu('zebi')},
      { name: 'Test 2', onClick: () => CoraUI.openSubmenu('amona')},
      { name: 'Close menu', rightText: "~g~100 000 $", onClick: () => CoraUI.closeMenu()},
  ],
  submenus: {
    'zebi': {
      name: 'Submenu Zebi F5',
      subtitle: "",
      glare: true, 
      buttons: [
        { name: 'Zebi', onClick: () => null},
      ],
    },

    'amona': {
      name: 'Submenu Amonaguyem F5',
      subtitle: "",
      glare: true, 
      buttons: [
        { name: 'Amonaguyem', onClick: () => null},
      ],
    }
 }
})
```
# Prewiew
![unknown](https://cdn.discordapp.com/attachments/836192469359394856/842524671185911818/unknown.png)
