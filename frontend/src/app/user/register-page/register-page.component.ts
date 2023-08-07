import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchesValidator } from 'src/app/utils/password-matches';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  form: FormGroup;
  usernameRegex = /^[a-zA-Z0-9\-\.\_]+$/;
  nameRegex = /^[a-zA-Z\-]+$/;


  constructor(private fb: FormBuilder){}

   
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4), Validators.pattern(this.usernameRegex)]],
      first_name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(this.nameRegex)]],
      password: [
        '',
        [Validators.minLength(8), Validators.required]
      ],
      confirmPassword: ['', [Validators.required]]
    },
    {
      updateOn: 'blur',
      validators: [passwordMatchesValidator],
    }
    
    );
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get username() {
    return this.form.get('username')
  }

  get firstname() {
    return this.form.get('first_name')
  }


  get passwordDoesMatch() {
    return this.password.value === this.confirmPassword.value;
  }

  usernameError() {

    if (this.username.hasError('minlength')) {
      return 'Username must be at least 4 characters long.';
    }
  
    if (this.username.hasError('maxlength')) {
      return 'Username cannot exceed 20 characters.';
    }
    
  
    if (this.username.hasError('pattern')) {
      return 'Username can only contain alphanumeric characters, -,. and _.';
    }
  
    return this.username.hasError('required') ? 'Username is required.' : '';
  
  
    }


    firstNameError() {

      if (this.firstname.hasError('maxlength')) {
        return 'Name cannot exceed 50 characters.'
      }

      if (this.firstname.hasError('pattern'))  {
        return 'Name can only contain letters.'
      }

      return this.firstname.hasError('required') ? 'First name is required.' : '';

    }


  onSubmit() {
    console.log("Register Successful")
  }
  

}

