import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesStorageService {
  
  constructor(private cookieService: CookieService) {}

  setKey(key: string, value: string, expires: Date): void {
    this.cookieService.set(key, value, expires);
  }

  getKeyValue(key: string): string {
    return this.cookieService.get(key);
  }

  exists(key: string): boolean {
    return this.cookieService.check(key);
  }

  isCookieValid(key: string): boolean {
    return this.exists(key) && this.getKeyValue(key) !== '';
  }
}