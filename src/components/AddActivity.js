import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

const AddActivity = ({ route }) => {
	const { onAddHandler, navigation, tripId } = route.params;

	const [dayInput, setDayInput] = useState(0);
	const [activityNameInput, setActivityNameInput] = useState("");
	const [showError, setShowError] = useState(false);

	const addActivity = () => {
		const activityToAdd = {
			day: dayInput,
			activityName: activityNameInput,
			done: false,
			tripId: tripId,
		};
		onAddHandler(activityToAdd);
	};

	useEffect(() => {
		if (dayInput <= 0 && dayInput !== "") {
			setShowError(true);
		} else {
			setShowError(false);
		}
	}, [dayInput]);

	return (
		<View style={styles.container}>
			<View style={styles.addContainer}>
				<Text style={styles.headers}>Add new activity</Text>
				<Text style={styles.label}>Day</Text>
				<TextInput
					keyboardType="numeric"
					placeholder="Enter a day"
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="numeric"
					cursorColor="0073ff"
					value={dayInput}
					onChangeText={(text) => {
						setDayInput(Number(text));
					}}
				/>
				{showError && (
					<Text style={styles.error}>Day must be greater than 0</Text>
				)}
				<Text style={styles.label}>Activity Name</Text>
				<TextInput
					keyboardType="text"
					placeholder="Enter an activity name"
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={activityNameInput}
					onChangeText={(text) => {
						setActivityNameInput(text);
					}}
					maxLength={25}
				/>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.button}
						onPress={() => {
							navigation.goBack(null);
						}}
					>
						<Text style={styles.text}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.button}
						onPress={() => {
							if (!showError) {
								addActivity();
								navigation.goBack(null);
							}
						}}
					>
						<Text style={styles.text}>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000000b0",
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 1000,
		justifyContent: "center",
		alignItems: "center",
	},
	addContainer: {
		backgroundColor: "white",
		width: "80%",
		minHeight: "45%",
		borderRadius: 12,
		paddingTop: 20,
		paddingBottom: 30,
	},
	headers: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 15,
		alignSelf: "center",
	},
	inputStyle: {
		borderWidth: 2,
		minWidth: "70%",
		alignSelf: "center",
		borderRadius: 5,
		padding: 5,
		paddingHorizontal: 10,
		borderColor: "#0073ff",
	},
	label: {
		marginLeft: "15%",
		marginTop: 15,
		fontSize: 20,
		marginBottom: 5,
	},
	error: {
		fontSize: 13,
		color: "red",
		alignSelf: "center",
		marginTop: 2,
	},
	button: {
		minWidth: "32%",
		minHeight: 40,
		backgroundColor: "#0073ff",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 100,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		fontSize: 18,
		color: "white",
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		width: "70%",
		marginLeft: "15%",
	},
});

export default AddActivity;
