import { Alert } from 'react-native'
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
              txn.executeSql('INSERT INTO usuarios(usuarioCI, usuarioNombre, usuarioApellido) VALUES(?,?,?)',[43620097, 'Matías', 'Orozco']);
              txn.executeSql('INSERT INTO usuarios(usuarioCI, usuarioNombre, usuarioApellido) VALUES(?,?,?)',[12345678, 'Juan', 'Pérez']);
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
                  txn.executeSql('INSERT INTO vehiculos(matricula, usuarioCI, marca, color, serial) VALUES(?,?,?,?,?)',['LAA-420', 43620097, 'Changan', 'Bordó', 'Cx70-12345678']);
                  txn.executeSql('INSERT INTO vehiculos(matricula, usuarioCI, marca, color, serial) VALUES(?,?,?,?,?)',['LAA-390', 43620097, 'Honda', 'Roja', 'CRV-12345678']);
                  txn.executeSql('INSERT INTO vehiculos(matricula, usuarioCI, marca, color, serial) VALUES(?,?,?,?,?)',['LAA-410', 12345678, 'Chevrole', 'Azul', 'S10-12345678']);
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
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-420', 'Service Completo', '2021-9-27', '2021-9-29', 2500, 20008]);
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-420', 'Service Completo', '2022-3-18', '2022-3-20', 2500, 8461]);
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-420', 'Service Completo', '2022-7-8', '-', 0, 0]);
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-390', 'Service ', '2022-6-3', '2022-6-3', 1500, 20553]);
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-410', 'Service', '2022-2-24', '2022-2-25', 2000, 8224]);
              txn.executeSql('INSERT INTO tratamientos(matricula, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, costo) VALUES(?,?,?,?,?,?)',['LAA-410', 'Service', '2022-7-7', '-', 0, 0]);
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

    export function CrearTablaInsumos(){
      db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='insumos'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS insumos', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS insumos(insumoId INTEGER PRIMARY KEY AUTOINCREMENT, insumoNombre VARCHAR(20), insumoPrecio INTEGER)',
                []
              );
              txn.executeSql('INSERT INTO insumos(insumoNombre, insumoPrecio) VALUES(?,?)',['Aceite', 3300]);
              txn.executeSql('INSERT INTO insumos(insumoNombre, insumoPrecio) VALUES(?,?)',['Liquido de frenos', 263]);
              txn.executeSql('INSERT INTO insumos(insumoNombre, insumoPrecio) VALUES(?,?)',['Limpia Parabrisas ', 208]);
            }
          }
        );
      });
    }
    
    export function AñadirInsumo(InsumoNombre, InsumoPrecio){
      debugger;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO insumos (insumoNombre, insumoPrecio) VALUES (?, ?)`,
          [InsumoNombre, InsumoPrecio],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Insumo Creardo Correctamente",
                [{text: "Ok",},],
                { cancelable: false }
              );
            } else {
              Alert.alert("Error al agregar el insumo");
            }
          }
        );
      });  
    }

    export function ModificarInsumo(InsumoId, InsumoNombre, InsumoPrecio){
      debugger;
      db.transaction((tx) => {
          tx.executeSql(
            "UPDATE insumos SET insumoNombre = ?, insumoPrecio = ? WHERE insumoId = ?",
            [InsumoNombre, InsumoPrecio, InsumoId],
            (tx, results) => {
              Alert.alert("Insumos actualizado");
            }
          );
        });   
    }

    export function EliminarInsumo(InsumoId){
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM insumos WHERE insumoId = ?`,
          [InsumoId],
          (tx, results) => {
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Insumo eliminado");
            } else {
              Alert.alert("El insumo no existe");
            }
          }
        );
      });
    }

    export function CrearTablaRepuestos(){
      db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='repuestos'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS repuestos', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS repuestos(repuestoId INTEGER PRIMARY KEY AUTOINCREMENT, repuestoNombre VARCHAR(20), repuestoPrecio INTEGER)',
                []
              );
              txn.executeSql('INSERT INTO repuestos(repuestoNombre, repuestoPrecio) VALUES(?,?)',['Escobilla Limpia Parabrisa', 350]);
              txn.executeSql('INSERT INTO repuestos(repuestoNombre, repuestoPrecio) VALUES(?,?)',['Pasitllas Freno', 570]);
              txn.executeSql('INSERT INTO repuestos(repuestoNombre, repuestoPrecio) VALUES(?,?)',['Neumático', 3500]);
            }
          }
        );
      });
    }
    
    export function AñadirRepuesto(RepuestoNombre, RepuestoPrecio){
      debugger;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO repuestos (repuestoNombre, repuestoPrecio) VALUES (?, ?)`,
          [RepuestoNombre, RepuestoPrecio],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Repuesto Creardo Correctamente",
                [{text: "Ok",},],
                { cancelable: false }
              );
            } else {
              Alert.alert("Error al agregar el repuesto");
            }
          }
        );
      }); 
    }

    export function ModificarRepuesto(RepuestoId, RepuestoNombre, RepuestoPrecio){
      debugger;
      db.transaction((tx) => {
          tx.executeSql(
            "UPDATE repuestos SET repuestoNombre = ?, repuestoPrecio = ? WHERE repuestoId = ?",
            [RepuestoNombre, RepuestoPrecio, RepuestoId],
            (tx, results) => {
              Alert.alert("Repuestos actualizado");
            }
          );
        });   
    }

    export function EliminarRepuesto(RepuestoId){
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM repuestos WHERE repuestoId = ?`,
          [RepuestoId],
          (tx, results) => {
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Repuesto eliminado");
            } else {
              Alert.alert("El repuesto no existe");
            }
          }
        );
      });
    }

    export function CrearTablaTratamientoRepuesto(){
      db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientoRepuestos'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS tratamientoRepuestos', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS tratamientoRepuestos(tratamientoRepuestoId INTEGER PRIMARY KEY AUTOINCREMENT, tratamientoId INTEGER, repuestoId INTEGER, cantidad INTEGER)',
                []
              );
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[1,3,4]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[2,1,3]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[2,2,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[3,1,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[3,3,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[4,1,1]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[4,2,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[4,3,4]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[5,1,3]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[5,2,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[6,1,3]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[6,2,2]);
              txn.executeSql('INSERT INTO tratamientoRepuestos(tratamientoId, repuestoId, cantidad) VALUES(?,?,?)',[6,3,2]);
            }
          }
        );
      });
    }

    export function AñadirTratamientoRepuesto(TratamientoId, RepuestoId, Cantidad){
      debugger;
      let Reotrno = false
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO tratamientoRepuestos (tratamientoId, repuestoId, cantidad) VALUES (?, ?, ?)`,
          [TratamientoId, RepuestoId, Cantidad],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Reotrno = true;
              Alert.alert("Exito", "Repuesto Agregado Correctamente",
                [{text: "Ok",},],
                { cancelable: false }
              );
              return Reotrno;
            } else {
              Alert.alert("Error al agregar el repuesto");
            }
          }
        );
      });  
      return Reotrno;
    }

    export function ModificarTratamientoRepuesto(TratamientoRepuestoId, TratamientoId, RepuestoId, Cantidad){
      debugger;
      db.transaction((tx) => {
          tx.executeSql(
            "UPDATE tratamientoRepuestos SET tratamientoId = ?, repuestoId = ?, cantidad = ? WHERE tratamientoRepuestoId = ?",
            [TratamientoId, RepuestoId, Cantidad, TratamientoRepuestoId],
            (tx, results) => {
              Alert.alert("Repuesto actualizado");
            }
          );
        });   
    }

    export function EliminarTratamientoRepuesto(TratamientoRepuestoId){
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM tratamientoRepuestos WHERE tratamientoRepuestoId = ? `,
          [TratamientoRepuestoId],
          (tx, results) => {
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Repuesto eliminado");
            } else {
              Alert.alert("El repuesto no existe");
            }
          }
        );
      });  
      db.transaction((tx) => {
            tx.executeSql(`DELETE FROM TratamientoRepuestos WHERE TratamientoRepuestoId = ${TratamientoRepuestoId};`);
            return true
        });
    }

    export function CrearTablaTratamientoInsumo(){
      db.transaction( (txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientoInsumos'",
          [],
           (tx, res) =>{
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS tratamientoInsumos', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS tratamientoInsumos(tratamientoInsumoId INTEGER PRIMARY KEY AUTOINCREMENT, tratamientoId INTEGER, insumoId INTEGER, cantidad INTEGER)',
                []

              );
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[1,1,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[1,3,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[2,1,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[2,2,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[2,3,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[3,2,2]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[3,3,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[4,1,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[4,2,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[5,1,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[5,2,2]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[5,3,1]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[6,1,20]);
              txn.executeSql('INSERT INTO tratamientoInsumos(tratamientoId, insumoId, cantidad) VALUES(?,?,?)',[6,3,1]);
            }
          }
        );
      });
    }

    export function AñadirTratamientoInsumo(TratamientoId, InsumoId, Cantidad){
      debugger;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO tratamientoInsumos (tratamientoId, insumoId, cantidad) VALUES (?, ?, ?)`,
          [TratamientoId, InsumoId, Cantidad],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              Alert.alert("Exito", "Insumo Agregado Correctamente",
                [{text: "Ok",},],
                { cancelable: false }
              );
            } else {
              Alert.alert("Error al agregar el Insumo");
            }
          }
        );
      });  
    }

    export function ModificarTratamientoInsumo(TratamientoInsumoId, TratamientoId, InsumoId, Cantidad){
      debugger;
      db.transaction((tx) => {
          tx.executeSql(
            "UPDATE tratamientoInsumos SET tratamientoId = ?, insumoId = ?, cantidad = ? WHERE tratamientoInsumoId = ?",
            [TratamientoId, InsumoId, Cantidad, TratamientoInsumoId],
            (tx, results) => {
              Alert.alert("Insumos actualizado");
            }
          );
        });   
    }

    export function EliminarTratamientoInsumo(TratamientoInsumoId){
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM tratamientoInsumos WHERE tratamientoInsumoId = ? `,
          [TratamientoInsumoId],
          (tx, results) => {
            // validar resultado
            if (results.rowsAffected > 0) {
              Alert.alert("Insumo eliminado");
            } else {
              Alert.alert("El insumo no existe");
            }
          }
        );
      });
    }