import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../models/policy';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  // allPolicies: Policy[] = []
  policyUrl = `${environment.apiUrl}/policies`;
  constructor(private http: HttpClient) {  }
  refreshPolicies() {
   return  this.http.get<Policy[]>(this.policyUrl)
  }

}
