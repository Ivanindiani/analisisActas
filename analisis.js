const fs = require('node:fs');
const Tesseract = require('tesseract.js');


function main() {
    const dir = './imagenes';
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const nameFile = `${dir}/${file}`;
        Tesseract.recognize(nameFile, {
            lang: 'es',
        })
        .then(function(result) {
            console.log(result.text);
        });
        break;
    }
}

main();
