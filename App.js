import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CreateAccount from "./src/screens/CreateAccount";
import MainPage from "./src/screens/MainPage";
import AddActivity from "./src/components/AddActivity";
import EditActivity from "./src/components/EditActivity";
import AddExpense from "./src/components/AddExpense";
import EditExpense from "./src/components/EditExpense";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trip from "./src/screens/Trip";
import { useState } from "react";
import AddTrip from "./src/components/AddTrip";

const Stack = createNativeStackNavigator();

const App = () => {
	const MENU_ICON_URL = "./src/assets/icons/menu.png";
	const USER_ICON_URL = "./src/assets/icons/user.png"; //tymczasowo

	function MenuButton() {
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => console.log("click")}
			>
				<Image
					style={{ width: 50, height: 50, marginLeft: -10 }}
					source={require(MENU_ICON_URL)}
				/>
			</TouchableOpacity>
		);
	}

	function UserIcon() {
		return (
			<Image
				style={{ width: 50, height: 50, marginLeft: -10 }}
				source={require(USER_ICON_URL)}
			/>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="CreateAccount"
				screenOptions={{ headerTransparent: true, headerTitle: "" }}
			>
				<Stack.Screen name="CreateAccount" component={CreateAccount} />
				<Stack.Screen
					name="MainPage"
					component={MainPage}
					options={{
						headerLeft: (props) => <MenuButton {...props} />,
						headerRight: (props) => <UserIcon {...props} />,
					}}
				/>
				<Stack.Screen
					name="Trip"
					component={Trip}
					options={{
						headerTintColor: "white",
						headerRight: (props) => <UserIcon {...props} />,
					}}
				/>
				<Stack.Screen
					name="AddActivity"
					component={AddActivity}
					options={{
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="EditActivity"
					component={EditActivity}
					options={{
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="AddExpense"
					component={AddExpense}
					options={{
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="EditExpense"
					component={EditExpense}
					options={{
						headerTintColor: "white",
					}}
				/>
				<Stack.Screen
					name="AddTrip"
					component={AddTrip}
					options={{
						headerTintColor: "white",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
