import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http:HttpClient) { 
    console.log('Spotify Service Listo');
  }

  obtenerToken(){     
        this.http.get('').subscribe((data:any) => {
          localStorage.setItem('token',data.access_token);
        })    
  }

  getQuery ( query:string){
    
    
    
    // .pipe(map( data => data['access_token']))

    const url=`${environment.SpotifyGet}${query}`

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
