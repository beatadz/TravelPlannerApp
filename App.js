import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LoginPage from "./src/screens/LoginPage";
import MainPage from "./src/screens/MainPage";
import AddActivity from "./src/components/AddActivity";
import EditActivity from "./src/components/EditActivity";
import AddExpense from "./src/components/AddExpense";
import EditExpense from "./src/components/EditExpense";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trip from "./src/screens/Trip";
import { useEffect, useState } from "react";
import AddTrip from "./src/components/AddTrip";
import AddPlace from "./src/components/AddPlace";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
	const MENU_ICON_URL = "./src/assets/icons/menu.png";
	const USER_ICON_URL = "./src/assets/icons/user.png"; //tymczasowo
	const [showLogoutPopup, setShowLogoutPopup] = useState(false);
	const [isUserLogout, setIsUserLogout] = useState(false);

	async function removeItemValue(key) {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		} catch (exception) {
			return false;
		}
	}

	function MenuButton({ navigation }) {
		return (
			<View
				style={{
					position: "relative",
				}}
			>
				<Menu
					visible={showLogoutPopup}
					onRequestClose={() => setShowLogoutPopup(false)}
					style={{
						top: 4,
						left: "47%",
						width: "50%",
						backgroundColor: "#ECECEC",
						borderRadius: 5,
					}}
				>
					<MenuItem disabled disabledTextColor="#FF9A18">
						Hi!
					</MenuItem>
					<MenuDivider color="#FF9A18" />
					<MenuItem
						onPress={() => {
							setShowLogoutPopup(false);
							setIsUserLogout(true);
						}}
					>
						Logout
					</MenuItem>
				</Menu>
			</View>
		);
	}

	function UserIcon({ navigation }) {
		useEffect(() => {
			if (isUserLogout) {
				removeItemValue("jwt");
				navigation.navigate("LoginPage");
				setIsUserLogout(false);
			}
		}, [isUserLogout]);

		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					setShowLogoutPopup(true);
				}}
			>
				<Image
					style={{ width: 50, height: 50, marginLeft: -10 }}
					source={require(USER_ICON_URL)}
				/>
			</TouchableOpacity>
		);
	}

	return (
		<NavigationContainer>
			<MenuButton />
			<Stack.Navigator
				initialRouteName="LoginPage"
				screenOptions={{ headerTransparent: true, headerTitle: "" }}
			>
				<Stack.Screen name="LoginPage" component={LoginPage} />
				<Stack.Screen
					name="MainPage"
					component={MainPage}
					options={({ navigation }) => ({
						headerBackVisible: false,
						headerRight: (props) => (
							<UserIcon navigation={navigation} {...props} />
						),
					})}
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
				<Stack.Screen
					name="AddPlace"
					component={AddPlace}
					options={{
						headerTintColor: "white",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	logoutContainer: {
		position: "absolute",
		width: "30%",
		height: 30,
		backgroundColor: "orange",
		top: "50%",
	},
});

export default App;
