import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';import { from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toArray,filter } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
   proId:any;
   proDetail:any;
   selectMode:any='cash';
   OrderList:any[] = new Array();
  constructor(public router:Router, public restService:RestService,
    public alertController: AlertController, private storage: Storage,) {
    this.proId= this.router.getCurrentNavigation().extras.state.CatagoryId.queryParams.recipe;
    console.log("Pid==>",this.proId);
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.id==this.proId),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.proDetail=res[0];
      if(this.proDetail.stock>=50){
        let msg='Hurry! only a few items left.'
        this.presentAlert(msg);
      }
    });
   
   }

  ngOnInit() {
    this.storage.get('order-history').then((value: any) => {
      console.log("getorderList2222????", value);
      this.OrderList = value || [];
      console.log("storage  arr::", this.OrderList);
    })
  }
  checkValue(ev){
    console.log("sssvalue=>",ev.detail.value);
    this.selectMode = ev.detail.value;
  }

  finalOrder(pro){
   if(this.selectMode=='cash'){
     console.log("orderPro===>",pro);
    this.OrderList.push(pro);
    console.log("orderList===>",this.OrderList);
    this.storage.set('order-history', this.OrderList);
    this.router.navigate(['order-histroy']);
   }
   else{
    let msg='Only Cash on delaivery.'
    this.presentAlert(msg);
   }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader:msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
