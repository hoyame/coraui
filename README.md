# FiveM-CoraUI
Library written in typescript to create menus on FiveM

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
      { name: 'Am 2', onClick: () => {
          console.log('sitterlan amonaguyem')
      }},
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
![unknown](https://media.discordapp.net/attachments/836192469359394856/841092906399301632/unknown.png)

# Discord 
https://discord.gg/nkQS6ZRxJW
