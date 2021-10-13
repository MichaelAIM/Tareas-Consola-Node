const fs = require('fs');
const archivo = './bd/data.json';

const guardarBD = ( data ) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerBD = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo,{encoding:'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarBD,
    leerBD
}