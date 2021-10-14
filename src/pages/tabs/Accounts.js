import { Auth, DataStore } from 'aws-amplify';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';
import { Account } from '../../../models/index';
import { Device } from '../../utils/Dimension';
import { Variable } from '../../utils/Variable';

export default function AccountsScreen({ navigation }) {

    const [linkToken, setLinkToken] = React.useState('')

    logout = () => {
        Auth.signOut().then(() => {
            navigation.navigate('Login')
        })
    }

    React.useEffect(() => {
        this.createLinkToken()
    }, []);

    createLinkToken = () => {
        fetch('https://sandbox.plaid.com/link/token/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "client_id": '5ed537df2aafa90012d29d15',
                "secret": 'da4a202cd4698c149632a322534b95',
                "client_name": "Debbeo",
                "country_codes": ["US"],
                "language": "en",
                "user": {
                    "client_user_id": "debbeo_tester"
                },
                "products": ['transactions']
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('link_token_create =====>', responseJson);
                setLinkToken(responseJson.link_token)
            })
            .catch((error) => {
                console.error('link_token_create =====>', error);
            });
    }

    plaidLinkSuccess = (data) => {
        console.log('success =====>', data)
        this.exchangePublicToken(data.public_token)
    }

    exchangePublicToken = (publicToken) => {
        fetch('https://sandbox.plaid.com/item/public_token/exchange', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "client_id": '5ed537df2aafa90012d29d15',
                "secret": 'da4a202cd4698c149632a322534b95',
                "public_token": publicToken
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('public_token_exchange =====>', responseJson);
                this.getTransactions(responseJson.access_token)
            })
            .catch((error) => {
                console.error('public_token_exchange =====>', error);
            });
    }

    getTransactions = (accessToken) => {
        fetch('https://sandbox.plaid.com/transactions/get', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "client_id": '5ed537df2aafa90012d29d15',
                "secret": 'da4a202cd4698c149632a322534b95',
                "access_token": accessToken,
                "start_date": '2020-10-01',
                "end_date": '2020-10-15'
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('transactions_get =====>', responseJson);
                this.saveTransactions(responseJson.accounts)
            })
            .catch((error) => {
                console.error('transactions_get =====>', error);
            });
    }

    saveTransactions = async (data) => {
        for (let account of data) {
            console.log('saveTransactions =====>', account)
            await DataStore.save(new Account(account))
        }
        this.getSavedTransactions()
    }

    getSavedTransactions = async () => {
        const data = await DataStore.query(Account)
        Variable.accounts = data
        console.log('saved_transactions =====>', data)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ height: 84, backgroundColor: '#707070', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ height: 56, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 8, fontSize: 24, color: '#ffffff' }}>Link Accounts</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {linkToken !== '' ?
                    <PlaidLink
                        token={linkToken}
                        onSuccess={data => plaidLinkSuccess(data)}
                        onExit={data => console.log('exit =====>', data)}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonLabelStyle}>Investment Account</Text>
                        </View>
                    </PlaidLink>
                    :
                    <Text></Text>
                }
                {linkToken !== '' ?
                    <PlaidLink
                        token={linkToken}
                        onSuccess={data => plaidLinkSuccess(data)}
                        onExit={data => console.log('exit =====>', data)}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonLabelStyle}>Bank Account</Text>
                        </View>
                    </PlaidLink>
                    :
                    <Text></Text>
                }
                {linkToken !== '' ?
                    <PlaidLink
                        token={linkToken}
                        onSuccess={data => plaidLinkSuccess(data)}
                        onExit={data => console.log('exit =====>', data)}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonLabelStyle}>Credit Card Account</Text>
                        </View>
                    </PlaidLink>
                    :
                    <Text></Text>
                }
                <TouchableOpacity style={styles.buttonStyle} onPress={() => logout()}>
                    <Text style={styles.buttonLabelStyle}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: Device.width * 0.8,
        height: 56,
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
    }
});