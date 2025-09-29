import { UserPolicy } from "./user-policy";

export class Claim {
  constructor(
    public id: string,
    public userId: string,
    public userPolicyId: {},
    public incidentDate: string,
    public description: string,
    public amountClaimed: number,
    public status: 'PENDING' | 'APPROVED' | 'REJECTED',
    public decisionNotes?: string,
    public decidedByAgentId?: string,
    public createdAt?: string
  ) {}
}
