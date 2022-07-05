import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ImageBackground  } from 'react-native'
import CtcBoton from '../componentes/CtcBoton'
import CtcBotonDerecha from '../componentes/CtcBotonDerecha'
import CtcBotonIzquierda from '../componentes/CtcBotonIzquierda'

const Usuarios = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <CtcBotonIzquierda
               style={styles.button}
               title="Crear Usuario"
                fontSize={25}
               customPress={() => navigation.navigate("CrearUsuarios")}
            />
            <CtcBotonDerecha 
               style={styles.button}
               title="Gestion"
               fontSize={25}
               customPress={() => navigation.navigate("GestionarUsuarios", "Usuarios")}
            />
          </View>
        </View>
      </ImageBackground>

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
    width: 220, 
    height: 80,
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
})