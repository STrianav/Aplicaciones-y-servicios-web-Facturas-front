import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ApiServiceAuthService } from '../../../Api/api.service-auth.service';
import { LoginModel } from '../../../models/LoginModel';
import { ModuloGeneralModule } from '../../../shared/modulo-general.module';

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
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.validateForm(this.loginModel);
  }

  async Login() {
    if (this.formLogin.valid) {
      try {
        // Realizo la petición:
        let response = await firstValueFrom(this.apiServiceAuthService.login(this.formLogin.value));
        // Verifico que la respuesta contiene un token:
        if (!response || !response.token) {
          this.toastr.error('No se recibió un token válido', 'Error', {
            timeOut: 3000, progressBar: true, tapToDismiss: false,
          });
          return;
        }
        // Guardo el token en => localStorage:
        localStorage.setItem('token', response.token);
        // Obtengo el email que se ingreso en el formulario de login:
        let email = this.formLogin.get('email')?.value || '';
        // Realizo petición para obtener el rol del usuario:
        let rolResponse = await firstValueFrom(this.apiServiceAuthService.obtenerRol(email));
        // Verifico que se recibió un rol:
        if (!rolResponse || !rolResponse.rol) {
          this.toastr.error('No se pudo obtener el rol del usuario', 'Error', {
            timeOut: 3000, progressBar: true, tapToDismiss: false,
          });
          return;
        }
        // Guardo el rol y el email => localStorage, para uso posterior:
        localStorage.setItem('rol', rolResponse.rol);
        localStorage.setItem('email', email);
        // Muestro mensaje de éxito:
        this.toastr.success(`Has iniciado sesión como: ${rolResponse.rol}`, 'Éxito', {
          timeOut: 3000, progressBar: true, tapToDismiss: false,
        });
        // Redirijo a la página inicial:
        this.router.navigate(['navegador/inicio']);
      } catch (error) {
        // Mostramos mensaje en caso de error:
        this.toastr.error('Correo o contraseña incorrectos.', 'Error', {
          timeOut: 3000, progressBar: true, tapToDismiss: false,
        });
        console.error('Error de autenticación:', error);
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