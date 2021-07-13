import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ProductScreen,
    AddProductScreen,
    UserScreen,
    TransactionScreen,
    AddTransactionScreen,
    ReportScreen
} from '../Screens'
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();

const Routes = (props) => {
    const { dataUser } = props
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            {dataUser ?
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Product" component={ProductScreen} />
                    <Stack.Screen name="AddProduct" component={AddProductScreen} />
                    <Stack.Screen name="User" component={UserScreen} />
                    <Stack.Screen name="Transaction" component={TransactionScreen} />
                    <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
                    <Stack.Screen name="Report" component={ReportScreen} />

                </>
                :
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            }
        </HomeStack.Navigator >
    )
}

const mapStateToProps = state => {
    const { user } = state;
    const { data, loading } = user
    return {
        dataUser: data,
        loading
    };
}
const mapDispatchToProps = {
    // SetUser,
    // SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);