import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerStateService } from '../../services/player-state.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  results$: Observable<any>;
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotify: SpotifyService,
    private playerState: PlayerStateService
  ) {
    this.results$ = this.route.params.pipe(
      switchMap(params => {
        this.query = params['query'];
        return this.spotify.fullSearch(this.query);
      })
    );
  }

  selectAlbum(albumId: string): void {
    this.playerState.setCurrentAlbum(albumId);
    this.router.navigate(['/']);
  }

  selectArtist(artistId: string): void {
    this.router.navigate(['/artist', artistId]);
  }

  getCover(images: any[]): string {
    return images?.[0]?.url || 'https://placehold.co/64x64';
  }
}