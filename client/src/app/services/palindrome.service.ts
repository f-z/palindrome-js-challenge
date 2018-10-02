import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PalindromeApiService {
  uri = 'http://localhost:4000/palindromeunits';

  constructor(private http: HttpClient) {}

  addPalindromeUnit(palindrome, date) {
    const obj = {
      palindrome: palindrome,
      date: date
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe();
  }
}