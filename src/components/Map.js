import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useCallback, useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_URL } from "../constants";

const Map = ({ navigation, tripId, coordinate }) => {
	const initialLocation = coordinate !== "" ? coordinate.split(",") : [];

	const [loadedSavedPlaces, setLoadedSavedPlaces] = useState([]);
	const fetchSavedPlacesHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/places/all?tripId=${tripId}`); //tymczasowo

			if (!response.ok) {
				throw new Error("Places could not be downloaded.");
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
			throw new Error("Failed to add place.");
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

	const region = {
		latitude: +initialLocation[0],
		longitude: +initialLocation[1],
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	return (
		<View style={styles.container}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DBDBDB",
		flex: 1,
	},
	addPlace: {
		minHeight: 70,
		zIndex: 1,
	},
	roundButton: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		backgroundColor: "#FF9A18",
		fontWeight: "bold",

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
		flex: 1,
		marginTop: -70,
	},
});

export default Map;
