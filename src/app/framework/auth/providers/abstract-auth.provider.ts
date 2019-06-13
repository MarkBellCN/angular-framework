/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {deepExtend,getDeepFromObject} from '../../../framework/helpers';
import {AuthResult} from '../../../framework/auth/service/auth.service';
export abstract class AbstractAuthProvider {
  protected defaultConfig: any = {};
  protected config: any = {};

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  abstract authenticate(data?: any): Observable<AuthResult>;

  abstract logout(): Observable<AuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({body: {}, status: 401});
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({body: {}, status: 200});
  }

  protected getJsonSafe(res: HttpResponse<Object>): any {
    return res.body;
  }
}
