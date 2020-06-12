import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimagen'
})
export class NoimagenPipe implements PipeTransform {

  transform(img:any[]): string {
    if (!img) {
      return 'assets/img/noimagen.png';
    }

    if (img.length > 0) {
      return img[0].url;
    } else {
      return 'assets/img/noimagen.png';
    }
  }

}
