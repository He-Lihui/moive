// 封装  axios  添加请求的拦截器
import axios from 'axios';

axios.defaults.baseURL = 'https://m.maizuo.com/'

// 请求拦截器 ，用来添加请求头
axios.interceptors.request.use(function(config){
    let host = "mall.film-ticket.film.list"
    let info = config.headers.info
    if( info=="cinema" ){
        host = "mall.film-ticket.cinema.list"
    }
    if( info=="info"){
        host = "mall.film-ticket.film.info"
    }
    if( info=="city"){
        host = "mall.film-ticket.city.list"
    }
    // continue        
    config.headers = {
        "X-Client-Info": 
        '{"a":"3000","ch":"1002","v":"5.0.4","e":"160335135912970801233921","bc":"620100"}',
        "X-Host": host
    }
    return config
},
function(err){

}
)
// 导出封装好的axios
export default axios