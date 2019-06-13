import * as dateUtil from 'date-fns'
export class CopyUtil {
  public static copyToClipboard(content:string){
    let oInput = document.createElement('input');
    oInput.value = content;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
  }

  public static copyInfoToXray(data){
    let json={
      "id":"",
      "msgtime": dateUtil.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
      "msgtype":"",
      "pics":[
        {
          "checktime":new Date(),
          "iata":"",
          "guid":data.guid,
          "channel":data.liqLocation,
          "result":""
        }
      ]
    };
    CopyUtil.copyToClipboard(JSON.stringify(json));
  }

  public static copyInfoToXrayByUppack(data){
    let json={
      "id":"",
      "msgtime": dateUtil.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
      "msgtype":"",
      "pics":[
        {
          "checktime":new Date(),
          "iata":"",
          "guid":data.urRemark,
          "channel":data.urLocation,
          "result":""
        }
      ]
    };
    CopyUtil.copyToClipboard(JSON.stringify(json));
  }


}
