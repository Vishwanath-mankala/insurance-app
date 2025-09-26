import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null)
  user$ = this.userSubject.asObservable();
  authUrl = 'http://localhost:4000/api/auth';
  
  register(name:String, email:String, password:String,role:String){
    
  }
  
  login(){

  }
  constructor() { }
}
