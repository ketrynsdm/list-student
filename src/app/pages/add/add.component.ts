import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListStudentService } from '@app/services/list-student.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: ListStudentService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  formTable = this.fb.group({
    id: [''],
    Nome: ['', [Validators.required]],
    Email: ['', [Validators.required]],
    Sexo: ['', [Validators.required]],
    DataNascimento: [new Date().toDateString()],
  });

  _addNewStudent($event: any): void {
    const { Nome, Email, Sexo, DataNascimento} = this.formTable.getRawValue()
    const newStudent = { Nome, Email, Sexo, DataNascimento };
    this.service.newStudent(newStudent);
    this.formTable.reset(); 
    this.router.navigate(['/home']);
  }

  _cancel() {
    this.router.navigate(['/home']);

  }

}
