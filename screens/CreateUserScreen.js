import React, {useState} from "react";
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import { TextInputMask} from "react-native-masked-text";
import firebase from "../database/firebase";

const CreateUserScreen = (props) =>{

    const initialState={
        nombre: '',
        fechaNacimiento: '',
        estatura: '',
        direccion: '',
    };

    const [state, setState] = useState(initialState);

    const handleChangeText= (nombre, value)=>{

        setState({...state, [nombre]: value});
    }

    const SaveUser= async () => {
        if (state.nombre===""){
            alert('Usted debe ingresar nombre');
        }else{
            //console.log(state)
           try {
            await firebase.db.collection('users').add({
                nombre: state.nombre,
                fechaNacimiento: state.fechaNacimiento,
                estatura: state.estatura,
                direccion: state.direccion
            });
            //alert('Guardado!')
            props.navigation.navigate('Lista de pacientes');
            //navigation.navigate('UsersList');
            //navigation.navigate('CreateUserScreen', { screen: 'UsersList' });

               
           } catch (error) {
               console.log(error);
           }
        }
    };


    return (

        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
            <TextInput placeholder="Nombre del paciente" 
            onChangeText={(value) => handleChangeText('nombre', value)}/>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Fecha de nacimiento"
                onChangeText={(value) => handleChangeText('fechaNacimiento', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Estatura"
                onChangeText={(value) => handleChangeText('estatura', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Dirección"
                onChangeText={(value) => handleChangeText('direccion', value)}/>
            </View>

            <View>
                <Button title="Guardar" onPress={()=>SaveUser()}/>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        padding: 35
    },

    inputGroup:{
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateUserScreen