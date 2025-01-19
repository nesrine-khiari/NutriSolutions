import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
})
export class GetInitialsPipe implements PipeTransform {
  transform(fullName: string): string {
    return fullName.split(' ')[0][0] + '.' + fullName.split(' ')[1][0];
  }
}
