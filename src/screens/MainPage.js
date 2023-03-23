import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	ActivityIndicator,
	Modal,
} from "react-native";
import { useCallback, useEffect, useState } from "react";

import TripCard from "../components/TripCard";

const API_URL = "http://192.168.0.100:7093/api";

const MainPage = ({ navigation }) => {
	const [loadedTrips, setLoadedTrips] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchTripsHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/trips/all?userId=1`); //tymczasowo

			if (!response.ok) {
				throw new Error("Nie udało się pobrać wycieczek.");
			}

			const responseData = await response.json();
			setLoadedTrips(responseData);
			setIsLoading(false);
		} catch (error) {
			alert(error.message);
		}
	}, []);

	async function addTripHandler(trip) {
		const response = await fetch(`${API_URL}/trips/add`, {
			method: "POST",
			body: JSON.stringify(trip),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Nie udało się dodać wycieczki.");
		}
	}

	async function onAddHandler(trip) {
		try {
			await addTripHandler(trp);
		} catch (error) {
			alert(error.message);
		}
		fetchTripsHandler();
	}

	async function editTripHandler(trip) {
		const response = await fetch(`${API_URL}/trips/update`, {
			method: "PUT",
			body: JSON.stringify(trip),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Nie udało się zaktualizować wycieczki.");
		}
	}

	async function onEditHandler(trip) {
		try {
			await editTripHandler(trip);
		} catch (error) {
			alert(error.message);
		}
		fetchTripsHandler();
	}

	async function deleteTripHandler(id) {
		const response = await fetch(`${API_URL}/trips/delete/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Nie udało się usunąć wycieczki.");
		}
	}

	async function onDeleteHandler(id) {
		try {
			await deleteTripHandler(id);
		} catch (error) {
			alert(error.message);
		}
		fetchTripsHandler();
	}

	useEffect(() => {
		fetchTripsHandler();
	}, [fetchTripsHandler]);

	// useEffect(() => {
	// 	console.log(loadedTrips);
	// }, [loadedTrips]);

	const currentDate = new Date();

	const userPastTrips = loadedTrips.map((trip) => {
		const startDate = new Date(trip.startDate);
		const endDate = new Date(trip.endDate);
		if (currentDate > endDate) {
			return (
				<TripCard
					key={trip.tripId}
					tripId={trip.tripId}
					tripName={trip.tripName}
					tripDescription={trip.tripDescription}
					startDate={trip.startDate}
					endDate={trip.endDate}
					coordinate={trip.coordinate}
					city={trip.city}
					country={trip.country}
					navigation={navigation}
				/>
			);
		}
	});

	const userFutureTrips = loadedTrips.map((trip) => {
		const startDate = new Date(trip.startDate);
		const endDate = new Date(trip.endDate);
		if (currentDate < startDate) {
			return (
				<TripCard
					key={trip.tripId}
					tripId={trip.tripId}
					tripName={trip.tripName}
					tripDescription={trip.tripDescription}
					startDate={trip.startDate}
					endDate={trip.endDate}
					coordinate={trip.coordinate}
					city={trip.city}
					country={trip.country}
					navigation={navigation}
					activities={trip.activities}
				/>
			);
		}
	});

	const userOngoingTrips = loadedTrips.map((trip) => {
		const startDate = new Date(trip.startDate);
		const endDate = new Date(trip.endDate);
		if (currentDate <= endDate && currentDate >= startDate) {
			return (
				<TripCard
					key={trip.tripId}
					tripId={trip.tripId}
					tripName={trip.tripName}
					tripDescription={trip.tripDescription}
					startDate={trip.startDate}
					endDate={trip.endDate}
					coordinate={trip.coordinate}
					city={trip.city}
					country={trip.country}
					navigation={navigation}
					activities={trip.activities}
				/>
			);
		}
	});

	return (
		<View style={styles.container}>
			<Modal
				transparent={true}
				animationType={"none"}
				visible={isLoading}
				style={{ zIndex: 1100 }}
				onRequestClose={() => {}}
			>
				<View style={styles.modalBackground}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator animating={isLoading} color="black" />
					</View>
				</View>
			</Modal>
			<View style={styles.imageWrapper}>
				<ImageBackground
					style={styles.headerImageIconStyle}
					source={{
						uri: "https://cdn.pixabay.com/photo/2020/03/31/11/59/sunrise-4987384__340.jpg",
					}}
				>
					<Text style={styles.myTripsText}>My Trips</Text>
				</ImageBackground>
			</View>
			<TouchableOpacity
				style={styles.roundButton}
				onPress={() => {
					navigation.navigate("AddTrip", {
						navigation,
						onAddHandler,
					});
				}}
			>
				<Text style={styles.roundButtonText}>+</Text>
			</TouchableOpacity>
			<ScrollView>
				<Text style={styles.headers}>Future Trips</Text>
				{userFutureTrips}
				<Text style={styles.headers}>Ongoing Trip</Text>
				{userOngoingTrips}
				<Text style={styles.headers}>Past Trips</Text>
				{userPastTrips}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#C8C8C8",
		width: "100%",
		height: "100%",
	},
	imageWrapper: {
		height: "30%",
		width: "100%",
		overflow: "hidden",
	},
	headerImageIconStyle: { width: "100%", height: "100%", resizeMode: "cover" },
	myTripsText: {
		position: "absolute",
		top: "72%",
		left: "2%",
		color: "#DBDBDB",
		fontSize: 40,
		fontWeight: "bold",
	},
	roundButton: {
		width: 70,
		height: 70,
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
		fontSize: 55,
		marginTop: -5,
	},
	headers: {
		color: "black",
		fontSize: 25,
		fontWeight: "bold",
		marginLeft: "2%",
		marginTop: "2%",
	},
	modalBackground: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		backgroundColor: "#rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
	},
	activityIndicatorWrapper: {
		backgroundColor: "#rgba(0, 0, 0, 0)",
		height: 100,
		width: 100,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
});

export default MainPage;
