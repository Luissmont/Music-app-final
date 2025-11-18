import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerStateService } from '../../services/player-state.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class Playlist {
  tracks$: Observable<any[]>;
  albumCover$: Observable<string>;
  albumName$: Observable<string>;

  constructor(public playerState: PlayerStateService) {
    this.tracks$ = this.playerState.currentAlbum$.pipe(
      map(album => album?.tracks?.items || [])
    );

    this.albumCover$ = this.playerState.currentAlbum$.pipe(
      map(album => album?.images?.[0]?.url || '')
    );

    this.albumName$ = this.playerState.currentAlbum$.pipe(
      map(album => album?.name || '')
    );
  }
}