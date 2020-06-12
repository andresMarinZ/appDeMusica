import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas:any[] = [];
  loading:boolean;
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(termino){
    this.loading=true;
    this.spotifyService.getArtistas(termino).subscribe( artista =>{
      this.artistas = artista;
      this.loading=false;
    })
  }
}
