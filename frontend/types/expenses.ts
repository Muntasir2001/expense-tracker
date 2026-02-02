export interface Expense {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    vat: number;
    expenseDate: string;
    createdAt: string;
}

export interface ExpenseApiResponse {
    id: string;
    title: string;
    description?: string;
    note?: string;
    amount: number;
    vat: number;
    expense_date: string;
    created_at: string;
}
