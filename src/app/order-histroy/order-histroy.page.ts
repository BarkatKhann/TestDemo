import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';import { from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toArray,filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-order-histroy',
  templateUrl: './order-histroy.page.html',
  styleUrls: ['./order-histroy.page.scss'],
})
export class OrderHistroyPage implements OnInit {
  proId:any;
  proDetail:any;
  orderList:any=[];
  constructor(public router:Router, public restService:RestService,private storage: Storage,) { 
    this.storage.get('order-histroy').then((resp) => {
      console.log("order===>", resp);
    });
   /*  this.proId= this.router.getCurrentNavigation().extras.state.CatagoryId.queryParams.recipe;
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.id==this.proId),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.proDetail=res[0];
      this.orderList.push(this.proDetail);
    }); */
  }

  ngOnInit() {
    this.storage.get('order-history').then((value: any) => {
      console.log("getorderList2222????", value);
      this.orderList = value || [];
      console.log("storage  arr::", this.orderList);
  });
}

}
