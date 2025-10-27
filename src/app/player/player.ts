import { Component, OnInit } from '@angular/core';
import { SpotifyAlbumService } from '../services/spotify-api/spotify-album-service';
import { Album } from '../interfaces/album';
import { Observable, map, switchMap } from 'rxjs'; 
import { Track } from '../interfaces/track'; 
import { Image } from '../interfaces/image';
import { PlayerStateService } from '../services/general/player-state-service'; 

interface PlayerData {
  current_track: Track | undefined; 
  queue: Track[]; 
  cover: Image | undefined;
}

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit{

  playerData$: Observable<PlayerData>; 

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private _playerState: PlayerStateService 
  ){
    this.playerData$ = this._playerState.currentContentId$.pipe(
      switchMap(albumId => {
        return this._spotifyAlbum.getAlbum(albumId).pipe(
          map(album => {
            const tracks = album.tracks || [];
            
            const current_track = tracks.at(0); 
            const queue = tracks.slice(1);
            const cover = album.images.at(0);

            return {
              current_track: current_track,
              queue: queue,
              cover: cover
            } as PlayerData; 
          })
        );
      })
    );
  }

  ngOnInit(): void {
  }

}