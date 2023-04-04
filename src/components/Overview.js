import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";

const API_URL = "http://192.168.0.100:7093/api";

const Overview = ({ tripId, navigation }) => {
	const [loadedActivities, setLoadedActivities] = useState([]);

	const fetchActivitiesHandler = useCallback(async () => {
		try {
			const response = await fetch(
				`${API_URL}/activities/all?tripId=${tripId}`
			);

			if (!response.ok) {
				throw new Error("Nie udało się pobrać zadań.");
			}

			const responseData = await response.json();
			setLoadedActivities(responseData);
		} catch (error) {
			alert(error.message);
		}
	}, []);

	async function addActivityHandler(activity) {
		const response = await fetch(`${API_URL}/activities/add`, {
			method: "POST",
			body: JSON.stringify(activity),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Nie udało się dodać aktywnosci.");
		}
	}

	async function onAddHandler(activity) {
		try {
			await addActivityHandler(activity);
		} catch (error) {
			alert(error.message);
		}
		fetchActivitiesHandler();
	}

	async function editActivityHandler(activity) {
		const response = await fetch(`${API_URL}/activities/update`, {
			method: "PUT",
			body: JSON.stringify(activity),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Nie udało się zaktualizować aktywnosci.");
		}
	}

	async function onEditHandler(activity) {
		try {
			await editActivityHandler(activity);
		} catch (error) {
			alert(error.message);
		}
		fetchActivitiesHandler();
	}

	async function deleteActivityHandler(id) {
		const response = await fetch(`${API_URL}/activities/delete/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Nie udało się usunąć aktywnosci.");
		}
	}

	async function onDeleteHandler(id) {
		try {
			await deleteActivityHandler(id);
		} catch (error) {
			alert(error.message);
		}
		fetchActivitiesHandler();
	}

	useEffect(() => {
		fetchActivitiesHandler();
	}, [fetchActivitiesHandler]);

	const groupBy = (arr, prop) => {
		const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
		arr.forEach((obj) => map.get(obj[prop]).push(obj));
		return Array.from(map.values());
	};

	const activitiesByDay = groupBy(loadedActivities, "day");

	const REMOVE_ICON = "../assets/icons/remove.png";
	const EDIT_ICON = "../assets/icons/edit.png";

	const planByDays = activitiesByDay.map((day) => {
		return (
			<View style={styles.day} key={day.activityId}>
				<Text style={styles.dayTitle}>{`Day ${day[0].day}`}</Text>
				{day.map((activity) => {
					return (
						<View key={activity.activityName} style={styles.activityNames}>
							<CheckBox
								checked={activity.done}
								containerStyle={styles.checkbox}
								title={activity.activityName}
								size={30}
								textStyle={styles.activityName}
								onPress={() => {
									const activityToEdit = {
										activityId: activity.activityId,
										day: activity.day,
										activityName: activity.activityName,
										done: !activity.done,
										tripId: tripId,
									};
									onEditHandler(activityToEdit);
								}}
							/>
							<View style={styles.icons}>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("EditActivity", {
											navigation,
											tripId,
											onEditHandler,
											activity,
										});
									}}
								>
									<Image style={styles.editIcon} source={require(EDIT_ICON)} />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										onDeleteHandler(activity.activityId);
									}}
								>
									<Image
										style={styles.removeIcon}
										source={require(REMOVE_ICON)}
									/>
								</TouchableOpacity>
							</View>
						</View>
					);
				})}
			</View>
		);
	});

	return (
		<ScrollView style={styles.container}>
			<View style={styles.addPlan}>
				<Text style={styles.headers}>Plan a trip</Text>
				<TouchableOpacity
					style={styles.roundButton}
					onPress={() => {
						navigation.navigate("AddActivity", {
							navigation,
							tripId,
							onAddHandler,
						});
					}}
				>
					<Text style={styles.roundButtonText}>+</Text>
				</TouchableOpacity>
			</View>
			{planByDays}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DBDBDB",
	},
	addPlan: {
		minHeight: 70,
		// backgroundColor: "red",
	},
	headers: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginLeft: "5%",
		marginTop: "5%",
	},
	roundButton: {
		width: 50,
		height: 50,
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
	day: {
		marginLeft: "5%",
	},
	dayTitle: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	activityNames: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
	},
	checkbox: {
		backgroundColor: "#DBDBDB",
		paddingLeft: 0,
		paddingTop: 5,
	},
	activityName: {
		fontSize: 16,
	},
	editIcon: {
		height: 20,
		width: 20,
		marginTop: 15,
		marginRight: 10,
	},
	removeIcon: {
		height: 20,
		width: 20,
		marginTop: 15,
	},
	icons: {
		display: "flex",
		flexDirection: "row",
		marginRight: 25,
	},
});

export default Overview;
