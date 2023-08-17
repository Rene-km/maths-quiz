import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, first } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private jwt: JwtService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    }
    )
    
    
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  onSubmit() {
    this.auth.login(this.form.value).pipe(first()).subscribe( {
      next: () => {
        // get return url from query parameters or default to home page
        console.log(this.auth.userDetails)
        //this.router.navigateByUrl('learn');
    },
    error: error => {
      console.log(error);
    }
    })
  }



}
