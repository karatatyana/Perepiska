var SCORM = {

  API: null,
  connected: false,

  init() {
    if (window.API) {
      this.API = window.API;
      this.API.LMSInitialize("");
      this.connected = true;
    }
  },

  setScore(score) {
    if (this.connected) {
      this.API.LMSSetValue("cmi.core.score.raw", score);
    }
  },

  complete(success) {
    if (this.connected) {
      this.API.LMSSetValue("cmi.core.lesson_status", success ? "passed" : "failed");
      this.API.LMSFinish("");
    }
  }

};
