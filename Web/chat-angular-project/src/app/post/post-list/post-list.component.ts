import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postFormFroup: FormGroup;
  posts: Post[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPosts();
    this.initPostFormGroup();
  }

  private initPostFormGroup(): void {
    this.postFormFroup = this.formBuilder.group({
      id: 0,
      title: [undefined],
      text: [undefined]
    })
  }

  private initPosts(): void {
    this.posts = [
      {
        id: 1,
        title: 'test',
        text: 'test'
      }
    ]
  }

}