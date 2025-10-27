import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';
import { PlayerStateService } from '../../services/general/player-state-service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, filter } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit, OnDestroy {
  
  @ViewChild('searchBarContainer') searchBarContainer!: ElementRef;
  searchControl = new FormControl('');
  private subscription = new Subscription();
  
  isSuggestionsOpen: boolean = false; 

  constructor(
    private _spotifySearch: SpotifySearchService,
    public _playerState: PlayerStateService, 
    private _router: Router
  ){}

  ngOnInit(): void {
    const instantSearchSub = this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      filter(query => query !== null && query.trim().length > 0)
    ).subscribe(query => {
      this._playerState.setSearchQuery(query as string);
      this.doInstantSearch(query as string);
    });

    this.subscription.add(instantSearchSub);
    
    const emptySearchSub = this.searchControl.valueChanges.pipe(
        debounceTime(100),
        filter(query => query === null || query.trim().length === 0)
    ).subscribe(() => {
        this.isSuggestionsOpen = false;
        this._playerState.setSearchResults(null);
        this._playerState.setSearchQuery('');
    });

    this.subscription.add(emptySearchSub);
  }
  
  doInstantSearch(query: string): void {
    this._spotifySearch.doSearch(query).subscribe({
      next: (data) => {
        this._playerState.setSearchResults(data); 
        this.isSuggestionsOpen = true; 
      },
      error: (err) => console.error("Error en búsqueda instantánea:", err)
    });
  }

  doFullSearch(): void{
    const query = this.searchControl.value;
    if (query && query.trim()) {
      this.isSuggestionsOpen = false; 
      this._router.navigate(['/search', query.trim()]); 
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.searchBarContainer.nativeElement.contains(event.target)) {
      this.isSuggestionsOpen = false;
    }
  }

  onFocus() {
    if (this.searchControl.value && this.searchControl.value.trim().length > 0) {
      this.isSuggestionsOpen = true;
    }
  }

  onSelectSuggestion(id: string): void {
      this._playerState.loadContent(id);
      this.isSuggestionsOpen = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}