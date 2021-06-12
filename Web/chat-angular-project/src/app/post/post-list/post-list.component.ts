import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { DatabaseService } from '../services/database.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postFormGroup: FormGroup;
  posts: Post[];// Observable<Post[]>;
  arrayPost: Post[];
  display: boolean = false;
  header: string = "Dodaj post";
  isSpinning: boolean = true;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.initPosts();
   }

  ngOnInit(): void {
  //  this.initPostFormGroup();
  }

  // private initPostFormGroup(): void {
  //   this.postFormGroup = this.formBuilder.group({
  //     id: 0,
  //     title: [undefined],
  //     text: [undefined]
  //   })
  // }

  private initPosts(): void {
    this.isSpinning = true;
    console.log(this.isSpinning);
    this.databaseService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.isSpinning = false;
        console.log(this.isSpinning);
      },
      (err: any) => console.log(err)
    )
    
  }

  formRefresh(refreshed: Post | number){
    if (refreshed && (typeof refreshed) != 'number'){  
      this.posts.push(<Post>refreshed);
    }
    if (refreshed > 0) {
      let index: number = this.posts.findIndex(post => post.id === refreshed);
      this.posts.splice(index, 1);
    }
    this.display = false;
  }

  showDialog(): void {
    console.log(this.display);
    this.display = true;
  }
}
