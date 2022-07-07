import React from "react";
import { StyleSheet, TextInput, View, ImageBackground } from "react-native";

const CtcInputText = (props) => {
  return (
    <ImageBackground source={require("../imagenes/InputText.png")} resizeMode="stretch" style={styles.imageBack}>
    <View style={[styles.container, props.style]}>
          <TextInput
            underlineColorAndroid="transparent"
            maxLength={props.maxLength}
            minLength={props.minLength}
            onChangeText={props.onChangeText}
            editable={props.editable}
            placeholder={props.placeholder}
            placeholderTextColor="#848484"
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            returnKeyType={props.returnKeyType}
            numberOfLines={props.numberOfLines}
            autoFocus={props.autoFocus}
            ref={props.ref}
            multiline={props.multiline}
            onSubmitEditing={props.onSubmitEditing}
            style={[props.style, styles.text]}
            blurOnSubmit={false}
            value={props.value}
            defaultValue={props.defaultValue}
            autoCapitalize={props.autoCapitalize}
            autoCorrect={props.autoCorrect}
            nextInput={props.nextInput}
          />
        </View>
    </ImageBackground>
  )
}

export default CtcInputText

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        padding: 2,
        paddingLeft: 30,
      },
      text: {
        color: 'black',
      }
})
