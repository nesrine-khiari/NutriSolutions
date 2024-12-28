import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { APP_API } from 'src/app/core/constants/constants.config';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() uploadedImage: string = '';

  @Output() imageSelected = new EventEmitter<File>();
  base_url = APP_API.base_url;
  triggerFileInput(): void {
    console.log('clicked');
    if (this.fileInput?.nativeElement) {
      console.log('found fileInput');
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageSelected.emit(file); // Emit the selected file to the parent component

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.uploadedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  getImageUrl(): string {
    return this.uploadedImage.includes('/uploads')
      ? `${this.base_url}${this.uploadedImage}`
      : this.uploadedImage;
  }
}
