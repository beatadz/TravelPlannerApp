import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "../ApiKey";

const Map = ({ navigation, tripId, coordinate }) => {
	const API_URL = "http://192.168.0.100:7093/api";

	console.log(coordinate);

	const initialLocation = coordinate !== "" ? coordinate.split(",") : [];

	console.log(initialLocation);

	const [loadedSavedPlaces, setLoadedSavedPlaces] = useState([]);

	const fetchSavedPlacesHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/places/all?tripId=${tripId}`); //tymczasowo

			if (!response.ok) {
				throw new Error("Nie udało się pobrać miejsc.");
			}

			const responseData = await response.json();
			setLoadedSavedPlaces(responseData);
		} catch (error) {
			alert(error.message);
		}
	}, []);

	async function addPlaceHandler(place) {
		const response = await fetch(`${API_URL}/places/add`, {
			method: "POST",
			body: JSON.stringify(place),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Nie udało się dodać miejsca.");
		}
	}

	async function onAddHandler(place) {
		try {
			await addPlaceHandler(place);
		} catch (error) {
			alert(error.message);
		}
		fetchSavedPlacesHandler();
	}

	useEffect(() => {
		fetchSavedPlacesHandler();
	}, [fetchSavedPlacesHandler]);

	console.log(loadedSavedPlaces);

	const region = {
		latitude: +initialLocation[0],
		longitude: +initialLocation[1],
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	return (
		<>
			<ScrollView style={styles.container}>
				<View style={styles.addPlace}>
					<TouchableOpacity
						style={styles.roundButton}
						onPress={() => {
							navigation.navigate("AddPlace", {
								navigation,
								tripId,
								region,
								onAddHandler,
							});
						}}
					>
						<Text style={styles.roundButtonText}>+</Text>
					</TouchableOpacity>
				</View>
				<MapView
					style={styles.map}
					initialRegion={region}
					zoomEnabled={true}
					zoomTapEnabled={true}
					showsBuildings={true}
					zoomControlEnabled={true}
				>
					{loadedSavedPlaces.map((marker) => (
						<Marker
							key={marker.savedPlaceId}
							coordinate={{
								latitude: +marker.savedPlaceCoordinates.split(",")[0],
								longitude: +marker.savedPlaceCoordinates.split(",")[1],
							}}
							title={marker.savedPlaceName}
							pinColor={"tan"}
						/>
					))}
				</MapView>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DBDBDB",
		flex: 1,
	},
	addPlace: {
		minHeight: 70,
		// backgroundColor: "red",
	},
	headers: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginLeft: "5%",
		marginTop: "5%",
		zIndex: 1000,
	},
	roundButton: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		backgroundColor: "#FF9A18",
		fontWeight: "bold",
		zIndex: 100,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,

		position: "absolute",
		top: "25%",
		right: "6%",
	},
	roundButtonText: {
		color: "white",
		fontSize: 35,
		marginTop: -5,
	},
	map: {
		// backgroundColor: "#FFFFFF70",
		flex: 1,
		minHeight: 550,
		marginTop: -70,
		zIndex: 1,
	},
});

export default Map;