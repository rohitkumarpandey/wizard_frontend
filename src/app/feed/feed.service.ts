import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommentStmt, unescapeIdentifier } from '@angular/compiler';
import { pid } from 'process';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  postComments = {postid : String, comments : []};
  posts = [];

  constructor(private http : HttpClient) { }

  getUserLists(uid):Promise<any>{
    return this.http.get(environment.userAPIUrl+'/userLists/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  getPosts():Promise<any>{
    return this.http.get(environment.userAPIUrl+'/getPosts')
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  getUserData(uid): Promise<any>{
    return this.http.get(environment.userAPIUrl+'/getShortProfile/'+uid)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  getNextPosts(lastpostid):Promise<any>{
    return this.http.get(environment.userAPIUrl+'/getNextPosts/'+lastpostid)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  setComments(postId, comments){
    this.postComments.postid = postId;
    this.postComments.comments = comments;
  }
  getComments(){
    return this.postComments;
  }


  addComment(uid, postid, data) : Promise<any>{
    return this.http.post(environment.userAPIUrl+'/addComment/'+uid+'/'+postid, data)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  addPost(data, uid) : Promise<any>{
    return this.http.post(environment.userAPIUrl+'/createPost/'+uid, data)
    .toPromise()
    .then((res)=>{
      return res;
    })
  }

  //delete post
  deletePost(uid, postid) : Promise<any>{
    return this.http.delete(environment.userAPIUrl+'/deletePost/'+uid+'/'+postid)
    .toPromise()
    .then((res)=>{
      return res;
    })
  } 

 
  
}
