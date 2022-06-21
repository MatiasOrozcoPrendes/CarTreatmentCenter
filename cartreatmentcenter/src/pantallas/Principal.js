import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import CtcBoton from '../componentes/CtcBoton'
import { CrearTablaUsuario, CrearTablaVehiculo, CrearTablaTratamiento } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Principal = ({ navigation }) => {
  useEffect(() => {
    CrearTablaUsuario();
    CrearTablaVehiculo();
    CrearTablaTratamiento();
  }, []);
  function borrarBaseDatos() {
    // console.log('Borro la base de datos');
    // db.transaction( (txn) => {
    //   txn.executeSql('DROP TABLE IF EXISTS usuarios', []);
    // });
    // db.transaction( (txn) => {
    //   txn.executeSql('DROP TABLE IF EXISTS vehiculos', []);
    // });
    db.transaction( (txn) => {
      txn.executeSql('DROP TABLE IF EXISTS tratamientos', []);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
            <View style={styles.generalView}>
              <CtcBoton 
                 style={styles.button}
                 title="Usuarios"
                 btnColor="#FF0000"
                 customPress={() => navigation.navigate("Usuarios")}
              />
              <CtcBoton 
                 style={styles.button}
                 title="Crear Tratamiento"
                 btnColor="#FF0000"
                 customPress={() => navigation.navigate("CrearTratamiento")}
              />
              <CtcBoton 
                 style={styles.button}
                 title="Tratamientos Activos"
                 btnColor="#FF0000"
                 customPress={() => navigation.navigate("ModificarTratamiento")}
              />
              <CtcBoton 
                 style={styles.button}
                 title="Tratamientos Finalizados"
                 btnColor="#FF0000"
                 customPress={() => navigation.navigate("BuscarTratamiento")}
              />
              <CtcBoton 
                 style={styles.button}
                 title="Borrar Base de Datos"
                 btnColor="#FF0000"
                 customPress={() => borrarBaseDatos()}
              />
             
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Principal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  generalView: {
    flex: 1,
  },
  button: {
    width: 200, 
    height: 80,
  },
})