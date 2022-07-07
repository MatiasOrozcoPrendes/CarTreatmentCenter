import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

const CtcCartaRepuesto = (props) => {
  return (
    <ImageBackground source={require('../imagenes/Metal.png')} resizeMode="stretch">
      <TouchableOpacity style={[styles.button, props.style]} onPress={props.customPress}>
          <View style={styles.view}>
              <Text style={styles.text}>{props.texto}</Text>
          </View>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default CtcCartaRepuesto

const styles = StyleSheet.create({
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    textShadowColor: '#D8D8D8',
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
})