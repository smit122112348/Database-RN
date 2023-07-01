import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native";

export default function LoginScreen({navigation})
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(username);
        console.log(password);
    }, []);

    function loginButtonHandler()
    {
        navigation.navigate("HomeScreen", {});
        console.log(username);
        console.log(password);
        setPassword("");
        setUsername("");
    }

    return (
        <SafeAreaView>
            <TextInput style={styles.inputs} placeholder="Username" onChangeText={setUsername} value={username}/>
            <TextInput style={styles.inputs} onChangeText={setPassword} value={password}/>
            <Button title="Login" onPress={loginButtonHandler}/>
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