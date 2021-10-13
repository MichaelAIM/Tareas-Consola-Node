require('colors');
const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){

        this.listadoArr.forEach((tarea,idx) => {
            const indice = `${idx+1}`.green;
            const {desc,completadoEn} = tarea;
            const est = (completadoEn) ? "Completada".green : "Pendiente".red;
            const element = `${indice}.  ${desc} :: ${est}`;
            console.log(element);
        });
    }

    listarPendientesCompletadas( completadas = true){
        let indice = 0;
        this.listadoArr.forEach(tarea => {
            const {desc,completadoEn} = tarea;
            const est = (completadoEn) 
                ? "Completada".green 
                : "Pendiente".red;
            if (completadas) {
                if (completadoEn) {
                    indice += 1;
                    console.log(`${(indice + ".").green}  ${desc} :: ${completadoEn.green}`);
                }
            }else{
                if (!completadoEn) {
                    indice += 1;
                    console.log(`${(indice + ".").green}  ${desc} :: ${est}`);
                }
            }
        });
    }

    toogleCompletadas(ids = []){
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;