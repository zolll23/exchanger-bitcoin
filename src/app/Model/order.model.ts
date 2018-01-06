// order.model.ts

export class Order {
	constructor(
		public id:string,
		public give:string,
		public amount_give:string,
		public receive:string,
		public amount_receive:string,
		public email:string,
		public phone:string,
		public date:string,
		public address:string,
		public serial:string,
		public month:string,
		public year:string,
		public code:string,
		public cardholder:string
		){}
}