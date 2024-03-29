import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect } from "react";

const AddTrip = ({ route }) => {
	const currentDate = new Date();
	const { onAddHandler, navigation } = route.params;

	const [tripName, setTripName] = useState("");
	const [tripDescription, setTripDescription] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [coordinate, setCoordinate] = useState("");
	const [startDate, setStartDate] = useState(currentDate);
	const [endDate, setEndDate] = useState(currentDate);
	const [startDateButtonText, setStartDateButtonText] = useState("Start date");
	const [endDateButtonText, setEndDateButtonText] = useState("End date");
	const [placeId, setPlaceId] = useState("");
	const [photoReference, setPhotoReference] = useState("");
	const [loadedPhoto, setLoadedPhoto] = useState([]);

	const [page, setPage] = useState(1);

	const [showError, setShowError] = useState(false);

	const showDatePicker = (type) => {
		DateTimePickerAndroid.open({
			value: type === "start" ? startDate : endDate,
			onChange: (event, selectedDate) => {
				type === "start"
					? setStartDateButtonText(selectedDate.toLocaleDateString("en-US"))
					: setEndDateButtonText(selectedDate.toLocaleDateString("en-US"));
				const currentDate = selectedDate;
				type === "start" ? setStartDate(currentDate) : setEndDate(currentDate);
			},
			mode: "date",
			is24Hour: true,
		});
	};

	useEffect(() => {
		if (
			startDate > endDate &&
			startDate !== currentDate &&
			endDate !== currentDate
		) {
			setShowError(true);
		} else {
			setShowError(false);
		}
	}, [startDate, endDate]);

	const addTrip = () => {
		if (!showError) {
			const tripToAdd = {
				tripName: tripName,
				tripDescription: tripDescription,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				coordinate: coordinate.lat + "," + coordinate.lng,
				city: city,
				country: country,
				photoUrl: loadedPhoto.slice(1, loadedPhoto.length - 1),
				userId: 1,
			};
			onAddHandler(tripToAdd);
		}
	};

	const fetchGooglePlacesPhotos = async (photoReference) => {
		const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${process.env.REACT_APP_API_KEY}`;
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Failed to download photo.");
			}
			setLoadedPhoto(JSON.stringify(response.url));
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<>
			{page === 1 ? (
				<View style={styles.container}>
					<View style={styles.addContainer}>
						<Text style={styles.headers}>Add new trip</Text>
						<Text style={styles.label}>Select your destination*</Text>
						<View style={styles.AutocompleteContainer}>
							<GooglePlacesAutocomplete
								placeholder="Type a place"
								onPress={(data, details) => {
									setCoordinate(details.geometry.location);
									const address = details.formatted_address.split(", ");
									setCity(address[0]);
									setCountry(address[address.length - 1]);
									setPlaceId(details.place_id);
									setPhotoReference(details.photos[0].photo_reference);
									fetchGooglePlacesPhotos(details.photos[0].photo_reference);
								}}
								query={{ key: process.env.REACT_APP_API_KEY, language: "en" }}
								fetchDetails={true}
								onFail={(error) => console.log(error)}
								onNotFound={() => console.log("no results")}
								listEmptyComponent={() => (
									<View style={{ flex: 1 }}>
										<Text>No results were found</Text>
									</View>
								)}
								styles={{
									textInputContainer: {
										borderColor: "#0073ff",
										borderWidth: 1,
										borderRadius: 5,
										marginTop: 10,
									},
									textInput: {
										height: 38,
										color: "#5d5d5d",
										fontSize: 16,
									},
								}}
							/>
						</View>
						<View style={styles.buttonsContainer}>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									navigation.goBack(null);
								}}
							>
								<Text style={styles.text}>Close</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									placeId !== ""
										? setPage(2)
										: () => {
												ToastAndroid.show(
													"Select your destination to continue!",
													ToastAndroid.SHORT
												);
										  };
								}}
							>
								<Text style={styles.text}>Continue</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.addContainer}>
						<Text style={styles.headers}>Add new trip</Text>
						<Text style={styles.label}>Select start and end date*</Text>
						<View style={styles.dateButtonsContainer}>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.buttonDate}
								onPress={() => showDatePicker("start")}
							>
								<Text style={styles.date}>{startDateButtonText}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.buttonDate}
								onPress={() => showDatePicker("end")}
							>
								<Text style={styles.date}>{endDateButtonText}</Text>
							</TouchableOpacity>
						</View>
						{showError && (
							<Text style={styles.error}>
								Start date can't be after end date
							</Text>
						)}
						<Text style={styles.label}>Trip Name*</Text>
						<TextInput
							keyboardType="text"
							placeholder="Enter a trip name"
							style={styles.inputStyle}
							placeholderTextColor="#787878"
							inputMode="text"
							cursorColor="0073ff"
							value={tripName}
							onChangeText={(text) => {
								setTripName(text);
							}}
							maxLength={15}
						/>
						<Text style={styles.label}>Trip Description</Text>
						<TextInput
							multiline={true}
							keyboardType="text"
							placeholder="Enter a trip description"
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
								style={styles.button}
								onPress={() => {
									setPage(1);
								}}
							>
								<Text style={styles.text}>Back</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									const areRequiredFieldsEmpty =
										startDate === "" || endDate === "" || tripName === "";
									areRequiredFieldsEmpty
										? () => {
												ToastAndroid.show(
													"Fill all required fields!",
													ToastAndroid.SHORT
												);
										  }
										: addTrip();
									!showError && navigation.goBack(null);
								}}
							>
								<Text style={styles.text}>Continue</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
		</>
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
		height: "45%",
		minHeight: 460,
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
	buttonDate: {
		minWidth: 110,
		minHeight: 40,
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 10,
		zIndex: 100,
		borderColor: "#0073ff",
		borderRadius: 5,
		borderWidth: 2,
		textAlign: "left",
	},
	date: {
		fontSize: 14,
		color: "gray",
	},
	text: {
		fontSize: 18,
		color: "white",
	},
	error: {
		fontSize: 13,
		color: "red",
		alignSelf: "center",
		marginTop: 2,
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		width: "70%",
		marginLeft: "15%",
	},
	dateButtonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		width: "70%",
		marginLeft: "15%",
	},
	AutocompleteContainer: {
		flex: 1,
		marginHorizontal: 40,
	},
});

export default AddTrip;
