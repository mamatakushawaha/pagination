import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSortComponent } from './product-sort/product-sort.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  { path: 'productsort', component: ProductSortComponent }
];

@NgModule({
  declarations: [
    ProductSortComponent
  ],
  imports: [
    CommonModule,
     NgxPaginationModule, 
    RouterModule.forChild(routes)
  ]
})
export class ProductFilterModule { }
