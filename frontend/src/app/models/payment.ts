export class Payments {
  constructor(
    public id: string,
    public policyId: string,
    public amount: number,
    public dueDate: string,
    public status: 'paid' | 'due' | 'overdue',
    public policyType: string
  ) {}
}
