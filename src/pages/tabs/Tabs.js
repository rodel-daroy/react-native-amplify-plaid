import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import AccountsScreen from './Accounts';
import BudgetsScreen from './Budgets';
import DashboardScreen from './Dashboard';

const Tab = createBottomTabNavigator();

export function TabsScreen({ navigation }) {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Budgets" component={BudgetsScreen} />
            <Tab.Screen name="Accounts" component={AccountsScreen} />
        </Tab.Navigator>
    );
}