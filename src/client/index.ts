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
            subtitle: "Zeubi",
            glare: true,
            buttons: [
                { name: 'Am', rightText: ">>>", onClick: () => console.log(15641)},
                { name: 'Am', rightText: ">", onClick: () => {
                    console.log('sitterlan amonaguyem')
                }},
                { name: 'zebi', rightText: "ZEBIIIIIIII", onClick: () => CoraUI.openSubmenu('zebi')},
                { name: 'amona', rightText: "a", onClick: () => CoraUI.openSubmenu('amona')},
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


