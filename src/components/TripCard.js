import { Pressable, StyleSheet, Text, View, Image } from "react-native";

const TripCard = ({
	tripId,
	tripName,
	tripDescription,
	startDate,
	endDate,
	coordinate,
	city,
	country,
	navigation,
	photoUrl,
	setIsTripDeleted,
}) => {
	const formattedStartDate = new Date(startDate).toLocaleDateString();
	const formattedEndDate = new Date(endDate).toLocaleDateString();

	const onClick = () => {
		navigation.navigate("Trip", {
			tripId,
			tripName,
			tripDescription,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
			coordinate,
			city,
			country,
			navigation,
			image: photoUrl,
			setIsTripDeleted,
		});
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={onClick} style={styles.photoAndTitle}>
				<Image
					style={styles.imageStyle}
					source={{
						uri: photoUrl,
					}}
				/>
				<Text style={styles.tripName}>{tripName}</Text>
				<Text
					style={styles.date}
				>{`${formattedStartDate} - ${formattedEndDate} ${city}, ${country}`}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF70",
		marginHorizontal: 10,
		marginTop: 15,
		borderRadius: 20,
		marginBottom: 5,
	},
	photoAndTitle: {
		alignItems: "stretch",
		flex: 1,
		minHeight: 300,
		paddingBottom: 5,
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
		maxHeight: 40,
	},
});

export default TripCard;
