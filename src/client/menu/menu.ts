import { calc, DrawRectg, DrawText2 } from "../core/utils"
import { RenderSprite } from "../core/utils"

interface IButtons {
    name: string;
    rightText?: string;
    checkbox?: any;
    statusCheckbox?: boolean;
    slider?: Array<string>;
    indexSlider?: number;   
    onClick?: any;
    onPourcentage?: any;
    valuePourcentage?: any;

    indexColorPanel?: number;
    lenghtColorPanel?: number;
}

interface ICMenu {
    name: string;
    subtitle: string;
    glare: boolean;
    submenus?: any;
    buttons: IButtons[];
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
            TexturesCheckedOver: "shop_box_tickb"
        },

        SettingsPercentagePanel: {
            Text: {
                Middle: { X: 215.5, Y: 15, Scale: 0.35 },
            },
        },

        ColoursPanel: [
            [255, 255, 255, 255], // pure white
            [240, 240, 240, 255], // white
            [0, 0, 0, 255], // black
            [155, 155, 155, 255], // grey
            [205, 205, 205, 255], // LightGrey
            [77, 77, 77, 255], // DarkGrey
            [224, 50, 50, 255], //Red
            [240, 153, 153, 255], // RedLight
            [ 112, 25, 25, 255 ], // RedDark
            [ 93, 182, 229, 255 ], // Blue
            [ 174, 219, 242, 255 ],// LightBlue
            [ 47, 92, 115, 255 ],// DarkBlue
            [ 240, 200, 80, 255 ],// Yellow
            [ 254, 235, 169, 255 ],// LightYellow
            [ 126, 107, 41, 255 ],// DarkYellow
            [ 255, 133, 85, 255 ],// Orange
            [ 255, 194, 170, 255 ],// LightOrange
            [ 127, 66, 42, 255 ],// DarkOrange
            [ 114, 204, 114, 255 ],// Green
            [ 185, 230, 185, 255 ],// LightGreen
            [ 57, 102, 57, 255 ],// DarkGreen
            [ 132, 102, 226, 255 ],// Purple
            [ 192, 179, 239, 255 ],// LightPurple
            [ 67, 57, 111, 255 ],// DarkPurple
            [ 203, 54, 148, 255 ],// Pink
            [ 255, 215, 0, 255 ],// Gold
            [ 255,228,181, 255 ],// Moccasin
            [ 240,230,140, 255 ],// Khaki
        ]
    }

    static Menu = {
        Opened: false,
        MenuOpened: '',
        submenu: [false, ''],
        IndexButton: 0,
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

                const color = i == this.Menu.IndexButton ? [255, 255, 255, 255] : [16, 16, 16, 120];
                const colorText = i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255]; 
                const checkboxColor = i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255];
                const lenghtforright2 = this.CurrentMenu.buttons[i].rightText || "";
                const lenghtforright = lenghtforright2.length || 0;


                DrawRect(this.Config.x, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.033) , this.Config.width, this.Config.bottomHeight + 0.0011, color[0], color[1], color[2], color[3])
                DrawText2(this.CurrentMenu.buttons[i].name, this.Config.x - 0.1075, this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0565), 0.265, 0, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2)
                
                if (this.CurrentMenu.buttons[i].rightText) {
                    const lenght = this.CurrentMenu.buttons[i].rightText || "";

                    DrawText2(this.CurrentMenu.buttons[i].rightText || "", this.Config.x + 0.102 - (lenght.length/1000), this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0565), 0.235, 0, [colorText[0], colorText[1], colorText[2], colorText[3]], true, 2)
                }

                if (this.CurrentMenu.buttons[i].checkbox) {
                    if (this.CurrentMenu.buttons[i].statusCheckbox ) {
                        if (i == this.Menu.IndexButton) {
                            RenderSprite(this.Config.SettingsCheckbox.Dictionary, this.Config.SettingsCheckbox.TexturesCheckedOver, this.Config.x + 0.0940, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.018) , this.Config.width - 0.2078, this.Config.bottomHeight + 0.0014, 0, 255, 255, 255, 255)
                        } else {                                
                            RenderSprite(this.Config.SettingsCheckbox.Dictionary, this.Config.SettingsCheckbox.TexturesChecked, this.Config.x + 0.0940, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.018) , this.Config.width - 0.2078, this.Config.bottomHeight + 0.0014, 0, 255, 255, 255, 255)
                        }
                    } else {
                        RenderSprite(this.Config.SettingsCheckbox.Dictionary, this.Config.SettingsCheckbox.TexturesUnchecked, this.Config.x + 0.0940, this.Config.y + (this.Config.bottomHeight + 0.0055) + (this.Config.bottomHeight * (i + 1) + 0.018) , this.Config.width - 0.2078, this.Config.bottomHeight + 0.0014, 90, checkboxColor[0], checkboxColor[1], checkboxColor[2], checkboxColor[3])                    
                    }
                }

                if (this.CurrentMenu.buttons[i].slider) {
                    const slider = this.CurrentMenu.buttons[i].slider || [];
                    const index = this.CurrentMenu.buttons[i].indexSlider || 0;
                    const lenght = slider[index] || "";

                    let LengthToGive = (lenght.length/1000)
                    if (lenght.length >= 9) {
                        LengthToGive = (lenght.length/350)
                    }

                    let LengthToGive2 = (lenght.length/1000)
                    if (lenght.length >= 9) {
                        LengthToGive2 = (lenght.length/600)
                    }
                    

                    DrawSprite("commonmenu", "arrowleft",  this.Config.x + 0.0775 - LengthToGive, this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0675), .009, .018, 0.0, colorText[0], colorText[1], colorText[2], colorText[3])
                    DrawText2(slider[index] || "", this.Config.x + 0.0935 - LengthToGive2, this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0570), 0.235, 0, [colorText[0], colorText[1], colorText[2], colorText[3]], true, 2)
                    DrawSprite("commonmenu", "arrowright",  this.Config.x + 0.1045, this.Config.y + (this.Config.bottomHeight * (i + 1) + 0.0675), .009, .018, 0.0, colorText[0], colorText[1], colorText[2], colorText[3])
                }

                if (this.CurrentMenu.buttons[i].onPourcentage !== undefined && i == this.Menu.IndexButton) {
                    if (this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage == undefined) {
                        this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = 0
                    }
                    
                    this.DrawPercentagePanel(this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage + "%");
                }
            }
        } 
    }

    public static DrawColorPanel(Title?: string, Colors?: Array<number>, MinimumIndex?: number, MaximumIndex?: number) {
        const ColorArray = Colors || this.Config.ColoursPanel;
        this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel = ColorArray.length
        const colorText = [255, 255, 255, 255]; 
        const lenghtforTitle2 = Title || "Colors";
        const lenghtforTitle = lenghtforTitle2.length || 0;
        const indexColorPanel = this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0

        let MaximumToShow = (ColorArray.length > 15) && 15 || ColorArray.length > 15

        DrawRect(this.Config.x, this.Config.y + 0.2935, this.Config.width - 0.4500, this.Config.bottomHeight + 0.0394, 0, 0, 0, 105); // background

        DrawText2(Title || "Colors", this.Config.x - 0.0040 - (lenghtforTitle/1000),this.Config.y + 0.2630, this.Config.SettingsPercentagePanel.Text.Middle.Scale, 6, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2);
        DrawSprite("commonmenu", "arrowleft",  this.Config.x - 0.1050, this.Config.y + 0.2770, .009, .018, 0.0, colorText[0], colorText[1], colorText[2], colorText[3])
        DrawSprite("commonmenu", "arrowright",  this.Config.x + 0.1050, this.Config.y + 0.2770, .009, .018, 0.0, colorText[0], colorText[1], colorText[2], colorText[3])

        for (let ColorIndex = 1; ColorIndex < MaximumToShow; ColorIndex++) {
            DrawRect(this.Config.x + (0.0152 * (ColorIndex-1)) - 0.10, this.Config.y + 0.3055, this.Config.bottomHeight - 0.0135, this.Config.bottomHeight, this.Config.ColoursPanel[ColorIndex][0], this.Config.ColoursPanel[ColorIndex][1], this.Config.ColoursPanel[ColorIndex][2], this.Config.ColoursPanel[ColorIndex][3]); // Colors
        }
    }

    public static DrawPercentagePanel(TextHeader?: string) {
        const colorText = [255, 255, 255, 255]; 
        const lenghtforPercentage2 = TextHeader || "Percentage";
        const lenghtforPercentage = lenghtforPercentage2.length || 0;
        const percentage = this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage || 100;

        DrawRect(this.Config.x, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.2935, this.Config.width - 0.4500, this.Config.bottomHeight + 0.0294, 0, 0, 0, 105); // background
        
        //DrawRect(this.Config.x, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.3055, this.Config.width - 0.4320, this.Config.bottomHeight - 0.0200, 0, 0, 0, 120); // UnHovered (dark)
        //DrawRect((this.Config.x + 0.0365) / percentage, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.3055, (this.Config.width - 0.4320) / percentage, this.Config.bottomHeight - 0.0200, 255, 255, 255, 255); // UnHovered (dark)
        
        DrawRectg(this.Config.x - 0.103, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.201) + 0.2935, this.Config.width - 0.017, 0.008, [0, 0, 0, 120])
        DrawRectg(this.Config.x - 0.103, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.201) + 0.2935, (this.Config.width - 0.017) / calc(percentage), 0.008, [255, 255, 255, 255])
        //
        
        //DrawRectg(this.Config.x, this.Config.y, 0.220, this.Config.bottomHeight - 0.200 - 0.4320, [0, 0, 0, 255])
        //DrawRectg((this.Config.x + 0.0365) / percentage, this.Config.y, (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.3055, this.Config.width - 0.4320, [255, 255, 255, 255])

        DrawText2(TextHeader || "Percentage", this.Config.x - 0.0040 - (lenghtforPercentage/1000), this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.2695, this.Config.SettingsPercentagePanel.Text.Middle.Scale, 6, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2);
        DrawText2("0%", this.Config.x - 0.1045, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.2695, this.Config.SettingsPercentagePanel.Text.Middle.Scale, 6, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2);
        DrawText2("100%", this.Config.x + 0.0870, this.Config.y + (this.Config.bottomHeight * (this.CurrentMenu.buttons.length + 1) - 0.208) + 0.2695, this.Config.SettingsPercentagePanel.Text.Middle.Scale, 6, [colorText[0], colorText[1], colorText[2], colorText[3]], false, 2);
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
        } else if (IsControlPressed(0, 174)) {
            // left
            if (this.CurrentMenu.buttons[this.Menu.IndexButton].slider) {
                console.log("left")

                // Sliders

                const indexSlider = this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider || 0
                const lenghtSlider = this.CurrentMenu.buttons[this.Menu.IndexButton].slider?.length || 0

                if (indexSlider <= 0) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider = lenghtSlider - 1                   
                } else {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider = indexSlider - 1
                }

                // Color Panel

                const indexColorPanel = this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0
                const lenghtColorPanel = this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel || 0
                if (indexColorPanel > 1 && indexColorPanel <= lenghtColorPanel) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel =- 1 // remove 1
                }
        
            }

            if (this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage) {
                if (this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage > 0) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage - 1
                    this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage)
                } else {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = 100
                    this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage)
                }
            }
        } else if (IsControlPressed(0, 175)) {
            // right
            if (this.CurrentMenu.buttons[this.Menu.IndexButton].slider) {
                console.log("right")
                
                // Sliders

                const indexSlider = this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider || 0
                const lenghtSlider = this.CurrentMenu.buttons[this.Menu.IndexButton].slider?.length || 0

                if (indexSlider >= lenghtSlider - 1) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider = 0
                } else {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider = indexSlider + 1
                }

                // Color Panel

                const indexColorPanel = this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0
                const lenghtColorPanel = this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel || 0
                if (indexColorPanel > 1 && indexColorPanel <= lenghtColorPanel) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel =+ 1 // add 1
                }

            }

            if (this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage) {
                if (this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage < 100) {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage + 1
                    this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage)
                } else {
                    this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage = 0
                    this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage)
                }
            }
        }
    }

    public static drawMenu() {
        if (this.Menu.Opened) {
            this.drawHeader();
            this.drawButtons();
            this.controlMenu();

            //this.DrawPercentagePanel("Pipi, caca");
            //this.DrawColorPanel();
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