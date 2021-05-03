export const STORYBOOK_VALS = {
    primary: "#2a8def",
    cta: "#EA3546"
}

export const lightenDarkenColour = (colour: string, amount: number): string => {
    let usePound = false;

    if (colour[0] == "#") {
        colour = colour.slice(1);
        usePound = true;
    }

    let num = parseInt(colour, 16);

    let r = (num >> 16) + amount;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amount;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}

export const transparentizeColour = (colour: string, amount: number): string => {
    let rgb = hexToRgb(colour);
    return "rgba(" + [rgb?.r, rgb?.g, rgb?.b, amount].join(",") + ")";
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

