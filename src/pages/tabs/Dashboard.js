import { DataStore } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Account } from '../../../models/index';
import { Device } from '../../utils/Dimension';
import { Variable } from '../../utils/Variable';

export default function DashboardScreen({ navigation }) {

    const [account6000, setAccount6000] = React.useState(0);
    const [account10000, setAccount10000] = React.useState(0);
    const [account16000, setAccount16000] = React.useState(0);
    const [account2000, setAccount2000] = React.useState(0);

    React.useEffect(() => {
        this.getSavedTransactions()
    }, []);

    getSavedTransactions = async () => {
        const data = await DataStore.query(Account)
        console.log('dashboard =====>', data.length, data)
        Variable.accounts = data
        this.sortAccounts()
    }

    sortAccounts = () => {
        let count6000 = count10000 = count16000 = count2000 = 0
        for (let account of Variable.accounts) {
            if (account.balances.current >= 6000) {
                count6000++;
            }
            if (account.balances.current >= 10000) {
                count10000++;
            }
            if (account.balances.current >= 2000) {
                count2000++
            }
            if (account.balances.current >= 16000) {
                count16000++;
            }
        }
        setAccount16000(count16000)
        setAccount10000(count10000)
        setAccount6000(count6000)
        setAccount2000(count2000)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ height: 84, backgroundColor: '#707070', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ height: 56, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 8, fontSize: 24, color: '#ffffff' }}>Dashboard</Text>
                    <View style={{ alignItems: 'center', margin: 8, }}>
                        <Text style={{ fontSize: 12, color: '#ffffff' }}>{Variable.accounts.length} Accounts</Text>
                        <Text style={{ fontSize: 12, color: '#ffffff' }}>Linked</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account16000}</Text>
                        <Text style={styles.greenText}>$16000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account10000}</Text>
                        <Text style={styles.redText}>$10000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account6000}</Text>
                        <Text style={styles.greenText}>$6000</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account2000}</Text>
                        <Text style={styles.redText}>$2000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account10000}</Text>
                        <Text style={styles.redText}>$10000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account6000}</Text>
                        <Text style={styles.greenText}>$6000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account6000}</Text>
                        <Text style={styles.greenText}>$6000</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text>{account6000}</Text>
                        <Text style={styles.greenText}>$6000</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Accounts')}>
                        <Text style={styles.buttonLabelStyle}>Add Another Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: Device.width * 0.7,
        height: 36,
        backgroundColor: '#faf24a',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabelStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    redText: {
        color: '#ef8181'
    },
    greenText: {
        color: '#8ef461'
    }
});