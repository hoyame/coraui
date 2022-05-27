import { calc, DrawRectg, DrawText2, RenderSprite, GetTextWidth, GetLineCount, breakString } from "./utils";

interface IButtons {
	name: string;
	description?: string;
	rightText?: string;
	checkbox?: any;
	statusCheckbox?: boolean;
	slider?: Array<string>;
	indexSlider?: number;
	slideNum?: number;
	backgroundColor?: any;

	onClick?: any;
	onSlide?: any;
	onPourcentage?: any;
	valuePourcentage?: any;

	onColorPanel?: any;
	customColorPanel?: number[][];

	indexColorPanel?: number;
	showColorPanel?: number;
	lenghtColorPanel?: number;
}

interface ICMenu {
	name: string;
	subtitle: string;
	glare: boolean;
	submenus?: any;
	buttons: IButtons[];
    
	heritagePanel?: any;
	indexHeritagePanel?: [number, number, number, number];
}

let init = true;

export class CoraUI {
	static Config = {
		colors: {
			dark: {
				header: [16, 16, 16, 255],
			},

			white: {
				header: [250, 242, 117, 255],
			},
		},

		x: 0.14,
		y: 0.175,
		width: 0.225,
		bottomHeight: 0.029,
		headerHeight: 0.095,
		colorProps: 0.04,
		glare: true,

		SettingsCheckbox: {
			Dictionary: "commonmenu",
			TexturesUnchecked: "shop_box_blank",
			TexturesChecked: "shop_box_tick",
			TexturesCheckedOver: "shop_box_tickb",
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
			[112, 25, 25, 255], // RedDark
			[93, 182, 229, 255], // Blue
			[174, 219, 242, 255], // LightBlue
			[47, 92, 115, 255], // DarkBlue
			[240, 200, 80, 255], // Yellow
			[254, 235, 169, 255], // LightYellow
			[126, 107, 41, 255], // DarkYellow
			[255, 133, 85, 255], // Orange
			[255, 194, 170, 255], // LightOrange
			[127, 66, 42, 255], // DarkOrange
			[114, 204, 114, 255], // Green
			[185, 230, 185, 255], // LightGreen
			[57, 102, 57, 255], // DarkGreen
			[132, 102, 226, 255], // Purple
			[192, 179, 239, 255], // LightPurple
			[67, 57, 111, 255], // DarkPurple
			[203, 54, 148, 255], // Pink
			[255, 215, 0, 255], // Gold
			[255, 228, 181, 255], // Moccasin
			[240, 230, 140, 255], // Khaki
		],
	};

	static Menu = {
		Opened: false,
		MenuOpened: "",
		submenu: [false, ""],
		IndexButton: 0,
	};

	static Temp: ICMenu = {
		name: "",
		subtitle: "",
		glare: false,
		buttons: [],
		submenus: {},
        heritagePanel: false,
        indexHeritagePanel: [0, 0, 0, 0]
	};

	static CurrentMenu: ICMenu = {
		name: "",
		subtitle: "",
		glare: false,
		buttons: [],
		submenus: {},
        heritagePanel: false,
        indexHeritagePanel: [0, 0, 0, 0]
	};

	public static drawHeader() {
		let Glare = RequestScaleformMovie("MP_MENU_GLARE");

		if (this.Menu.Opened == true) {
			DrawRect(
				this.Config.x,
				this.Config.y,
				this.Config.width,
				this.Config.headerHeight,
				this.Config.colors.dark.header[0],
				this.Config.colors.dark.header[1],
				this.Config.colors.dark.header[2],
				this.Config.colors.dark.header[3]
			);

			if (this.CurrentMenu.glare) {
				PushScaleformMovieFunction(Glare, "initScreenLayout");
				PopScaleformMovieFunctionVoid();
				DrawScaleformMovie(
					Glare,
					this.Config.x + 0.297,
					this.Config.y + 0.3985,
					this.Config.width + 0.7,
					this.Config.headerHeight + 0.953,
					255,
					255,
					255,
					255,
					0
				);
			}

			DrawText2(
				this.CurrentMenu.name,
				this.Config.x - 0.095,
				this.Config.y - 0.024,
				0.75,
				1,
				[255, 255, 255, 255],
				false,
				2
			);
			DrawRect(
				this.Config.x,
				this.Config.y + (this.Config.headerHeight - 0.03065),
				this.Config.width,
				this.Config.bottomHeight + 0.003,
				this.Config.colors.dark.header[0],
				this.Config.colors.dark.header[1],
				this.Config.colors.dark.header[2],
				230
			);
			DrawText2(
				this.CurrentMenu.subtitle,
				this.Config.x - 0.1075,
				this.Config.y + (this.Config.headerHeight - 0.042),
				0.265,
				0,
				[255, 255, 255, 255],
				false,
				2
			);
			DrawText2(
				this.Menu.IndexButton + 1 + "/" + this.CurrentMenu.buttons.length,
				this.Config.x + 0.1,
				this.Config.y + (this.Config.headerHeight - 0.041),
				0.265,
				0,
				[255, 255, 255, 255],
				true,
				2.5
			);
		}
	}

