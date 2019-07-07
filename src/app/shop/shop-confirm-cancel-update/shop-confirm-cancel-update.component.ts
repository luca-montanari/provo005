import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-shop-confirm-cancel-update',
    templateUrl: './shop-confirm-cancel-update.component.html',
    styleUrls: ['./shop-confirm-cancel-update.component.scss']
})
export class ShopConfirmCancelUpdateComponent implements OnInit, OnDestroy {

    listenerWindowBeforeUnload: () => void;

    constructor(private renderer2: Renderer2) { 
        this.startListener();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.releaseListener();
    }

    startListener() {
        this.listenerWindowBeforeUnload = this.renderer2.listen(window, 'beforeunload', (event: any) => {
            console.log('ShopConfirmCancelUpdateComponent', event);
        });
    }

    releaseListener() {
        this.listenerWindowBeforeUnload();
    }

}
