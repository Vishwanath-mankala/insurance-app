import { UserPolicy } from "./user-policy";

export class Claim {
  constructor(
    public _id: string,
    public userId: string,
    public userPolicyId: {policyProductId:string},
    public incidentDate: string,
    public description: string,
    public amountClaimed: number,
    public status: 'PENDING' | 'APPROVED' | 'REJECTED',
    public decisionNotes?: string,
    public decidedByAgentId?: string,
    public createdAt?: string
  ) {}
}
