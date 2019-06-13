import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {$WebSocket} from './ng.websocket'
import {NzMessageService, SharedService} from "../framework";
@Injectable()
export class WebSocketService {
  ws: $WebSocket;

  constructor(private sharedService:SharedService,public readonly nzMessageService: NzMessageService,) {
  }

  connect(url: string){
    this.ws = new $WebSocket(url);

    this.ws.onMessage(
      (msg: MessageEvent)=> {
      },
      {autoApply: false}
    );

    this.ws.onError((msg: MessageEvent)=>{
      console.log("webScoket重连")
      this.ws.reconnect();
    })
    this.ws.getDataStream().subscribe(
      (msg)=> {
        let data=JSON.parse(msg.data);
        let msgTip="";
        try {
          msgTip=JSON.parse(data.msg).msg_body.title;
        }catch (e) {
          msgTip=data.msg;
        }
        this.nzMessageService.info("接收到消息："+msgTip)
        this.playAudio();
      },
      (msg)=> {

      },
      ()=> {

      }
    );
  }
  send(data:any):any{
    return this.ws.send(data);
  }

  playAudio(){
    var audio = document.createElement('audio');
    audio.setAttribute('autoplay', 'autoplay');
    audio.setAttribute('style', 'display:none');
    audio.setAttribute('src', '../../assets/audio/message.mp3');
    try {
      audio.play();
    }catch (e) {

    }

  }
}

