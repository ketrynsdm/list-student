import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path: 'adicionar',
    component: AddComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'editar',
    component: EditComponent,
  },
  {
    path: "**",
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
