import React, { useEffect, useState } from "react";
import { Text, Divider } from 'react-native-elements';
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    fechaNacimiento: "",
    estatura: "",
    direccion:"",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Lista de pacientes");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      nombre: user.nombre,
      fechaNacimiento: user.fechaNacimiento,
      estatura: user.estatura,
      direccion: user.direccion,
    });
    setUser(initialState);
    props.navigation.navigate("Lista de pacientes");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
        <View>
      <Text h9>Id:{user.id}</Text>
      <br></br>
      </View>
      
      <View>
      <Text h9>Nombre del paciente:</Text>

        <TextInput
          placeholder="Nombre"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
      <Text h9>Fecha de nacimiento:</Text>

        <TextInput
          autoCompleteType="fechaNacimiento"
          placeholder="Fecha de nacimiento"
          style={styles.inputGroup}
          value={user.fechaNacimiento}
          onChangeText={(value) => handleTextChange(value, "")}
        />
      </View>
      <View>
      <Text h9>Estatura (cm):</Text>

        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.estatura}
          onChangeText={(value) => handleTextChange(value, "estatura")}
        />
      </View>
      <View>
      <Text h9>Dirección:</Text>

        <TextInput
          placeholder="Direccion del paciente"
          autoCompleteType="av"
          style={styles.inputGroup}
          value={user.direccion}
          onChangeText={(value) => handleTextChange(value, "direccion")}
        />
      </View>

      <br></br>

      <View style={styles.btn}>
        <Button
          title="Borrar"
          onPress={() => deleteUser()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => updateUser()} color="#19AC52" />

      </View>

      <br></br>

      
      <View>
      <Text style={styles.title} h4 >Controles</Text>

      </View>
      <br></br>

      <View>
      <Button
        key={user.id}
        onPress={() => {
            props.navigation.navigate("Crear nuevo control", {
              userId: user.id,
            });
          }}
        title="Agregar control"
      />
      </View>

      <br></br>

    </ScrollView>
    
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;