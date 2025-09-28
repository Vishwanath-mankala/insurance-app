// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  info(msg: string)  { console.info('[INFO]', msg); }
  warn(msg: string)  { console.warn('[WARN]', msg); }
  error(msg: string) { console.error('[ERROR]', msg); }
}
