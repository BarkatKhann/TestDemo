import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public http:HttpClient) { }

  loginUser(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl).subscribe((res:any)=>{
        console.log("products===>",res);
          resolve(res);
          },error=>{console.log('err=>',error);
          reject(error);});
     /*  this.postRequest('login',data).then((response: any) => {
        if (response.status==true) {
            resolve(response.result);
        } else {
            reject(response.error);
        }
      }).catch((error) => { 
        reject(error);
      }) */
    })
  }

  getProductList():Observable<any>{
    return this.http.get<any>(environment.baseUrl);
  }
  getSingleRecipe(id):Observable<any>{
    return this.http.get<any>(environment.baseUrl+'recipelist/'+id);
  }
}
