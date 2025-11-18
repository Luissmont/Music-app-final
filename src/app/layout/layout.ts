import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from '../components/search-bar/search-bar';
import { Playlist } from '../components/playlist/playlist';
import { AudioController } from '../components/audio-controller/audio-controller';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SearchBar, Playlist, AudioController],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {}