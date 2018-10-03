import { Component } from '@angular/core';
import { PalindromeApiService } from './services/palindrome.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rocketship';

  palindrome: string;

  constructor(private palService: PalindromeApiService) {
    // default values
    this.palindrome = 'aba';
    this.savePalindrome(this.palindrome, new Date().getTime() / 1000);

    this.palService.getAllPalindromes().subscribe(result => {console.log(result)})
  }

  savePalindrome(palindrome, date) {
    this.palService.addPalindromeUnit(palindrome, date);
  }
}
