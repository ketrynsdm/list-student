import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListStudentService {
  private urlApi = "https://6467a872e99f0ba0a814b5ff.mockapi.io/api/Pessoas";
  private localStorageKey = 'alunoData';
  
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.urlApi).pipe(
      tap(data => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
      })
    );
  }

  getLocalStorage(): any {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  private generateId(data: any[]): number {
    return data.length > 0 ? Math.max(...data.map(pessoa => pessoa.id)) + 1 : 1;
  }

  newStudent(newstudent: any) {
    const currentData = this.getLocalStorage() || [];
    newstudent.id = this.generateId(currentData); 
    currentData.push(newstudent);
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentData));
  
  }

  updateStudent(student: any) {
    let currentData = this.getLocalStorage() || [];
    const findStudent = currentData.find((data: any) => data.PessoaId && data.PessoaId === student.PessoaId);
    if(findStudent) {
      currentData = currentData.map((item: any) => item.PessoaId === student.PessoaId ? student : item);
      localStorage.setItem(this.localStorageKey, JSON.stringify(currentData));
      return
    }
    currentData.push(student)
    localStorage.setItem(this.localStorageKey, JSON.stringify(currentData));
  }

  deleteStudent(PessoaId: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${PessoaId}`).pipe(
      tap(() => {
        let currentData = this.getLocalStorage();
        currentData = currentData.filter((pessoa: any) => pessoa.id !== PessoaId);
        localStorage.setItem(this.localStorageKey, JSON.stringify(currentData));
      })
    );
  }

}
