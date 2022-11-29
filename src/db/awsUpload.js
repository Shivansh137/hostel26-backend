const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadFile = (filename) => {
  let url;
  //READ CONTENT FROM THE FILE
  const fileContent = fs.readFileSync('public/images/img_avatar.png');

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
module.exports = uploadFile;