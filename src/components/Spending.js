import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL } from "../constants";

const Spending = ({ tripId, navigation }) => {
	const [loadedExpenses, setLoadedExpenses] = useState([]);

	const fetchExpensesHandler = useCallback(async () => {
		try {
			const response = await fetch(`${API_URL}/expenses/all?tripId=${tripId}`); //tymczasowo

			if (!response.ok) {
				throw new Error("Expenses could not be fetched.");
			}

			const responseData = await response.json();
			setLoadedExpenses(responseData);
		} catch (error) {
			alert(error.message);
		}
	}, []);

	async function addExpenseHandler(expense) {
		const response = await fetch(`${API_URL}/expenses/add`, {
			method: "POST",
			body: JSON.stringify(expense),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to add expense.");
		}
	}

	async function onAddHandler(expense) {
		try {
			await addExpenseHandler(expense);
		} catch (error) {
			alert(error.message);
		}
		fetchExpensesHandler();
	}

	async function editExpenseHandler(expense) {
		const response = await fetch(`${API_URL}/expenses/update`, {
			method: "PUT",
			body: JSON.stringify(expense),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Failed to update expense.");
		}
	}

	async function onEditHandler(expense) {
		try {
			await editExpenseHandler(expense);
		} catch (error) {
			alert(error.message);
		}
		fetchExpensesHandler();
	}

	async function deleteExpenseHandler(id) {
		const response = await fetch(`${API_URL}/expenses/delete/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("The expense could not be deleted.");
		}
	}

	async function onDeleteHandler(id) {
		try {
			await deleteExpenseHandler(id);
		} catch (error) {
			alert(error.message);
		}
		fetchExpensesHandler();
	}

	useEffect(() => {
		fetchExpensesHandler();
	}, [fetchExpensesHandler]);

	const sum = useMemo(() => {
		var sum = 0;
		loadedExpenses.forEach((expense) => {
			sum += expense.price;
		});
		return sum;
	}, [loadedExpenses]);

	const groupBy = (arr, prop) => {
		const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
		arr.forEach((obj) => map.get(obj[prop]).push(obj));
		return Array.from(map.values());
	};

	const expensesByCategory = groupBy(loadedExpenses, "category");

	const REMOVE_ICON = "../assets/icons/remove.png";
	const EDIT_ICON = "../assets/icons/edit.png";
	const MONEY_ICON = "../assets/icons/dollar.png";

	const ExpensesByCategories = expensesByCategory.map((category, index) => {
		return (
			<View style={styles.day} key={index}>
				<Text style={styles.categoryTitle}>{category[0].category}</Text>
				{category.map((expense) => {
					return (
						<View
							key={expense.expenseName + expense.expenseId}
							style={styles.expenseNames}
						>
							<View style={styles.expenseContainer}>
								<Image style={styles.moneyIcon} source={require(MONEY_ICON)} />
								<Text style={styles.expenseTitle}>{expense.expenseName}</Text>
								<Text style={styles.expensePrice}>{expense.price} zł</Text>
							</View>
							<View style={styles.icons}>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate("EditExpense", {
											onEditHandler,
											navigation,
											tripId,
											expense,
										});
									}}
								>
									<Image style={styles.editIcon} source={require(EDIT_ICON)} />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										onDeleteHandler(expense.expenseId);
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
		<View style={styles.container}>
			<View style={styles.addExpense}>
				<Text style={styles.headers}>Add expenses</Text>
				<TouchableOpacity
					style={styles.roundButton}
					onPress={() => {
						navigation.navigate("AddExpense", {
							onAddHandler,
							navigation,
							tripId,
						});
					}}
				>
					<Text style={styles.roundButtonText}>+</Text>
				</TouchableOpacity>
			</View>
			{ExpensesByCategories}
			{ExpensesByCategories.length > 0 && (
				<View style={styles.summary}>
					<Text style={styles.sumHeader}>Sum: </Text>
					<Text style={styles.sum}>{sum} zł</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DBDBDB",
		flex: 1,
	},
	addExpense: {
		minHeight: 70,
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
	categoryTitle: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	expenseNames: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
		padding: 10,
		paddingLeft: 2,
	},
	expenseContainer: {
		display: "flex",
		flexDirection: "row",
	},
	editIcon: {
		height: 20,
		width: 20,
		marginBottom: 1,
		marginRight: 10,
	},
	removeIcon: {
		height: 20,
		width: 20,
	},
	moneyIcon: {
		height: 20,
		width: 20,
		marginRight: 8,
		marginTop: 3,
	},
	icons: {
		display: "flex",
		flexDirection: "row",
		marginRight: 25,
	},
	expenseTitle: {
		fontSize: 17,
		marginRight: 8,
		maxWidth: Dimensions.get("window").width - 260,
		flexWrap: "wrap",
	},
	expensePrice: {
		fontSize: 17,
		color: "#f60404",
	},
	sum: {
		color: "#f60404",
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 5,
	},
	summary: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: "5%",
		marginRight: "8%",
		borderTopColor: "black",
		borderTopWidth: 1,
	},
	sumHeader: {
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 5,
	},
});

export default Spending;
