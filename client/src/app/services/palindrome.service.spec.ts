import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { PalindromeAPIService } from './palindrome.service';

describe('Palindrome API Service', () => {
  let mockBackend: MockBackend;
  let palindromeService: PalindromeAPIService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PalindromeAPIService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));

  it('should get all palindromes asynchronously',
    async(inject([PalindromeAPIService], (palindromeService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [{ "palindrome": "aba", "time": 1538594474 }]
            }
            )));
        });

      palindromeService.getAllPalindromes()
        .subscribe(
          (data) => {
            let response = data.json();
            expect(response.length).toBe(1);
            expect(response[0].palindrome).toBe("aba");
            expect(response[0].time).toBe(1538594474);
          });
    })));

  it('should insert a new palindrome entry',
    async(inject([PalindromeAPIService], (palindromeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // Checking if the REST type is the correct one (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: '{"success":true,"message":"Palindrome stored successfully"}' })));
      });

      let palindrome = 'aba';
      palindromeService.addPalindromeUnit(palindrome).subscribe(
        (data) => {
          expect(data).toBeDefined();
          expect(data['status']).toBe(200);
          let response = data.json();
          expect(response.success).toBe(true);
          expect(response.message).toBe("Palindrome stored successfully");
        });
    })));

  it('should not insert an entry that is not a palindrome',
    async(inject([PalindromeAPIService], (palindromeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // Checking if the REST type is the correct one (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: '{"success":false,"message":"Not a palindrome!"}' })));
      });

      let palindrome = 'ab';
      palindromeService.addPalindromeUnit(palindrome).subscribe(
        (data) => {
          expect(data).toBeDefined();
          expect(data.status).toBe(200);
          let response = data.json();
          expect(response.success).toBe(false);
          expect(response.message).toBe("Not a palindrome!");
        });
    })));
});
