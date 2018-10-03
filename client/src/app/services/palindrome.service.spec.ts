import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
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
              body: [
                {
                  id: 26,
                  contentRendered: '<p><b>Hi there</b></p>',
                  contentMarkdown: '*Hi there*'
                }]
            }
            )));
        });

      palindromeService.getAllPalindromes()
        .subscribe(
          (data) => {
            let res = data.json();
            expect(res.length).toBe(1);
            expect(res[0].id).toBe(26);
            expect(res[0].contentMarkdown).toBe('*Hi there*');
          });
    })));

  it('should insert a new palindrome entry',
    async(inject([PalindromeAPIService], (palindromeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // Checking if the REST type is the correct one (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });

      let data = 'aba';
      palindromeService.addPalindromeUnit(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(200);
        });
    })));

    it('should not insert an entry that is not a palindrome',
    async(inject([PalindromeAPIService], (palindromeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // Checking if the REST type is the correct one (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });

      let data = 'ab';
      palindromeService.addPalindromeUnit(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          expect(successResult.status).toBe(200);
        });
    })));
});
