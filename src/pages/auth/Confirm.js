import { Auth } from 'aws-amplify';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Device } from '../../utils/Dimension';

export function ConfirmScreen({ route, navigation }) {

    const { username } = route.params;

    const [verifyCode, setVerifyCode] = React.useState('');

    React.useEffect(() => {
        console.log('route.params =====>', username)
    });

    confirm = () => {
        console.log('confirm =====>', username, verifyCode)

        Auth.confirmSignUp(username, verifyCode, { forceAliasCreation: true })
            .then(data => {
                console.log('confirmSignUp success =====>', data)
                navigation.navigate('Login');
            })
            .catch(err => {
                console.log('confirmSignUp failure =====>', err)
            });
    }

    resendEmail = () => {
        Auth.resendSignUp(username)
            .then(data => {
                console.log('resendSignUp success =====>', data)
            })
            .catch(err => {
                console.log('resendSignUp failure =====>', err)
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
                            placeholder="Verify Code"
                            style={styles.inputStyle}
                            value={verifyCode}
                            onChangeText={setVerifyCode}
                        />
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => confirm()}>
                            <Text style={styles.buttonLabelStyle}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => resendEmail()}>
                            <Text style={styles.buttonLabelStyle}>Resend Email</Text>
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