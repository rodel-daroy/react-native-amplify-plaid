import * as React from 'react';
import { processColor, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import { Variable } from '../../utils/Variable';
import { DataStore } from 'aws-amplify';
import { Account } from '../../../models/index';

export default function BudgetsScreen() {

    const [chartData, setChartData] = React.useState({});

    const data = {
        dataSets: [{
            values: [{ y: 100 }, { y: 105 }, { y: 102 }, { y: 110 }, { y: 114 }, { y: 109 }, { y: 105 }, { y: 99 }, { y: 95 }],
            label: 'Bar dataSet',
            config: {
                color: processColor('teal'),
                barShadowColor: processColor('lightgrey'),
                highlightAlpha: 90,
                highlightColor: processColor('red'),
            }
        }],

        config: {
            barWidth: 0.7,
        }
    }

    React.useEffect(() => {
        this.getSavedTransactions()
    }, []);

    getSavedTransactions = async () => {
        const data = await DataStore.query(Account)
        console.log('budgets =====>', data.length, data)
        Variable.accounts = data
        this.refreshChart()
    }

    refreshChart = () => {
        let values = []
        for (let account of Variable.accounts) {
            values.push({ y: account.balances.current })
        }
        data.dataSets[0].values = values
        setChartData(data)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ height: 84, backgroundColor: '#707070', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ height: 56, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ margin: 8, fontSize: 24, color: '#ffffff' }}>Budgets</Text>
                    <View style={{ alignItems: 'center', margin: 8, }}>
                        <Text style={{ fontSize: 12, color: '#ffffff' }}>{Variable.accounts.length} Accounts</Text>
                        <Text style={{ fontSize: 12, color: '#ffffff' }}>Linked</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, padding: 16 }}>
                        {chartData
                            ?
                            <BarChart data={chartData} style={{ flex: 1 }} />
                            :
                            <Text>There aren't linked accounts</Text>
                        }
                    </View>
                    <View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.greenText}>You saved $70 so far today!</Text>
                    </View>
                </View>
                <View style={{ height: 120, flexDirection: 'column' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.yellowText}>Switch Budget View</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonLabelStyle}>Today</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonLabelStyle}>Week</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonLabelStyle}>Month</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonLabelStyle}>Year</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#faf24a',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    buttonLabelStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    yellowText: {
        color: '#faf24a'
    },
    greenText: {
        color: '#8ef461'
    }
});