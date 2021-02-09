
function Code( slots) {
  this.number = slots.number;
}

Code.instances = {};

Code.Generate = function(){
    Code.instances["current"] = new Code({number: "3241"});
}