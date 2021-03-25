import base64 from 'react-native-base64';

exports.encrpt = async (name, password) => {
  let encoded = await base64.encode(name + ':' + password);

  return encoded;
};

exports.decrpt = async (value) => {
  let decoded = await base64.decode(value);

  return decoded;
};

exports.sum = (data, key) => {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
};


exports.UUID4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};