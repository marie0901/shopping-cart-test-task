import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Product } from '../../models/product.entity.model';
import { ProductService } from '../../services/product.service';

@Component({
	templateUrl: 'product-list.component.html',
	selector: 'app-product-list'
})

export class ProductListComponent implements OnInit {

	private products: Observable <Product[]>;

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.products = this.productService.getProducts();
	}


}
