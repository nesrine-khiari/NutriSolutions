import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { APP_API } from 'src/app/core/constants/constants.config';
import { AppUtils } from 'src/app/core/utils/functions.utils';
// import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import {
  NutritionistModel,
  StatusEnum,
  StatusEnumFilter,
  TrieEnum,
} from 'src/app/models/nutritionist.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-nutritionists-table',
  templateUrl: './nutritionists-table.component.html',
  styleUrls: [
    './nutritionists-table.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class NutritionistsTableComponent {
  base_url = APP_API.base_url;
  searchControl: FormControl = new FormControl('');
  trieControl: FormControl = new FormControl(TrieEnum.ALL);
  statusControl: FormControl = new FormControl(StatusEnumFilter.ALL);
  statusOptions = Object.values(StatusEnumFilter);
  trieOptions = Object.values(TrieEnum);
  statusEnum = StatusEnum;
  nutritionists: NutritionistModel[] = [];
  nutritionistService = inject(NutritionistsService);
  toastr = inject(ToastrService);
  totalNutritionistsCount: number = 0;
  currentPage: number = 0;
  limit: number = 12;
  isLoading: boolean = false;
  pageIndex: number = 0;
  constructor() {
    this.nutritionistService.getAllNutritionists().subscribe((response) => {
      this.nutritionists = response.data;
    });
  }

  updateStatus(nutritionist: NutritionistModel, newStatus: StatusEnum): void {
    this.nutritionistService
      .updateNutritionist(nutritionist.id!, newStatus)
      .subscribe({
        next: (response) => {
          // Success callback
          this.toastr.success('Status updated successfully!');
          nutritionist.status = newStatus;
        },
        error: (error) => {
          // Error callback
          this.toastr.error('Error updating status', 'Error');
        },
      });
  }
  highlightText(content: string, search: string): string {
    if (!search) {
      return content;
    } // Return the original content if search is empty

    // Escape special characters in the search term
    const escapedSearch = search.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');

    // Create a case-insensitive regex for the search term
    const regex = new RegExp(`(${escapedSearch})`, 'gi');

    // Wrap matches with a span
    return content.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  }
  uploadService = inject(FileUploadService);
  downloadCertificate(filename: string) {
    this.uploadService.downloadCertificate(filename).subscribe({
      next: (blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename; // Use the original filename
        link.click();
        URL.revokeObjectURL(link.href); // Clean up
      },
      error: (error) => {
        console.error('Error downloading file:', error);
      },
    });
  }

  getTotalPageNumber() {
    return Math.ceil(this.totalNutritionistsCount / this.limit);
  }

  updatePage(index: number) {
    this.currentPage = index;
    this.isLoading = true;

    this.nutritionistService.getAllNutritionists(this.currentPage).subscribe({
      next: (response) => {
        this.nutritionists = response.data;
        this.totalNutritionistsCount = response.total;
        // H
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        this.isLoading = false; // H
      },
    });
  }
}
