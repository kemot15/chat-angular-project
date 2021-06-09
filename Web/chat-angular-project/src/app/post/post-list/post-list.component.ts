import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postFormGroup: FormGroup;
  posts: Observable<Post[]>;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    console.log("cos tam");
    this.initPosts();
   this.initPostFormGroup();
  }

  private initPostFormGroup(): void {
    this.postFormGroup = this.formBuilder.group({
      id: 0,
      title: [undefined],
      text: [undefined]
    })
  }

  private initPosts(): void {
    this.posts = this.databaseService.getPost();
    console.log(this.posts);
  }
}
