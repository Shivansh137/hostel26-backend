const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS();

const uploadFile = (filename) => {
  let url;
  //READ CONTENT FROM THE FILE
  const fileContent = fs.readFileSync(filename);

  //SETTING S3 BUCKET UPLOAD PARAMETERS
  const params = {
    Bucket: 'cyclic-clumsy-hare-uniform-ap-southeast-1',
    Key: filename,
    Body: fileContent,
    ContentType:'image/*'
  };
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    url = data.Location
  });

  return url;
}
modules.exports = uploadFile;