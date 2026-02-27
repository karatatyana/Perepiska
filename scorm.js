var SCORM = {

  API: null,
  connected: false,

  init() {
    this.API = this.findAPI(window);

    if (this.API) {
      this.API.LMSInitialize("");
      this.connected = true;
      console.log("SCORM connected");
    } else {
      console.log("Standalone mode");
    }
  },

  findAPI(win) {
    while (win) {
      if (win.API) return win.API;
      win = win.parent;
    }
    return null;
  },

  getValue(param) {
    if (!this.connected) return null;
    return this.API.LMSGetValue(param);
  },

  setValue(param, value) {
    if (!this.connected) return;
    this.API.LMSSetValue(param, value);
  },

  commit() {
    if (!this.connected) return;
    this.API.LMSCommit("");
  },

  finish() {
    if (!this.connected) return;
    this.API.LMSCommit("");
    this.API.LMSFinish("");
  }

};