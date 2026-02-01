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

interface EditExpenseDialogProps {
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
    handleEditExpense: (e: React.FormEvent) => Promise<void>;
}

const EditExpenseDialog = ({
    expenseDate,
    setExpenseDate,
    handleEditExpense,
    title,
    setTitle,
    description,
    setDescription,
    note,
    setNote,
    amount,
    setAmount,
}: EditExpenseDialogProps) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
                <DialogDescription>
                    Update the information below to edit the expense.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditExpense}>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                            id="edit-title"
                            name="title"
                            placeholder="Groceries"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
                            name="description"
                            placeholder="Bought from Asda"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="edit-note">Note</Label>
                        <Textarea
                            id="edit-note"
                            name="note"
                            placeholder="Split between your friend"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="edit-expense-date">Date of Expense</Label>
                        <Datepicker
                            date={expenseDate}
                            setDate={setExpenseDate}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="edit-amount">Amount</Label>
                        <Input
                            id="edit-amount"
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
    );
};

export default EditExpenseDialog;
