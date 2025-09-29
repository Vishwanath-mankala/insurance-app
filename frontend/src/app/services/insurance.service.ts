import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { Payments } from '../models/payment';
import { DashboardStats } from '../models/dashboard-stats';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // -------------------
  // 📌 CLAIMS
  // -------------------

  /** Get all claims */
  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.baseUrl}/claims`);
  }

  /** Submit a new claim */
  submitClaim(payload: {
    userPolicyId: string;
    incidentDate: string;
    description: string;
    amountClaimed: number;
  }): Observable<{ message: string; claim: Claim }> {
    return this.http.post<{ message: string; claim: Claim }>(
      `${this.baseUrl}/claims`,
      payload
    );
  }

  /** Update claim status (agent/admin only) */
  updateClaimStatus(
    id: string,
    payload: { status: 'PENDING' | 'APPROVED' | 'REJECTED'; decisionNotes?: string }
  ): Observable<{ message: string; claim: Claim }> {
    return this.http.put<{ message: string; claim: Claim }>(
      `${this.baseUrl}/claims/${id}/status`,
      payload
    );
  }

  // -------------------
  // 📌 PAYMENTS
  // -------------------

  /** Get user repayments */
  getRepayments(): Observable<Payments[]> {
    return this.http.get<Payments[]>(`${this.baseUrl}/payments/user`);
  }

  /** Record a new payment */
  recordPayment(payload: {
    userPolicyId: string;
    amount: number;
    method: string;
  }): Observable<{ message: string; payment: Payments }> {
    return this.http.post<{ message: string; payment: Payments }>(
      `${this.baseUrl}/payments`,
      payload
    );
  }

}
