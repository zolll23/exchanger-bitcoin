// info.component.ts

import { Component } from "@angular/core";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { InfoRepository } from "./Model/info.repository";
import { Info } from "./Model/info.model";

import { routerTransition } from './router.animations';


@Component({
    templateUrl: "info.component.html",
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

@Injectable()
export class InfoComponent {

	info:Info;

	constructor (private repository: InfoRepository, private router: Router) {
		this.info = this.repository.loadInfo(this.router.url);
	}

	getInfo(): Info {
		this.info = this.repository.getInfo();
        return this.info;
    }
}