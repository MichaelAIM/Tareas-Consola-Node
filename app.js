require ("colors");

const { guardarBD, leerBD } = require("./helpers/guardarArchivo");
//const { mostrarMenu, pausa } = require("./helpers/mensajes");
const { 
    inquirerMenu, 
    pausa, 
    leerMensaje,
    listadoTareasBorrar,
    Confirmar,
    mostrarListadoChecklist
} = require("./helpers/inquirer");

const Tareas = require('./models/tareas');

console.clear();
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasBD = leerBD();
    if (tareasBD) {
        tareas.cargarTareasFromArray(tareasBD);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerMensaje('Descripcion:'); 
                tareas.crearTarea(desc);
                // console.log(desc);
                break;
            case '2':
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;            
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await Confirmar('¿ Esta seguro ?');
                    if ( ok ) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }
                break;
        }
        await pausa();

        guardarBD(tareas.listadoArr);

    } while ( opt !== '0' );
}

main();