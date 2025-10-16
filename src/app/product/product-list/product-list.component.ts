import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductService } from 'src/app/services/product.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  p: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  totalPages: number = 0;

  Math = Math;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(this.p);
  }

  loadProducts(page: number) {
    // const pageNo = this.p - 1;
    // console.log(`Fetching products with offset: ${page}, pageSize: ${this.pageSize}`);

    this.productService.getProducts(page, this.pageSize).subscribe((data: any) => {
      console.log("API response:", data);
      this.products = data.response.content;
      this.totalRecords = data.response.totalElements;
      this.totalPages = data.response.totalPages;
      // this.totalPages=Math.ceil(this.totalRecords/this.pageSize);
      //  this.p = data.response.number + 1;// adjust to 1-based page for ngx-pagination
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

  exportToPdf() {
    const doc=new jsPDF();
    let col=['ID','Name','Quantity','Price'];
    const rows=this.products.map(prod=>[prod.id,prod.name,prod.quantity,prod.price]);
    doc.text('Product List',14,10);
    (autoTable as any)(doc,{
      head:[col],
      body:rows
    })
    // doc.autoTable({
    //   head:[col],
    //   body:rows
    // });
    doc.save('products.pdf');
  }
  exportToExcel() {
    const worksheet=XLSX.utils.json_to_sheet(this.products);
    const workbook={Sheets:{'data':worksheet},SheetNames:['data']};
    const excelBuffer:any=XLSX.write(workbook,{bookType:'xlsx',type:'array'});
   const data:Blob=new Blob([excelBuffer],{type:'application/octet-stream'});
    XLSX.writeFile(workbook,'products.xlsx');
  }
}
