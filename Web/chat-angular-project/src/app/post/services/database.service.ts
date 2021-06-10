import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "src/app/model/post.model";
import { ApiService } from "src/app/services/api.services";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private apiService: ApiService) {}

  savePost(post: Post): Observable<Post> {
    return this.apiService.savePost(post);
  }

  getPosts(): Observable<Post[]> {
    return this.apiService.getPosts();
  }

  getPost(postID: number): Observable<Post> {
    return this.apiService.getPost(postID);
  }

  updatePost(post: Post): Observable<void> {
    return this.apiService.updatePost(post);
  }


}
