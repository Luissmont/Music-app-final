import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SongInfo } from './song-info/song-info';
import { AudioController } from './audio-controller/audio-controller';
import { Playlist } from './playlist/playlist';
import { Player } from './player/player';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; 
import { authInterceptor } from './interceptors/auth-interceptors';
import { addAuthHeaderInterceptor } from './interceptors/core/add-auth-header-interceptors';
import { SearchModule } from './search/search-module'; 

@NgModule({
  declarations: [
    App,
    SongInfo,
    AudioController,
    Playlist,
    Player
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        addAuthHeaderInterceptor
      ])
    ),
    CookieService, 
  ],
  bootstrap: [App]
})
export class AppModule { }