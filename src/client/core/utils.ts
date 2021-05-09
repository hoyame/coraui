export const DrawText2 = (content: string, x: number, y: number, scale: number, font: number, color: any) => {
    SetTextFont(font)
    //SetTextProportional(0)
    SetTextScale(scale, scale)
    SetTextEntry("STRING")
    SetTextColour(color[0], color[1], color[2], color[3])
    AddTextComponentString(content)
    DrawText(x, y)
}