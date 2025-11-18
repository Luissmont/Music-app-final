import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStateService } from '../../services/player-state.service';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, switchMap, map } from 'rxjs';
import { Track } from '../../interfaces/track';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  currentTrack$: Observable<Track | undefined>;

  constructor(
    public playerState: PlayerStateService,
    private spotify: SpotifyService
  ) {
    this.currentTrack$ = this.playerState.currentAlbumId$.pipe(
      switchMap(albumId => this.spotify.getAlbum(albumId)),
      map(album => album.tracks.items[0])
    );
  }
}