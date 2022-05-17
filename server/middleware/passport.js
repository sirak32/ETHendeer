import { Strategy,ExtractJwt } from "passport-jwt";
import { account } from "../models/account.js";
import JwtBearerStrategy from "passport-http-jwt-bearer";
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRET'
  };
  
  export default (passport)=>{
        passport.use(new JwtBearerStrategy('SECRET',async (payload,done)=>{
            await account.findById(payload.user_id).then(async user=>{
                    if (user)
                    return done(null,user)
                    return done(null,false)
            }).catch(err=>{
                    return done(null,false)
            })
    }))
} 
