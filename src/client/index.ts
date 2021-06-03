import { CoraUI } from "./menu/menu";

setImmediate(() => {
	console.log("clientside", "");
	SetWeatherTypePersist("XMAS");
	NetworkOverrideClockTime(6, 34, 56);

	CoraUI.openMenu({
		name: "Menu F5",
		subtitle: "Menu intéractions",
		glare: true,
        heritagePanel: true,
        indexHeritagePanel: [0, 0, 0, 0],

		buttons: [

			{ name: "Pere", onSlide: (e: any) => {
                console.log(e);
                CoraUI.updateIndexHeritagePanel(0, e);
            }, slideNum: 5 },
            { name: "Mere", onSlide: (e: any) => {
                console.log(e);
                CoraUI.updateIndexHeritagePanel(1, e);
            }, slideNum: 5 },			
            { name: "Am", onSlide: (e: any) => console.log(e), slideNum: 5 },
			{ name: "Am", onSlide: (e: any) => console.log(e), slideNum: 5 }
		
		],
		submenus: {
			zebi: {
				name: "Submenu Zebi F5",
				subtitle: "",
				glare: true,
				buttons: [{ name: "subMenu Zebi", onClick: () => null }],
			},

			amona: {
				name: "Submenu Amonaguyem F5",
				subtitle: "",
				glare: true,
				buttons: [{ name: "subMenu Amonaguyem", onClick: () => null }],
			},
		},
	});
});

setTick(() => {
	if (IsControlJustPressed(0, 38)) {
		CoraUI.openMenu({
			name: "Menu F5",
			subtitle: "Menu intéractions",
			glare: true,
			buttons: [
				{ name: "Am", onClick: () => console.log(15641) },
				{
					name: "Checkbox",
					checkbox: (checked1: boolean) => {
						console.log("boolean", checked1);
					},
				},
				{
					name: "Am 2",
					onClick: () => {
						let [x, y, z] = GetEntityCoords(PlayerPedId(), false);
						NetworkResurrectLocalPlayer(x, y, z, 255, false, false);
					},
				},
				{
					name: "Close menu",
					rightText: "~g~100 000 $",
					onClick: () => CoraUI.closeMenu(),
				},

				{ name: "opacity eyes", onPourcentage: () => {} },
			],
			submenus: {
				zebi: {
					name: "Submenu Zebi F5",
					subtitle: "",
					glare: true,
					buttons: [{ name: "subMenu Zebi", onClick: () => null }],
				},

				amona: {
					name: "Submenu Amonaguyem F5",
					subtitle: "",
					glare: true,
					buttons: [{ name: "subMenu Amonaguyem", onClick: () => null }],
				},
			},
		});
	}
});
