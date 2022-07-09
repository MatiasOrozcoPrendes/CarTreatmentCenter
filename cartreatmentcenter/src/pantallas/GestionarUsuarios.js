import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, Modal, KeyboardAvoidingView, ImageBackground  } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaVehiculo from '../componentes/CtcCartaVehiculo';
import CtcEtiqueta from '../componentes/CtcEtiqueta'
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ModificarUsuario, EliminarUsuario } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const GestionarUsuarios = ({ navigation, route }) => {
  const recibo = route.params;
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
     
  //Rcorre el array de vehiculos y los nuestra en una lista
  const listarVehiculos = (item) => {
    return (
      <View >
        <CtcCartaVehiculo 
            style={styles.carta}
            texto={item.matricula}
            btnColor="#E6E0F8"
            customPress={() => navigation.navigate("AgregarVehiculo", item)}
          />
      </View>
    );
  };
  // Pregunta si se desea eliminar el usuario y llama a la funcion para eliminarlo
  function EliminoUsuario() {
    Alert.alert("Eliminar Usuario", `Nombre: ${nombre} Apellido: ${apellido} CI: ${ci}`, [
      {
        text: "SI", 
        onPress() {
          EliminarUsuario(ci), 
          navigation.navigate('Usuarios')
        },
      },
      {
        text: "No",
      },
    ]); 
  }
  // Recorta la cedula a 8 digitos lo utiliza para cargar los input y los vehiculos
  function CargoUsuario(pUsuario){
    let auxCi = pUsuario.substring(0,8);
    usuarios.map(item => {
      if (item.usuarioCI == auxCi){
        setNombre(item.usuarioNombre);
        setApellido(item.usuarioApellido);
        setCi(item.usuarioCI.toString());
        setModalVisible(!modalVisible);
      }
    });
    let auxVehiculos = [];
    vehiculos.map(item => {
      if (item.usuarioCI == auxCi){
        auxVehiculos.push(item);
      }
    });
    setListaVehiculos(auxVehiculos);
  }
  // Crea un array de teaxto con los datos de los usuarios
  function TraigoUsuariosLista(){
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i).usuarioCI + " - " + results.rows.item(i).usuarioNombre + " " + results.rows.item(i).usuarioApellido);
          setListaUsuarios(temp);
        } else {
          Alert.alert("Atención", "No hay usuarios registrados",
          [{text: "Ok",},],
          {cancelable: false},navigation.navigate("Usuarios"));
        }
     });
    });
  }
  //Crea un array con usuarios
  function TraigoUsuarios(){
    let usuarios = [];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          let usuario
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          temp.map((unUsuario) => {
              usuario = {
                  usuarioCI: unUsuario.usuarioCI,
                  usuarioNombre: unUsuario.usuarioNombre,
                  usuarioApellido: unUsuario.usuarioApellido
              }
              usuarios.push(usuario);
              setUsuarios(usuarios);                        
          })
        }
      });
    });
  }
  // Crea un array de vehiculos
  function TraigoVehiculos(){
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
  }
  // Pregunta se decea modificar el usuario y llama a la funcion para modificarlo
  function ModUsuario (ci, nombre, apellido){
    Alert.alert("Modificar Usuario", `Nombre: ${nombre} Apellido: ${apellido} CI: ${ci}`, [
      {
        text: "SI",
        onPress() {
          ModificarUsuario(ci, nombre, apellido);
        },
      },
      {
        text: "No",
      },
    ]);
  }

  useEffect(() => {
    TraigoUsuariosLista();
    TraigoUsuarios();
    TraigoVehiculos();    
  }, []);
  useEffect(() => {
    TraigoUsuariosLista();
    TraigoUsuarios();
    TraigoVehiculos();
    setModalVisible(true);    
  }, [recibo]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <KeyboardAvoidingView behavior="padding" enabled>
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
              <SelectDropdown
                  data={listaUsuarios}
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
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  search
                  searchPlaceHolder={'Buscar aqui...'}
                  searchPlaceHolderColor={'darkgrey'}
                  renderSearchInputLeftIcon={() => {
                    return <FontAwesome name={'search'} color={'#444'} size={18} />;
                  }}
                />
            <CtcBoton 
                style={styles.button}
                title="Cargar"
                customPress={() => CargoUsuario(usuario)}
              />
              </View>
            </View>
            </Modal>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Nombre" style={styles.etiqueta} />
              <CtcInputText 
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Apellido" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={(text) => setApellido(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="CI" style={styles.etiqueta}/>
              <CtcInputText 
                style={styles.input}
                editable={false}
                placeholder="CI"
                value={ci}
                onChangeText={(text) => setCi(text)}    
              />
            </View>
              <View
                style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 3,
                marginTop: 5,
                marginBottom: 5,
                }}
              />
            <View style={styles.unaLinea}>
              <CtcBoton 
                style={styles.button}
                title="Modificar"
                customPress={() => ModUsuario(nombre, apellido, ci)}
              />
              <CtcBoton 
                style={styles.button}
                title="Eliminar"
                customPress={() => EliminoUsuario()}
              />
            </View>
              <View
                style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 3,
                marginTop: 5,
                marginBottom: 5,
                }}
              />
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={listaVehiculos}
              renderItem={({ item }) => listarVehiculos(item)}
            />
            <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
              <CtcBoton 
                style={styles.button2}
                title="Agregar Vehículos"
                btnColor="#FF0000"
                customPress={() => navigation.navigate("AgregarVehiculo", usuario)}
              />
            </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
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
    height: 60,
  },
  button2: {
    width: 200, 
    height: 80,
  },
  carta:{
    width: 250, 
    height: 70,
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
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  etiqueta: {
    width: 100,
  },

})