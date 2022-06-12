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
                    backgroundColor: "#B40404"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'yellow',
                    textShadowColor: 'blue',
                    textShadowOffset: { width: 5, height: 5 },
                    textShadowRadius: 5,
                    fontSize: 25,
                }
            }}/>
            <Stack.Screen
                name="Usuarios"
                component={Usuarios}
                options={{
                title: "Usuarios",
                headerStyle: {
                    backgroundColor: "#23BAC4"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 25,
                }
            }}/>
            <Stack.Screen
                name="CrearUsuarios"
                component={CrearUsuarios}
                options={{
                title: "Crear Usuarios",
                headerStyle: {
                    backgroundColor: "#23BAC4"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 25,
                }
            }}/>
            <Stack.Screen
                name="GestionarUsuarios"
                component={GestionarUsuarios}
                options={{
                title: "Gestionar",
                headerStyle: {
                    backgroundColor: "#23BAC4"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 25,
                }
            }}/>
            <Stack.Screen
                name="AgregarVehiculo"
                component={AgregarVehiculo}
                options={{
                title: "Agregar Vehiculo",
                headerStyle: {
                    backgroundColor: "#23BAC4"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 25,
                }
            }}/>
            <Stack.Screen
                name="ModificarVehiculo"
                component={ModificarVehiculo}
                options={{
                title: "Modificar Vehiculo",
                headerStyle: {
                    backgroundColor: "#23BAC4"
                },
                headerTintColor: "#FFFF00",
                headerTitleStyle: {
                    color: 'black',
                    fontSize: 25,
                }
            }}/>
        </Stack.Navigator>
    </NavigationContainer>

  );
}

export default RootStack
