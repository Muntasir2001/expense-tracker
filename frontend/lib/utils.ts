import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Expense, ExpenseApiResponse } from "@/types/expenses";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mapApiResponseToExpense(apiData: ExpenseApiResponse): Expense {
    return {
        id: apiData.id,
        title: apiData.title,
        description: apiData.description,
        note: apiData.note,
        amount: apiData.amount,
        vat: apiData.vat,
        expenseDate: apiData.expense_date,
        createdAt: apiData.created_at,
    };
}
