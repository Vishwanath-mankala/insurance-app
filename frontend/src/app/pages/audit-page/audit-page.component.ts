import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService, AuditLogDto, AdminSummaryDto } from '../../services/admin.service';
import { CustomNavbarComponent } from '../../components/custom-navbar/custom-navbar.component';

@Component({
  selector: 'app-audit-page',
  standalone: true,
  imports: [CommonModule, CustomNavbarComponent],
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.css']
})
export class AuditPageComponent implements OnInit {
  view: 'audit' | 'summary' = 'audit';
  auditLogs: AuditLogDto[] = [];
  summary: AdminSummaryDto | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const last = segments[segments.length - 1]?.path;
      if (last === 'summary') {
        this.view = 'summary';
        this.fetchSummary();
      } else {
        this.view = 'audit';
        this.fetchAudit();
      }
    });
  }

  toAudit() {
    this.router.navigate(['/admin/audit']);
  }

  toSummary() {
    this.router.navigate(['/admin/summary']);
  }

  private fetchAudit() {
    this.loading = true;
    this.error = null;
    this.adminService.getAuditLogs().subscribe({
      next: (logs) => {
        this.auditLogs = logs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load audit logs';
        this.loading = false;
        console.error(err);
      }
    });
  }

  private fetchSummary() {
    this.loading = true;
    this.error = null;
    this.adminService.getSummary().subscribe({
      next: (sum) => {
        this.summary = sum;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load summary';
        this.loading = false;
        console.error(err);
      }
    });
  }
}


