const sidebarBasic = require('./basic')
const sidebarAdvance = require('./advance')
const sidebarInterview = require('./interview')
const sidebar = {
  '/basic': sidebarBasic(),
  '/advance': sidebarAdvance(),
  '/interview': sidebarInterview(),
}
module.exports = {
  sidebar: sidebar,
}
