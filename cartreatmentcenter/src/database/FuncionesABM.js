import { Alert } from 'react-native'
import DatabaseConnection from "./database-connection";
const db = DatabaseConnection.getConnection();


    function CrearTablaUsuario(){
        db.transaction((tx) =>{
            tx.executeSql(`CREATE TABLE IF NOT EXIST Usuarios(
                UsuarioId int identity(1,1) primary key,
                UsuarioCI int unique,
                UsuarioNombre varchar(20),
                UsuarioApellido varchar(20));`)
        })
    }

    export function AñadirUsuario(UsuarioNombre, UsuarioApellido, UsuarioCI){
        CrearTablaUsuario();
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Usuarios VALUES(${UsuarioCI},${UsuarioNombre},${UsuarioApellido});`);
            Alert.alert(`Nombre:${nombre} Apellido:${apellido} CI:${ci}`);
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