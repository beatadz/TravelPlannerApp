import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	BackHandler,
	Alert,
} from "react-native";
import Overview from "../components/Overview";
import Map from "../components/Map";
import Spending from "../components/Spending";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddActivity from "../components/AddActivity";
import { API_URL } from "../constants";

const Tab = createMaterialTopTabNavigator();

const Trip = ({ route }) => {
	const {
		tripId,
		tripName,
		tripDescription,
		startDate,
		endDate,
		coordinate,
		city,
		country,
		navigation,
		image,
		setIsTripDeleted,
	} = route.params;

	BackHandler.addEventListener("hardwareBackPress", () => {
		navigation.goBack();
		return true;
	});

	BackHandler.removeEventListener("hardwareBackPress", () => {
		navigation.goBack();
		return true;
	});
	const REMOVE_ICON = "../assets/icons/trash.png";

	async function deleteTripHandler(id) {
		const response = await fetch(`${API_URL}/trips/delete/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete tour.");
		}
	}

	async function onDeleteHandler(id) {
		try {
			await deleteTripHandler(id);
			setIsTripDeleted(true);
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<ImageBackground
					style={styles.headerImageIconStyle}
					source={{
						uri: image,
					}}
				>
					<View style={styles.shadow} />
				</ImageBackground>
				<Text style={styles.myTripsText}>{tripName}</Text>
				<TouchableOpacity
					style={styles.removeTrip}
					onPress={() => {
						Alert.alert("Delete trip", "Do you want to delete your trip?", [
							{
								text: "Cancel",
								style: "cancel",
							},
							{
								text: "OK",
								onPress: () => {
									onDeleteHandler(tripId);
									navigation.goBack();
								},
							},
						]);
					}}
				>
					<Image style={styles.editIcon} source={require(REMOVE_ICON)} />
				</TouchableOpacity>
				<Text
					style={styles.date}
				>{`${startDate} - ${endDate} ${city}, ${country}`}</Text>
			</View>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: { fontSize: 14 },
					tabBarStyle: { backgroundColor: "#DBDBDB" },
				}}
			>
				<Tab.Screen
					name="Overview"
					children={() => (
						<Overview
							tripId={tripId}
							tripDescription={tripDescription}
							navigation={navigation}
						/>
					)}
				/>
				<Tab.Screen
					name="Map"
					children={() => (
						<Map
							tripId={tripId}
							coordinate={coordinate}
							navigation={navigation}
						/>
					)}
				/>
				<Tab.Screen
					name="Spending"
					children={() => <Spending tripId={tripId} navigation={navigation} />}
				/>
			</Tab.Navigator>
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
		height: "35%",
		width: "100%",
		overflow: "hidden",
	},
	headerImageIconStyle: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	shadow: {
		backgroundColor: "rgba(0,0,0, 0.30)",
		flex: 1,
	},
	myTripsText: {
		position: "absolute",
		top: "66%",
		left: "2%",
		color: "#DBDBDB",
		fontSize: 35,
		fontWeight: "bold",
	},
	removeTrip: {
		position: "absolute",
		top: "69%",
		right: "5%",
		color: "red",
		fontSize: 20,
	},
	date: {
		position: "absolute",
		top: "82%",
		left: "2%",
		color: "#DBDBDB",
		fontSize: 20,
	},
	editIcon: {
		height: 30,
		width: 30,
	},
});

export default Trip;
