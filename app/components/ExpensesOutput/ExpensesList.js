import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

import ExpensesOutput from "./ExpensesOutput";

function renderExpenseItem(item) {
    return <ExpenseItem {...item.item}/>
}

function ExpensesList({expenses}) {
    return (
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    );
}

export default ExpensesList;

