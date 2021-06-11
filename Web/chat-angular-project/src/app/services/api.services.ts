import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from "src/environments/environment";
import { Post } from "../model/post.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private url = environment.api.path + '/posts';

  constructor(private httpClient: HttpClient) {}

  savePost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.url, post);
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }

  getPost(postID: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.url}/${postID}`);
  }

  updatePost(post: Post): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${post.id}`, post);
  }

  deletePost(postID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${postID}`);
  }
}
