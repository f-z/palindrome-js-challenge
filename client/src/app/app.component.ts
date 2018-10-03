import { Component } from "@angular/core";
import { PalindromeAPIService } from "./services/palindrome.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Palindrome Rocketship";

  // Palindrome to be stored
  palindrome: string;
  message: string;

  storedPalindromes: any;

  constructor(private palService: PalindromeAPIService) {
    this.palindrome = "";
    this.message = "";

    this.palService.getAllPalindromes().subscribe(result => {
      this.storedPalindromes = result.json();
    });
  }

  // Function to store a palindrome to the database, along with the current time (in Unix)
  savePalindrome(palindrome): any {
    this.palService.addPalindromeUnit(
      palindrome,
      new Date().getTime() / 1000
    ).subscribe(res => {
      this.message = res.json().message;
    });
  }
}
