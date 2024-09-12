export class CustomValidators {
    static passwordValidator(password: string): string | null {
      //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      //minimum 6 characters:
      const regex = /^.{6,}$/;
      return regex.test(password) ? null : 'Password must contain at least 6 characters'; //including uppercase, lowercase, number, and special character.';
    }
  }
  