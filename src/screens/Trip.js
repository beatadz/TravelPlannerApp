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
import Overview from "../components/Overview";
import Gallery from "../components/Gallery";
import Spending from "../components/Spending";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Trip = ({ route }) => {
	const { tripName, image, startDate, endDate } = route.params;

	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<ImageBackground
					style={styles.headerImageIconStyle}
					source={{
						uri: image,
					}}
				>
					<Text style={styles.myTripsText}>{tripName}</Text>
					<Text style={styles.date}>{`${startDate} - ${endDate}`}</Text>
				</ImageBackground>
			</View>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: { fontSize: 16 },
					tabBarStyle: { backgroundColor: "#DBDBDB" },
					//tabBarActiveTintColor: "black",
				}}
			>
				<Tab.Screen name="Overview" component={Overview} />
				<Tab.Screen name="Gallery" component={Gallery} />
				<Tab.Screen name="Spending" component={Spending} />
			</Tab.Navigator>
			<ScrollView></ScrollView>
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
	headerImageIconStyle: { width: "100%", height: "100%", resizeMode: "cover" },
	myTripsText: {
		position: "absolute",
		top: "70%",
		left: "2%",
		color: "#DBDBDB",
		fontSize: 40,
		fontWeight: "bold",
	},
	date: {
		position: "absolute",
		top: "88%",
		left: "2%",
		color: "#DBDBDB",
		fontSize: 22,
	},
});

export default Trip;
