import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, FlatList, Modal, ImageBackground  } from 'react-native'
import CtcCartaTratamiento from '../componentes/CtcCartaTratamiento';
import CtcEtiqueta from '../componentes/CtcEtiqueta'
import CtcBoton from '../componentes/CtcBoton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const BuscarTratamiento = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState([]);
  const [tratamiento, setTratamiento] = useState('');
  const [usuario, setUsuario] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculo, setVehiculo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  //Recorre el array de repuestos y lo muestra en la pantalla
  const listarTratamiento = (item) => {
    return (
      <View >
        <CtcCartaTratamiento 
          style={styles.carta}
          texto={item.fechaFinalTratamiento +" - "+ item.tratamiento}
          customPress={() => LlamoTratamiento(item)}
        />
      </View>
    );
  };
  //Llamo a la pantalla de tratamiento y le paso el tratamiento
  function LlamoTratamiento(item) {
    let Aux = item
    let random = Math.random();
    Aux.aux = random;
    navigation.navigate("Tratamiento", item);
  }
  //Carga un array con los usuarios
  function TraigoListaUsuarios() {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM usuarios`, [], (tx, results) => {
        if (results.rows.length > 0) {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i).usuarioCI + "- " + results.rows.item(i).usuarioNombre + " " + results.rows.item(i).usuarioApellido);
          setListaUsuarios(temp);
        } else {
          Alert.alert("Atención", "No hay usuarios registrados",
          [{text: "Ok",},],
          {cancelable: false},navigation.navigate("Inicio"));
        }
      });
    });
  }
  //Carga un array con los vehiculos del usuario
  function TraigoVehiculos() {
    if (usuario != '') {
      let auxVehiculos = [];
      let arrayDeCadenas = usuario.split("-");
      let ci = arrayDeCadenas[0];
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM vehiculos WHERE usuarioCI =${ci}`, [], (tx, results) => {
            if (results.rows.length > 0) {
              let temp = [];
              let vehiculo
              for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              temp.map((unVehiculo) => {
                vehiculo = unVehiculo.matricula + " " + unVehiculo.marca + " " + unVehiculo.color;
                  auxVehiculos.push(vehiculo);
                  setVehiculos(auxVehiculos);                        
              })
            }
          });
        });  
      setModalVisible(!modalVisible)
    } else {
      Alert.alert("Atención", "Seleccione un usuario");
    }

  }
  //Carga un array con todos los tratamientos terminados
  function CargoTratamientos() {
    if (vehiculo != '') {
      let arrayDeCadenas = vehiculo.split(" ");
      let matricula = arrayDeCadenas[0];
      let auxTratamientos = [];
      setTratamientos([]);
      db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM tratamientos`, [], (tx, results) => {
            if (results.rows.length > 0) {
              let temp = [];
              let auxTratamiento
              for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              temp.map((unTratamiento) => {
                auxTratamiento = {
                      matricula: unTratamiento.matricula,
                      tratamiento: unTratamiento.tratamiento,
                      fechaFinalTratamiento: unTratamiento.fechaFinalTratamiento,
                      fechaInicioTratamiento: unTratamiento.fechaInicioTratamiento,
                      manoDeObra: unTratamiento.manoDeObra,
                      tratamientoID: unTratamiento.tratamientoId,
                      costo: unTratamiento.costo
                  }
                  if (auxTratamiento.matricula == matricula) {
                    if (auxTratamiento.fechaFinalTratamiento !== "-") {
                      auxTratamientos.push(auxTratamiento);
                      setTratamientos(auxTratamientos); 
                    }
                  }
              })
            }
          });
      });
    } else {
      Alert.alert("Atención", "Seleccione un vehículo");
    }
  }
  //Llama a TraigoListaUsuarios cuando carge la pantalla
  useEffect(() => {
    TraigoListaUsuarios();
  }
  , []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/Fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
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
                customPress={() => TraigoVehiculos()}
              />
              </View>
            </View>
            </Modal>
            <View
              style={{
              marginTop: 10,
              marginBottom: 10,
              }}
            />
            <View style={styles.unaLinea}>
              <CtcEtiqueta texto="Vehiculo" style={styles.etiqueta}/>
              <SelectDropdown
                defaultButtonText={'Matricula'}
                data={vehiculos}
                onSelect={(selectedItem, index) => {
                  setVehiculo(selectedItem);  
                }}
                buttonStyle={styles.selectDropdown}
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
            <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
            <CtcBoton
              style={styles.button}
              title="Cargar"
              btnColor="#FF0000"
              customPress={() => CargoTratamientos()}
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
            <View style={[{justifyContent: 'center'}, {alignItems: 'center'} ]}>
              <Text style={styles.texto}>Tratamientos Terminados</Text>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={tratamientos}
                renderItem={({ item }) => listarTratamiento(item)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
export default BuscarTratamiento

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
    color: 'white',
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
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  selectDropdown: {
    width: 180,
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#444',
    fontSize: 18,
    backgroundColor: '#FFF',
    textAlign: 'center',
  },
  etiqueta: {
    width: 90,
  },
})