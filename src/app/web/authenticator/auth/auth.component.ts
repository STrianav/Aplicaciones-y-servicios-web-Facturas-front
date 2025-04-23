import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../../models/LoginModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceAuthService } from '../../../Api/api.service-auth.service';
import { ModuloGeneralModule } from '../../../shared/modulo-general.module';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  imports: [ModuloGeneralModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  loginModel: LoginModel = new LoginModel();

  constructor(
    private formBuilder: FormBuilder,
    private apiServiceAuthService: ApiServiceAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm(this.loginModel);
  }

  async Login() {
    if (this.formLogin.valid) {
      try {
        let response = await firstValueFrom(this.apiServiceAuthService.login(this.formLogin.value));
        localStorage.setItem('token', response.token);
        this.router.navigate(['navegador/inicio']);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text: "Correo o contraseña incorrectos."
        });
        console.error('Error de autenticación:', error);
      }
    } else {
      console.log('Formulario no válido:', this.formLogin);
      this.formLogin.markAllAsTouched(); // Muestra errores si los campos están vacíos
    }
  }

  validateForm(loginModel: LoginModel) {
    return new Promise((resolve) => {
      this.formLogin = this.formBuilder.group({
        email: [loginModel.email, [Validators.required, Validators.email, Validators.minLength(1)]],
        contrasena: [loginModel.contrasena, [Validators.required, Validators.minLength(1)]],
      });
      resolve(true);
    });
  }
}