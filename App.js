import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';


const Stack= createStackNavigator()

import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import UsersList from './screens/UsersList';
import CreateControlScreen from './screens/CreateControlScreen';

function MyStack(){
  return (

    <Stack.Navigator>
      <Stack.Screen name="Lista de pacientes" component={UsersList} />
      <Stack.Screen name="Crear paciente" component={CreateUserScreen} />
      <Stack.Screen name="Detalles del paciente" component={UserDetailScreen} />
      <Stack.Screen name="Crear nuevo control" component={CreateControlScreen}/>
    </Stack.Navigator>

  ); 
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
