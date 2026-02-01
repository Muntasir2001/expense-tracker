export interface Expense {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    expenseDate: string;
    createdAt: string;
}

export interface ExpenseApiResponse {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    expense_date: string;
    created_at: string;
}
