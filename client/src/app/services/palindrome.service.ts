import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PalindromeApiService {
  uri = 'http://localhost:4000/palindromes/';

  constructor(private http: HttpClient) { }

  // Function to store a new palindrome to the database, along with a timestamp
  addPalindromeUnit(palindrome, time) {
    const obj = {
      palindrome: palindrome,
      time: time
    };
    this.http.post(`${this.uri}/post`, obj)
      .subscribe();
  }

  // Function to get all listings from the database
  getAllPalindromes() {
    return this.http
      .get(this.uri + 'get')
     // .map(res => res.json());
  }
}