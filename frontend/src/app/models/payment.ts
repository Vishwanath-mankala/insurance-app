export class Payments {
  constructor(
    public id: string,
    public userPolicyId: any,
    public amount: number,
    public method:string,
    public status: 'paid' | 'due' | 'overdue',
    public createdAt?: string
  ) {}
}
