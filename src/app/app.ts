import { Component, OnInit } from '@angular/core';
import { SpotifyLoginService } from './services/spotify-api/spotify-login-service';
import { CookiesStorageService } from './services/general/cookies-storage-service';
import { Router, NavigationEnd } from '@angular/router'; 
import { Observable, filter, map } from 'rxjs'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{

  showAudioController$: Observable<boolean>; 

  constructor(
    private _spotifyLogin: SpotifyLoginService,
    private _cookieStorage: CookiesStorageService,
    private _router: Router 
  ){
    this.showAudioController$ = this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => !event.urlAfterRedirects.includes('/search/'))
    );
  }

  ngOnInit(): void {
    if(!this._cookieStorage.exists('access_token') || !this._cookieStorage.isCookieValid('access_token')){
        this._spotifyLogin.getAccessToken().subscribe({
          next: () => console.log('Token de acceso obtenido y guardado.'),
          error: (err) => console.error('Error al obtener el token:', err)
        });
    } else {
      console.log('Token de acceso válido existente.');
    }
  }

}