import { Component,OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import {ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { map } from 'rxjs/operators';
import { from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toArray,filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productList:any;
  productA:any;
  result:any;
  brand:any=[];
  filterbrand:any=[];
  smartphone:any=[];
  laptop:any=[];
  products={};
  filterdata:string;
  FilterProduct:any;
  constructor(public restService:RestService ,public router:Router) { 
    this.restService.getProductList().subscribe((res:any)=>{
      this.productList = res.products;
      console.log("prooooo=>",this.productList);
      this.productList.forEach((el,index )=> {
        if(this.products[el.category]==undefined){
          this.products[el.category]=[];
          this.products[el.category].push(el);
          console.log("ccccc==>",this.products);
        }
        else{
          this.products[el.category].push(el);
        }
        
      });
      console.log("productCategory==>",this.products);
       this.productList.forEach(element => {
           console.log("brandList====>",element.brand);        
       });
      })
  }

  ngOnInit() {

  }
  searchProduct(){
    console.log('filterData',this.filterdata);
    if(this.filterdata!= '' && this.filterdata?.length >= 4){
      this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
      .pipe(filter((item:any)=>item.brand==this.filterdata),toArray()).subscribe((res:any)=>{
        console.log("proo=>",res);
        this.FilterProduct = res;
    })
   }
  }
  checkRSelect(ev){
    console.log("ev===>",ev.detail.value);
    if(ev.detail.value==4)
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.rating<=4),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.FilterProduct = res;
    })
    else{
      this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
      .pipe(filter((item:any)=>item.rating>=4),toArray()).subscribe((res:any)=>{
        console.log("proo=>",res);
        this.FilterProduct = res;
      })
    }
  }
//discountShort
  checkDSelect(ev){
    console.log("ev===>",ev.detail.value);
    if(ev.detail.value==15)
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.discount<=15),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.FilterProduct = res;
    })
    else{
      this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
      .pipe(filter((item:any)=>item.discount>=15),toArray()).subscribe((res:any)=>{
        console.log("proo=>",res);
        this.FilterProduct = res;
      })
    }
  }
//price Short
  checkPSelect(ev){
    console.log("ev===>",ev.detail.value);
    if(ev.detail.value==100)
    this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
    .pipe(filter((item:any)=>item.price<=100),toArray()).subscribe((res:any)=>{
      console.log("proo=>",res);
      this.FilterProduct = res;
    })
    else{
      this.restService.getProductList().pipe(switchMap((val)=>from(val.products)))
      .pipe(filter((item:any)=>item.price>=100),toArray()).subscribe((res:any)=>{
        console.log("proo=>",res);
        this.FilterProduct = res;
      })
    }
  }

  gotoDescription(id){
    let objToSend: NavigationExtras = { 
      queryParams: {
      recipe: id,
      } 
  }
  
    this.router.navigate(['product-details'],{
      state: { CatagoryId: objToSend }
    });
  }

}
