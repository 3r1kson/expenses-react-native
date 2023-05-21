import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../components/ExpensesOutput/UI/Button";
import IconButton from "../components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expenseCtx = useContext(ExpensesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId,
            {
              description: "Test",
              amount: 19.99,
              date: new Date("2023-5-20"),
            });
        } else {
            expenseCtx.addExpense({
                description: "Test 2",
                amount: 19.99,
                date: new Date("2023-5-19"),
            });
        }
        navigation.goBack();
    }


    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button mode="flat" onPress={cancelHandler} style={styles.button}>
            Cancel
          </Button>
          <Button onPress={confirmHandler} style={styles.button}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </View>
        {isEditing && (
          <View>
            <View style={styles.deleteContainer}>
              <IconButton
                icon={"trash"}
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
              />
            </View>
          </View>
        )}
      </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});