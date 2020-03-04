const fs =require('fs')
const mongodb =require('mongodb')
const path =require('path')
const axios =require('axios')
// const Mongo = require('./mongo')
const lodash = require('lodash')
// const mongoose = require('mongoose')
// const puppeteer = require('puppeteer')
// const tankSchema = require('./schema/tank')
const dbURL = 'mongodb://localhost:27017/wot'
// const tank = new Mongo(dbURL, 'tanks', tankSchema)
// const tankLinkList = require('./tankLinkList.json')
// let tanks = require('./tanks.json')
// tanks = tanks.data
// const modulesId = require('./modulesId.json')
// console.log(modulesId.length)
// const modules = []
// for (const key in tanks) {
//   if (tanks.hasOwnProperty(key)) {
//     const tank = tanks[key];
//     // console.log(tank)
//     ['guns', 'engines', 'suspensions', 'radios', 'turrets'].forEach(item => {
//       modules.push(...tank[item])
//     })
//   }
// }
// fs.writeFileSync(path.resolve('./modulesId.json'), JSON.stringify(modules),{encoding: 'utf-8'})
// const nationLinkList = require('./nationLinkList.json')
// console.log(tankLinkList)
// axios({
//   url: 'https://api.worldoftanks.asia/wot/encyclopedia/vehicles/?application_id=47d226b7b1fba1286c3780be041b1603&language=zh-cn',
// }).then(item => {
//   fs.writeFileSync(path.resolve('./tanks.json'), JSON.stringify(item.data),{encoding: 'utf-8'})
// })
// async function abc() {
//   const array = lodash.chunk(modulesId, 100)
//   let count = 0
//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     axios({
//       url: 'https://api.worldoftanks.asia/wot/encyclopedia/modules/?application_id=47d226b7b1fba1286c3780be041b1603&language=zh-cn&extra=default_profile&module_id='+element.join(','),
//     }).then(item => {
//       // console.log(item.data)
//       count += Object.keys(item.data.data).length
//       console.log(count)
//       fs.writeFileSync(path.resolve('./modules/'+index+'.json'), JSON.stringify(item.data),{encoding: 'utf-8'})
//     })
//     await new Promise(resolve => setTimeout(resolve, 1000))
//   }
// }
// abc()

// const data = fs.readFileSync(path.resolve('./data.json'))
// const nationLinkList = fs.readFileSync(path.resolve('./nationLinkList.json'))
// const tankLinkList = fs.readFileSync(path.resolve('./tankLinkList.json'))

// const URL = 'https://wiki.wargaming.net/en/World_of_Tanks'
// const URL = 'https://www.baidu.com'
// var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbURL, function(err, db) {
	if(err){
		console.error(err);
		return;
	}else{
    db = db.db('wot')
      console.log("Connected correctly to server");
      var modules = db.collection('modules');
      var tanks = db.collection('tanks');
        // const counts = new Array(53).fill(1)
        // let count = 0
        // counts.forEach((item, index) => {
        //   console.log(index)
        //   let data = require('./modules/' + index + '.json')
        //   data = data.data
        //   count += Object.keys(data).length
        //   console.log(count)
        //   for (const key in data) {
        //     if (data.hasOwnProperty(key)) {
        //       const el = data[key];
        //       collection.insertOne(el)
        //     }
        //   }
        // })
      // for (const key in tanks) {
      //   if (tanks.hasOwnProperty(key)) {
      //     const tank = tanks[key];
      //     console.log(tank)
      //     collection.insertOne(tank)
      //   }
      // }
  }
});

const URL = 'http://www.xiaosj.cn/tx/tank/list.aspx'

async function start () {
  const browser = await puppeteer.launch({
    // headless: false
  }); 

  const page = await browser.newPage(); 
  await page.goto(URL); 
  const nationContainer = 'body > div:nth-child(2)'
  const nationLink = nationContainer + ' > a:not(:first-child)'
  await page.waitForSelector(nationContainer)
  const nationLinkList = await page.$$eval(nationLink, e => Array.from(e).filter(item => item.innerText !== '首页').map(item => item.href))
  fs.writeFileSync(path.resolve('./nationLinkList'), JSON.stringify(nationLinkList),{encoding: 'utf-8'})
  const tankLinkList = []

  for (let index = 0; index < nationLinkList.length; index++) {
    const nationLink = nationLinkList[index];
    // const type = await nations[0].evaluate(e => e.innerText.slice(0, 1))
    const nationCode = nationLink.slice(-1)
    // await nation.click()
    // console.log(nationCode)
    // nations[1].click()
    await page.goto(nationLink)
    // await page.waitFor(3000)
    const containerSelector = '#content > #' + nationCode
    // console.log(typeContainerSelector)
    await page.waitForSelector(containerSelector)
    const tankSelector = containerSelector + ' > div.panel-body > ul > .tanktypebox > ul > li > a'
    const urls = await page.$$eval(tankSelector, e => Array.from(e).map(e => e.href))
    tankLinkList.push(...urls)
    // console.log(tankLinkList)
    await page.waitFor(3000)
    // if (nationCode === 'D') {
    //   process.exit()
    // }
  }
  fs.writeFileSync(path.resolve('./tankLinkList'), JSON.stringify(tankLinkList),{encoding: 'utf-8'})

  for (let index = 0; index < tankLinkList.length; index++) {
    const link = tankLinkList[index];
  }

  // console.log(tankLinkList.length)
  process.exit()
}
// start()

async function traverse() {
  const browser = await puppeteer.launch({
    // headless: false
  }); 

  const page = await browser.newPage(); 

  for (let index = 0; index < tankLinkList.length; index++) {
    const tankLink = tankLinkList[index];
    console.log(tankLink)
    const id = tankLink.slice(tankLink.lastIndexOf('id=')).replace('id=', '')
    await page.goto(tankLink)
    await page.waitForSelector('#tankinfotable')
    const html = await page.$eval('#tankinfotable', e => e.innerHTML)
    // console.log(html)
    fs.writeFileSync(path.resolve('./html/'+id+'.html'), html, {encoding:'utf-8'})
    await page.waitFor(2000)
    // process.exit()
  }
  process.exit()
}

// traverse()