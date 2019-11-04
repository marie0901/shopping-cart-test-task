import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Product} from "../../models/product.entity.model";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-modal-cart",
  templateUrl: "./modal-cart.component.html"
})
export class ModalCartComponent implements OnInit {
  cart: Observable<Product[]>;

  constructor(
    private dialogRef: MatDialogRef<ModalCartComponent>,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cart = this.productService.getCart();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClear(): void {
    this.productService.clearCart()
    this.dialogRef.close();
  }
}
