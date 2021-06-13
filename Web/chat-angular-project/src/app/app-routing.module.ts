import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'not-found', 
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
    }, 
    {
        path: '**', redirectTo: 'not-found'
    },
    {
        path: '',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    }
   
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }