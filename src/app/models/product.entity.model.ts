export class Product {

    id: string;
    title: string;
    price: number;
    filename: string;
    inCart: boolean;
    quantity: number;


    constructor(obj?: any) {
      const imagePrefix: string = "assets/images/products/";

      this.id = (obj && obj.id) || null;
      this.title = (obj && obj.title) || null;
      this.price = (obj && obj.price) || null;
      this.inCart = (obj && obj.inCart) || false;
      this.quantity = (obj && obj.quantity) || 1;
      if (obj && obj.filename) {
        let searchPattern = new RegExp("^assets");
        if (searchPattern.test(obj.filename)) {
          this.filename = obj.filename;
        } else {
          this.filename = imagePrefix + obj.filename;
        }
      } else {
        this.filename= null;
      }
    }

}
