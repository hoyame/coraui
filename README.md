# FiveM-CoraUI
Library written in typescript to create menus on FiveM

# Example 
Create menu
```ts
CoraUI.openMenu({
  name: 'Menu F5',
  glare: true,
  buttons: [
    { name: 'Am', onClick: () => console.log(15641)},
    { name: 'Am', onClick: () => {
      console.log('sitterlan amonaguyem')
    }},
    { name: 'Am', onClick: () => console.log(54154)},
    { name: 'Am', onClick: () => null},
    { name: 'Am', onClick: () => null},
    { name: 'Close menu', onClick: () => CoraUI.closeMenu()},
    { name: 'Am', onClick: () => null},
    { name: 'Am', onClick: () => null},
    { name: 'Am', onClick: () => null},
  ]
})
```
