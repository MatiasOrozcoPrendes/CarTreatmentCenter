import React from 'react'
import { useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList } from 'react-native'
import CtcCartaTratamiento from '../componentes/CtcCartaTratamiento';

const Tratamientos = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState(["Tratamiento 1", "Tratamiento 2", "Tratamiento 3", "Tratamiento 4", "Tratamiento 5"]);
  const [tratamiento, setTratamiento] = useState('');
  const listarTratamiento = (item) => {
    return (
      <View >
        <CtcCartaTratamiento 
            style={styles.carta}
            texto={item}
            btnColor="#A9BCF5"
            customPress={() => navigation.navigate("ModificarTratamiento")}
          />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <Text style={styles.texto}>Tratamientos Abiertos</Text>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={tratamientos}
          renderItem={({ item }) => listarTratamiento(item)}
        />
      </View>
    </View>
</SafeAreaView>
  )
}

export default Tratamientos

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
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texto: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  input: {
    width: 200, 
    height: 40,
  },
  button: {
    width: 100, 
    height: 80,
  },
  carta:{
    width: 250, 
    height: 50,
  },
  listItemView: {
    margin: 5,
    alignItems: "center",
    elevation: 5,
    width: 300, 
  },
})