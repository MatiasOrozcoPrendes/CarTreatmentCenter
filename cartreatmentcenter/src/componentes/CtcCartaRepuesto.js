import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CtcCartaRepuesto = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props.style, {backgroundColor: props.btnColor}]} onPress={props.customPress}>
        <View style={styles.view}>
            <Text style={styles.text}>{props.texto}</Text>
        </View>
    </TouchableOpacity>
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
        color: 'yellow',
        textShadowColor: 'blue',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
      },
})