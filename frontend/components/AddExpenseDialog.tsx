import { Dispatch, SetStateAction } from "react";

import {
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Datepicker from "./Datepicker";

interface AddExpenseDialogProps {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    note: string;
    setNote: Dispatch<SetStateAction<string>>;
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
    expenseDate: Date | undefined;
    setExpenseDate: Dispatch<SetStateAction<Date | undefined>>;
    handleAddExpense: (e: React.SubmitEvent) => Promise<void>;
}

const AddExpenseDialog = ({
    expenseDate,
    setExpenseDate,
    handleAddExpense,
    title,
    setTitle,
    description,
    setDescription,
    note,
    setNote,
    amount,
    setAmount,
}: AddExpenseDialogProps) => {
    return (
        // <form>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogDescription>
                    Fill out the information below to add new expense.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddExpense}>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Groceries"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Bought from Asda"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="note">Note</Label>
                        <Textarea
                            id="note"
                            name="note"
                            placeholder="Split between your friend"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="expense-date">Expense Date</Label>
                        <Datepicker
                            date={expenseDate}
                            setDate={setExpenseDate}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="24.23"
                            value={amount}
                            onChange={(e) =>
                                setAmount(parseFloat(e.target.value))
                            }
                            required
                        />
                    </Field>
                </FieldGroup>
                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
        // </form>
    );
};

export default AddExpenseDialog;
