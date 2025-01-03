import axios from "axios"
async function fetchImage(url) {
    const response = await fetch(`${url}?not-from-cache-please`)
    const blob = (await response.blob())
    const img = new Image()
    img.src = URL.createObjectURL(blob);

    // Ensure the image is loaded before proceeding
    await new Promise((resolve) => {
        img.onload = resolve;
    });

    
    var blockSize = 10, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }
    height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
    width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;
    context.drawImage(img, 0, 0);
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}


export default fetchImage