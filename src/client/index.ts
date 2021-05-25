import { CoraUI } from "./menu/menu"


setImmediate(() => {
    console.log('clientside', '')
    SetWeatherTypePersist('XMAS')
    NetworkOverrideClockTime(6, 34, 56)
})

setTick(() => {
    if (IsControlJustPressed(0, 38)) {
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
                    console.log('sitterlan amonaguyem')
                }},
                { name: 'Test', onClick: () => CoraUI.openSubmenu('zebi')},
                { name: 'Test 2', slider: ['Aege', 'Fdef', 'Mophn', "ABCDEFGHI", "ABCDEFGHIJKL", "Yo mec je mange des queues"]},
                { name: 'Close menu', rightText: "~g~100 000 $",onClick: () => CoraUI.closeMenu()},
            ],
            submenus: {
                'zebi': {
                    name: 'Submenu Zebi F5',
                    subtitle: "",
                    glare: true, 
                    buttons: [
                        { name: 'subMenu Zebi', onClick: () => null},
                    ],
                },

                'amona': {
                    name: 'Submenu Amonaguyem F5',
                    subtitle: "",
                    glare: true, 
                    buttons: [
                        { name: 'subMenu Amonaguyem', onClick: () => null},
                    ],
                }
            }
        })
    }
})


