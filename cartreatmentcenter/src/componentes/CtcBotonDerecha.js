import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

const CtcBotonDerecha = (props) => {
    return (
        <ImageBackground source={require('../imagenes/BlancoDerecha.png')} resizeMode="cover">
            <TouchableOpacity 
            style={[styles.button, props.style]} 
            disabled={props.disabled}
            onPress={props.customPress}>
            <Text style={[styles.text, {fontSize: props.fontSize}]}>{props.title}</Text>
            </TouchableOpacity>
        </ImageBackground>
      )
}

export default CtcBotonDerecha

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2
      },
    },
    text: {
      fontWeight: 'bold',
      color: 'black',
      textShadowColor: '#fff',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
    },
})