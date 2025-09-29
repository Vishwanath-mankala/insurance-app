export class Payments {
  constructor(
    public id: string,
    public userPolicyId: any,
    public amount: number,
    public dueDate: string,
    public status: 'paid' | 'due' | 'overdue',
    public policyType: string,
    public createdAt?: string
  ) {}
}
