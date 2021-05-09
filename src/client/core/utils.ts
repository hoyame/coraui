export const DrawText2 = (content: string, x: number, y: number, scale: number, font: number, color: any, intAlign: any, wrap: number) => {
    SetTextFont(font)
    SetTextScale(scale, scale)

    if (intAlign) {
        SetTextCentre(true)
    } else {
        SetTextJustification(intAlign || 1)
        if (intAlign == 2) {
            SetTextWrap(0.0, wrap || x)
        }
    }

    SetTextEntry("STRING")
    SetTextColour(color[0], color[1], color[2], color[3])
    AddTextComponentString(content)
    DrawText(x, y)
}