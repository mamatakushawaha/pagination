import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent }
];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,  

    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
