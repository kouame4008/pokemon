import { delay, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirecturl: string;

  login(name: string, password: string): Observable<boolean> {
    this.isLoggedIn = (name == 'admin' && password == 'admin');

    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap((isLoggedIn) => this.isLoggedIn = this.isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
