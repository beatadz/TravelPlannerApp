import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import MainPage from "./MainPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants";

const LoginPage = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [hasUserGotAnAccount, setHasUserGotAnAccount] = useState(true);
	const [isLogged, setIsLogged] = useState(false);
	const [userAccount, setUserAccount] = useState();

	useEffect(() => {
		const checkToken = async () => {
			const jwtToken = await AsyncStorage.getItem("jwt");
			//console.log(jwtToken);
			if (jwtToken) {
				fetchUserHandler();
			}
		};
		checkToken();
	}, []);

	async function loginUserHandler(user) {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Login failed.");
		}

		const responseData = await response.json();
		const jwtToken = responseData.token;
		try {
			await AsyncStorage.setItem("jwt", jwtToken);
		} catch (error) {
			console.log(error);
		}
	}

	async function registerUserHandler(user) {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to register.");
		}
	}

	async function fetchUserHandler() {
		const jwtToken = await AsyncStorage.getItem("jwt");

		const response = await fetch(`${API_URL}/auth/user`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwtToken}`,
			},
		});

		const responseData = await response.json();

		if (response.ok) {
			setUserAccount(responseData);
			setIsLogged(true);
			const userId = responseData.userId;
			navigation.navigate("MainPage", { userId, navigation });
		} else {
			setIsLogged(false);
		}
	}

	const onSubmit = async () => {
		if (hasUserGotAnAccount) {
			const user = {
				userEmail: email,
				password: password,
			};
			try {
				await loginUserHandler(user);
			} catch (error) {
				alert(error.message);
			}
			fetchUserHandler();
		} else {
			const user = {
				userName: username,
				userEmail: email,
				password: password,
			};
			try {
				await registerUserHandler(user);
				setHasUserGotAnAccount(true);
				navigation.goBack(null);
			} catch (error) {
				alert(error.message);
			}
		}
	};

	return (
		<LinearGradient
			colors={["#fcb045", "#fd6f1d", "#b43a86"]}
			style={styles.container}
		>
			{hasUserGotAnAccount ? (
				<>
					<Text style={styles.header}>LOGIN</Text>
					<Text style={styles.label}>Please sign in to continue.</Text>
					<Text style={styles.emailLabel}>Email</Text>
					<View style={styles.containerStyle}>
						<TextInput
							placeholder="Enter your email"
							style={styles.inputStyle}
							onChangeText={setEmail}
							value={email}
						/>
					</View>
					<Text style={styles.emailLabel}>Password</Text>
					<View style={styles.containerStyle}>
						<TextInput
							secureTextEntry={true}
							placeholder="Enter your password"
							style={styles.inputStyle}
							onChangeText={setPassword}
							value={password}
						/>
					</View>
					<View style={styles.button}>
						<Button
							title="LOGIN"
							titleStyle={{ fontWeight: "bold", fontSize: 20 }}
							buttonStyle={{
								borderWidth: 0,
								borderColor: "transparent",
								borderRadius: 10,
								backgroundColor: "#ED921E",
							}}
							containerStyle={{
								width: 150,
								marginHorizontal: 50,
							}}
							icon={{
								name: "arrow-right",
								type: "font-awesome",
								size: 15,
								color: "white",
							}}
							iconRight
							iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
							onPress={() => {
								onSubmit();
							}}
						/>
					</View>
					<View style={styles.createAccount}>
						<Text style={styles.createAccountLabel}>
							Don't have an account?
						</Text>
						<Text
							style={styles.singUpLabel}
							onPress={() => {
								setHasUserGotAnAccount(false);
							}}
						>
							Sign up
						</Text>
					</View>
				</>
			) : (
				<>
					<Text style={styles.header}>CREATE ACCOUNT</Text>
					<Text style={styles.emailLabel}>Username</Text>
					<View style={styles.containerStyle}>
						<TextInput
							placeholder="Enter your username"
							style={styles.inputStyle}
							onChangeText={setUsername}
							value={username}
						/>
					</View>
					<Text style={styles.emailLabel}>Email</Text>
					<View style={styles.containerStyle}>
						<TextInput
							placeholder="Enter your email"
							style={styles.inputStyle}
							onChangeText={setEmail}
							value={email}
						/>
					</View>
					<Text style={styles.emailLabel}>Password</Text>
					<View style={styles.containerStyle}>
						<TextInput
							secureTextEntry={true}
							placeholder="Enter your password"
							style={styles.inputStyle}
							onChangeText={setPassword}
							value={password}
						/>
					</View>
					<View style={styles.button}>
						<Button
							title="SIGN UP"
							titleStyle={{ fontWeight: "bold", fontSize: 20 }}
							buttonStyle={{
								borderWidth: 0,
								borderColor: "transparent",
								borderRadius: 10,
								backgroundColor: "#ED921E",
							}}
							containerStyle={{
								width: 150,
								marginHorizontal: 50,
							}}
							icon={{
								name: "arrow-right",
								type: "font-awesome",
								size: 15,
								color: "white",
							}}
							iconRight
							iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
							onPress={() => {
								onSubmit();
							}}
						/>
					</View>
					<View style={styles.createAccount}>
						<Text style={styles.createAccountLabel}>
							Already have an account?
						</Text>
						<Text
							style={styles.singUpLabel}
							onPress={() => {
								setHasUserGotAnAccount(true);
							}}
						>
							Sign in
						</Text>
					</View>
				</>
			)}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 100,
	},
	label: {
		textAlign: "center",
		fontSize: 25,
		fontWeight: "normal",
		color: "#FFFFFF",
		marginTop: 40,
		paddingHorizontal: 40,
	},
	emailLabel: {
		fontSize: 18,
		fontWeight: "normal",
		color: "#FFFFFF",
		marginTop: 20,
		paddingHorizontal: 45,
	},
	createAccountLabel: {
		fontSize: 18,
		fontWeight: "normal",
		color: "#FFFFFF",
		marginTop: 20,
	},
	singUpLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 20,
		paddingLeft: 5,
	},
	inputStyle: {
		backgroundColor: "#FFFFFF50",
		borderRadius: 10,
		padding: 10,
		fontSize: 18,
		textAlign: "left",
	},
	containerStyle: {
		paddingHorizontal: 45,
		marginTop: 10,
	},
	button: {
		justifyContent: "flex-end",
		alignItems: "flex-end",
		marginTop: 30,
	},
	createAccount: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		marginBottom: 40,
	},
});

export default LoginPage;
