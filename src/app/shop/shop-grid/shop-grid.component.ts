import { Component, OnInit, Renderer2, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ShopGridDataSource } from './shop-grid.datasource';
import { ShopService } from '../shop.service';
import { ShopUpdateDialogComponent } from '../shop-update-dialog/shop-update-dialog.component';
import { Shop } from '../shop';
import { MatTable } from '@angular/material';

@Component({
    selector: 'app-shop-grid',
    templateUrl: './shop-grid.component.html',
    styleUrls: ['./shop-grid.component.scss']
})
export class ShopGridComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['action-select', 'name', 'description', 'action-buttons'];
    dataSource: ShopGridDataSource;
    listenerWindowBeforeUnload: () => void;

    constructor(private shopService: ShopService,
                private dialog: MatDialog,
                private renderer2: Renderer2) {
        this.startListener();
    }

    ngOnInit() {
        this.dataSource = new ShopGridDataSource(this.shopService);
        this.dataSource.loadAllShops();
    }

    ngOnDestroy() {
        this.releaseListener();
    }

    startListener() {
        this.listenerWindowBeforeUnload = this.renderer2.listen(window, 'beforeunload', (event: any) => {
            console.log('ShopGridComponent', event);
            // event.preventDefault();
            // event.returnValue = '';
        });
    }

    releaseListener() {
        this.listenerWindowBeforeUnload();
    }

    actionUpdate(shop: Shop) {
        console.log('actionUpdate - INIZIO', shop);
        const matDialogConfig: MatDialogConfig = {
            closeOnNavigation: true,
            disableClose: true,
            width: '300px',
            data: shop
        };
        const dialogRef = this.dialog.open(ShopUpdateDialogComponent, matDialogConfig);
        dialogRef.afterOpened().subscribe(result => {
            console.log('actionUpdate - APERTO', result);
        });
        dialogRef.afterClosed().subscribe(partialShopUpdated => {
            console.log('actionUpdate - CHIUSO', partialShopUpdated);
            if (partialShopUpdated) { this.dataSource.updateShop(shop.id, partialShopUpdated); }
        });
    }

    actionDelete() {
        console.log('DELETE');
    }

    canDeactivate(): Observable<boolean> | boolean {
        console.log('candeactivate', 'ShopGridComponent');
        return true;
    }

}
