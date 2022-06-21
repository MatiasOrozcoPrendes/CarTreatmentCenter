import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaVehiculo from '../componentes/CtcCartaVehiculo';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AñadirVehiculo, ModificarVehiculo, EliminarVehiculo } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const AgregarVehiculo = ( {navigation}) => {
  const [matricula, setMatricula] = useState('');
  const [matriculaEditable, setMatriculaEditable] = useState(true);
  const [agregarDisabled, setAgregarDisabled] = useState(false);
  const [modificarDisabled, setModificarDisabled] = useState(true);
  const [eliminarDisabled, setEliminarDisabled] = useState(true);
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serial, setSerial] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
  
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i).usuarioCI + " - " + results.rows.item(i).usuarioNombre + " " + results.rows.item(i).usuarioApellido);
          setListaUsuarios(temp);
        }
      });
    });
    let vehiculos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM vehiculos`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let vehiculo
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unVehiculo) => {
                    vehiculo = {
                        matricula: unVehiculo.matricula,
                        marca: unVehiculo.marca,
                        color: unVehiculo.color,
                        serial: unVehiculo.serial,
                        usuarioCI: unVehiculo.usuarioCI
                    }
                    vehiculos.push(vehiculo);
                    setVehiculos(vehiculos);                        
                })
              }
            });
        });
  }, []);
  const listarVehiculos = (item) => {
    return (
      <View >
        <CtcCartaVehiculo 
            style={styles.carta}
            texto={item.matricula}
            btnColor="#A9BCF5"
            customPress={() => CargoVehiculo(item)}
          />
      </View>
    );
  };
  function CargoUsuario(pUsuario){
    let auxCi = pUsuario.substring(0,8);
    setUsuario(pUsuario);
    let auxVehiculos = [];
    vehiculos.map(item => {
      if (item.usuarioCI == auxCi){
        auxVehiculos.push(item);
      }
    });
    setListaVehiculos(auxVehiculos);
    setModalVisible(false);
  }
  function CargoVehiculo(pVehiculo){
    setMatriculaEditable(false);
    setMatricula(pVehiculo.matricula);
    setMarca(pVehiculo.marca);
    setColor(pVehiculo.color);
    setSerial(pVehiculo.serial);
    setAgregarDisabled(true);
    setModificarDisabled(false);
    setEliminarDisabled(false);
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              navigation.navigate('Usuarios');
              setModalVisible(!modalVisible);
            }}
          >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.unaLinea}>
            <Text style={styles.texto}>Usuario</Text>
            <SelectDropdown
              style={styles.selectDropdown}
              data={listaUsuarios}
              //defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem) => {
                setUsuario(selectedItem);
              }}
              defaultButtonText={'Usuario'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Buscar aqui...'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={'search'} color={'#444'} size={18} />;
              }}
            />
        </View>
        <CtcBoton 
            style={styles.button}
            title="Cargar"
            btnColor="#FF0000"
            customPress={() => CargoUsuario(usuario)}
          />
          </View>
        </View>
        </Modal>
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
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={listaVehiculos}
            renderItem={({ item }) => listarVehiculos(item)}
          />
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