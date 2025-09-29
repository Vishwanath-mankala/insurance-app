// src/app/services/policy.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy';
import { environment } from '../../environments/environment';
import { UserPolicy } from '../models/user-policy';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private policyUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  /** =====================
   *  Policy Product APIs
   *  ===================== */

  // GET: All available policies (public)
  getAllPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.policyUrl}/policies`);
  }

  // GET: Policy details by ID (public)
  getPolicyDetails(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.policyUrl}/policies/${id}`);
  }

  // POST: Create a new policy (Admin only)
  createPolicy(policy: Partial<Policy>): Observable<any> {
    return this.http.post(`${this.policyUrl}/policies/create`, policy);
  }

  // DELETE: Delete a policy (Admin only)
  deletePolicy(id: string): Observable<any> {
    return this.http.delete(`${this.policyUrl}/policies/delete/${id}`);
  }

  /** =====================
   *  User Policy APIs
   *  ===================== */

  // POST: Purchase a policy (Customer only)
  purchasePolicy(
    policyId: string,
    payload: { termMonths: number; nominee: Object; assignedAgentId?: string }
  ): Observable<any> {
    return this.http.post(`${this.policyUrl}/policies/${policyId}/purchase`, payload);
  }

  // GET: User's purchased policies
  getUserPolicies(): Observable<UserPolicy[]> {
    return this.http.get<UserPolicy[]>(`${this.policyUrl}/user/`);
    // 🔹 make sure your backend has /policies/my-policies route,
    // if not, you can mount getUserPolicies() on /users/me/policies
  }

  // POST/PUT/DELETE: Cancel user policy
  cancelPolicy(policyId: string): Observable<any> {
    return this.http.put(`${this.policyUrl}/user/${policyId}/cancel`, {});
    // 🔹 backend cancelPolicy is POST or DELETE? adjust accordingly.
  }
}
