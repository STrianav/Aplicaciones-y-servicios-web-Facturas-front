import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ApiServiceAuthService } from '../../../Api/api.service-auth.service';
import { LoginModel } from '../../../models/LoginModel';
import { ModuloGeneralModule } from '../../../shared/modulo-general.module';
import { ApiService } from '../../../Api/api.service';

@Component({
  selector: 'app-auth',
  imports: [ModuloGeneralModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  loginModel: LoginModel = new LoginModel();
  datosUsuario: string = '';
  contraseña: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiServiceAuthService: ApiServiceAuthService,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.validateForm(this.loginModel);
  }

  async verificarContrasena(email: string, contrasena: string): Promise<any> {
    try {
      return await firstValueFrom(this.apiService.VerificarContrasena(email, contrasena));
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
    }
  }

  async Login() {
    if (this.formLogin.valid) {
      this.loginModel = this.formLogin.value as LoginModel;
      let contrasenaValida = await this.verificarContrasena(this.loginModel.email, this.loginModel.contrasena);
      if (contrasenaValida) {
        try {
          let response = await firstValueFrom(this.apiServiceAuthService.login(this.loginModel));

          if (!response || !response.token) {
            this.toastr.error('No se recibió un token válido', 'Error', {
              timeOut: 3000, progressBar: true, tapToDismiss: false,
            });
            return;
          }
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('roles', JSON.stringify(response.roles));
          sessionStorage.setItem('rutas', JSON.stringify(response.rutas));

          this.toastr.success('Has iniciado sesión', 'Éxito', {
            timeOut: 3000, progressBar: true, tapToDismiss: false,
          });
          // Redirijo a la página inicial:
          this.router.navigate(['navegador/inicio']);
        } catch (error) {
          console.error('Error de autenticación:', error);
        }
      } else {
        this.toastr.error('Correo o contraseña incorrectos.', 'Error', {
          timeOut: 3000, progressBar: true, tapToDismiss: false
        });
      }
    } else {
      this.showValidationMessages();
    }
  }


  showValidationMessages() {
    let controlMessages: any = {
      email: 'El campo correo Electrónico es obligatorio.',
      contrasena: 'El campo contraseña es obligatorio.'
    };
    Object.keys(controlMessages).forEach(control => {
      if (this.formLogin.controls[control].invalid) {
        this.toastr.warning(controlMessages[control], 'Atencion', {
          timeOut: 3000, progressBar: true, tapToDismiss: false,
        });
      }
    });
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