import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getProducts(pageNo:number,pageSize:number){
    //  const pageNo = page - 1;
     console.log("Page number in service:", pageNo, "Page size:", pageSize);
    // console.log(`Fetching products with offset: ${pageNo}, pageSize: ${pageSize}`);
    return this.http.get(`${this.baseUrl}/pagination/${pageNo-1}/${pageSize}`);
  }

}
