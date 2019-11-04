import { Injectable } from "@angular/core";
import { Product } from "../models/product.entity.model";
import { Data } from "../data";
import { Observable, BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class ProductService {
  private products: Product[];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private productsSubject = new BehaviorSubject<any[]>([]);
  productsObs = this.productsSubject.asObservable();


  constructor() {}

  getProducts(): Observable<any[]> {
    Observable.of(Data.data).map(item => {
      return item.map(productItem => {
        return new Product({
          id: productItem.id,
          title: productItem.title,
          price: productItem.price,
          filename: productItem.filename,
          inCart: this.inCart(productItem.id),
          })
      });
    }).subscribe(products => {
        this.productsSubject.next(products);
      });
      return this.productsSubject.asObservable();
  }


  toggleCart(productItem: Product): void {
    if (this.inCart(productItem.id)) {
      localStorage.removeItem(productItem.id);
      this.cartSubject.next(this._getCart());
      this._updateProductItem(productItem);
    } else {
      localStorage.setItem(productItem.id, JSON.stringify(productItem));
      this.cartSubject.next(this._getCart());
      this._updateProductItem(productItem);
    }
  }

  updateQuantity(productItem: Product): void {
    if (this.inCart(productItem.id)) {
      localStorage.setItem(productItem.id, JSON.stringify(productItem));
      this.cartSubject.next(this._getCart());
      this._updateProductItem(productItem);
    }
  }

  _updateProductItem(productItem: any): void {
    const products: Product[] = this.productsSubject.getValue();
    const index = products.findIndex(item => item.id === productItem.id);
    const newProducts: Product[] = products.slice(0);
    newProducts[index] = {
      ...newProducts[index],
      inCart: productItem.inCart,
      quantity: productItem.quantity

    };
    this.productsSubject.next(newProducts);
  }

  inCart(id: string): boolean {
    if (localStorage.getItem(id) === null) {
      return false;
    } else {
      return true;
    }
  }

  getCart(): Observable<Product[]> {
    this.cartSubject.next(this._getCart());
    return this.cartSubject.asObservable();
  }

  _getCart(): Product[] {
    return Object.values(localStorage).map(item => {
      return new Product(JSON.parse(item));
    });
  }

  clearCart(): void {
    for (let i = 0; i < localStorage.length; i++){
      let product = new Product(JSON.parse(localStorage.getItem(localStorage.key(i))));
      product.inCart = false;
      product.quantity = 1;
      this._updateProductItem(product);
    }
    localStorage.clear();
    this.cartSubject.next([]);
  }
}
