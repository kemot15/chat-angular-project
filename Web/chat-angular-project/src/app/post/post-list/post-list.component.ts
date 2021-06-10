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
  display: boolean = false;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.initPosts();
   }

  ngOnInit(): void {
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
    this.posts = this.databaseService.getPosts();
  }

  formRefresh(refreshed: Post){
    if (!refreshed){
      this.display = false;
      console.log(this.display);
      this.initPosts();
    }
  }

  showDialog(): void {
    this.display = true;
  }
}
