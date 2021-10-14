import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Device } from '../../utils/Dimension';

export function LandingScreen({ navigation }) {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonLabelStyle}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonLabelStyle}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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