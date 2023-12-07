import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.restore()
  }

  registra(form: NgForm) {
    try {
      this.authSrv.register(form.value).subscribe();
           
    } catch (error: any) {
      alert(error);
      this.router.navigate(['register'])
    }
  }
}
