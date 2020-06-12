import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  constructor(private spotifyService: SpotifyService) {

  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.token();
      setTimeout(function(){
        location.reload();
      },2000);
      
    }
    this.releases();
   

  }

  token(){

    this.spotifyService.obtenerToken();
  }


  releases(){
    this.loading = true;
    this.error = false;
    this.spotifyService.getNewReleases().subscribe(data => {
      this.loading = false;
      this.nuevasCanciones = data;
    }, (error) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = error.error.error.message;
      if (this.mensajeError === 'The access token expired') {
        
        this.token(); 
        setTimeout(function(){
          location.reload();
        },2000);
      }
    })

  }









}
