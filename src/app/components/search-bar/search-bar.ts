import { Component, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerStateService } from '../../services/player-state.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnDestroy {
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  
  searchControl = new FormControl('');
  suggestions: any = null;
  showSuggestions = false;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private spotify: SpotifyService,
    private playerState: PlayerStateService
  ) {
    const searchSub = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query !== null && query.trim().length > 0)
    ).subscribe(query => {
      this.loadSuggestions(query!.trim());
    });

    const clearSub = this.searchControl.valueChanges.pipe(
      filter(query => !query || query.trim().length === 0)
    ).subscribe(() => {
      this.suggestions = null;
      this.showSuggestions = false;
    });

    this.subscription.add(searchSub);
    this.subscription.add(clearSub);
  }

  loadSuggestions(query: string): void {
    this.spotify.quickSearch(query).subscribe({
      next: (data) => {
        this.suggestions = data;
        this.showSuggestions = true;
      }
    });
  }

  onEnter(): void {
    const query = this.searchControl.value;
    if (query?.trim()) {
      this.showSuggestions = false;
      this.router.navigate(['/search', query.trim()]);
    }
  }

  selectAlbum(albumId: string): void {
    this.playerState.setCurrentAlbum(albumId);
    this.showSuggestions = false;
    this.searchControl.setValue('', { emitEvent: false });
    this.router.navigate(['/']);
  }

  selectArtist(artistId: string): void {
    this.showSuggestions = false;
    this.searchControl.setValue('', { emitEvent: false });
    this.router.navigate(['/artist', artistId]);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }

  getCover(images: any[]): string {
    return images?.[0]?.url || 'https://placehold.co/50x50';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}