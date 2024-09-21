import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http : HttpClient,private rs : Router) { 
  }

  private apiUrl = 'https://63f73071833c7c9c607e69f4.mockapi.io/api/data/Address'
  private data$ = new BehaviorSubject<Address[]>([]);

  updateObservable(value : Address[]){
    this.data$.next(value);
  }
  getObservable(){
    return this.data$.asObservable();
  }


  getData(){
    return this.http.get<Address[]>(`${this.apiUrl}`)
  }
  getSingleData(id : string){
    return this.http.get<Address>(`${this.apiUrl}/${id}`);
  }
  saveData(data:Address){
    return this.http.post<Address>(`${this.apiUrl}`,data)
  }
  deleteData(id:string){
    return this.http.delete<Address>(`${this.apiUrl}/${id}`);
  }
  updateData(data:Address){
    return this.http.put<Address>(`${this.apiUrl}/${data.id}`,data)
  }
  

  
}
 // const updatedData  = {
    //   name : element.Name.value,
    //   email : element.email.value,
    //   phoneNumber : element.mobile.value,
    //   landline : element.landline.value,
    //   website : element.website.value,
    //   address: element.address.value
// 
/* private apiUrl = 'https://63f73071833c7c9c607e69f4.mockapi.io/api/data/Address'
  private data$ = new BehaviorSubject<Address[]>([]);

  datastorage !: Address[]

  getData() {
    console.log(89);
    this.http.get<Address[]>(this.apiUrl).subscribe((value)=>{
      this.datastorage = value;
      console.log(this.datastorage);
      console.log(90)
      this.data$.next(this.datastorage);
    });
    console.log(91);
  }
  // async getData() {
  //   try {
  //     console.log(89);
  //     const response = await this.http.get<Address[]>(this.apiUrl).pipe(
  //       tap((data) => console.log(data))
  //     );
  //     const promise = from(response).toPromise();
  //     this.datastorage = await promise;
  //     console.log(this.datastorage);
  //     console.log(90);
  //     this.data$.next(this.datastorage);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log(91);
  // }
  // async getData() {
  //   try {
  //     console.log(89);
  //     this.datastorage  = await this.http.get<Address[]>(this.apiUrl)!.toPromise();
  //     // this.datastorage = response;
  //     console.log(this.datastorage);
  //     console.log(90);
  //     this.data$.next(this.datastorage);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log(91);
  // }
  // async getData(){
  //   try{
      
  //   }
  //   catch{

  //   }
  // }


  getSingleData(id : string): Observable<Address>{
    console.log('get single data');
    if(!(this.datastorage)){
      console.log('from data server');
      return this.http.get<Address>(`${this.apiUrl}/${id}`);
    }
    else {
      let data : Address= this.datastorage.find((ele)=>{
        return ele.id == id;
      })!;
      return of(data!);
    } 
  }
  // async getServerData(id : string){
  //   let data !: Address;
  //   await this.http.get<Address>(`${this.apiUrl}/${id}`).subscribe((value)=>{
  //     data = value;
  //     console.log(data)

  //   });
  //   console.log(data,typeof(data));
  //   return data;
    
  // }
  // getSingleData3(id : string):Address {
  //   if(!(this.datastorage.length)){
  //      this.http.get<Address>(`${this.apiUrl}/${id}`).subscribe((value)=>{
  //        return value as Address;
  //      }); 
  //   }
  //   else {
  //     let data : Address= this.datastorage.find((ele)=>{
  //       return ele.id == id;
  //     })!;
  //     console.log(data);
  //     return (data);
  //   }
  // }

  saveData(newData : Address): void{
    this.http.post<Address>(`${this.apiUrl}`,newData).subscribe((value)=>{
      
      this.datastorage.push(value);
      this.data$.next(this.datastorage);

      this.rs.navigate(['home/details/',value.id]);
    });
  }

  editData(id : string,formData: ElementRef): void{
    const element = formData.nativeElement;

    let index = this.datastorage.find((ele)=>{
      return ele.id == id;
    })!;

    if(index){
      index.name = element.Name.value,
      index.email = element.email.value,
      index.phoneNumber = element.mobile.value,
      index.landline = element.landline.value,
      index.website = element.website.value,
      index.address= element.address.value
    }

    

    this.http.put<Address>(`${this.apiUrl}/${id}`,index).subscribe((value)=>{
      this.data$.next(this.datastorage);
      this.rs.navigate(['home/details/',id]);
    });
  }

  deleteData(id : string): void{
    

    this.http.delete<Address>(`${this.apiUrl}/${id}`).subscribe((value)=>{
      this.datastorage = this.datastorage.filter((ele)=>{
        return ele.id!=id;
      });
      this.data$.next(this.datastorage);
      this.rs.navigate(['/']);
    });

  }

  getObservable(){
    return this.data$;
  }*/