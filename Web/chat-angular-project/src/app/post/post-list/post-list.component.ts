import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postFormGroup: FormGroup;
  posts: Post[];
  arrayPost: Post[];
  display: boolean = false;
  header: string = "Dodaj post";
  isSpinning: boolean = true;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.initPosts();
   }

  ngOnInit(): void {
  }

  private initPosts(): void {
    this.isSpinning = true;
    this.databaseService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.isSpinning = false;
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
    this.display = true;
  }
}
