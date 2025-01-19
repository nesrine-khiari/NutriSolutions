export class AppUtils {
  static getCssVariable(variableName: string): string {
    // Fetch the root element's styles
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  static getErrorMessage(error: any): string {
    return error?.error?.message || 'An error occurred';
  }

}
