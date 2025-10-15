import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {
  products: any[] = [];
  p: number = 1;
  size: number = 5;
  sortBy: string = 'id';
  sortDir: string = 'asc';
  totalRecords: number = 0;
  totalPages: number = 0;
Math = Math;
  constructor(private  productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(this.p);
  }
  loadProducts(page: number) {
    this.productService.getProductByFilter(page, this.size, this.sortBy, this.sortDir).subscribe((data: any) => {
      console.log("API response:", data);
      this.products = data.response.content;
      this.totalRecords = data.response.totalElements;
      this.totalPages = data.response.totalPages;
    },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }
  onPageChange(page: number) {
    console.log("Page changed to:", page);
    this.p = page;
    this.loadProducts(this.p);
  }
  // onSortChange() {
  //   console.log(`Sorting by ${this.sortBy} in ${this.sortDir} order`);
  //   this.loadProducts(this.p);
  // }
sort(column:string){
  if(this.sortBy===column){
    this.sortDir=this.sortDir==='asc'?'desc':'asc';
  }
  else{
    this.sortBy=column;
    this.sortDir='asc';
  }
  this.loadProducts(this.p);
}
}
