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
	BackHandler,
	Alert,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { API_URL, MAIN_PAGE_IMAGE } from "../constants";
import TripCard from "../components/TripCard";

const MainPage = ({ route }) => {
	const { userId, navigation } = route.params;
	const [loadedTrips, setLoadedTrips] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			BackHandler.addEventListener("hardwareBackPress", () => {
				Alert.alert(
					"Exit App",
					"Do you want to leave the app?",
					[
						{
							text: "Cancel",
							onPress: () => {
								console.log("cancel");
							},
							style: "cancel",
						},
						{
							text: "Ok",
							onPress: () => BackHandler.exitApp(),
						},
					],
					{
						cancelable: false,
					}
				);
				return true;
			});
		}
	}, [isFocused]);

	const fetchTripsHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/trips/all?userId=${userId}`);

			if (!response.ok) {
				throw new Error("Failed to download tours.");
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
			throw new Error("Failed to add tour.");
		}
	}

	async function onAddHandler(trip) {
		try {
			await addTripHandler(trip);
		} catch (error) {
			alert(error.message);
		}
		fetchTripsHandler();
	}

	const [isTripDeleted, setIsTripDeleted] = useState(false);

	useEffect(() => {
		fetchTripsHandler();
		setIsTripDeleted(false);
	}, [fetchTripsHandler, isTripDeleted]);

	const currentDate = new Date();

	let userPastTrips = loadedTrips.map((trip) => {
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
					photoUrl={trip.photoUrl}
					setIsTripDeleted={setIsTripDeleted}
				/>
			);
		}
	});

	let userFutureTrips = loadedTrips.map((trip) => {
		const startDate = new Date(trip.startDate);
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
					photoUrl={trip.photoUrl}
					setIsTripDeleted={setIsTripDeleted}
				/>
			);
		}
	});

	let userOngoingTrips = loadedTrips.map((trip) => {
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
					photoUrl={trip.photoUrl}
					setIsTripDeleted={setIsTripDeleted}
				/>
			);
		}
	});

	useEffect(() => {
		userFutureTrips = userFutureTrips.filter(function (element) {
			return element !== undefined;
		});
		userOngoingTrips = userOngoingTrips.filter(function (element) {
			return element !== undefined;
		});
		userPastTrips = userPastTrips.filter(function (element) {
			return element !== undefined;
		});
	}, [userFutureTrips, userOngoingTrips, userPastTrips]);

	const FutureTripsComponent = () => {
		userFutureTrips = userFutureTrips.filter(function (element) {
			return element !== undefined;
		});
		const isArrayEmpty = !(userFutureTrips.length !== 0);
		return (
			<>
				{!isArrayEmpty && (
					<>
						<Text style={styles.headers}>Future Trips</Text>
						{userFutureTrips}
					</>
				)}
			</>
		);
	};

	const OngoingTripsComponent = () => {
		userOngoingTrips = userOngoingTrips.filter(function (element) {
			return element !== undefined;
		});
		const isArrayEmpty = !(userOngoingTrips.length !== 0);
		return (
			<>
				{!isArrayEmpty && (
					<>
						<Text style={styles.headers}>Ongoing Trip</Text>
						{userOngoingTrips}
					</>
				)}
			</>
		);
	};

	const PastTripsComponent = () => {
		userPastTrips = userPastTrips.filter(function (element) {
			return element !== undefined;
		});
		const isArrayEmpty = !(userPastTrips.length !== 0);
		return (
			<>
				{!isArrayEmpty && (
					<>
						<Text style={styles.headers}>Past Trips</Text>
						{userPastTrips}
					</>
				)}
			</>
		);
	};

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
						uri: MAIN_PAGE_IMAGE,
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
				<FutureTripsComponent />
				<OngoingTripsComponent />
				<PastTripsComponent />
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
