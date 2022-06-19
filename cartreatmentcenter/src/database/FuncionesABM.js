import { Alert } from 'react-native'
import DatabaseConnection from "./database-connection";
const db = DatabaseConnection.getConnection();

   export function CrearTablaUsuario(){
    console.log("Creando tabla usuario");
    db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'",
          [],
           (tx, res) =>{
            console.log('item:', res.rows.length);
            console.log("Antes del si"+res.rowsAffected);
            if (res.rows.length == 0) {
                console.log("Despues del si");
              txn.executeSql('DROP TABLE IF EXISTS usuarios', []);
              console.log("Despues de eliminar");
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS usuarios(usuarioId INTEGER PRIMARY KEY AUTOINCREMENT, usuarioCI INTEGER, usuarioNombre VARCHAR(20), usuarioApellido VARCHAR(20))',
                []
              );
              console.log("Despues de crear");
            }
          }
        );
      });
    }

    export function AñadirUsuario (UsuarioCI, UsuarioNombre, UsuarioApellido){
        console.log( "1")
        debugger;
        console.log("2")
        db.transaction((tx) => {
          console.log("3")
          tx.executeSql(
            `INSERT INTO usuarios (usuarioCI, usuarioNombre, usuarioApellido) VALUES (?, ?, ?)`,
            [UsuarioCI, UsuarioNombre, UsuarioApellido],
            //console.log( "4"),
            (tx, results) => {
              console.log("5")
              // validar resultado
              if (results.rowsAffected > 0) {
                console.log("6"),
                Alert.alert("Exito", "Usuario Creardo Cprrectamente",
                  [{text: "Ok",},],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al agregar el Pokemon");
              }
            }
          );
        });
    }
    export function CargarUsuarios(){
        console.log("1")
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
              if (results.rows.length > 0) {
                console.log("2")
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.forEach((unUsuario)=>{
                  console.log(unUsuario.usuarioCI, unUsuario.usuarioNombre, unUsuario.usuarioApellido);
                })
              }});
          });
    }

    export function ModificarUsuario(UsuarioNombre, UsuarioApellido, UsuarioCI){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO Usuarios SET UsuarioCI = ${UsuarioCI} UsuarioNombre = ${UsuarioNombre} UsuarioApellido = ${UsuarioApellido}
            WHERE UsuarioCI = ${UsuarioCI};`);
            return true;
        });
    }

    export function EliminarUsuario(UsuarioCI){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM Usuarios WHERE UsuarioCI = ${UsuarioCI};`);
            return true
        });
    }

    function CrearTablaVehiculo(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST Vehiculos(
                VehiculoId int identity(1,1) primary key,
                Matricula varchar(10) unique,
                Marca varchar(20),
                Color varchar(20),
                Serial varchar(50));`)
        })
    }

    export function AñadirVehiculo(Matricula, Marca, Color, Serial){
        CrearTablaVehiculo();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Vehiculos VALUES(${Matricula},${Marca},${Color},${Serial});`);
            Alert.alert(`Matricula:${Matricula} Marca:${Marca} Color:${Color}`);
            return true;
        });
    }

    export function ModificarVehiculo(Matricula, Marca, Color, Serial){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO Vehiculos SET Matricula = ${Matricula} Marca = ${Marca} Color = ${Color} Serial = ${Serial}
            WHERE Matricula = ${Matricula};`);
            return true;
        });
    }

    export function EliminarVehiculo(Matricula){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM Vehiculos WHERE Matricula = ${Matricula};`);
            return true;
        });
    }

    function CrearTablaTratamiento(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST Tratamientos(
                TratamientoId int identity(1,1) primary key,
                VehiculoId int references Vehiculos(VehiculoId),
                Tratamiento varchar(100),
                FechaInicioTratamiento varchar(20));`)
        })
    }

    export function AñadirTratamiento(VehiculoId, Tratamiento, FechaInicioTratamiento){
        CrearTablaTratamiento();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Tratamientos VALUES(${VehiculoId},${Tratamiento},${FechaInicioTratamiento});`);
            Alert.alert(`Vehiculo:${VehiculoId} Tratamiento:${Tratamiento}`);
            return true;
        });
    }

    export function ModificarTratamiento(TratamientoId, VehiculoId, Tratamiento, FechaInicioTratamiento){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO Tratamientos SET VehiculoId = ${VehiculoId} Tratamiento = ${Tratamiento} FechaInicioTratamiento = ${FechaInicioTratamiento}
            WHERE TratamientoId = ${TratamientoId};`);
            return true;
        });
    }

    export function EliminarTratamiento(TratamientoId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM Tratamientos WHERE TratamientoId = ${TratamientoId};`);
            return true
        });
    }

    function CrearTablaInsumos(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST Insumos(
                InsumoId int identity(1,1) primary key,
                InsumoNombre varchar(20),
                InsumoPrecio money);`)
        })
    }
    
    export function AñadirInsumo(InsumoNombre, InsumoPrecio){
        CrearTablaInsumos();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Insumos VALUES(${InsumoNombre},${InsumoPrecio});`);
            Alert.alert(`Nombre:${InsumoNombre} Precio$:${InsumoPrecio}`);
            return true;
        });
    }

    export function ModificarInsumo(InsumoId, InsumoNombre, InsumoPrecio){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO Insumos SET InsumoNombre = ${InsumoNombre} InsumoPrecio = ${InsumoPrecio}
            WHERE InsumoId = ${InsumoId};`);
            return true;
        });
    }

    export function EliminarInsumo(InsumoId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM Insumos WHERE InsumoId = ${InsumoId};`);
            return true
        });
    }

    function CrearTablaRepuestos(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST Repuestos(
                RepuestoId int identity(1,1) primary key,
                RepuestoNombre varchar(20),
                RepuestoPrecio money);`)
        })
    }
    
    export function AñadirRepuesto(RepuestoNombre, RepuestoPrecio){
        CrearTablaRepuestos();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Repuestos VALUES(${RepuestoNombre},${RepuestoPrecio});`);
            Alert.alert(`Nombre:${RepuestoNombre} Precio$:${RepuestoPrecio}`);
            return true;
        });
    }

    export function ModificarRepuesto(RepuestoId, RepuestoNombre, RepuestoPrecio){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO Repuestos SET InsumoNombre = ${RepuestoNombre} InsumoPrecio = ${RepuestoPrecio}
            WHERE RepuestoId = ${RepuestoId};`);
            return true;
        });
    }

    export function EliminarRepuesto(RepuestoId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM Repuestos WHERE RepuestoId = ${RepuestoId};`);
            return true
        });
    }

    function CrearTablaTratamientoFinalizado(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST TratamientosFinalizados(
                TratamientoFinalId int identity(1,1) primary key,
                TratamientoId int references Tratamientos(TratamientoId)
                FechaFinalTratamiento varchar(20),
                ManoDeObra money);`)
        })
    }

    export function AñadirTratamientoFinalizado(TratamientoId, FechaFinalTratamiento, ManoDeObra){
        CrearTablaTratamientoFinalizado();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO TratamientosFinalizados VALUES(${TratamientoId},${FechaFinalTratamiento},${ManoDeObra});`);
            Alert.alert(`Costo:${ManoDeObra}`);
            return true;
        });
    }

    export function ModificarTratamientoFinalizado(TratamientoFinalId, TratamientoId, FechaFinalTratamiento, ManoDeObra){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO TratamientosFinalizados SET TratamientoId = ${TratamientoId} FechaInicioTratamiento = ${FechaFinalTratamiento} ManoDeObra = ${ManoDeObra} 
            WHERE TratamientoId = ${TratamientoFinalId};`);
            return true;
        });
    }

    export function EliminarTratamientoFinalizado(TratamientoFinalId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM TratamientosFinalizados WHERE TratamientoFinalId = ${TratamientoFinalId};`);
            return true
        });
    }

    function CrearTablaTratamientoRepuesto(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST TratamientoRepuestos(
                TratamientoRepuestoId int identity(1,1) primary key,
                TratamientoId int references Tratamientos(TratamientoId),
                RepuestoId int references Repuestos(RepuestoId),
                Cantidad int));`)
        })
    }

    export function AñadirTratamientoRepuesto(TratamientoId, RepuestoId, Cantidad){
        CrearTablaTratamientoRepuesto();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO TratamientoRepuestos VALUES(${TratamientoId},${RepuestoId},${Cantidad});`);
            return true;
        });
    }

    export function ModificarTratamientoRepuesto(TratamientoRepuestoId, TratamientoId, RepuestoId, Cantidad){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO TratamientoRepuestos SET TratamientoId = ${TratamientoId} RepuestoId = ${RepuestoId} Cantidad = ${Cantidad}
            WHERE TratamientoRepuestoId = ${TratamientoRepuestoId};`);
            return true;
        });
    }

    export function EliminarTratamientoRepuesto(TratamientoRepuestoId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM TratamientoRepuestos WHERE TratamientoRepuestoId = ${TratamientoRepuestoId};`);
            return true
        });
    }

    function CrearTablaTratamientoInsumo(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST TratamientoInsumos(
                TratamientoInsumoId int identity(1,1) primary key,
                TratamientoId int references Tratamientos(TratamientoId),
                InsumoId int references Insumos(InsumoId),
                Cantidad int));`)
        })
    }

    export function AñadirTratamientoInsumo(TratamientoId, InsumoId, Cantidad){
        CrearTablaTratamientoInsumo();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO TratamientoInsumos VALUES(${TratamientoId},${InsumoId},${Cantidad});`);
            return true;
        });
    }

    export function ModificarTratamientoInsumo(TratamientoInsumoId, TratamientoId, InsumoId, Cantidad){
        db.transaction((tx) => {
            tx.executeSql(`UPDATE INTO TratamientoInsumos SET TratamientoId = ${TratamientoId} InsumoId = ${InsumoId} Cantidad = ${Cantidad}
            WHERE TratamientoInsumoId = ${TratamientoInsumoId};`);
            return true;
        });
    }

    export function EliminarTratamientoInsumo(TratamientoInsumoId){
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM TratamientoInsumos WHERE TratamientoInsumoId = ${TratamientoInsumoId};`);
            return true
        });
    }