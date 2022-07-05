import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

import Principal from "../pantallas/Principal";
import Usuarios from "../pantallas/Usuarios";
import CrearUsuarios from "../pantallas/CrearUsuarios";
import GestionarUsuarios from "../pantallas/GestionarUsuarios";
import AgregarVehiculo from "../pantallas/AgregarVehiculo";
import ModificarVehiculo from "../pantallas/ModificarVehiculo";
import CrearTratamiento from "../pantallas/CrearTratamiento";
import ModificarTratamiento from "../pantallas/ModificarTratamiento";
import BuscarTratamiento from "../pantallas/BuscarTratamiento";
import Tratamiento from "../pantallas/Tratamiento";
import Insumos from "../pantallas/Insumos";
import Repuestos from "../pantallas/Repuestos";


const RootStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Principal">
            <Stack.Screen
                name="Inicio"
                component={Principal}
                options={{
                title: "Car Treatment Center",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="Usuarios"
                component={Usuarios}
                
                options={{
                title: "Usuarios",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="CrearUsuarios"
                component={CrearUsuarios}
                options={{
                title: "Crear Usuarios",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="GestionarUsuarios"
                component={GestionarUsuarios}
                options={{
                title: "Gestionar",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="AgregarVehiculo"
                component={AgregarVehiculo}
                options={{
                title: "Vehículos",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="ModificarVehiculo"
                component={ModificarVehiculo}
                options={{
                title: "Modificar Vehiculo",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="CrearTratamiento"
                component={CrearTratamiento}
                options={{
                title: "Tratamiento",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="ModificarTratamiento"
                component={ModificarTratamiento}
                options={{
                title: "Tratamiento",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="BuscarTratamiento"
                component={BuscarTratamiento}
                options={{
                title: "Buscar Tratamiento",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="Tratamiento"
                component={Tratamiento}
                options={{
                title: "Tratamiento",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="Insumos"
                component={Insumos}
                options={{
                title: "Insumos",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            <Stack.Screen
                name="Repuestos"
                component={Repuestos}
                options={{
                title: "Repuestos",
                headerStyle: {
                    backgroundColor: "#F2F2F2"
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 15,
                }
            }}/>
            
        </Stack.Navigator>
    </NavigationContainer>

  );
}

export default RootStack
