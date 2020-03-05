const db = {}
const tanks = db.getCollection('tanks')

const modules = db.getCollection('modules')

const zb = [
  'guns',
  'engines',
  'suspensions',
  'radios',
  'turrets',
]
const nationShortMap = {
  'italy': 'I系',
  'usa': 'M系',
  'czech': 'J系',
  'poland': 'B系',
  'france': 'F系',
  'sweden': 'V系',
  'ussr': 'S系',
  'china': 'C系',
  'uk': 'Y系',
  'japan': 'R系',
  'germany': 'D系',
}
const nationMap = {
  'italy': '意大利',
  'usa': '美国',
  'czech': '捷克',
  'poland': '波兰',
  'france': '法国',
  'sweden': '瑞典',
  'ussr': '苏联',
  'china': '中国',
  'uk': '英国',
  'japan': '日本',
  'germany': '德国',
}
const typeShortMap = {
  'heavyTank': 'ht',
  'AT-SPG': 'td',
  'mediumTank': 'mt',
  'lightTank': 'ht',
  'SPG': 'spg',
}

tanks.find().forEach((item) => {
  zb.forEach((keys) => {
    item[`${keys}_details`] = modules.find({ module_id: { $in: item[keys] } }).map((a) => {
      return a.default_profile[keys.slice(0, -1)]
    })

    const length = item[`${keys}_details`].length

    const key = keys.slice(0, -1)

    item[`${key}_high`] = item[`${keys}_details`][length - 1]

    item[`${key}_low`] = item[`${keys}_details`][0]
  })

  item = Object.merge(item, item.default_profile)

  delete item.default_profile

  delete item.engine

  delete item.max_ammo

  delete item.suspension

  delete item.modules

  delete item.weight

  delete item.gun

  delete item.radio

  delete item.turret

  delete item.ammo

  if (item.armor) {
    item.hull_armor_front = item.armor.hull.front

    item.hull_armor_sides = item.armor.hull.sides

    item.hull_armor_rear = item.armor.hull.rear

    delete item.armor
  }

  item.nation_chinese = nationMap[item.nation]
  item.nation_short_chinese = nationShortMap[item.nation]
  item.type_short = typeShortMap[item.type]

  tanks.update({ tank_id: item.tank_id }, item)
})
