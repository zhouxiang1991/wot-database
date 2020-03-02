const fs =require('fs')
const path =require('path')
const Mongo = require('./mongo')
const mongoose = require('mongoose')
const puppeteer = require('puppeteer')
const tankSchema = require('./schema/tank')
const dbURL = 'mongodb://localhost:27017/wot'
const tank = new Mongo(dbURL, 'tanks', tankSchema)
const tankLinkList = require('./tankLinkList.json')
// const nationLinkList = require('./nationLinkList.json')
// console.log(tankLinkList)

// const data = fs.readFileSync(path.resolve('./data.json'))
// const nationLinkList = fs.readFileSync(path.resolve('./nationLinkList.json'))
// const tankLinkList = fs.readFileSync(path.resolve('./tankLinkList.json'))

// const URL = 'https://wiki.wargaming.net/en/World_of_Tanks'
// const URL = 'https://www.baidu.com'

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

traverse()