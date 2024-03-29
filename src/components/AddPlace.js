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
	Alert,
	PermissionsAndroid,
} from "react-native";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const AddPlace = ({ route }) => {
	const { onAddHandler, navigation, tripId, region } = route.params;

	const [coordinate, setCoordinate] = useState("");
	const [placeId, setPlaceId] = useState("");
	const [openMap, setOpenMap] = useState(false);
	const [openSelect, setOpenSelect] = useState(false);
	const [openAddCurrentLocation, setOpenAddCurrentLocation] = useState(false);
	const [placeName, setPlaceName] = useState("");

	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Geolocation Permission",
					message: "Allow this app to access device's location?",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				}
			);
			if (granted === "granted") {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	const getLocation = () => {
		const result = requestLocationPermission();
		if (result) {
			try {
				Geolocation.getCurrentPosition(
					(position) => {
						setCoordinate({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					(error) => {
						console.log(error.code, error.message);
					},
					{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
				);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const addPlace = () => {
		const placeToAdd = {
			savedPlaceName: placeName,
			savedPlaceCoordinates: coordinate.lat + "," + coordinate.lng,
			tripId: tripId,
		};
		onAddHandler(placeToAdd);
	};

	const selectLocationHandler = (event) => {
		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;
		setCoordinate({ lat: lat, lng: lng });
	};

	return (
		<View style={styles.container}>
			<View style={styles.addContainer}>
				{!openMap && !openSelect && !openAddCurrentLocation && (
					<Text style={styles.headers}>Add new favorite place</Text>
				)}
				{!openMap && !openSelect && !openAddCurrentLocation && (
					<>
						<View style={styles.mapButton}>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									setOpenMap(true);
								}}
							>
								<Text style={styles.text}>Select on map</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.mapButton}>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									setOpenSelect(true);
								}}
							>
								<Text style={styles.text}>Find your favorite place</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.mapButton}>
							<TouchableOpacity
								activeOpacity={0.95}
								style={styles.button}
								onPress={() => {
									getLocation();
									setOpenAddCurrentLocation(true);
								}}
							>
								<Text style={styles.text}>Add your current location</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
				{openSelect && (
					<>
						<Text style={styles.googlelabel}>Find your favorite place</Text>
						<View style={styles.AutocompleteContainer}>
							<GooglePlacesAutocomplete
								placeholder="Type a place"
								onPress={(data, details) => {
									setCoordinate(details.geometry.location);
									setPlaceId(details.place_id);
									const address = details.formatted_address.split(", ");
									setPlaceName(address[0]);
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
					</>
				)}
				{openMap && (
					<>
						<Text style={styles.label}>Select your favorite place*</Text>
						<MapView
							style={styles.map}
							initialRegion={region}
							onPress={selectLocationHandler}
							zoomEnabled={true}
							zoomTapEnabled={true}
							showsBuildings={true}
							zoomControlEnabled={true}
						>
							{coordinate && (
								<Marker
									coordinate={{
										latitude: coordinate.lat,
										longitude: coordinate.lng,
									}}
								/>
							)}
						</MapView>
						<Text style={styles.label}>Place Name*</Text>
						<TextInput
							keyboardType="text"
							placeholder="Enter a place name"
							style={styles.inputStyle}
							placeholderTextColor="#787878"
							inputMode="text"
							cursorColor="#0073ff"
							value={placeName}
							onChangeText={(text) => {
								setPlaceName(text);
							}}
							maxLength={25}
						/>
					</>
				)}
				{openAddCurrentLocation && (
					<>
						<Text style={styles.label}>Place Name*</Text>
						<TextInput
							keyboardType="text"
							placeholder="Enter a place name"
							style={styles.inputStyle}
							placeholderTextColor="#787878"
							inputMode="text"
							cursorColor="0073ff"
							value={placeName}
							onChangeText={(text) => {
								setPlaceName(text);
							}}
							maxLength={25}
						/>
					</>
				)}
				{openMap || openSelect || openAddCurrentLocation ? (
					<View style={styles.defaultButtonsContainer}>
						<TouchableOpacity
							activeOpacity={0.95}
							style={styles.button}
							onPress={() => {
								if (openMap || openSelect || openAddCurrentLocation) {
									setOpenMap(false);
									setOpenSelect(false);
									setOpenAddCurrentLocation(false);
								} else navigation.goBack(null);
							}}
						>
							<Text style={styles.text}>
								{openMap || openSelect || openAddCurrentLocation
									? "Back"
									: "Close"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.95}
							style={styles.button}
							onPress={() => {
								placeName !== ""
									? addPlace()
									: () => {
											ToastAndroid.show(
												"Select place to continue!",
												ToastAndroid.SHORT
											);
									  };
								navigation.goBack(null);
							}}
						>
							<Text style={styles.text}>Continue</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.closeButton}>
						<TouchableOpacity
							activeOpacity={0.95}
							style={styles.button}
							onPress={() => {
								if (openMap || openSelect || openAddCurrentLocation) {
									setOpenMap(false);
									setOpenSelect(false);
									setOpenAddCurrentLocation(false);
								} else navigation.goBack(null);
							}}
						>
							<Text style={styles.text}>
								{openMap || openSelect || openAddCurrentLocation
									? "Back"
									: "Close"}
							</Text>
						</TouchableOpacity>
					</View>
				)}
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
		height: "55%",
		minHeight: 470,
		borderRadius: 12,
		paddingTop: 20,
		paddingBottom: 30,
	},
	headers: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 15,
		marginBottom: 10,
		alignSelf: "center",
	},
	inputStyle: {
		borderWidth: 2,
		minWidth: "85%",
		alignSelf: "center",
		borderRadius: 5,
		padding: 5,
		paddingHorizontal: 10,
		borderColor: "#0073ff",
	},
	label: {
		marginLeft: "8%",
		marginTop: 10,
		fontSize: 20,
		marginBottom: 5,
	},
	googlelabel: {
		marginLeft: "12%",
		marginTop: 10,
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
	text: {
		fontSize: 18,
		color: "white",
	},
	defaultButtonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		width: "70%",
		marginLeft: "15%",
	},
	AutocompleteContainer: {
		flex: 1,
		marginHorizontal: 40,
	},
	mapButton: {
		marginTop: 20,
		minWidth: "75%",
		alignSelf: "center",
	},
	closeButton: {
		marginTop: 130,
		minWidth: "45%",
		alignSelf: "center",
	},
	orText: {
		alignSelf: "center",
		marginTop: 15,
		fontSize: 20,
		marginBottom: 5,
	},
	map: {
		// backgroundColor: "#FFFFFF70",
		flex: 1,
		minHeight: 240,
		marginHorizontal: 25,
		zIndex: 1,
	},
});

export default AddPlace;
