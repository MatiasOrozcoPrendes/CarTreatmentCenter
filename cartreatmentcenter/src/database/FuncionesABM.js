import { Alert } from 'react-native'
import { useState } from "react";
import DatabaseConnection from "./database-connection";
const db = DatabaseConnection.getConnection();

   export function CrearTablaUsuario(){
    db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS usuarios', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS usuarios(usuarioId INTEGER PRIMARY KEY AUTOINCREMENT, usuarioCI INTEGER UNIQUE, usuarioNombre VARCHAR(20), usuarioApellido VARCHAR(20))',
                []

              );
            }
          }
        );
      });
    }

    export function AñadirUsuario (UsuarioCI, UsuarioNombre, UsuarioApellido){
        debugger;
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO usuarios (usuarioCI, usuarioNombre, usuarioApellido) VALUES (?, ?, ?)`,
            [UsuarioCI, UsuarioNombre, UsuarioApellido],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Exito", "Usuario Creardo Correctamente",
                  [{text: "Ok",},],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al agregar el usuario");
              }
            }
          );
        });
    }
 
    export function ModificarUsuario(UsuarioNombre, UsuarioApellido, UsuarioCI){
        debugger;
        db.transaction((tx) => {
            tx.executeSql(
              "UPDATE usuarios SET usuarioNombre = ?, usuarioApellido = ? WHERE usuarioCI = ?",
              [UsuarioNombre, UsuarioApellido, UsuarioCI],
              (tx, results) => {
                Alert.alert("Usuario actualizado");
              }
            );
          });
    }

    export function EliminarUsuario(UsuarioCI){
        db.transaction((tx) => {
            tx.executeSql(
              `DELETE FROM usuarios WHERE usuarioCI = ?`,
              [UsuarioCI],
              (tx, results) => {
                // validar resultado
                if (results.rowsAffected > 0) {
                  Alert.alert("Usuario eliminado");
                } else {
                  Alert.alert("El usuario no existe");
                }
              }
            );
          });
    }

    export function CrearTablaVehiculo(){
        db.transaction( (txn) => {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='vehiculos'",
              [],
               (tx, res) =>{
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS vehiculos', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS vehiculos(vehiculoId INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(20) UNIQUE, usuarioCI INTEGER, marca VARCHAR(20), color VARCHAR(20), serial VARCHAR(50))',
                    []
                  );
                }
              }
            );
        });
    }

    export function AñadirVehiculo(Matricula, UsuarioCI,  Marca, Color, Serial){
        debugger;
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO vehiculos (matricula, usuarioCI, marca, color, serial) VALUES (?, ?, ?, ?, ?)`,
            [Matricula, UsuarioCI, Marca, Color, Serial],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert("Exito", "Vehiculo Creardo Correctamente",
                  [{text: "Ok",},],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al agregar el Vehiculo");
              }
            }
          );
        });
    }

    export function ModificarVehiculo(Matricula, UsuarioCI,  Marca, Color, Serial){
        debugger;
        db.transaction((tx) => {
            tx.executeSql(
              "UPDATE vehiculos SET usuarioCI = ?, marca = ?, color = ?, serial = ? WHERE matricula = ?",
              [UsuarioCI, Marca, Color, Serial, Matricula],
              (tx, results) => {
                Alert.alert("Vehiculo actualizado");
              }
            );
          });
    }

    export function EliminarVehiculo(Matricula){
        db.transaction((tx) => {
            tx.executeSql(
              `DELETE FROM vehiculos WHERE matricula = ?`,
              [Matricula],
              (tx, results) => {
                // validar resultado
                if (results.rowsAffected > 0) {
                  Alert.alert("Vehiculo eliminado");
                } else {
                  Alert.alert("El vehiculo no existe");
                }
              }
            );
          });
    }

    export function CrearTablaTratamiento(){
      db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientos'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS tratamientos', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS tratamientos(tratamientoId INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(20), tratamiento VARCHAR(100), fechaInicioTratamiento VARCHAR(20), fechaFinalTratamiento VARCHAR(20), manoDeObra INTEGER, costo INTEGER)',
                []

              );
            }
          }
        );
      });

    }

    export function AñadirTratamiento(Matricula, Tratamiento, FechaInicioTratamiento, FechaFinalTratamiento, ManoDeObra, Costo){
      debugger;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO tratamientos (matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES (?, ?, ?, ?, ?, ?)`,
          [Matricula, Tratamiento, FechaInicioTratamiento, FechaFinalTratamiento, ManoDeObra, Costo],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Tratamiento Creardo Correctamente",
                [{text: "Ok",},],
                { cancelable: false }
              );
            } else {
              Alert.alert("Error al agregar el tratamiento");
            }
          }
        );
      });
    }

    export function ModTratamiento(TratamientoID, Matricula, Tratamiento, FechaInicioTratamiento, FechaFinalTratamiento, ManoDeObra, Costo){
      debugger;
        db.transaction((tx) => {
            tx.executeSql(
              "UPDATE tratamientos SET matricula = ?, tratamiento = ?, fechaInicioTratamiento = ?, fechaFinalTratamiento = ?, manoDeObra = ?, costo = ? WHERE tratamientoId = ?",
              [Matricula, Tratamiento, FechaInicioTratamiento, FechaFinalTratamiento, ManoDeObra, Costo, TratamientoID],
              (tx, results) => {
                Alert.alert("Tratamiento actualizado");
              }
            );
          });  
    }

    export function EliminarTratamiento(TratamientoId){
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM tratamientos WHERE tratamientoId = ?`,
          [TratamientoId],
          (tx, results) => {
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Tratamiento eliminado");
            } else {
              Alert.alert("El tratamiento no existe");
            }
          }
        );
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