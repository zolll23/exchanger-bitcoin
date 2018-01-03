// info.repository.ts

import { Injectable } from "@angular/core";
import { Info } from "./info.model";
import { InfoDataSource } from "./info.datasource";

@Injectable()
export class InfoRepository {

	private info: Info;

	constructor (private dataSource: InfoDataSource) {
		this.dataSource = dataSource;
	}

	loadInfo(url:string):Info {
		this.info = this.dataSource.loadInfo(url);
		return this.info;
	}

	getInfo():Info {
		this.info = this.dataSource.getInfo();
		return this.info;
	}
}