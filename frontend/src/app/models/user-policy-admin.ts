export class UserPolicyAdmin {
  constructor(
    public _id: string,
    public policyProductId: string,
    public status: string,
    public premiumPaid: number,
    public userId: string,
    public startDate: string,
    public endDate: string,
    public nominee: { name: string; relation: string },
    public createdAt: string,
  ) {}
}
