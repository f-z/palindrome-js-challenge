import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class PalindromeAPIService {
  uri = "http://localhost:4000/palindromes/";

  constructor(private http: Http) { }

  // Function to store a new palindrome to the database, along with a timestamp
  addPalindromeUnit(palindrome, time): any {
    const obj = {
      palindrome: palindrome,
      time: time
    };

    return this.http.post(`${this.uri}/post`, obj);
  }

  // Function to get all listings from the database
  getAllPalindromes() {
    return this.http.get(this.uri + "get");
  }
}
