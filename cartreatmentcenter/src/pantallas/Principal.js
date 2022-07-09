import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Alert } from 'react-native'
import CtcBoton from '../componentes/CtcBoton'
import CtcBotonDerecha from '../componentes/CtcBotonDerecha'
import CtcBotonIzquierda from '../componentes/CtcBotonIzquierda'
import { CrearTablaUsuario, CrearTablaVehiculo, CrearTablaTratamiento, CrearTablaInsumos, CrearTablaTratamientoInsumo, CrearTablaRepuestos, CrearTablaTratamientoRepuesto } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const Principal = ({ navigation }) => {
  useEffect(() => {
    CrearTablaUsuario();
    CrearTablaVehiculo();
    CrearTablaTratamiento();
    CrearTablaInsumos();
    CrearTablaTratamientoInsumo();
    CrearTablaRepuestos();
    CrearTablaTratamientoRepuesto();
  }, []);
  function borrarBaseDatos() {
    Alert.alert("Borrar Base de Datos", `Desea borrar la base de datos?`, [
      {
        text: "SI",
        onPress() {
          console.log('Borro la base de datos');
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS usuarios', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS vehiculos', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS tratamientos', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS insumos', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS tratamientoInsumos', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS repuestos', []);
          });
          db.transaction( (txn) => {
            txn.executeSql('DROP TABLE IF EXISTS tratamientoRepuestos', []);
          });
        },
      },
      {
        text: "No",
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo1.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <CtcBotonIzquierda
              style={styles.button}
              title="Usuarios"
              fontSize={25}
              customPress={() => navigation.navigate("Usuarios")}
            />
            <CtcBotonDerecha
              style={styles.button}
              title="Crear Tratamiento"
              fontSize={15}
              customPress={() => navigation.navigate("CrearTratamiento")}
            />
            <CtcBotonIzquierda
              style={styles.button}
              title="Tratamientos Activos"
              fontSize={15}
              customPress={() => navigation.navigate("ModificarTratamiento")}
            />
            <CtcBotonDerecha
              style={styles.button}
              title="Tratamientos Finalizados"
              fontSize={15}
              customPress={() => navigation.navigate("BuscarTratamiento")}
            />
            <CtcBoton 
              style={styles.button}
              title="Borrar BD"
              fontSize={20}
              customPress={() => borrarBaseDatos()}
            />
          </View>
        </View>
      </ImageBackground>
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
    width: 250, 
    height: 90,
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
})