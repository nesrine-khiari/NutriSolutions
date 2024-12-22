import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  uploadedImage: string | null = null;

  @Output() imageSelected = new EventEmitter<File>();

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
}
