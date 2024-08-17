# FiveM-CoraUI
Library written in typescript to create menus on FiveM

# Lua : https://github.com/hoyame/FiveM-CoraUI/tree/lua

# Discord : https://discord.gg/Em3Fn9Amyv

# Features

- Color Panel
- Slidebar panel
- Slider panel
- Straight text
- Glare in the header
- Submenus
- Heritidy Panel

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
      { name: 'Test', onClick: () => CoraUI.openSubmenu('submenu')},
      { name: 'Test 2', onClick: () => CoraUI.openSubmenu('amona')},
      { name: 'Close menu', rightText: "~g~100 000 $", onClick: () => CoraUI.closeMenu()},
  ],
  submenus: {
    'submenu': {
      name: 'Submenu F5',
      subtitle: "",
      glare: true, 
      buttons: [
        { name: 'Button 1', onClick: () => null},
      ],
    },

    'amona': {
      name: 'Submenu F5',
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
