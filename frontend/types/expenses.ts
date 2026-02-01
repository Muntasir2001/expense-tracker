export interface Expense {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    expenseDateTime: string;
    createdAt: string;
}

export interface ExpenseApiResponse {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    expense_date_time: string;
    created_at: string;
}
