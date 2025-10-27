import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Player } from './player/player';
import { AudioController } from './audio-controller/audio-controller';
import { SearchSection } from './search/search-section/search-section'; 

const routes: Routes = [
  {
    path: '',
    component:Player, 
    title: 'Player Music'
  },
  {
    path: 'search/:query', 
    component: SearchSection,
    title: 'Search Results'
  },
  {
    path:'controller',
    component: AudioController
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }