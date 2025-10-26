import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {

  private default_album_id = '4aawyAB9vmqN3uQ7FjRGTy'; 

  private _search_query = new BehaviorSubject<string>('');
  searchQuery$ = this._search_query.asObservable();

  private _search_results = new BehaviorSubject<any>(null);
  searchResults$ = this._search_results.asObservable();

  private _current_content_id = new BehaviorSubject<string>(this.default_album_id); 
  currentContentId$ = this._current_content_id.asObservable();

  constructor() { }

  setSearchQuery(query: string): void {
      this._search_query.next(query);
  }

  setSearchResults(results: any): void {
    this._search_results.next(results);
  }

  loadContent(id: string): void {
    if (id) {
        this._current_content_id.next(id);
    }
  }
}