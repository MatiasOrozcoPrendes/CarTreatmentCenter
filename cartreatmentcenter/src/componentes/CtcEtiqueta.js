import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const CtcEtiqueta = (props) => {
  return (
    <ImageBackground source={require('../imagenes/Etiquetas.png')} resizeMode="cover" style={styles.imageBack}>
        <View style={[styles.button, props.style]}  >
        <Text style={styles.texto}>{props.texto}</Text>
        </View>
    </ImageBackground>
  )
}

export default CtcEtiqueta

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    texto: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        color: 'black',
    },


            
})