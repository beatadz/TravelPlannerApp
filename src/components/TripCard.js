import { Pressable, StyleSheet, Text, View, Image } from "react-native";

const TripCard = ({ image, tripName, startDate, endDate, navigation }) => {
	//dodać sprawdzanie czy data końcowa jest późniejsza czy aktualna i formatowanie daty - po API

	const onClick = () => {
		navigation.navigate("Trip", { tripName, image, startDate, endDate });
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={onClick}>
				<Image
					style={styles.imageStyle}
					source={{
						uri: image,
					}}
				/>
				<Text style={styles.tripName}>{tripName}</Text>
				<Text style={styles.date}>{`${startDate} - ${endDate}`}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF70",
		height: 250,
		marginHorizontal: 10,
		marginTop: 15,
		borderRadius: 20,
		marginBottom: 5,
	},
	imageStyle: {
		width: "100%",
		height: "78%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		opacity: 0.95,
	},
	tripName: {
		marginTop: 2,
		marginLeft: 10,
		fontSize: 18,
		fontWeight: "bold",
	},
	date: {
		marginLeft: 10,
		fontSize: 16,
		color: "#353535",
	},
});

export default TripCard;
