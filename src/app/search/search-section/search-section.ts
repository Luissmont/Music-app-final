import { Component, OnInit } from '@angular/core';
import { PlayerStateService } from '../../services/general/player-state-service';
import { Observable, of, switchMap } from 'rxjs'; 
import { Image } from '../../interfaces/image';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-search-section',
  standalone: false,
  templateUrl: './search-section.html',
  styleUrl: './search-section.css'
})
export class SearchSection implements OnInit{
  
  results$: Observable<any> = of(null);
  
  constructor(
    private _playerState: PlayerStateService,
    private _spotifySearch: SpotifySearchService,
    public _route: ActivatedRoute, 
    private _router: Router 
  ) {}

  ngOnInit(): void {
    this.results$ = this._route.params.pipe(
        switchMap(params => {
            const query = params['query'];
            if (query) {
                return this._spotifySearch.doSearch(query);
            }
            return of(null);
        })
    );
  }

  selectContent(id: string | undefined): void {
    if (!id) {
        console.error("ID de contenido no encontrado.");
        return;
    }
    
    this._playerState.loadContent(id); 
    this._router.navigate(['/']); 
  }

  getCover(images: Image[] | undefined): string {
    return images?.find(img => img.width >= 64)?.url || 'https://placehold.co/64x64/222831/FFFFFF?text=NO+IMG';
  }
}