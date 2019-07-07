import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { Shop } from './shop';
import { convertSnaps } from '../shared/db-utils';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    constructor(private db: AngularFirestore) { }

    loadAllShops(): Observable<Shop[]> {
        return this.db.collection('shops', ref => ref.orderBy('name'))
            .snapshotChanges()
            .pipe(
                map(snaps => convertSnaps<Shop>(snaps)),
                first()
            );
    }

    updateShop(shopId: string, partialShopUpdated: Partial<Shop>): Observable<Shop> {
        console.log('ShopService', 'updateShop', shopId, partialShopUpdated);
        const shop: AngularFirestoreDocument<Shop> = this.db.doc<Shop>(`shops/${shopId}`);
        const obs: Observable<void> = from(shop.update(partialShopUpdated));
        return obs.pipe(
            map(shopAny => {
                const shopUpdated: Shop = { id: shopId, ...partialShopUpdated } as Shop;
                return shopUpdated;
            })
        );
    }

    // updateShop(shopId: string, partialShopUpdated: Partial<Shop>): Observable<void> {
    //     console.log('ShopService', 'updateShop', shopId, partialShopUpdated);
    //     const shop: AngularFirestoreDocument<Shop> = this.db.doc<Shop>(`shops/${shopId}`);
    //     const obs: Observable<void> = from(shop.update(partialShopUpdated));
    //     return obs;
    // }

}
