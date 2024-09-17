import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;  // Use ! to assert non-null

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ลงทะเบียนสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