	public static drawButtons() {
		if (this.Menu.Opened == true) {
			let startIndex = Math.max(0, this.Menu.IndexButton - 9);
			let endIndex = Math.min(this.CurrentMenu.buttons.length, startIndex + 10);
            let startY = this.Config.y + (this.Config.bottomHeight + 0.0055);
            
            if (this.CurrentMenu.heritagePanel == true) {
                startY += 0.203;
            }

			for (let i = startIndex; i < endIndex; i++) {
				if (this.CurrentMenu.buttons[i].checkbox !== null && init) {
					this.CurrentMenu.buttons[i].statusCheckbox = false;
					init = false;
				}

				const color_def = i == this.Menu.IndexButton ? [255, 255, 255, 255] : [16, 16, 16, 120]
				let color_cust: any
				if (this.CurrentMenu.buttons[i].backgroundColor) {
					color_cust = i == this.Menu.IndexButton ? [this.CurrentMenu.buttons[i].backgroundColor[0], this.CurrentMenu.buttons[i].backgroundColor[1], this.CurrentMenu.buttons[i].backgroundColor[2], 255] : [this.CurrentMenu.buttons[i].backgroundColor[0], this.CurrentMenu.buttons[i].backgroundColor[1], this.CurrentMenu.buttons[i].backgroundColor[2], 100]
				}

				const color =
					this.CurrentMenu.buttons[i].backgroundColor ? color_cust : color_def
				const colorText =
					i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255];
				const checkboxColor =
					i == this.Menu.IndexButton ? [0, 0, 0, 255] : [255, 255, 255, 255];
				const lenghtforright2 = this.CurrentMenu.buttons[i].rightText || "";
				const lenghtforright = lenghtforright2.length || 0;

				DrawRect(
					this.Config.x,
					startY +
						(this.Config.bottomHeight * (i - startIndex + 1) + 0.033),
					this.Config.width,
					this.Config.bottomHeight + 0.0011,
					color[0],
					color[1],
					color[2],
					color[3]
				);
				DrawText2(
					this.CurrentMenu.buttons[i].name,
					this.Config.x - 0.1075,
					startY + 0.022 +
						(this.Config.bottomHeight * (i - startIndex + 1)),
					0.265,
					0,
					[colorText[0], colorText[1], colorText[2], colorText[3]],
					false,
					2
				);

				if (this.CurrentMenu.buttons[i].description && this.CurrentMenu.buttons[i].description != "") {
					if (i == this.Menu.IndexButton) {
						const lenght = this.CurrentMenu.buttons[i].description || ""
						if (lenght.length < 100) {
							const colorfordescback = [16, 16, 16, 165];
							const colorfordesctext = [255, 255, 255, 255];
							const buttonsLenght = this.CurrentMenu.buttons.length > 10 ? 10 : this.CurrentMenu.buttons.length

							let DescLineCount = GetLineCount(this.CurrentMenu.buttons[i].description || "", this.Config.x - 0.1075, startY + (this.Config.bottomHeight * (buttonsLenght + 1) - 0.208) + 0.2350)

							if (DescLineCount == 1) {
								DrawRect(
									this.Config.x,
									startY +
										(this.Config.bottomHeight * (buttonsLenght + 1) - 0.208) + 0.2450,
									this.Config.width,
									this.Config.bottomHeight + 0.0011,
									colorfordescback[0],
									colorfordescback[1],
									colorfordescback[2],
									colorfordescback[3]
								);
								DrawText2(
									this.CurrentMenu.buttons[i].description || "",
									this.Config.x - 0.1075,
									startY +
										(this.Config.bottomHeight * (buttonsLenght + 1) - 0.208) + 0.2350,
									0.265,
									0,
									[colorfordesctext[0], colorfordesctext[1], colorfordesctext[2], colorfordesctext[3]],
									false,
									2
								);
							} else if (DescLineCount >= 2) {
								DrawRect(
									this.Config.x,
									startY +
										(this.Config.bottomHeight * (buttonsLenght + 1) - 0.208) + 0.2545,
									this.Config.width,
									this.Config.bottomHeight + 0.0201,
									colorfordescback[0],
									colorfordescback[1],
									colorfordescback[2],
									colorfordescback[3]
								);
								DrawText2(
									breakString(this.CurrentMenu.buttons[i].description || "", 40),
									this.Config.x - 0.1075,
									startY +
										(this.Config.bottomHeight * (buttonsLenght + 1) - 0.208) + 0.2350,
									0.265,
									0,
									[colorfordesctext[0], colorfordesctext[1], colorfordesctext[2], colorfordesctext[3]],
									false,
									2
								);
							}
						}
					}
				}

				if (this.CurrentMenu.buttons[i].rightText) {
					const lenght = this.CurrentMenu.buttons[i].rightText || "";

					DrawText2(
						this.CurrentMenu.buttons[i].rightText || "",
						this.Config.x + 0.102 - lenght.length / 1000,
                        startY + 0.0225 +
						(this.Config.bottomHeight * (i - startIndex + 1)),
						0.235,
						0,
						[colorText[0], colorText[1], colorText[2], colorText[3]],
						true,
						2
					);
				}

				if (this.CurrentMenu.buttons[i].checkbox) {
					if (this.CurrentMenu.buttons[i].statusCheckbox) {
						if (i == this.Menu.IndexButton) {
							RenderSprite(
								this.Config.SettingsCheckbox.Dictionary,
								this.Config.SettingsCheckbox.TexturesCheckedOver,
								this.Config.x + 0.094,
								startY +
									(this.Config.bottomHeight * (i - startIndex + 1) + 0.018),
								this.Config.width - 0.2078,
								this.Config.bottomHeight + 0.0014,
								0,
								255,
								255,
								255,
								255
							);
						} else {
							RenderSprite(
								this.Config.SettingsCheckbox.Dictionary,
								this.Config.SettingsCheckbox.TexturesChecked,
								this.Config.x + 0.094,
								startY +
									(this.Config.bottomHeight * (i - startIndex + 1) + 0.018),
								this.Config.width - 0.2078,
								this.Config.bottomHeight + 0.0014,
								0,
								255,
								255,
								255,
								255
							);
						}
					} else {
						RenderSprite(
							this.Config.SettingsCheckbox.Dictionary,
							this.Config.SettingsCheckbox.TexturesUnchecked,
							this.Config.x + 0.094,
							startY +
								(this.Config.bottomHeight * (i - startIndex + 1) + 0.018),
							this.Config.width - 0.2078,
							this.Config.bottomHeight + 0.0014,
							90,
							checkboxColor[0],
							checkboxColor[1],
							checkboxColor[2],
							checkboxColor[3]
						);
					}
				}

				if (this.CurrentMenu.buttons[i].slider) {
					const slider = this.CurrentMenu.buttons[i].slider || [];
					const index = this.CurrentMenu.buttons[i].indexSlider || 0;
					const lenght = slider[index] || "";

					let changelenght = (GetTextWidth(lenght, 0, 0.235))

					let LengthToGive = lenght.length / 1000;
					if (lenght.length >= 9) {
						LengthToGive = lenght.length / 350;
					}

					let LengthToGive2 = lenght.length / 1000;
					if (lenght.length >= 9) {
						LengthToGive2 = lenght.length / 600;
					}

					//console.log(changelenght)

					DrawSprite(
						"commonmenu",
						"arrowleft",
						this.Config.x + 0.0775 - LengthToGive,					
				//		(changelenght),
                        startY + 0.033 +
                        (this.Config.bottomHeight * (i - startIndex + 1)),
						0.009,
						0.018,
						0.0,
						colorText[0],
						colorText[1],
						colorText[2],
						colorText[3]
					);
					DrawText2(
						slider[index] || "",
						this.Config.x + 0.0935 - LengthToGive2,
                        startY + 0.023 +
							(this.Config.bottomHeight * (i - startIndex + 1)),
						0.235,
						0,
						[colorText[0], colorText[1], colorText[2], colorText[3]],
						true,
						2
					);
					DrawSprite(
						"commonmenu",
						"arrowright",
						this.Config.x + 0.1045,
                        startY + 0.033 +
							(this.Config.bottomHeight * (i - startIndex + 1)),
						0.009,
						0.018,
						0.0,
						colorText[0],
						colorText[1],
						colorText[2],
						colorText[3]
					);
				}

				if (this.CurrentMenu.buttons[i].slideNum) {
					let slider: any = [];
					const index = this.CurrentMenu.buttons[i].indexSlider || 0;
					const slideNum = this.CurrentMenu.buttons[i].slideNum || 0;

					for (let z = 0; z <= slideNum; z++) {
						slider.push(z.toString());
					}

					DrawSprite(
						"commonmenu",
						"arrowleft",
						this.Config.x + 0.089,
                        startY + 0.033 +
                        (this.Config.bottomHeight * (i - startIndex + 1)),
						0.009,
						0.018,
						0.0,
						colorText[0],
						colorText[1],
						colorText[2],
						colorText[3]
					);
					DrawText2(
						slider[index] || "",
						this.Config.x + 0.097,
                        startY + 0.023 +
							(this.Config.bottomHeight * (i - startIndex + 1)),
						0.235,
						0,
						[colorText[0], colorText[1], colorText[2], colorText[3]],
						true,
						2
					);
					DrawSprite(
						"commonmenu",
						"arrowright",
						this.Config.x + 0.1045,
                        startY + 0.033 +
							(this.Config.bottomHeight * (i - startIndex + 1)),
						0.009,
						0.018,
						0.0,
						colorText[0],
						colorText[1],
						colorText[2],
						colorText[3]
					);
				}

				if (
					this.CurrentMenu.buttons[i].onPourcentage !== undefined &&
					i == this.Menu.IndexButton
				) {
					if (
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage ==
						undefined
					) {
						this.CurrentMenu.buttons[
							this.Menu.IndexButton
						].valuePourcentage = 0;
					}

					this.DrawPercentagePanel(
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage +
							"%"
					);
				}

				if (
					this.CurrentMenu.buttons[i].onColorPanel !== undefined &&
					i == this.Menu.IndexButton
				) {
					this.DrawColorPanel(undefined, this.CurrentMenu.buttons[i].customColorPanel);
				}

                if (this.CurrentMenu.heritagePanel) {
		            this.DrawHeritagePanel();
                }
			}
		}
	}

	public static DrawColorPanel(
		Title?: string,
		Colors?: number[][]
	) {
        const buttonsLenght = this.CurrentMenu.buttons.length > 10 ? 10 : this.CurrentMenu.buttons.length

		const ColorArray = Colors || this.Config.ColoursPanel;

		this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel =
			ColorArray.length;
		const colorText = [255, 255, 255, 255];
		const lenghtforTitle2 = Title || "Colors";
		const lenghtforTitle = lenghtforTitle2.length || 0;

		this.CurrentMenu.buttons[this.Menu.IndexButton].showColorPanel = 8;
		const indexAColorPanel =
			this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0;

		DrawRect(
			this.Config.x,
            this.Config.y +
            (this.Config.bottomHeight * (buttonsLenght + 1) -
                0.201) +
            0.304,
			this.Config.width - 0.45,
			this.Config.bottomHeight + 0.065,
			0,
			0,
			0,
			105
		); // background

		DrawText2(
			Title || "Colors",
			this.Config.x - 0.004 - lenghtforTitle / 1000,
            this.Config.y +
            (this.Config.bottomHeight * (buttonsLenght + 1) -
                0.201) +
            0.263,
			this.Config.SettingsPercentagePanel.Text.Middle.Scale,
			6,
			[colorText[0], colorText[1], colorText[2], colorText[3]],
			false,
			2
		);
		DrawSprite(
			"commonmenu",
			"arrowleft",
			this.Config.x - 0.105,
            this.Config.y +
            (this.Config.bottomHeight * (buttonsLenght + 1) -
                0.188) +
            0.263,
			0.009,
			0.018,
			0.0,
			colorText[0],
			colorText[1],
			colorText[2],
			colorText[3]
		);
		DrawSprite(
			"commonmenu",
			"arrowright",
			this.Config.x + 0.105,
            this.Config.y +
            (this.Config.bottomHeight * (buttonsLenght + 1) -
                0.188) +
            0.263,
			0.009,
			0.018,
			0.0,
			colorText[0],
			colorText[1],
			colorText[2],
			colorText[3]
		);

		const startIndex = Math.max(0, indexAColorPanel - 7);
		const endIndex = Math.min(ColorArray.length, startIndex + 8);
		const rectWidth = this.Config.colorProps - 0.0175;
		const startX = this.Config.x - rectWidth * 3.5;

		for (let ColorIndex = startIndex; ColorIndex < endIndex; ColorIndex++) {
			let rgb =
				ColorIndex == indexAColorPanel
					? [
							ColorArray[ColorIndex][0],
							ColorArray[ColorIndex][1],
							ColorArray[ColorIndex][2],
							ColorArray[ColorIndex].length > 3 ? (ColorArray[ColorIndex][3] - 150) : 105
					  ]
					: [
							ColorArray[ColorIndex][0],
							ColorArray[ColorIndex][1],
							ColorArray[ColorIndex][2],
							ColorArray[ColorIndex].length > 3 ? ColorArray[ColorIndex][3] : 255,
					  ];
			DrawRect(
				startX + rectWidth * (ColorIndex - startIndex),
                this.Config.y +
                (this.Config.bottomHeight * (buttonsLenght + 1) -
                    0.201) +
                0.3185,
			
				rectWidth,
				this.Config.colorProps,
				rgb[0],
				rgb[1],
				rgb[2],
				rgb[3]
			); // Colors
		}

		DrawRect(
			startX + rectWidth * Math.min(indexAColorPanel, 7),
            this.Config.y + (this.Config.bottomHeight * (buttonsLenght + 1) - 0.201) + 0.3185 - this.Config.colorProps / 2 - 0.002,
			rectWidth,
			0.004,
			255,
			255,
			255,
			255
		); // Colors
	}

	public static DrawPercentagePanel(TextHeader?: string) {
		const colorText = [255, 255, 255, 255];
		const lenghtforPercentage2 = TextHeader || "Percentage";
		const lenghtforPercentage = lenghtforPercentage2.length || 0;
        const buttonsLenght = this.CurrentMenu.buttons.length > 10 ? 10 : this.CurrentMenu.buttons.length

		const percentage =
			this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage || 100;

		DrawRect(
			this.Config.x,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.208) +
				0.2935,
			this.Config.width - 0.45,
			this.Config.bottomHeight + 0.0294,
			0,
			0,
			0,
			105
		); // background
		DrawRectg(
			this.Config.x - 0.103,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.201) +
				0.2935,
			this.Config.width - 0.017,
			0.008,
			[0, 0, 0, 120]
		);
		DrawRectg(
			this.Config.x - 0.103,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.201) +
				0.2935,
			(this.Config.width - 0.017) / calc(percentage),
			0.008,
			[255, 255, 255, 255]
		);

		DrawText2(
			TextHeader || "Percentage",
			this.Config.x - 0.004 - lenghtforPercentage / 1000,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.208) +
				0.2695,
			this.Config.SettingsPercentagePanel.Text.Middle.Scale,
			6,
			[colorText[0], colorText[1], colorText[2], colorText[3]],
			false,
			2
		);
		DrawText2(
			"0%",
			this.Config.x - 0.1045,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.208) +
				0.2695,
			this.Config.SettingsPercentagePanel.Text.Middle.Scale,
			6,
			[colorText[0], colorText[1], colorText[2], colorText[3]],
			false,
			2
		);
		DrawText2(
			"100%",
			this.Config.x + 0.087,
			this.Config.y +
				(this.Config.bottomHeight * (buttonsLenght + 1) -
					0.208) +
				0.2695,
			this.Config.SettingsPercentagePanel.Text.Middle.Scale,
			6,
			[colorText[0], colorText[1], colorText[2], colorText[3]],
			false,
			2
		);
	}

	public static DrawHeritagePanel() {
        const indexHeritagePanel = this.CurrentMenu.indexHeritagePanel || [0, 0, 0, 0] 
        // DrawRect(
        //     this.Config.x,
        //     this.Config.y +
        //         (this.Config.bottomHeight + 0.0055) +
        //         (this.Config.bottomHeight * (i - startIndex + 1) + 0.033),
        //     this.Config.width,
        //     this.Config.bottomHeight + 0.0011,
        //     color[0],
        //     color[1],
        //     color[2],
        //     color[3]
        // );

		DrawSprite("pause_menu_pages_char_mom_dad", "mumdadbg", 
        this.Config.x, 
        this.Config.y + (this.Config.bottomHeight + 0.0055) + 0.10894 + 0.0385,
        0.225, 0.20, .0, 255, 255, 255, 255)

		DrawSprite("pause_menu_pages_char_mom_dad", "vignette", 
        this.Config.x, 
        this.Config.y + (this.Config.bottomHeight + 0.0055) + 0.10895 + 0.0385,
        0.225, 0.20, .0, 255, 255, 255, 255)

		DrawSprite("char_creator_portraits", "male_" + + indexHeritagePanel[0], 
        this.Config.x - 0.040, 
        this.Config.y + (this.Config.bottomHeight + 0.0055) + 0.10892 + 0.0385,
        0.11, 0.20, .0, 255, 255, 255, 255)
    
        DrawSprite("char_creator_portraits", "female_" + indexHeritagePanel[1], 
        this.Config.x + 0.040, 
        this.Config.y + (this.Config.bottomHeight + 0.0055) + 0.10892 + 0.0385,
        0.11, 0.20, .0, 255, 255, 255, 255)
	}

	public static controlMenu() {
		if (IsControlJustPressed(0, 27)) {
			if (this.Menu.IndexButton <= 0) {
				this.Menu.IndexButton = this.CurrentMenu.buttons.length - 1;
			} else {
				this.Menu.IndexButton--;
			}
		} else if (IsControlJustPressed(0, 173)) {
			if (this.Menu.IndexButton >= this.CurrentMenu.buttons.length - 1) {
				this.Menu.IndexButton = 0;
			} else {
				this.Menu.IndexButton++;
			}
		} else if (IsControlJustPressed(0, 201)) {
			if (this.CurrentMenu.buttons[this.Menu.IndexButton].onClick) {
				this.CurrentMenu.buttons[this.Menu.IndexButton].onClick();
			} else if (this.CurrentMenu.buttons[this.Menu.IndexButton].checkbox) {
				this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox =
					!this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox;
				this.CurrentMenu.buttons[this.Menu.IndexButton].checkbox(
					this.CurrentMenu.buttons[this.Menu.IndexButton].statusCheckbox
				);
			}
		} else if (IsControlJustPressed(0, 202)) {
			if (this.Menu.submenu[0] == true) {
				this.closeSubMenu();
			} else {
				this.closeMenu();
			}
		} else if (IsControlJustPressed(0, 174)) {

			if (
				this.CurrentMenu.buttons[this.Menu.IndexButton].slider ||
				this.CurrentMenu.buttons[this.Menu.IndexButton].slideNum
			) {
				// Sliders

				const indexSlider =
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider || 0;
				const lenghtSlider = this.CurrentMenu.buttons[this.Menu.IndexButton]
					.slider
					? this.CurrentMenu.buttons[this.Menu.IndexButton].slider?.length || 0
					: this.CurrentMenu.buttons[this.Menu.IndexButton].slideNum || 0;

				this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider =
					indexSlider > 0 ? indexSlider - 1 : lenghtSlider - 1;
				this.CurrentMenu.buttons[this.Menu.IndexButton].onSlide(
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider
				);
			}

			if (this.CurrentMenu.buttons[this.Menu.IndexButton].onColorPanel) {
				const indexColorPanel =
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0;
				const lenghtColorPanel =
					this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel || 0;

				if (indexColorPanel <= 0) {
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel =
						this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel;
				} else {
					if (indexColorPanel > 8) {
						this.CurrentMenu.buttons[this.Menu.IndexButton].showColorPanel = -1;
					}
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel =
						indexColorPanel - 1; // remove 1
				}

				console.log(
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel
				);
			}
		} else if (IsControlJustPressed(0, 175)) {
			// right just press
			if (
				this.CurrentMenu.buttons[this.Menu.IndexButton].slider ||
				this.CurrentMenu.buttons[this.Menu.IndexButton].slideNum
			) {
				// Sliders
				const indexSlider =
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider || 0;
				const lenghtSlider = this.CurrentMenu.buttons[this.Menu.IndexButton]
					.slider
					? this.CurrentMenu.buttons[this.Menu.IndexButton].slider?.length || 0
					: this.CurrentMenu.buttons[this.Menu.IndexButton].slideNum || 0;

				if (indexSlider >= lenghtSlider - 1) {
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider = 0;
				} else {
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider =
						indexSlider + 1;
				}

				this.CurrentMenu.buttons[this.Menu.IndexButton].onSlide(
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexSlider
				);
			}

			if (this.CurrentMenu.buttons[this.Menu.IndexButton].onColorPanel) {
				const indexColorPanel =
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel || 0;
				const lenghtColorPanel =
					this.CurrentMenu.buttons[this.Menu.IndexButton].lenghtColorPanel || 0;

				if (indexColorPanel >= lenghtColorPanel) {
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel = 0;
				} else {
					if (indexColorPanel > 8) {
						this.CurrentMenu.buttons[this.Menu.IndexButton].showColorPanel = +1;
					}
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel =
						indexColorPanel + 1; // remove 1
				}

				console.log(
					this.CurrentMenu.buttons[this.Menu.IndexButton].indexColorPanel
				);
			}
		} else if (IsControlPressed(0, 174)) {
			// left press
			if (this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage) {
				if (
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage <= 0
				) {
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage =
						this.CurrentMenu.buttons[
							this.Menu.IndexButton
						].valuePourcentage = 100;
					this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage
					);
				} else {
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage =
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage -
						1;
					this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage
					);
				}
			}
		} else if (IsControlPressed(0, 175)) {
			// right press
			if (this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage) {
				if (
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage >=
					100
				) {
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage =
						this.CurrentMenu.buttons[
							this.Menu.IndexButton
						].valuePourcentage = 0;
					this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage
					);
				} else {
					this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage =
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage +
						1;
					this.CurrentMenu.buttons[this.Menu.IndexButton].onPourcentage(
						this.CurrentMenu.buttons[this.Menu.IndexButton].valuePourcentage
					);
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
		this.Menu.IndexButton = 0;
		this.CurrentMenu = this.CurrentMenu.submenus[name];
		this.Menu.submenu = [true, name];
	}

	public static closeSubMenu() {
		this.Menu.IndexButton = 0;
		this.CurrentMenu = this.Temp;
		this.Menu.submenu = [false, ")"];
	}

	public static openMenu(obj: ICMenu) {
		SetStreamedTextureDictAsNoLongerNeeded("pause_menu_pages_char_mom_dad");
		SetStreamedTextureDictAsNoLongerNeeded("commonmenu");
		SetStreamedTextureDictAsNoLongerNeeded("char_creator_portraits");
		RequestStreamedTextureDict("pause_menu_pages_char_mom_dad", false);
		RequestStreamedTextureDict("commonmenu", false);
		RequestStreamedTextureDict("char_creator_portraits", false);

		this.Menu.Opened = true;
		this.CurrentMenu = obj;
		this.Temp = obj;
		this.drawMenu();
	}

	public static resetMenu() {
		this.Menu.IndexButton = 0;

		this.Temp = {
			name: "",
			subtitle: "",
			glare: false,
			buttons: [],
			submenus: {},
            heritagePanel: false,
            indexHeritagePanel: [0, 0, 0, 0]
		};

		this.CurrentMenu = {
			name: "",
			subtitle: "",
			glare: false,
			buttons: [],
			submenus: {},
            heritagePanel: false,
            indexHeritagePanel: [0, 0, 0, 0]
		};
	}

    public static updateIndexHeritagePanel(i: number, c: number) {
		if (this.CurrentMenu.indexHeritagePanel !== undefined) {
			this.CurrentMenu.indexHeritagePanel[i] = c
		}
    }

	public static closeMenu() {
		this.resetMenu();
		this.Menu.Opened = false;
	}
}

setTick(() => {
	if (CoraUI.Menu.Opened) {
		CoraUI.drawMenu();
	}
});

exports('CreateMenu', (arg: any) => {
	CoraUI.openMenu(arg);
})

exports('CreateSubmenu', (arg: any) => {
	CoraUI.openSubmenu(arg);
})

