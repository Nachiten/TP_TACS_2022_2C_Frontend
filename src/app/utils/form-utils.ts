import { FormControl } from '@angular/forms';

export const getControlValidClass = (control: FormControl<any>): string => {
  if (!control.touched) return '';
  return control.valid ? 'is-valid' : 'is-invalid';
};

export const controlHasError = (control: FormControl<any>, error: string): boolean => {
  return control.touched && control.hasError(error);
};
