import { HttpInterceptorFn} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { CookiesStorageService } from '../../services/general/cookies-storage-service';

export const addAuthHeaderInterceptor: HttpInterceptorFn = (req, next) => { 

  const _cookieStorage: CookiesStorageService = inject(CookiesStorageService)
  const token = _cookieStorage.getKeyValue('access_token')

  if(!req.url.includes(environment.API_URL))
    return next(req)

  if(token){
    const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
      })
      return next(newReq);
  }
  
  return next(req); 
};