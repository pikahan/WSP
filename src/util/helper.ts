export const myFilter = (storeData, advancedSearchOption, searchContent) => {
  let keys = Object.keys(advancedSearchOption).filter(key => {
    if (typeof advancedSearchOption[key] === 'number') {
      return advancedSearchOption[key] !== -1
    }
    if (typeof advancedSearchOption[key] === 'string') {
      return advancedSearchOption[key] !== '空'
    }
  })

  return storeData.filter(data => {
    console.log(data)
    let searchContentFlag = data.name.indexOf(searchContent) > -1
    let flag = 1
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (data[key] !== advancedSearchOption[key]) {
        flag = 0
      }
    }
    return !!flag && searchContentFlag
  })
}
