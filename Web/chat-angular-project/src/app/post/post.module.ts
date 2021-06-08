import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutingModule } from './post.routing';
import { HttpClientModule } from '@angular/common/http';


import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { PostItemComponent } from './post-item/post-item.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    SliderModule,
    CardModule
    
  ]
})
export class PostModule { }
