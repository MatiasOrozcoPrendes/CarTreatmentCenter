import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import CtcBoton from '../componentes/CtcBoton'

const Principal = ({ navigation }) => {
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
                 customPress={() => navigation.navigate("Tratamientos")}
              />
              <CtcBoton 
                 style={styles.button}
                 title="Tratamientos Finalizados"
                 btnColor="#FF0000"
                 customPress={() => navigation.navigate("BuscarTratamiento")}
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