import { useState } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";

const AddExpense = ({ route }) => {
	const { onAddHandler, navigation, tripId } = route.params;

	const [categoryInput, setCategoryInput] = useState("");
	const [expenseNameInput, setExpenseNameInput] = useState("");
	const [priceInput, setPriceInput] = useState(0);

	const addExpense = () => {
		const expenseToAdd = {
			category: categoryInput,
			expenseName: expenseNameInput,
			price: priceInput,
			tripId: tripId,
		};
		onAddHandler(expenseToAdd);
	};

	return (
		<View style={styles.container}>
			<View style={styles.addContainer}>
				<Text style={styles.headers}>Add new expense</Text>
				<Text style={styles.label}>Expense Name</Text>
				<TextInput
					keyboardType="text"
					placeholder="Enter an expense name"
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={expenseNameInput}
					onChangeText={(text) => {
						setExpenseNameInput(text);
					}}
					maxLength={20}
				/>
				<Text style={styles.label}>Expense Category</Text>
				<TextInput
					keyboardType="text"
					placeholder="Enter an expense category"
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="text"
					cursorColor="0073ff"
					value={categoryInput}
					onChangeText={(text) => {
						setCategoryInput(text);
					}}
					maxLength={16}
				/>
				<Text style={styles.label}>Price</Text>
				<TextInput
					keyboardType="numeric"
					placeholder="Enter a price"
					style={styles.inputStyle}
					placeholderTextColor="#787878"
					inputMode="numeric"
					cursorColor="0073ff"
					value={priceInput}
					onChangeText={(text) => {
						setPriceInput(Number(text));
					}}
					maxLength={8}
				/>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.button}
						onPress={() => {
							navigation.goBack(null);
						}}
					>
						<Text style={styles.text}>Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.95}
						style={styles.button}
						onPress={() => {
							addExpense();
							navigation.goBack(null);
						}}
					>
						<Text style={styles.text}>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000000b0",
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 1000,
		justifyContent: "center",
		alignItems: "center",
	},
	addContainer: {
		backgroundColor: "white",
		width: "80%",
		minHeight: "45%",
		borderRadius: 12,
		paddingTop: 20,
		paddingBottom: 30,
	},
	headers: {
		color: "black",
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 15,
		alignSelf: "center",
	},
	inputStyle: {
		borderWidth: 2,
		minWidth: "70%",
		alignSelf: "center",
		borderRadius: 5,
		padding: 5,
		paddingHorizontal: 10,
		borderColor: "#0073ff",
	},
	label: {
		marginLeft: "15%",
		marginTop: 15,
		fontSize: 20,
		marginBottom: 5,
	},
	button: {
		minWidth: "32%",
		minHeight: 40,
		backgroundColor: "#0073ff",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		zIndex: 100,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		fontSize: 18,
		color: "white",
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		width: "70%",
		marginLeft: "15%",
	},
});

export default AddExpense;
