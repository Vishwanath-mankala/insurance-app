export class DashboardStats {
  constructor(
    public totalPolicies: number,
    public activePolicies: number,
    public pendingClaims: number,
    public totalCoverage: number,
    public monthlyPremium: number,
    public upcomingPayments: number
  ) {}
}
