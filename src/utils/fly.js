import Fly from "flyio";
import wxEngine from 'flyio/../engine-wrapper'
const fly = new Fly;

//配置请求基地址
fly.config.baseURL = "https://cnodejs.org/api/v1/"
export default fly