import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';
import { from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toArray,filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  proId:any;
  SingleProduct:any;
  constructor( public router:Router, public restService:RestService) { 
    this.proId= this.router.getCurrentNavigation().extras.state.CatagoryId.queryParams.recipe;
    console.log("id===>",this.proId);
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.id==this.proId),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.SingleProduct=res[0];
    });
  }

  ngOnInit() {
  }
  gotoOrder(id){
    let objToSend: NavigationExtras = { 
      queryParams: {
      recipe: id,
      } 
  }
  
    this.router.navigate(['checkout'],{
      state: { CatagoryId: objToSend }
    });
  }

}
