import { CoraUI } from "./menu/menu"


setImmediate(() => {
    console.log('clientside', '')
    SetWeatherTypePersist('XMAS')
    NetworkOverrideClockTime(6, 34, 56)

    CoraUI.openMenu({
        name: 'Menu F5',
        subtitle: "",
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

})

setTick(() => {
    if (IsControlJustPressed(0, 38)) {
        console.log("openemenu")
        CoraUI.openMenu({
            name: 'Menu E',
            subtitle: "Bite",
            glare: true,
            buttons: [
                { name: 'Am', onClick: () => {
                    console.log('sitterlan amonaguyem')
                }},
                { name: 'Close menu', onClick: () => CoraUI.closeMenu()},
            ]
        })
    }
})


