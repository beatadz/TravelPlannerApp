import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CreateAccount from "./src/screens/CreateAccount";
import MainPage from "./src/screens/MainPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trip from "./src/screens/Trip";
import { useState } from "react";

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
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
