import * as Coins from "./coin";
import { Product, Initial as Init } from "./product";
import getVendingProduct from "./productFactory";

export enum VendingMachineSize {
  small = 6,
  medium = 9,
  large = 12
}

class Cell {
  constructor(public product: Product) {
    
  }
  stock = ko.observable(3);
  sold = ko.observable(false);
}

export class VendingMachine {
    paid = ko.observable(0);
    selectedCell = ko.observable(new Cell(new Init()));
    cells = ko.observableArray([]);
    acceptedCoins: Coins.Coin[] = [new Coins.Dime(), new Coins.Quarter(), new Coins.HalfDollar(), new Coins.Dollar()];
    canPay = ko.pureComputed(()=> this.paid() - this.selectedCell().product.price >= 0);


    set size(givenSize: VendingMachineSize) {
      this.cells([]);

      for (let index = 0; index < givenSize; index++) {
        let product = getVendingProduct();
        this.cells.push(new Cell(product));
      }
    }

    select = (cell: Cell): void => {
      cell.sold(false);
      this.selectedCell(cell);
    }
    
    acceptCoin = (coin: Coins.Coin): void => {
      var oldTotal = this.paid();
      this.paid(oldTotal + coin.value);
    }

    pay = (): void => {
      if (this.selectedCell().stock() < 1) {
        alert("Out of stock, Sorry for the inconvenience");
        return
      }
      let currentPaid = this.paid();
      this.paid(Math.round(((currentPaid - this.selectedCell().product.price)*100))/100);
      let currentStock = this.selectedCell().stock();
      this.selectedCell().stock(currentStock - 1);
      this.selectedCell().sold(true);
    }
}