import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private http: HttpClient) {}
  agentUrl = `${environment.apiUrl}/agents`;

 createAgent(name: string, email: string, password: string) {
  return this.http.post(`${this.agentUrl}/`, {
    name,     // actual variable value
    email,
    password  // let backend hash it OR rename if backend expects passwordHash
  });
}


  getAgents() {
    return this.http.get(`${this.agentUrl}/`);
  }

  assignAgent(agentId: string, userPolicyId: string) {
    return this.http.put(`${this.agentUrl}/${agentId}/assign`, userPolicyId);
  }
}
