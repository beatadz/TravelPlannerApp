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
}) => {
	//dodać sprawdzanie czy data końcowa jest późniejsza czy aktualna i formatowanie daty - po API

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
			image: trips[tripId].image,
		});
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={onClick}>
				<Image
					style={styles.imageStyle}
					source={{
						uri: trips[tripId].image,
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
