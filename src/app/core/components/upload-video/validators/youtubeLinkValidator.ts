import { AbstractControl, ValidatorFn } from '@angular/forms';

export function youtubeLinkValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const youtubeLinkRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    const isValid = youtubeLinkRegex.test(control.value);
    return isValid ? null : { 'invalidYoutubeLink': { value: control.value } };
  };
}
