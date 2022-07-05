//配置axios实例
import axios from "axios";

//创建一个axios实例
//通过axios创建的实例对象和axios一样  但是实例上集成了一些配置项，比如基准地址
const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
});

export default request;
