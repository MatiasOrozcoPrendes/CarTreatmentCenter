import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import { AñadirVehiculo, ModificarVehiculo, EliminarVehiculo } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const AgregarVehiculo = ( {navigation, route} ) => {
  const Recibo = route.params;
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serial, setSerial] = useState('');
  const [usuario, setUsuario] = useState('');
  const [agregarDisabled, setAgregarDisabled] = useState(true);
  const [modificarDisabled, setModificarDisabled] = useState(true);
  const [eliminarDisabled, setEliminarDisabled] = useState(true);
  const [matriculaEditable, setMatriculaEditable] = useState(false);
  
  useEffect(() => {
    let tipo = Recibo.matricula;
    if (tipo == undefined) {
      setAgregarDisabled(false);
      setMatriculaEditable(true);
      setUsuario(Recibo);
    } else {
      CargoVehiculo(Recibo);
      setModificarDisabled(false);
      setEliminarDisabled(false);

    }
  }, []);

  function CargoVehiculo(pVehiculo){
    setMatricula(pVehiculo.matricula);
    setMarca(pVehiculo.marca);
    setColor(pVehiculo.color);
    setSerial(pVehiculo.serial);
    setUsuario(pVehiculo.usuarioCI.toString())
    }
  function AltaVehiculo(){
    if (matricula == '' || marca == '' || color == '' || serial == '' || usuario == ''){
      Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    else{
      AñadirVehiculo(matricula, usuario.substring(0,8),  marca, color, serial);
      navigation.navigate('Usuarios');
    }
  }
  function ModVehiculo(){
    if (matricula == '' || marca == '' || color == '' || serial == '' || usuario == ''){
      Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    else{
      ModificarVehiculo(matricula, Number(usuario.substring(0,8)),  marca, color, serial);
      navigation.navigate('Usuarios');
    }
  }
  function ElimVehiculo(){
    if (matricula == '' ){
      Alert.alert('Error', 'No hay vehiculo seleccionado');
    }
    else{
      EliminarVehiculo(matricula);
      navigation.navigate('Usuarios');
    }
 }



  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <Text style={styles.texto}>{usuario}</Text>  
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Matricula</Text>
              <CtcInputText 
                style={styles.input}
                editable={matriculaEditable}
                value={matricula}
                placeholder="Matricula"
                onChangeText={(text) => setMatricula(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Marca</Text>
              <CtcInputText 
                style={styles.input}
                value={marca}
                placeholder="Marca"
                onChangeText={(text) => setMarca(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Color</Text>
              <CtcInputText 
                style={styles.input}
                value={color}
                placeholder="Color"
                onChangeText={(text) => setColor(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Serial</Text>
              <CtcInputText 
                style={styles.input}
                value={serial}
                placeholder="Serial"
                onChangeText={(text) => setSerial(text)}    
              />
            </View>
          </View>
          <View style={styles.unaLinea}>
            <CtcBoton 
              style={styles.button}
              disabled={agregarDisabled}
              title="Agregar"
              btnColor="#FF0000"
              customPress={() => AltaVehiculo()}
            />
            <CtcBoton 
              style={styles.button}
              disabled={modificarDisabled}
              title="Modificar"
              btnColor="#FF0000"
              customPress={() => ModVehiculo()}
            />
            <CtcBoton 
              style={styles.button}
              disabled={eliminarDisabled}
              title="Eliminar"
              btnColor="#FF0000"
              customPress={() => ElimVehiculo()}
            />
            
          </View>
          
        </View>
        
    </SafeAreaView>
  )
}

export default AgregarVehiculo

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})