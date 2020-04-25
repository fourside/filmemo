
let storeModule;
if (process.env.NODE_ENV === "production") {
  storeModule = require("./StoreProd");
} else {
  storeModule = require("./StoreDev");
}
export const store = storeModule.store;
