"use client";

import { useState, useEffect } from "react";

import ExpenseTable from "@/components/ExpenseTable";
import type { Expense, ExpenseApiResponse } from "@/types/expenses";
import { mapApiResponseToExpense } from "@/lib/utils";

export default function Page() {
    const [expenses, setExpenses] = useState<Array<Expense>>([]);

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
            <ExpenseTable expenses={expenses} />
        </div>
    );
}
