import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  registerForm:FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({

     name:[null, [Validators.required, Validators.minLength(10)]],
     email:[null, Validators.required,Validators.email],
     cep:[null,[Validators.required,Validators.maxLength(8)]],
     password:[null,[Validators.required,Validators.minLength(8)]],
     confirPassword:[null,[Validators.required,Validators.minLength(8)]]
    })
   }

  ngOnInit() {
  }

}
