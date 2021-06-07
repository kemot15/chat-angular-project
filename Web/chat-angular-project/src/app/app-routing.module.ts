import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    },
    {
        path: 'posts',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    },
    {
        path: 'not-found', 
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '**', redirectTo: 'not-found'
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }