import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const CtcInputText = (props) => {
  return (
    <View style={[styles.container, props.style]}>
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={props.maxLength}
            minLength={props.minLength}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor="#F4FA58"
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}
            multiline={props.multiline}
            onSubmitEditing={props.onSubmitEditing}
            style={[props.style, styles.text]}
            blurOnSubmit={false}
            value={props.value}
            defaultValue={props.defaultValue}
            autoCapitalize={props.autoCapitalize}
          />
        </View>
  )
}

export default CtcInputText

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderColor: "#d3d3d3",
        borderWidth: 3,
        padding: 2,
        backgroundColor: "#819FF7"
      },
      text: {
        color: 'black',
      }
})
