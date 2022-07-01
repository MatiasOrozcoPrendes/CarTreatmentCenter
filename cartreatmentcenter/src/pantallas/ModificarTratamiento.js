import React from 'react'
import { useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert, Modal, FlatList } from 'react-native'
import CtcInputText from '../componentes/CtcInputText'
import CtcBoton from '../componentes/CtcBoton'
import CtcCartaRepuesto from '../componentes/CtcCartaRepuesto'
import CtcCartaInsumo from '../componentes/CtcCartaInsumo'
import CtcCartaTratamiento from '../componentes/CtcCartaTratamiento';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { ModTratamiento, EliminarTratamiento, AñadirTratamientoInsumo, EliminarTratamientoInsumo, AñadirTratamientoRepuesto, EliminarTratamientoRepuesto } from '../database/FuncionesABM'
import DatabaseConnection from '../database/database-connection';
const db = DatabaseConnection.getConnection();

const ModificarTratamiento = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [fechaInicioTratamiento, setFechaInicioTratamiento] = useState('');
  const [fechaFinalTratamiento, setFechaFinalTratamiento] = useState('');
  const [manoDeObra, setManoDeObra] = useState('');
  const [tratamientoID, setTratamientoID] = useState('');
  const [insumos, setInsumos] = useState([]);
  const [insumosFiltrados, setInsumosFiltrados] = useState([]);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState('');
  const [repuestos, setRepuestos] = useState([]);
  const [repuestosFiltrados, setRepuestosFiltrados] = useState([]);
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState('');
  const [cantidadInsumo, setCantidadInsumo] = useState('');
  const [cantidadRepuesto, setCantidadRepuesto] = useState('');
  const listarInsumos = (item) => {
    return (
      <View >
        <CtcCartaInsumo 
            style={styles.carta}
            texto={DoyNombreInsumo(item.insumoId)}
            btnColor="#A9BCF5"
            customPress={() => BajaInsumo(item)}
          />
      </View>
    );
  }
  const listarRepuestos = (item) => {
    return (
      <View >
        <CtcCartaRepuesto 
            style={styles.carta}
            texto={DoyNombreRepuesto(item.repuestoId)}
            btnColor="#A9BCF5"
            customPress={() => BajaRepuesto(item)}
          />
      </View>
    );
  }
  const listarTratamiento = (item) => {
    return (
      <View >
        <CtcCartaTratamiento 
            style={styles.carta}
            texto={item.matricula + " - " + item.tratamiento}
            btnColor="#A9BCF5"
            customPress={() => CargoTratamiento(item)}
          />
      </View>
    );
  }
  function CargoTratamiento(pTratamiento){
    setTratamiento(pTratamiento.tratamiento);
    setFechaInicioTratamiento(pTratamiento.fechaInicioTratamiento);
    setFechaFinalTratamiento(pTratamiento.fechaFinalTratamiento);
    setVehiculo(pTratamiento.matricula);
    setManoDeObra(pTratamiento.manoDeObra);
    setTratamientoID(pTratamiento.tratamientoID);
    setModalVisible(!modalVisible);
    traigoInsumosFiltrados(pTratamiento.tratamientoID);
    traigoRepuestosFiltrados(pTratamiento.tratamientoID);
  }
  function EliminoTratamiento(){
    if (tratamientoID === ''){
      Alert.alert("Error", "No se ha seleccionado ningun tratamiento");
    }
    EliminarTratamiento(tratamientoID);
    navigation.navigate('Inicio');
  } 
  function ActualizoTratamiento(){
    if ( tratamiento === '' || fechaInicioTratamiento === '' || fechaFinalTratamiento === '' || manoDeObra === '' || vehiculo === ''){
      Alert.alert('Error', 'Debe completar todos los campos');
    }
    else{
      ModTratamiento(tratamientoID, vehiculo, tratamiento, fechaInicioTratamiento, fechaFinalTratamiento, manoDeObra, 0);
      navigation.navigate('Inicio');
    }
  }
  function TerminoTratamiento(){
    if ( tratamiento === '' || fechaInicioTratamiento === '' || fechaFinalTratamiento === '' || manoDeObra === '' || vehiculo === ''){
      Alert.alert('Error', 'Debe completar todos los campos');
    }
    else{
      let fecha = new Date();
      let fechaString = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
      let costo = CalculoCosto();
      let costoTotal = parseInt(costo)+parseInt(manoDeObra);
      ModTratamiento(tratamientoID, vehiculo, tratamiento, fechaInicioTratamiento, fechaString, manoDeObra, costoTotal);
      navigation.navigate('Inicio');
    }   
  }
  function TraigoTratamientos(){
    let auxTratamientos = [];
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
                        tratamientoID: unTratamiento.tratamientoId
                    }
                    if (auxTratamiento.fechaFinalTratamiento == "-") {
                      auxTratamientos.push(auxTratamiento);
                      setTratamientos(auxTratamientos); 
                    }
                })
              }
            });
        });
  }
  function AltaInsumo(){
    if (insumoSeleccionado === ''){
      Alert.alert('Error', 'Debe seleccionar un insumo');
    }
    else{
      let arrayDeCadenas = insumoSeleccionado.split("-");
      let insumoID = arrayDeCadenas[0];
      AñadirTratamientoInsumo(tratamientoID, parseInt(insumoID), cantidadInsumo);
      setModal2Visible(!modal2Visible);
      setCantidadInsumo('');
      TraigoInsumo();
    }
  }
  function AltaRepuesto(){
    if (repuestoSeleccionado === ''){
      Alert.alert('Error', 'Debe seleccionar un repuesto');
    }
    else{
      let arrayDeCadenas = repuestoSeleccionado.split("-");
      let repuestoID = arrayDeCadenas[0];
      AñadirTratamientoRepuesto (tratamientoID, parseInt(repuestoID), cantidadRepuesto);
      setModal3Visible(!modal3Visible);
      setCantidadRepuesto('');
      TraigoRepuesto();
    }
  }
  function BajaInsumo(pInsumo){
    EliminarTratamientoInsumo(pInsumo.tratamientoInsumoId);
    traigoInsumosFiltrados();
  }
  function BajaRepuesto(pRepuesto){
    EliminarTratamientoRepuesto(pRepuesto.tratamientoRepuestoId);
    traigoRepuestosFiltrados();
  }
  function TraigoInsumo() {
    let auxInsumos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM insumos`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let insumo
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unInsumo) => {
                    insumo = unInsumo.insumoId+"- "+unInsumo.insumoNombre+"- $"+unInsumo.insumoPrecio;
                    auxInsumos.push(insumo);
                    setInsumos(auxInsumos);   
                })
              }
            });
        }); 
  }
  function TraigoRepuesto() {
    let auxRepuestos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM repuestos`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let repuesto
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unRepuesto) => {
                    repuesto = unRepuesto.repuestoId+"- "+unRepuesto.repuestoNombre+"- $"+unRepuesto.repuestoPrecio;
                    auxRepuestos.push(repuesto);
                    setRepuestos(auxRepuestos);
                })
              }
            });
        });
  }
  function DoyNombreInsumo(pInsumo){
    let auxInsumo
    insumos.map((unInsumo) => {
      let arrayDeCadenas = unInsumo.split("-");
      let insumoID = arrayDeCadenas[0];
      let NombrePrecio = arrayDeCadenas[1];
      let arrayDeCadenas2 = NombrePrecio.split(" ");
      let Nombre = arrayDeCadenas2[1];
      if (parseInt(insumoID) == parseInt(pInsumo)){
        auxInsumo = Nombre;
      }
    })
    return auxInsumo;
  }
  function DoyNombreRepuesto(pRepuesto){
    let auxRepuesto
    repuestos.map((unRepuesto) => {
      let arrayDeCadenas = unRepuesto.split("-");
      let repuestoID = arrayDeCadenas[0];
      let NombrePrecio = arrayDeCadenas[1];
      let arrayDeCadenas2 = NombrePrecio.split(" ");
      let Nombre = arrayDeCadenas2[1];
      if (parseInt(repuestoID) == parseInt(pRepuesto)){
        auxRepuesto = Nombre;
      }
    })
    return auxRepuesto;
  }
  function traigoInsumosFiltrados(pTratamientoID){
    let auxTratamientoInsumos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM tratamientoInsumos WHERE tratamientoId LIKE '%${pTratamientoID}%'`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let tratamientoInsumos
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unTratamientoInsumos) => {
                  tratamientoInsumos = {
                      tratamientoId: unTratamientoInsumos.tratamientoId,
                      insumoId: unTratamientoInsumos.insumoId,
                      cantidad: unTratamientoInsumos.cantidad,
                      tratamientoInsumoId: unTratamientoInsumos.tratamientoInsumoId
                    }
                    auxTratamientoInsumos.push(tratamientoInsumos);
                    setInsumosFiltrados(auxTratamientoInsumos);
                })
              }
            });
        });
  }
  function traigoRepuestosFiltrados(pTratamientoID){
    let auxTratamientoRepuestos = [];
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM tratamientoRepuestos WHERE tratamientoId LIKE '%${pTratamientoID}%'`, [], (tx, results) => {
              if (results.rows.length > 0) {
                let temp = [];
                let tratamientoRepuestos
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                temp.map((unTratamientoRepuestos) => {
                  tratamientoRepuestos = {
                      tratamientoId: unTratamientoRepuestos.tratamientoId,
                      repuestoId: unTratamientoRepuestos.repuestoId,
                      cantidad: unTratamientoRepuestos.cantidad,
                      tratamientoRepuestoId: unTratamientoRepuestos.tratamientoRepuestoId
                    }
                    auxTratamientoRepuestos.push(tratamientoRepuestos);
                    setRepuestosFiltrados(auxTratamientoRepuestos);
                })
              }
            });
        });
  }
  function CalculoCosto(){
    let auxCosto = 0;
    insumosFiltrados.map((unInsumoFiltrado) => {
      let Precio
      let Cantidad = parseInt(unInsumoFiltrado.cantidad);
      insumos.map((unInsumo) => {
        let arrayDeCadenas = unInsumo.split("-");
        let insumoID = arrayDeCadenas[0];
        if (parseInt(insumoID) == parseInt(unInsumoFiltrado.insumoId)){
          let arrayDeCadenas1 = unInsumo.split("$");
          Precio = parseInt(arrayDeCadenas1[1]);
        }
      })
      auxCosto = auxCosto + (Precio * Cantidad);
    })
    repuestosFiltrados.map((unRepuestoFiltrado) => {
      let Precio
      let Cantidad = parseInt(unRepuestoFiltrado.cantidad);
      repuestos.map((unRepuesto) => {
        let arrayDeCadenas = unRepuesto.split("-");
        let repuestoID = arrayDeCadenas[0];
        if (parseInt(repuestoID) == parseInt(unRepuestoFiltrado.repuestoId)){
          let arrayDeCadenas1 = unRepuesto.split("$");
          Precio = parseInt(arrayDeCadenas1[1]);
        }
      })
      auxCosto = auxCosto + (Precio * Cantidad);
    })
    return auxCosto;
  }

 useEffect(() => {
    TraigoTratamientos();
    TraigoInsumo();
    TraigoRepuesto();
  }, []);



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
                navigation.navigate("Inicio")
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={tratamientos}
                  renderItem={({ item }) => listarTratamiento(item)}
                />
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal2Visible}
              onRequestClose={() => {
                setModal2Visible(!modal2Visible);
              }}
            >
              <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={styles.unaLinea}>
              <Text style={styles.texto}>Insumo</Text>
              <SelectDropdown
                style={styles.selectDropdown}
                data={insumos}
                //defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem) => {
                  setInsumoSeleccionado(selectedItem);
                }}
                defaultButtonText={'Insumo'}
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
              <View style={styles.unaLinea}>
                <Text style={styles.texto}>Cantidad</Text>
                <CtcInputText 
                  style={styles.input}
                  placeholder="Cantidad"
                  onChangeText={(text) => setCantidadInsumo(text)}    
                />
              </View>
              <View style={styles.unaLinea}>
                <CtcBoton 
                  style={styles.button}
                  title="Cargar"
                  btnColor="#FF0000"
                  customPress={() => AltaInsumo()}
                />
                <CtcBoton 
                  style={styles.button}
                  title="Agregar Insumo"
                  btnColor="#FF0000"
                  customPress={() => navigation.navigate("Insumos")}
                />
              </View>
          </View>
        </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal3Visible}
              onRequestClose={() => {
                setModal3Visible(!modal3Visible);
              }}
            >
              <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={styles.unaLinea}>
              <Text style={styles.texto}>Repuesto</Text>
              <SelectDropdown
                style={styles.selectDropdown}
                data={repuestos}
                //defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem) => {
                  setRepuestoSeleccionado(selectedItem);
                }}
                defaultButtonText={'Repuesto'}
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
              <View style={styles.unaLinea}>
                <Text style={styles.texto}>Cantidad</Text>
                <CtcInputText 
                  style={styles.input}
                  placeholder="Cantidad"
                  onChangeText={(text) => setCantidadRepuesto(text)}    
                />
              </View>
              <View style={styles.unaLinea}>
                <CtcBoton 
                  style={styles.button}
                  title="Cargar"
                  btnColor="#FF0000"
                  customPress={() => AltaRepuesto()}
                />
                <CtcBoton 
                  style={styles.button}
                  title="Agregar Repuesto"
                  btnColor="#FF0000"
                  customPress={() => navigation.navigate("Repuestos")}
                />
              </View>
              </View>
              </View>
            </Modal>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Vehículo</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Vehiculo"
                editable={false}
                value={vehiculo}
                onChangeText={(text) => setVehiculo(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Tratamiento</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Tratamiento"
                value={tratamiento}
                onChangeText={(text) => setTratamiento(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Inicio</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Inicio"
                editable={false}
                value={fechaInicioTratamiento}
                onChangeText={(text) => setFechaInicioTratamiento(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Fecha Fin</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Fecha Fin"
                value={fechaFinalTratamiento}
                editable={false}
                onChangeText={(text) => setFechaFinalTratamiento(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <Text style={styles.texto}>Mano De Obra</Text>
              <CtcInputText 
                style={styles.input}
                placeholder="Mano De Obra"
                value={manoDeObra.toString()}
                onChangeText={(text) => setManoDeObra(text)}    
              />
            </View>
            <View style={styles.unaLinea}>
              <View>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={insumosFiltrados}
                  renderItem={({ item }) => listarInsumos(item)}
                />
                <CtcBoton 
                  style={styles.button2}
                  title="+ Ins"
                  btnColor="#FF0000"
                  customPress={() => setModal2Visible(!modal2Visible)}
                />
              </View>
              <View>
                <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={repuestosFiltrados}
                  renderItem={({ item }) => listarRepuestos(item)}
                />
                <CtcBoton 
                  style={styles.button2}
                  title="+ Rep"
                  btnColor="#FF0000"
                  customPress={() => setModal3Visible(!modal3Visible)}
                />
              </View>
            </View>
            
            <View style={styles.unaLinea}>
                <CtcBoton 
                  style={styles.button}
                  title="Modificar"
                  btnColor="#FF0000"
                  customPress={() => ActualizoTratamiento()}
                />
                <CtcBoton 
                  style={styles.button}
                  title="Terminar"
                  btnColor="#FF0000"
                  customPress={() => TerminoTratamiento()}
                />
                <CtcBoton 
                  style={styles.button}
                  title="Eliminar"
                  btnColor="#FF0000"
                  customPress={() => EliminoTratamiento()}
                />
            </View>
            
          </View>
        </View>
    </SafeAreaView>
  )
}


export default ModificarTratamiento

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
  button: {
    width: 100, 
    height: 50,
  },
  button2: {
    width: 90, 
    height: 50,
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