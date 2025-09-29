import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuditLogDto {
  _id: string;
  userId?: string;
  action: string;
  entity?: string;
  metadata?: any;
  timestamp: string;
}

export interface AdminSummaryDto {
  userCount: number;
  policiesSold: number;
  claimsPending: number;
  totalPayments: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private adminUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getAuditLogs(): Observable<AuditLogDto[]> {
    return this.http.get<AuditLogDto[]>(`${this.adminUrl}/audit`);
  }

  getSummary(): Observable<AdminSummaryDto> {
    return this.http.get<AdminSummaryDto>(`${this.adminUrl}/summary`);
  }
}


