import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpotifyService } from './services/spotify.service';
import { CookiesStorageService } from './services/cookies-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(
    private spotify: SpotifyService,
    private cookies: CookiesStorageService
  ) {}

  ngOnInit(): void {
    if (!this.cookies.isCookieValid('access_token')) {
      this.spotify.getAccessToken().subscribe();
    }
  }
}