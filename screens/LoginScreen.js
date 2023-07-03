import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { firebase } from "../src/config";

export default function LoginScreen({navigation})
{
    const [initializing, setInitializing] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    function onAuthStateChanged(user)
    {
        setUser(user)
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    });

    if(initializing) return null;

    if(user)
    {
        navigation.navigate("HomeScreen", {});
        return null;
    }

    loginUser = async (username, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(username, password);
        }catch(error){
            console.log("Authentiation failed: ", error);
        }
        console.log(username);
        console.log(password);
    }

    function registerButtonHandler()
    {
        navigation.navigate("RegisterScreen", {});
    }

    return (
        <SafeAreaView>
            <TextInput style={styles.inputs} placeholder="Username" onChangeText={setUsername} value={username} autoCapitalize="none"/>
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password} secureTextEntry={true}/>
            <Button title="Login" onPress={() => loginUser(username, password)}/>
            <Button title="Register User" onPress={registerButtonHandler}/>
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