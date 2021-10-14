import { Auth, Hub } from 'aws-amplify';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Device } from '../../utils/Dimension';

export function LoginScreen({ navigation }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = React.useState({})

    React.useEffect(() => { }, []);

    login = () => {
        Auth.signIn(username, password)
            .then(user => {
                console.log('signIn success =====>', user)
                navigation.navigate('Tabs')
            })
            .catch(err => {
                console.log('signIn failure =====>', err)
                if (err.code === 'UserNotConfirmedException') {
                    return;
                }
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={{ flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: 150 }}>
                        <TextInput
                            placeholder="Username"
                            style={styles.inputStyle}
                            value={username}
                            onChangeText={setUsername}
                            onSubmitEditing={() => { passwordTextInput.focus() }}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                        />
                        <TextInput
                            ref={(input) => { passwordTextInput = input }}
                            placeholder="Password"
                            style={styles.inputStyle}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => login()}>
                            <Text style={styles.buttonLabelStyle}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        width: Device.width * 0.8,
        height: 56,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 8
    },
    buttonStyle: {
        width: Device.width * 0.8,
        height: 56,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabelStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    }
});