const fs = require('node:fs');
const { createWorker } = require('tesseract.js');


async function main() {
    const dir = './imagenes';
    const fileList = fs.readdirSync(dir);
    
    const worker = await createWorker('spa');
    
    let procesados = 0;
    
    for (const file of fileList) {
        const nameFile = `${dir}/${file}`;
        worker.recognize(nameFile)
        .then((res) => {
            console.log(Object.keys(res.data), res.data.lines[0]);
            let jsonSave = {
                acta_code: '',
                acta_num: null,
                uuid: '',
                fecha: '',
                estado: '',
                municipio: '',
                parroquia: '',
                colegio: '', // Muchas lineas
                num_electores: null,
                num_en_maquina: null,
                num_en_libro: null,
                letra_en_maquina: null,
                letra_en_libro: null,
                maduro: {
                    psuv: null,
                    pcv: null,
                    tupamaro: null,
                    ppt: null,
                    msv: null,
                    podemos: null,
                    mep: null,
                    apc: null,
                    ora: null,
                    upv: null,
                    ev: null,
                    pvv: null,
                    pfv: null,
                }
            }
            for(let line in res.data.lines) {
                let data = res.data.lines[line];
                console.log("Linea "+line, data.text);
                
            }
            procesados++;
            console.log(`Procesadas ${procesados} de ${fileList.length}`);
            if(procesados >= fileList.length) {
                exit();
            }
        })
        .catch((err) => {
            console.log(err);
        });
        break;
    }
    
    //await worker.terminate();
}

main();er.recognize(nameFile)