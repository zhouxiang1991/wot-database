const Mongo = require('./mongo')
const mongoose = require('mongoose')
const puppeteer = require('puppeteer')
const tankSchema = require('./schema/tank')
// const tank = new Mongo('mongodb://172.0.0.1:27017/wot', 'tanks', tankSchema)
mongoose.connect('mongodb://localhost:27017/wot', {
  useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.connection.on('connected', function () { 

console.log('Mongoose connection open to ' + DB_URL); }); /** * 连接异常 */ 

mongoose.connection.on('error',function (err) { 

console.log('Mongoose connection error: ' + err); }); /** * 连接断开 */ 

mongoose.connection.on('disconnected', function () { 

console.log('Mongoose connection disconnected'); });

async function start () {
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage(); 
  await page.goto('http://www.baidu.com'); 
  const s = await page.waitForXPath('//*[@id="u_sp"]/a[4]')
  console.log(s)
  process.exit()
}
// start()