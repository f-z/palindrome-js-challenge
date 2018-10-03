import { Component } from '@angular/core';
import { PalindromeApiService } from './services/palindrome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rocketship';

  // Palindrome to be stored
  palindrome: string;

  storedPalindromes: any;

  constructor(private palService: PalindromeApiService) {
    this.palindrome = 'dcabacd';
    // this.savePalindrome(this.palindrome, new Date().getTime() / 1000);

    this.palService.getAllPalindromes().subscribe(result => {
      this.storedPalindromes = result;
    })
  }

  savePalindrome(palindrome, date) {
    this.palService.addPalindromeUnit(palindrome, date);
  }
}
