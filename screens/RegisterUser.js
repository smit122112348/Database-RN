import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View, Alert } from "react-native";
import {firebase} from "../src/config";

export default function RegisterUser({navigation})
{
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(username);
        console.log(password);
    }, []);

    registeruser = async (name, username, password) => 
    {
        await firebase.auth().createUserWithEmailAndPassword(username, password)
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://smitlist-d4821.firebaseapp.com', 
                    }).then(()=>{
                        Alert.alert("Verifictaion mail is sent.");
                    }).catch((error)=>{console.log("verifcation: ",error)})
                    .then(() => {
                        firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            name,
                            username
                        })
                    }).catch((error) => {console.log("Firestore Table: ",error)})
                })
        navigation.navigate("HomeScreen", {});
    }

    return (
        <SafeAreaView>
            <TextInput style={styles.inputs} placeholder="name" onChangeText={setName} value={name}/>
            <TextInput style={styles.inputs} placeholder="UserName" onChangeText={setUsername} value={username} autoCapitalize="none"/>
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} autoCapitalize="none"/>
            <Button title="Register user" onPress={() => registeruser(name, username, password)}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputs: {
        fontSize: 23,
        width: "65%",
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 15,
        borderColor: "black",
        borderWidth: 1
    }
});