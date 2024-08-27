import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListStudentService } from '@app/services/list-student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formContactById!: FormGroup 
  pessoaId: number | any;
  valueStudent: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private service: ListStudentService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getparams()
    this.createForm();
  }

  getparams() {
    const getStudents = this.service.getLocalStorage();
    this.pessoaId = this.router.snapshot.queryParams['pessoaId'];
    this.valueStudent = getStudents.find((data: any) => data.PessoaId === this.pessoaId);
  }

  createForm(){
    this.formContactById = this.formBuilder.group({
      PessoaId: [this.valueStudent.PessoaId],
      Nome: [this.valueStudent.Nome,[ Validators.required]],
      Email: [this.valueStudent.Email, [Validators.required, Validators.email]],
      Sexo: [this.valueStudent.Sexo, [Validators.required]],
      DataNascimento: [this.valueStudent.DataNascimento],
    });
  }

  save() {
    const formContact = this.formContactById.getRawValue()
    this.service.updateStudent(formContact)
    this.route.navigate(['/home']);
  }

  _cancel() {
    this.route.navigate(['/home']);
  }

}
