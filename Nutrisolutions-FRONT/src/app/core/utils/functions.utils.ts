export class AppUtils {
  static getCssVariable(variableName: string): string {
    // Fetch the root element's styles
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  static getInitials(fullName: string) {
    return fullName.split(' ')[0][0] + '.' + fullName.split(' ')[1][0];
  }
  static getErrorMessage(error: any): string {
    return error?.error?.message || 'An error occurred';
  }
  
}
