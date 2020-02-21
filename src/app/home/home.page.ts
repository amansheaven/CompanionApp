import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CentralService } from '../services/central.service';
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public state = "Connecting";
  public emoji;
  @ViewChild('transcolor', { static: false }) public mydiv: ElementRef;
  constructor(private conn: CentralService, private sbar:StatusBar) {
    sbar.overlaysWebView(true)
  }

  ngOnInit(){
    // const loader = document.getElementById('#container');
    // const emoji = document.getElementById('#emoji');
    // console.log(loader,emoji)
    
    const emojis = [ "😀", "😃", "😄", "😁", "😆", "😅", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁" , "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿" ];
    const colors = [
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
    
    const interval = 130;
    
    const loadEmojis = (arr) => {
      setInterval(() => {
        this.emoji = arr[Math.floor(Math.random() * arr.length)];
      }, interval);
    }
    
    const loadColors = (arr) => {
      setInterval(() => {
        console.log(this.mydiv.nativeElement.style.setProperty('background-color', arr[Math.floor(Math.random() * arr.length)]));
      
        // this.mydiv.nativeElement.style.setProperty('background-color', arr[Math.floor(Math.random() * arr.length)]);
      }, interval * 4);
    }
    
    const init = () => {
      loadEmojis(emojis);
      loadColors(colors);
    }
    
    init();

      this.conn.serverok().subscribe( (resp) => {
        if(resp.status = 200){
          this.state="Ka Ching! Connected"
        }
        else{
          this.state="Ah Server Down"
        }
      });
  }

}
