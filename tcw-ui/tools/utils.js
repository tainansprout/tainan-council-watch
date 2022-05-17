const DISTRICT_MAP = {
  第一選區: '1st',
  第二選區: '2nd',
  第三選區: '3rd',
  第四選區: '4th',
  第五選區: '5th',
  第六選區: '6th',
  第七選區: '7th',
  第八選區: '8th',
  第九選區: '9th',
  第十選區: '10th',
  第十一選區: '11th',
  第十二選區: '12th',
  第十三選區: '13th'
}

function districtName2Id (districtName) {
  if (districtName in DISTRICT_MAP) {
    return DISTRICT_MAP[districtName]
  }
  throw new Error(`Invalid district: ${districtName}`)
}

module.exports = {
  districtName2Id
}
