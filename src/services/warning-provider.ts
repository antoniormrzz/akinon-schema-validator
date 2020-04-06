import { Warning } from '../types/warning';

export class WarningProvider {
  private warnings: Warning[] = [];
  private static instance: WarningProvider;

  public static getInstance = () => {
    if (WarningProvider.instance) {
      return WarningProvider.instance;
    } else {
      WarningProvider.instance = new WarningProvider();
      return WarningProvider.instance;
    }
  };

  getWarnings() {
    return [...this.warnings];
  }
  addWarning(w: Warning) {
    this.warnings.push(w);
  }
  clearWarnings() {
    this.warnings = [];
  }
}
