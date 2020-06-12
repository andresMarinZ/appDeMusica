import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http:HttpClient) { 
    console.log('Spotify Service Listo');
  }

  obtenerToken(){
      // return this.http.get('https://spotyapp23.herokuapp.com/spotify/26624b14d77b4bd2871b5666f0a156aa/0703ad9d42be45cea86ab6db944dac3d').pipe(map( data => data['access_token']))
     
        this.http.get('https://spotyapp23.herokuapp.com/spotify/26624b14d77b4bd2871b5666f0a156aa/0703ad9d42be45cea86ab6db944dac3d').subscribe((data:any) => {
          localStorage.setItem('token',data.access_token);
        })    
  }

  getQuery ( query:string){
    
    
    
    // .pipe(map( data => data['access_token']))

    const url=`https://api.spotify.com/v1/${query}`

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ localStorage.getItem('token')
    })
    return this.http.get(url,{headers})
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20').pipe( map( data =>  data['albums'].items));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe( map( data => data['artists'].items));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`)
  }

  getTopTrack(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe( map( data => data['tracks']));
  }


}
