import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
} from "react-native";
import { useState } from "react";

import TripCard from "../components/TripCard";

const MainPage = ({ navigation }) => {
	//TYMCZASOWO

	const trips = [
		{
			image:
				"https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
			tripName: "London",
			startDate: "15.11.2022",
			endDate: "25.11.2022",
		},
		{
			image:
				"https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8QmFyY2Vsb25hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
			tripName: "Barcelona",
			startDate: "21.01.2023",
			endDate: "25.01.2023",
		},
		{
			image:
				"https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Um9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
			tripName: "Rome",
			startDate: "24.02.2023",
			endDate: "20.03.2023",
		},
	];

	const userOngoingTrip = (
		<TripCard
			image={trips[2].image}
			tripName={trips[2].tripName}
			startDate={trips[2].startDate}
			endDate={trips[2].endDate}
			navigation={navigation}
		/>
	);

	const userTrips = trips.map((trip) => {
		return (
			<TripCard
				image={trip.image}
				tripName={trip.tripName}
				startDate={trip.startDate}
				endDate={trip.endDate}
				navigation={navigation}
			/>
		);
	});

	return (
		<View style={styles.container}>
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
			<TouchableOpacity style={styles.roundButton}>
				<Text style={styles.roundButtonText}>+</Text>
			</TouchableOpacity>
			<ScrollView>
				<Text style={styles.headers}>Ongoing Trip</Text>
				{userOngoingTrip}
				<Text style={styles.headers}>Past Trips</Text>
				{userTrips}
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
});

export default MainPage;
