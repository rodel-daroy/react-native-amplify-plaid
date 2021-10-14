import { Auth } from 'aws-amplify';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Device } from '../../utils/Dimension';

export function RegisterScreen({ navigation }) {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    register = () => {
        Auth.signUp({ username, password, attributes: { email } })
            .then(user => {
                console.log('signUp success =====>', user)
                navigation.navigate('Confirm', { username });
            })
            .catch(err => {
                console.log('signUp failure =====>', err)
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
                            onSubmitEditing={() => { emailTextInput.focus(); }}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                        />
                        <TextInput
                            ref={(input) => { emailTextInput = input; }}
                            placeholder="Email"
                            style={styles.inputStyle}
                            value={email}
                            onChangeText={setEmail}
                            onSubmitEditing={() => { passwordTextInput.focus(); }}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                        />
                        <TextInput
                            ref={(input) => { passwordTextInput = input; }}
                            placeholder="Password"
                            style={styles.inputStyle}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => register()}>
                            <Text style={styles.buttonLabelStyle}>Register</Text>
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