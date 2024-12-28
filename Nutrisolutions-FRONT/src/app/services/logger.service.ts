import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private isProduction: boolean;

  constructor() {
    // Set the environment dynamically if needed.
    this.isProduction = false; // Replace with your environment condition
  }

  info(message: string, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.info(`INFO: ${message}`, ...optionalParams);
    }
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.warn(`WARN: ${message}`, ...optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]): void {
    console.error(`ERROR: ${message}`, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.debug(`DEBUG: ${message}`, ...optionalParams);
    }
  }

  log(message: string, ...optionalParams: any[]): void {
    if (!this.isProduction) {
      console.log(`LOG: ${message}`, ...optionalParams);
    }
  }
}
