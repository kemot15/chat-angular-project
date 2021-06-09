import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "src/app/model/post.model";
import { ApiService } from "src/app/services/api.services";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private apiService: ApiService) {}

//   savePost(post: Post): Observable<Post> {
//     return this.apiService.post<Post>(this.url, post);
//   }

  getPost(): Observable<Post[]> {
    return this.apiService.getPosts();
  }
}
