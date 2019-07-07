import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Shop } from '../shop';
import { ShopService } from '../shop.service';

export class ShopGridDataSource extends DataSource<Shop> {

    selection = new SelectionModel<Shop>(true, []);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private shopsSubject = new BehaviorSubject<Shop[]>([]);

    constructor(private shopService: ShopService) {
        super();
    }

    connect(): Observable<Shop[]> {
        console.log('DataSource', 'connect');
        return this.shopsSubject.asObservable();
    }

    disconnect() {
        console.log('DataSource', 'disconnect');
    }

    loadAllShops() {
        this.loadingSubject.next(true);
        this.shopService.loadAllShops()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(shops => this.shopsSubject.next(shops));
    }

    updateShop(shopId: string, partialShopUpdated: Partial<Shop>) {
        this.loadingSubject.next(true);
        this.shopService.updateShop(shopId, partialShopUpdated)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(shopUpdated => {
                console.log('ShopGridDataSource', 'updateShop', 'shopUpdated', shopUpdated);
                const shopTyped: Shop = shopUpdated as Shop;
                let newShops: Shop[] = [];
                newShops = this.shopsSubject.value.map(shop => {
                    return shop.id === shopTyped.id ? shopTyped : shop;
                });
                console.log('ShopGridDataSource', 'updateShop', 'newShops', newShops);
                this.shopsSubject.next(newShops);
            });
    }

    checkboxLabel(row?: Shop): string {
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
    }

}
