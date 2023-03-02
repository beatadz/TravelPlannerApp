import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import MainPage from "./MainPage";

const ADD_PHOTO_URL = "../assets/icons/profilePhoto.png";

const CreateAccount = ({ navigation }) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		console.log(username);
	}, [username]);

	const onClick = () => {
		navigation.navigate("MainPage");
	};

	return (
		<LinearGradient
			colors={["#fcb045", "#fd6f1d", "#b43a86"]}
			style={styles.container}
		>
			<Text style={styles.header}>HELLO!</Text>
			<Image source={require(ADD_PHOTO_URL)} style={styles.addPhoto} />
			<Text style={styles.choosePictureText}>
				Choose your profile picture and enter your name
			</Text>
			<View style={styles.containerStyle}>
				<TextInput
					placeholder="Enter your name..."
					style={styles.inputStyle}
					onChangeText={setUsername}
					value={username}
				/>
			</View>
			<View style={styles.button}>
				<Button
					title="NEXT"
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
					onPress={onClick}
				/>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		textAlign: "center",
		fontSize: 50,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 100,
	},
	addPhoto: {
		width: 130,
		height: 130,
		alignSelf: "center",
		marginTop: 30,
	},
	choosePictureText: {
		textAlign: "center",
		fontSize: 25,
		fontWeight: "normal",
		color: "#FFFFFF",
		marginTop: 40,
		paddingHorizontal: 40,
	},
	inputStyle: {
		backgroundColor: "#FFFFFF50",
		borderRadius: 10,
		padding: 10,
		fontSize: 18,
		textAlign: "center",
	},
	containerStyle: {
		paddingHorizontal: 45,
		marginTop: 20,
	},
	button: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 30,
	},
});

export default CreateAccount;
