import { DrawText2 } from "../core/utils"
import { RenderSprite } from "../core/utils"

interface IButtons {
    name: string;
    rightText?: string;
    onClick?: any;
    checkbox?: any;
    statusCheckbox?: boolean;
}

interface ICMenu {
    name: string;
    subtitle: string;
    glare: boolean;
    submenus?: any;
    buttons: IButtons[]
}

let init = true

export class CoraUI {
    static Config = {
        colors: {
            dark: {
                header: [16, 16, 16, 255]
            },

            white: {
                header: [250, 242, 117, 255]
            }         
        },

        x: 0.140,
        y: 0.175,
        width: 0.225,
        bottomHeight: 0.029,
        headerHeight: 0.095,
        glare: true,

        SettingsCheckbox: {
            Dictionary: "commonmenu",
            TexturesUnchecked: "shop_box_blank",
            TexturesChecked: "shop_box_tick",
        }
    }

    static Menu = {
        Opened: false,
        MenuOpened: '',
        submenu: [false, ''],
        IndexButton: 0
    }

    static Temp: ICMenu = {
        name: '',
        subtitle: "",
        glare: false,
        buttons: [],
        submenus: {}
    }

    static CurrentMenu: ICMenu = {
        name: '',
        subtitle: "",
        glare: false,
        buttons: [],
        submenus: {}
    }

    public static drawHeader() {        
        let Glare = RequestScaleformMovie('MP_MENU_GLARE')

        if (this.Menu.Opened == true) {
            DrawRect(this.Config.x, this.Config.y, this.Config.width, this.Config.headerHeight, this.Config.colors.dark.header[0], this.Config.colors.dark.header[1], this.Config.colors.dark.header[2], this.Config.colors.dark.header[3])
            
            if (this.CurrentMenu.glare) {
                PushScaleformMovieFunction(Glare, "initScreenLayout")
                PopScaleformMovieFunctionVoid()
                DrawScaleformMovie(Glare, this.Config.x + 0.297, this.Config.y + 0.3985, this.Config.width + 0.7, this.Config.headerHeight + 0.953, 255, 255, 255, 255, 0)
            }
            
            DrawText2(this.CurrentMenu.name, this.Config.x - 0.095, this.Config.y - 0.024, 0.75, 1, [255, 255, 255, 255], false, 2)
            DrawRect(this.Config.x, this.Config.y + (this.Config.headerHeight - 0.03065) , this.Config.width, this.Config.bottomHeight + 0.0030, this.Config.colors.dark.header[0], this.Config.colors.dark.header[1], this.Config.colors.dark.header[2], 230)
            DrawText2(this.CurrentMenu.subtitle, this.Config.x - 0.1075, this.Config.y + (this.Config.headerHeight - 0.042), 0.265, 0, [255, 255, 255, 255], false, 2)
            DrawText2((this.Menu.IndexButton + 1) + '/' + (this.CurrentMenu.buttons.length), this.Config.x + 0.1, this.Config.y + (this.Config.headerHeight - 0.041), 0.265, 0, [255, 255, 255, 255], true, 2.5)
        }
    }

    public static drawButtons() {
        if (this.Menu.Opened == true) {
            for (let i = 0; i < this.CurrentMenu.buttons.length; i++) {
                if (this.CurrentMenu.buttons[i].checkbox !== null && init) {
                    this.CurrentMenu.buttons[i].statusCheckbox = false
                    init = false
                }

                let color = i == this.Menu.IndexButton ? [255, 255, 255, 255] : [16, 16, 16, 120] ; 
                let colorText = i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255]; 
                let checkboxColor = i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255]; 
                let lenghtforright2 = this.CurrentMenu.buttons[i].rightText || "";
                let lenghtforright = lenghtforright2.length || 0;

                DrawRect(this.Config.x, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.033) , this.Config.width, this.Config.bottomHeight + 0.0011, color[0], color[1], color[2], color[3])
                DrawText2(this.CurrentMenu.buttons[i].name, this.Config.x - 0.1075, this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0565), 0.265, 0, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2)
                if (this.CurrentMenu.buttons[i].rightText) {
                    DrawText2(this.CurrentMenu.buttons[i].rightText || "", this.Config.x + 0.102 - (lenghtforright/1000), this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0565), 0.235, 0, [colorText[0], colorText[1], colorText[2], colorText[3]], true, 2)
                }

                if (this.CurrentMenu.buttons[i].checkbox) {
                    {
                        this.CurrentMenu.buttons[i].statusCheckbox 
                        ? RenderSprite(this.Config.SettingsCheckbox.Dictionary, this.Config.SettingsCheckbox.TexturesChecked, this.Config.x + 0.0940, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.018) , this.Config.width - 0.2078, this.Config.bottomHeight + 0.0014, 0, checkboxColor[0], checkboxColor[1], checkboxColor[2], checkboxColor[3])
                        : RenderSprite(this.Config.SettingsCheckbox.Dictionary, this.Config.SettingsCheckbox.TexturesUnchecked, this.Config.x + 0.0940, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.018) , this.Config.width - 0.2078, this.Config.bottomHeight + 0.0014, 90, checkboxColor[0], checkboxColor[1], checkboxColor[2], checkboxColor[3])                    
                    }
                }

            }
        } 
    }

    public static controlMenu() {
        if (IsControlJustPressed(0, 27)) {
            if (this.Menu.IndexButton <= 0) {
                this.Menu.IndexButton = this.CurrentMenu.buttons.length - 1
            } else {
                this.Menu.IndexButton --
            }
        } else if (IsControlJustPressed(0, 173)) {
            if (this.Menu.IndexButton >= this.CurrentMenu.buttons.length -1 ) {
                this.Menu.IndexButton = 0
            } else {
                this.Menu.IndexButton ++
            }
        } else if (IsControlJustPressed(0, 201)) {
            if (this.CurrentMenu.buttons[this.Menu.IndexButton].onClick) {
                this.CurrentMenu.buttons[this.Menu.IndexButton].onClick()
            } else if (this.CurrentMenu.buttons[this.Menu.IndexButton].checkbox) {
                this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox = !this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox
                this.CurrentMenu.buttons[this.Menu.IndexButton].checkbox(this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox)
            }
        } else if (IsControlJustPressed(0, 202)) {
            if (this.Menu.submenu[0] == true) {
                this.closeSubMenu()
            } else {
                this.closeMenu()
            }
        }
    }

    public static drawMenu() {
        if (this.Menu.Opened) {
            this.drawHeader();
            this.drawButtons();
            this.controlMenu();
        }
    }

    public static openSubmenu(name: string) {
        this.Menu.IndexButton = 0
        this.CurrentMenu = this.CurrentMenu.submenus[name];
        this.Menu.submenu = [true, name]
    }

    public static closeSubMenu() {
        this.Menu.IndexButton = 0
        this.CurrentMenu = this.Temp;
        this.Menu.submenu = [false, ')']
    }
    
    public static openMenu(obj: ICMenu) {
        this.Menu.Opened = true;
        this.CurrentMenu = obj;
        this.Temp = obj
        this.drawMenu();
    }

    public static resetMenu() {
        this.Menu.IndexButton = 0

        this.Temp = {
            name: '',
            subtitle: '',
            glare: false,
            buttons: [],
            submenus: {}
        }

        this.CurrentMenu = {
            name: '',
            subtitle: '',
            glare: false,
            buttons: [],
            submenus: {}
        }
    }

    public static closeMenu() {
        this.resetMenu()
        this.Menu.Opened = false
    }
}

setTick(() => {
    if (CoraUI.Menu.Opened) {
        CoraUI.drawMenu();
    }
})