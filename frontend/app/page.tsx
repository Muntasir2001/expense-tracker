"use client";

import { useState, useEffect } from "react";

import ExpenseTable from "@/components/ExpenseTable";
import type { Expense, ExpenseApiResponse } from "@/types/expenses";
import { mapApiResponseToExpense } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
    const [expenses, setExpenses] = useState<Array<Expense>>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState(0);
    const [vat, setVat] = useState(0);
    const [expenseDate, setExpenseDate] = useState<Date>();

    const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("expenseDate:", expenseDate);

        if (expenseDate) {
            const currentDate = new Date();

            if (expenseDate > currentDate) {
                toast.error("Expense date cannot be in the future");
                return;
            }
        } else {
            toast.error("Please select a valid expense date");
            return;
        }

        const expenseBody = {
            title,
            description,
            note,
            amount,
            vat,
            expense_date: expenseDate
                ? expenseDate.toISOString().split("T")[0]
                : undefined,
        };

        console.log("Adding expense:", expenseBody);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseBody),
        });

        if (res.ok) {
            const json = await res.json();
            const newExpense = mapApiResponseToExpense({
                ...expenseBody,
                id: json.expense_id,
                created_at: expenseBody.expense_date!,
                expense_date: expenseBody.expense_date!,
            });
            setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
            toast("Expense added successfully");
            setIsAddExpenseDialogOpen(false);
            // Clear form
            setTitle("");
            setDescription("");
            setNote("");
            setAmount(0);
            setExpenseDate(undefined);
        } else {
            toast.error("Failed to add expense");
        }
    };

    const handleEditExpense = async (
        expenseId: string,
        updatedData: {
            title: string;
            description?: string;
            note?: string;
            amount: number;
            vat: number;
            expense_date?: string;
        }
    ) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/expense/${expenseId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (res.ok) {
            const updatedExpense: Expense = {
                id: expenseId,
                title: updatedData.title,
                description: updatedData.description || undefined,
                note: updatedData.note || undefined,
                amount: updatedData.amount,
                vat: updatedData.vat,
                expenseDate: updatedData.expense_date!,
                createdAt:
                    expenses.find((e) => e.id === expenseId)?.createdAt || "",
            };
            setExpenses((prevExpenses) =>
                prevExpenses.map((exp) =>
                    exp.id === expenseId ? updatedExpense : exp
                )
            );
            toast("Expense updated successfully");
        } else {
            toast.error("Failed to update expense");
        }
    };

    const handleDeleteExpense = async (expenseId: string) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/expense/${expenseId}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) {
            setExpenses((prevExpenses) =>
                prevExpenses.filter((exp) => exp.id !== expenseId)
            );
            toast("Expense deleted successfully");
        } else {
            toast.error("Failed to delete expense");
        }
    };

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/expenses`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }
                const data = await response.json();
                setExpenses(
                    data.map((d: ExpenseApiResponse) =>
                        mapApiResponseToExpense(d)
                    )
                );
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div className="p-34">
            <header>
                <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            </header>
            <Dialog
                open={isAddExpenseDialogOpen}
                onOpenChange={setIsAddExpenseDialogOpen}
            >
                <DialogTrigger asChild>
                    <Button className="mb-10 mt-5 hover:cursor-pointer">
                        Add Expense
                    </Button>
                </DialogTrigger>
                <AddExpenseDialog
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    note={note}
                    setNote={setNote}
                    amount={amount}
                    setAmount={setAmount}
                    vat={vat}
                    setVat={setVat}
                    expenseDate={expenseDate}
                    setExpenseDate={setExpenseDate}
                    handleAddExpense={handleAddExpense}
                />
            </Dialog>
            <ExpenseTable
                expenses={expenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
            />
        </div>
    );
}
