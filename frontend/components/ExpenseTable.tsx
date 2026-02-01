import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Expense } from "@/types/expenses";

interface Props {
    expenses?: Array<Expense>;
}

const ExpenseTable = ({ expenses }: Props) => {
    return (
        <Table>
            <TableCaption>A list of your expenses.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25 font-bold">Num</TableHead>
                    <TableHead className="font-bold">Date & Time</TableHead>
                    <TableHead className="font-bold">Title</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                    <TableHead className="font-bold">Note</TableHead>
                    <TableHead className="text-right font-bold">
                        Amount
                    </TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses &&
                    expenses.length > 0 &&
                    expenses.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>{expense.expenseDateTime}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.note}</TableCell>
                            <TableCell className="text-right">
                                {expense.amount}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default ExpenseTable;
