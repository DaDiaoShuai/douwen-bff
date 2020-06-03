const restaurants = [
  '辉煌国际',
  '花溪',
  '米feel',
  '减肥',
  '随波逐流'
]

let eatWhat = () => {
  let rmd = Math.floor(Math.random() * restaurants.length)
  if(!restaurants[rmd]) {
    return eatWhat()
  }else {
    return {
      result: restaurants[rmd]
    }
  }
};

module.exports = (data) => {
  console.log(data.a)
  return new Promise((resolve, reject) => {
    resolve(eatWhat());
  })
};