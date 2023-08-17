import { Injectable } from '@angular/core';
import { api } from '../utils/const';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User, UserDetails } from '../user/user.model';
import jwt_decode from "jwt-decode";


export interface registerForm {
  email: string,
  username: string,
  first_name: string,
  password: string

}

export interface loginForm {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  public get userValue() {
    return this.userSubject.value;
}

  public get userDetails() {
    return jwt_decode(this.userSubject.value.access)
  }




  register(registerForm: registerForm) {
    return this.http.post(`${api}user/register/`, registerForm);
  }


  login(loginform: loginForm) {
    return this.http.post<User>(`${api}api/token/`, loginform)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
} 



  
}
