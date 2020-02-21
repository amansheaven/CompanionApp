import { Component, OnInit } from '@angular/core';
import { CentralService } from '../services/central.service';
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public state = "Connecting";
  public emoji = '🤔';

  constructor(private conn: CentralService, private sbar:StatusBar) {
    sbar.overlaysWebView(true)
  }

  ngOnInit(){
      this.conn.serverok().subscribe( (resp) => {
        if(resp.status = 200){
          this.emoji='😊';
          this.state="Ka Ching! Connected"
        }
        else{
          this.emoji='😔';
          this.state="Ah Server Down"
        }
      });
  }

}
