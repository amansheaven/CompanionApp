import { Component, OnInit } from '@angular/core';
import { CentralService } from '../services/central.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public state = "Connecting";
  public emoji = '🤔';

  constructor(private conn: CentralService) {}

  ngOnInit(){
      console.log("Calling Service")
      this.conn.serverok().subscribe( (resp) => {
        console.log(resp)
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
