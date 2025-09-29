import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  authUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private router:Router) {
    if (this.checkLogin()) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const user: User = {
          id: decodedToken.userid,
          name: decodedToken.name,
          email: decodedToken.email,
          role: decodedToken.role,
        };
        this.userSubject.next(user);
        router.navigate(['/home'])
      }
    }
  }

  checkLogin(): boolean {
    const token = localStorage.getItem('token');
    const loggedIn = !!token && !this.jwtHelper.isTokenExpired(token);

    if (!loggedIn) {
      this.userSubject.next(null); // clear user if token expired
      localStorage.removeItem('token');
    }

    return loggedIn;
  }
  register(name: string, email: string, password: string, role: string) {
    return this.http.post<User>(`${this.authUrl}/register`, {
      name,
      email,
      password,
      role,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: User }>(`${this.authUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.userSubject.next(response.user);
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
