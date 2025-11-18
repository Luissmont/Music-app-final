import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-controller.html',
  styleUrl: './audio-controller.css'
})
export class AudioController {
  isPlaying = false;

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }
}