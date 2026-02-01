import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Title</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                    <TableHead className="font-bold">Note</TableHead>
                    <TableHead className="font-bold">Amount (£)</TableHead>
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
                            <TableCell>{expense.expenseDate}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.note}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                            <TableCell className="text-right">
                                <Button className="hover:cursor-pointer">
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="ml-5 hover:cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default ExpenseTable;
