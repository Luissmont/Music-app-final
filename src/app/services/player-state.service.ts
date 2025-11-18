import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  
  private defaultAlbumId = '4aawyAB9vmqN3uQ7FjRGTy';

  private currentAlbumIdSubject = new BehaviorSubject<string>(this.defaultAlbumId);
  currentAlbumId$ = this.currentAlbumIdSubject.asObservable();

  currentAlbum$ = this.currentAlbumId$.pipe(
    switchMap(id => this.spotify.getAlbum(id))
  );

  constructor(private spotify: SpotifyService) {}

  setCurrentAlbum(albumId: string): void {
    this.currentAlbumIdSubject.next(albumId);
  }
}