import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.CLIENT_ID)
      .set('client_secret', environment.CLIENT_SECRET);

    return this.http.post<any>(
      environment.AUTH_API_URL,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  getAlbum(id: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/albums/${id}`);
  }

  quickSearch(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'album,track,artist')
      .set('limit', 5)
      .set('market', 'ES');

    return this.http.get(`${environment.API_URL}/search`, { params });
  }

  fullSearch(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'album,track,artist')
      .set('limit', 20)
      .set('market', 'ES');

    return this.http.get(`${environment.API_URL}/search`, { params });
  }

  getArtistAlbums(artistId: string): Observable<any> {
    const params = new HttpParams()
      .set('limit', 50)
      .set('market', 'ES');

    return this.http.get(`${environment.API_URL}/artists/${artistId}/albums`, { params });
  }
}