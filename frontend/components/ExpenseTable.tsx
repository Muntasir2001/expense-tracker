import { useState } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditExpenseDialog from "./EditExpenseDialog";
import type { Expense } from "@/types/expenses";
import { toast } from "sonner";

interface Props {
    expenses?: Array<Expense>;
    onEdit: (
        expenseId: string,
        updatedData: {
            title: string;
            description?: string;
            note?: string;
            amount: number;
            vat: number;
            expense_date?: string;
        }
    ) => Promise<void>;
    onDelete: (expenseId: string) => void;
}

const ExpenseTable = ({ expenses, onEdit, onDelete }: Props) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState<string | null>(
        null
    );

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editNote, setEditNote] = useState("");
    const [editAmount, setEditAmount] = useState(0);
    const [editVat, setEditVat] = useState(0);
    const [editExpenseDate, setEditExpenseDate] = useState<Date>();

    const handleOpenEditDialog = (expense: Expense) => {
        setEditingExpenseId(expense.id);
        setEditTitle(expense.title);
        setEditDescription(expense.description || "");
        setEditNote(expense.note || "");
        setEditAmount(expense.amount);
        setEditVat(expense.vat);
        setEditExpenseDate(
            expense.expenseDate ? new Date(expense.expenseDate) : undefined
        );
        setIsEditDialogOpen(true);
    };

    const handleEditExpense = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingExpenseId) return;

        if (editExpenseDate) {
            const currentDate = new Date();

            if (editExpenseDate > currentDate) {
                toast.error("Expense date cannot be in the future");
                return;
            }
        } else {
            toast.error("Please select a valid expense date");
            return;
        }

        const updatedData = {
            title: editTitle,
            description: editDescription,
            note: editNote,
            amount: editAmount,
            vat: editVat,
            expense_date: editExpenseDate
                ? editExpenseDate.toISOString().split("T")[0]
                : undefined,
        };

        await onEdit(editingExpenseId, updatedData);

        // Clear form and close dialog
        setIsEditDialogOpen(false);
        setEditingExpenseId(null);
        setEditTitle("");
        setEditDescription("");
        setEditNote("");
        setEditAmount(0);
        setEditExpenseDate(undefined);
    };

    console.log("expenses:", expenses);
    return (
        <>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <EditExpenseDialog
                    title={editTitle}
                    setTitle={setEditTitle}
                    description={editDescription}
                    setDescription={setEditDescription}
                    note={editNote}
                    setNote={setEditNote}
                    amount={editAmount}
                    setAmount={setEditAmount}
                    vat={editVat}
                    setVat={setEditVat}
                    expenseDate={editExpenseDate}
                    setExpenseDate={setEditExpenseDate}
                    handleEditExpense={handleEditExpense}
                />
            </Dialog>

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
                        <TableHead className="font-bold">VAT (20%)</TableHead>
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
                                <TableCell>
                                    {new Date(
                                        expense.expenseDate
                                    ).toDateString()}
                                </TableCell>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell>{expense.note}</TableCell>
                                <TableCell>{expense.amount}</TableCell>
                                <TableCell>{expense.vat}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        className="hover:cursor-pointer"
                                        onClick={() =>
                                            handleOpenEditDialog(expense)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="ml-5 hover:cursor-pointer"
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete the
                                                    expense &apos;
                                                    {expense.title}&apos; (£
                                                    {expense.amount}).
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        onDelete(expense.id)
                                                    }
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ExpenseTable;
