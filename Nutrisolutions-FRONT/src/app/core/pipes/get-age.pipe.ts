import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge',
})
@Injectable({
  providedIn: 'root',
})
export class GetAgePipe implements PipeTransform {
  transform(birthdate: Date): string {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age + ' ans';
  }
}
