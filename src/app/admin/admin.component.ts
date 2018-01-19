import { Component, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html',
    styleUrls: [ './../../assets/admin.css' ]
    //styleUrls: ['../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css']
})
export class AdminComponent implements AfterViewInit {
    
    title = 'Adminstration zone';

    ngAfterViewInit() {
        document.title = this.title;
        jQuery(document).ready(function() { jQuery('body').bootstrapMaterialDesign(); });
    }
}
