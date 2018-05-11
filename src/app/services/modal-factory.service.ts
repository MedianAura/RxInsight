import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ImportCriteriaComponent} from "../modules/criteria/import-criteria/import-criteria.component";

@Injectable({
    providedIn: 'root'
})
export class ModalFactoryService {
    rootViewContainer: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
    }

    addDynamicComponent() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(ImportCriteriaComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        (<ImportCriteriaComponent>component.instance).setComponentRef(component);
        this.rootViewContainer.insert(component.hostView);
    }
}
