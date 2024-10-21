function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function ucfirst(str, force) {
  str = force ? str.toLowerCase() : str;
  return str.replace(/(\b)([a-zA-Z])/, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

export { getUUID, ucfirst };
