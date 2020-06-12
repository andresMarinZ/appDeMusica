import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];
  constructor(private activatedRouter: ActivatedRoute,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
        this.getArtista(params['id']);
        this.getTopTrack(params['id']);
    })
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotifyService.getArtista(id).subscribe(artista => {
      this.artista = artista;
      this.loading = false;
    })
  }

  getTopTrack(id: string) {
    this.spotifyService.getTopTrack(id).subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks
    })
  }

}
