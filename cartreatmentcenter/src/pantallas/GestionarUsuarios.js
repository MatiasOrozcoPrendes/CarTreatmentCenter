import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, Modal } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaVehiculo from '../componentes/CtcCartaVehiculo';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GestionarUsuarios = ({ navigation }) => {
  const [vehiculos, setVehiculos] = useState([ { matricula: "LAA-420", marca: "Volvo", color: "Rojo", serial: "25487", ciUsuario: "43620097"},
                                                { matricula: "LAA-421", marca: "Nissan", color: "Azul", serial: "78625", ciUsuario: "12345678"},
                                                { matricula: "LAA-422", marca: "Toyota", color: "Negro", serial: "98643", ciUsuario: "43620097"},
                                                { matricula: "LAA-423", marca: "Ford", color: "Amarillo", serial: "56871", ciUsuario: "87654321"},
                                                { matricula: "LAA-424", marca: "Chevrolet", color: "Verde", serial: "45963", ciUsuario: "45678912"},]);
  const [usuarios, setUsuarios] = useState([  { nombre: "Matias", apellido: "Orozco", ci: "43620097"},
                                              { nombre: "Melissa", apellido: "Larrosa", ci: "12345678" }, 
                                              { nombre: "Juan", apellido: "Perez", ci: "87654321"},
                                              { nombre: "Pedro", apellido: "Perez", ci: "45678912"},]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
                                             
  const listarVehiculos = (item) => {
    return (
      <View >
        <CtcCartaVehiculo 
            style={styles.carta}
            texto={item.matricula}
            btnColor="#A9BCF5"
            customPress={() => setVehiculo(item)}
          />
      </View>
    );
  };
  useEffect(() => {
    cargoSelector();
  }, []);
  function cargoSelector(){
    let lista = [];
    usuarios.map(item => {
      lista.push (`${item.ci} - ${item.nombre} ${item.apellido}`);
    })
    setListaUsuarios(lista);
  }
  function CargoUsuario(pUsuario){
    let auxCi = pUsuario.substring(0,8);
    usuarios.map(item => {
      if (item.ci == auxCi){
        setNombre(item.nombre);
        setApellido(item.apellido);
        setCi(item.ci);}
    });
    let auxVehiculos = [];
    vehiculos.map(item => {
      if (item.ciUsuario == auxCi){
        auxVehiculos.push(item);
      }
    });
    setListaVehiculos(auxVehiculos);
    setModalVisible(!modalVisible)
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
              // defaultValueByIndex={1}
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
        <View style={styles.unaLinea}>
          <Text style={styles.texto}>Nombre</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text)}    
          />
        </View>
        <View style={styles.unaLinea}>
          <Text style={styles.texto}>Apellido</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={(text) => setApellido(text)}    
          />
        </View>
        <View style={styles.unaLinea}>
          <Text style={styles.texto}>CI</Text>
          <CtcInputText 
            style={styles.input}
            placeholder="CI"
            value={ci}
            onChangeText={(text) => setCi(text)}    
          />
        </View>
        <View style={styles.unaLinea}>
          <CtcBoton 
            style={styles.button}
            title="Modificar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Nombre:${nombre} Apellido:${apellido} CI:${ci}`)}
          />
          <CtcBoton 
            style={styles.button}
            title="Eliminar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Elimino Nombre:${nombre} Apellido:${apellido} CI:${ci}`)}
          />
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={listaVehiculos}
          renderItem={({ item }) => listarVehiculos(item)}
        />
        <View style={styles.unaLinea}>
          <CtcBoton 
            style={styles.button}
            title="Agregar"
            btnColor="#FF0000"
            customPress={() => navigation.navigate("AgregarVehiculo")}
          />
          <CtcBoton 
            style={styles.button}
            title="Modificar"
            btnColor="#FF0000"
            customPress={() => navigation.navigate("ModificarVehiculo")}
          />
          <CtcBoton 
            style={styles.button}
            title="Eliminar"
            btnColor="#FF0000"
            customPress={() => Alert.alert(`Elimino:${vehiculo.matricula}`)}
          />
        </View>
      </View>
    </View>
</SafeAreaView>
  )
}

export default GestionarUsuarios

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