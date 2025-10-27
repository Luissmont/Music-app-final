import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  
  private _searchResults = new Subject<any>();
  public searchResults$ = this._searchResults.asObservable();

  constructor(
    private _http: HttpClient
  ) {}

  doSearch(q:string): Observable<any>{

    const params = new HttpParams()
      .set('q', q)
      .set('type','album,track')
      .set('limit', 10)
      .set('offset', 0) 
      .set('market', 'ES')

    const searchObs = this._http.get<any>(
      `${environment.API_URL}/search`,
      {
        params: params
      }
    )

    searchObs.subscribe(data => {
      this._searchResults.next(data)
    });
    
    return searchObs;
  }

}