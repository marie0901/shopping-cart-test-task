import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Product } from '../../models/product.entity.model';
import { ProductService } from '../../services/product.service';

@Component({
	templateUrl: 'product-item.component.html',
	selector: 'app-product-item'
})

export class ProductItemComponent implements OnInit {

	@Input() product: Product;
	@Output() onQuantityChanged = new EventEmitter<number>();


	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {

	}

	toggleCart() {
		this.product.inCart = !this.product.inCart;
		this.productService.toggleCart(this.product);
	}

	changeQuantity(quantity: number) {
			this.onQuantityChanged.emit(quantity);
			this.productService.updateQuantity(this.product);
		}

}
