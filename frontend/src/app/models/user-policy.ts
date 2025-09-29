import { Policy } from "./policy";

export class UserPolicy {
  constructor(
    public _id: string,
    public userId: string,
    public policyProductId: Policy,
    public startDate: string,
    public endDate: string,
    public premiumPaid: number,
    public status: 'active' | 'cancelled' | 'expired',
    public assignedAgentId?: string,
    public nominee?: { name: string; relation: string },
    public createdAt?: string
  ) {}
}
