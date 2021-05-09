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
            subtitle: "",
            glare: true,
            buttons: [
                { name: 'Am', onClick: () => console.log(15641)},
                { name: 'Am', onClick: () => {
                    console.log('sitterlan amonaguyem')
                }},
                { name: 'zebi', onClick: () => CoraUI.openSubmenu('zebi')},
                { name: 'amona', rightText: "Right lab", onClick: () => CoraUI.openSubmenu('amona')},
                { name: 'Close menu', onClick: () => CoraUI.closeMenu()},
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


