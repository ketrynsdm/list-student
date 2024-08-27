import { Component, OnInit } from '@angular/core';
import { ListStudentService } from './services/list-student.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading: boolean = false;
  public loadingPercent = 100;
  currentyPlayback = 0;
  color: ThemePalette = 'primary';

  constructor(
    private service: ListStudentService,
  ) { }

  ngOnInit():void {
    this._getApi()
  }


  _getApi(): void {
    this.loading = true
    setTimeout(() => {
      this.service.get().subscribe({
        next: (data) => {
          this.loading = false;
          
        },
        error: (error) => {
          this.loading = false
          
        },
        complete: () => {
          this.loading = false
          
        },
      });
    },2000)
  }

}
