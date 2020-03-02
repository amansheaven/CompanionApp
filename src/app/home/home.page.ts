import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CentralService } from '../services/central.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  public state = "Connecting";
  public emoji;
  private lati;
  private long;
  private new;
  public emojis = [ "😀", "😃", "😄", "😁", "😆", "😅", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁" , "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿" ];
  public colors = [
    '#FEA47F', 
    '#F97F51', 
    '#B33771', 
    '#6D214F',
    '#25CCF7',
    '#1B9CFC',
    '#3B3B98',
    '#182C61',
    '#EAB543',
    '#F8EFBA',
    '#FD7272',
    '#FC427B',
    '#55E6C1',
    '#58B19F',
    '#9AECDB',
    '#BDC581',
    '#CAD3C8',
    '#2C3A47',
    '#D6A2E8',
    '#82589F'
  ];
  
  interval = 130;
  

  @ViewChild('transcolor', { static: false }) public mydiv: ElementRef;
  constructor(private conn: CentralService, private sbar:StatusBar, public navc: Router) {
    sbar.overlaysWebView(true)
  }

  loadEmojis = (arr) => {
    setInterval(() => {
      this.emoji = arr[Math.floor(Math.random() * arr.length)];
    }, this.interval);
  }
  
  loadColors = (arr) => {
    setInterval(() => {
      this.mydiv.nativeElement.style.setProperty('background-color', arr[Math.floor(Math.random() * arr.length)]);
    
      // this.mydiv.nativeElement.style.setProperty('background-color', arr[Math.floor(Math.random() * arr.length)]);
    }, this.interval * 4);
  }
  init = () => {
    this.loadEmojis(this.emojis);
    this.loadColors(this.colors);
  }
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(){
    this.sbar.overlaysWebView(true)
    this.init()
    this.conn.serverok()
    .then(async(resp)=>{
      resp = JSON.parse(resp.data)
      if( resp['status'] = 200 ){
        await this.delay(500)
        this.state = "Ka Ching! Connected..."
        console.log("WON")        
      }
    })
    .then( async() => {
      await this.delay(500)
      this.state = "Locating"
      console.log("GEOLOC")
      //PROD SCRIPT
      this.conn.getloc()
      .then(async (resp) => {
          console.log(resp.coords.latitude)
          console.log(resp.coords.longitude)
          let passing : NavigationExtras = {
            state:{
              latitude: resp.coords.latitude,
              longitude: resp.coords.longitude
            }
          }
          await this.delay(500);
          this.navc.navigate(['/location'],passing)
          // return resp
      })
      .catch((er)=>{
        console.log(er)
        this.state = "Location Error :("
      })
      //LIVE RELOAD SCRIPT
            // let passing : NavigationExtras = {
            //   state:{
            //     latitude: 28.4569593,
            //     longitude: 76.9983269
            //   }
            // }
            // await this.delay(500);
            // this.navc.navigate(['/location'],passing)
    })
    .catch((er)=>{
      console.log(er)
      this.state = "Error :("
    })

  }
  
}
