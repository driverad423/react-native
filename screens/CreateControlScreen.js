import React, {useState, useEffect} from "react";
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import { TextInputMask} from "react-native-masked-text";
import firebase from "../database/firebase";

const CreateControlScreen = (props) =>{

    const initialState={
        id: "",
        peso: '',
        temperatura: '',
        presion: '',
        nivelSaturacion: '',
        idUser:'',
    };

   // const userId = props.navigation.params('userId');
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
       setUser({ ...user, id: doc.id });

      };
      const [state, setState] = useState(initialState);

      const [user, setUser] = useState(initialState);
      //const [loading, setLoading] = useState(true);
    
      const handleTextChange = (value2, prop) => {
        setState({ ...state, [prop]: value2 });

      };    

      const handleTextChange2 = (value, prop) => {
        setUser({ ...user, [prop]: value });
      };
    
    

    const SaveControl= async () => {
        if (state.peso===""){
            alert('Usted debe ingresar el peso');
        }else{
            //console.log(state)
           try {
            await firebase.db.collection('controls').add({
                peso: state.peso,
                temperatura: state.temperatura,
                presion: state.presion,
                nivelSaturacion: state.nivelSaturacion,
                idUser:user.idUser
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


    useEffect(() => {
        getUserById(props.route.params.userId);
      }, []);
    return (

        <ScrollView style={styles.container}>


            <View style={styles.inputGroup}>

            <TextInput placeholder="Peso(kg)" 
            onChangeText={(value) => handleChangeText2('peso', value)}/>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Temperatura(°C)"
                onChangeText={(value) => handleChangeText2('temperatura', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Presion"
                onChangeText={(value) => handleChangeText2('presion', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Nivel de saturación"
                onChangeText={(value) => handleChangeText2('nivelSaturacion', value)}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                value={user.id}
                onChangeText={(value) => handleChangeText('idUser', value)}/>
            </View>
            <View>
                <Button title="Guardar" onPress={()=>SaveControl()}/>
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

export default CreateControlScreen