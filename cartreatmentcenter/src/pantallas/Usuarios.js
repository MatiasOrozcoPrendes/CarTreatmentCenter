import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import CtcBoton from '../componentes/CtcBoton'

const Usuarios = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <CtcBoton 
               style={styles.button}
               title="Crear Usuario"
               btnColor="#FF0000"
               customPress={() => navigation.navigate("CrearUsuarios")}
            />
            <CtcBoton 
               style={styles.button}
               title="Gestion"
               btnColor="#FF0000"
               customPress={() => navigation.navigate("GestionarUsuarios")}
            />
          </View>
    </View>
  </SafeAreaView>
  )
}

export default Usuarios

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