import { Component, OnInit } from '@angular/core';
import { IProduct } from './product'
import { ProductService } from './product.service';
@Component({
    selector : 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean =false;
    _filterBy: string;

    filteredProducts: IProduct[];

    constructor(private productService : ProductService){
        this.filterBy = "";
    }
    
    ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    products: IProduct[] ;
    
    get filterBy(): string{
        return this._filterBy;
    }
    set filterBy(value: string){
        this._filterBy = value;
        this.filteredProducts = this.filterBy ? this.performFilter(this.filterBy) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        var filter = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filter) !== -1);

    }

    toggleImage():void{
        this.showImage =!this.showImage;
    }

    onRatingClicked(message: string): void{
        this.pageTitle = `Product List: ${message}`;
    }
}