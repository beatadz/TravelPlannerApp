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
import { useState } from "react";
import DatePicker from "react-native-date-picker";

const AddTrip = ({ route }) => {
	const { onAddHandler, navigation } = route.params;

	const [tripName, setTripName] = useState("");
	const [tripDescription, setTripDescription] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [coordinate, setCoordinate] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [startDateOpen, setStartDateOpen] = useState(false);
	const [endDateOpen, setEndDateOpen] = useState(false);

	const addTrip = () => {
		const tripToAdd = {
			tripName: tripName,
			tripDescription: tripDescription,
			startDate: startDate,
			endDate: endDate,
			coordinate: coordinate,
			city: city,
			country: country,
			userId: 1,
		};
		onAddHandler(tripToAdd);
	};

	return (
		<View style={styles.container}>
			<View style={styles.addContainer}>
				<Text style={styles.headers}>Add new trip</Text>
				<Text style={styles.label}>Trip Name</Text>
				<TextInput
					keyboardType="text"
					placeholder="Enter a trip name..."
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={tripName}
					onChangeText={(text) => {
						setTripName(text);
					}}
				/>
				<Text style={styles.label}>Trip Description</Text>
				<TextInput
					multiline={true}
					keyboardType="text"
					placeholder="Enter a trip description..."
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={tripDescription}
					onChangeText={(text) => {
						setTripDescription(text);
					}}
				/>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.buttonDate}
						onPress={() => {
							setStartDateOpen(true);
						}}
					>
						<Text style={styles.text}>Start Date</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.buttonDate}
						onPress={() => {
							setEndDateOpen(true);
						}}
					>
						<Text style={styles.text}>End Date</Text>
					</TouchableOpacity>
				</View>
				<DatePicker
					modal
					open={startDateOpen}
					date={startDate}
					onConfirm={(startDate) => {
						setStartDateOpen(false);
						setStartDate(startDate);
					}}
					onCancel={() => {
						setStartDateOpen(false);
					}}
				/>
				<DatePicker
					modal
					open={endDateOpen}
					date={endDate}
					onConfirm={(endDate) => {
						setEndDateOpen(false);
						setEndDate(endDate);
					}}
					onCancel={() => {
						setEndDateOpen(false);
					}}
				/>
				<Text style={styles.label}>City</Text>
				<TextInput
					multiline={true}
					keyboardType="text"
					placeholder="Enter a city..."
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={city}
					onChangeText={(text) => {
						setCity(text);
					}}
				/>
				<Text style={styles.label}>Country</Text>
				<TextInput
					multiline={true}
					keyboardType="text"
					placeholder="Enter a country..."
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={country}
					onChangeText={(text) => {
						setCountry(text);
					}}
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
							addTrip();
							navigation.goBack(null);
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
		//height: "50%",
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
	button: {
		minWidth: 110,
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
	buttonDate: {
		minWidth: 110,
		minHeight: 40,
		backgroundColor: "#0073ff",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 15,
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

export default AddTrip;
