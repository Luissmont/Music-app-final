import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnDestroy {
  searchControl = new FormControl('');
  private subscription = new Subscription();

  constructor(private router: Router) {
    const searchSub = this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(query => query !== null && query.trim().length > 0)
    ).subscribe(query => {
      this.router.navigate(['/search', query!.trim()]);
    });

    this.subscription.add(searchSub);
  }

  onEnter(): void {
    const query = this.searchControl.value;
    if (query?.trim()) {
      this.router.navigate(['/search', query.trim()]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}