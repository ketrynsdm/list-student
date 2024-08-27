import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Aluno } from '@app/model/aluno';
import { ListStudentService } from '@app/services/list-student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  student: Aluno[] = []
  itemsPerPage: number = 10;
  prevPage: number = 0;
  nextPage: number = 10;
  actualPage: number = 1;
  displayedColumns: string[] = [
    "Nome",
    "Email",
    "Sexo",
    "DataNascimento",
    "Adicionar",
    "Editar",
    "Delete"
  ]
  pessoaId!: number;

  formContactByPessoaId = this.formBuilder.group({
    pessoaId: [''],
    Nome: ["",[ Validators.required]],
    Email: ["", [Validators.required, Validators.email]],
    Sexo: [Validators.required],
    DataNascimento: [new Date().toDateString()],
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: ListStudentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getListagemApi()
  }

  _getListagemApi(): void {
    const localStorageData = this.service.getLocalStorage();
    this.student = localStorageData ? localStorageData : [];
  }

  getTableList(): Aluno[] {
    return this.student.slice(this.prevPage, this.nextPage)
  }

  add(): void {    
    this.router.navigate(["/adicionar"]);
  }
  onButtonClick(pessoaIdValue: number): void {    
    this.router.navigate(["/editar"], {
      queryParams: { pessoaId: pessoaIdValue },
    })
  }

  Delete(pessoaId: number):void{
    this.service.deleteStudent(pessoaId).subscribe(() => {
      this.student = this.student.filter(aluno => aluno.id == pessoaId)
    })
  }

  handlePagination(type: 'prev' | 'next'): void {
    if(type === 'prev') {
      this.prevPage = this.prevPage - this.itemsPerPage;
      this.nextPage = this.nextPage - this.itemsPerPage;
      this.actualPage = this.actualPage - 1;
      return
    }
    this.prevPage = this.prevPage + this.itemsPerPage;
    this.nextPage = this.nextPage + this.itemsPerPage;
    this.actualPage = this.actualPage + 1;
  }

  handleVerifyButtonPagination(type: 'prev' | 'next'): boolean {
    const getNumbersOfPage = this.student.length / this.itemsPerPage
    if(type === 'prev') {
      return this.actualPage <= 1
    }
    return this.actualPage >= getNumbersOfPage
  }

}
