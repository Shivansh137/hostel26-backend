const express = require('express')
const router = express.Router()
const Student = require('./db/studentSchema')
const Post = require('./db/postSchema')
const multer = require('multer');
const bcrypt = require('bcrypt')
const auth = require('./middleware/auth');
const profileAuth = require('./middleware/profileAuth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'public/images')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})
const upload = multer({storage:storage})

router.get('/posts',async(req, res) => {
  res.json(await Post.find({}));
})

router.post('/', upload.single('post'), async (req, res) => {
  const { title, date, by } = req.body;
  try {
    const post = new Post({ img: req.file.filename, title, date,by });
    await post.save();
    res.json({ img: req.file.filename, title, date,by });
  } catch (error) {
    console.log(error);
  }
})
//-----------Registration-------------------------------------
router.post('/register', upload.single('profile'), async (req, res) => {
  const { name, branch, section, city, mobile, room, floor, password, cpassword } = req.body;
  try {
    if (await Student.findOne({mobile:mobile})) {
      res.json("This mobile no. is already taken 😅");
    }
    else if (password === cpassword) {
      const student = new Student({name,branch,section,city,mobile,room, floor,password,profilePic:req.file.filename});
      await student.save()
      res.json("Registered Successfully")
    }
    else {
      res.json("Passwords are not matching");
    }
  } catch (error) {
     console.log(err);
  }
})
//----------------------------Login---------------------------
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  const studentData = await Student.findOne({ mobile: mobile });
  try {

    if (!studentData) {
      res.json("Invalid Details");
    }
    else {
      const isPasswordCorrect = await bcrypt.compare(password, studentData.password);
      if (!isPasswordCorrect) {
         res.json("Invalid Password")
       }
      else {
        let token = await studentData.generateAuthToken();
         res.json(token);
       }
    }
  } catch (error) {
     console.log(error);
  }
})
//-------------------------Students-------------------
router.get('/students', auth, async (req, res) => {
    const students_data = await Student.find({});
    res.json(students_data);
})

router.get('/students/:room', async(req, res) => {
  const data = await Student.find(req.params);
  res.json(data);
})


//------------------------Profile---------------------
router.post('/profile',profileAuth, (req, res) => {
  res.json(req.studentData);
})

router.patch('/profile/:id', async(req, res) => {
  const id = req.params.id;
  await Student.updateOne({ _id: id }, req.body);
})

router.patch('/profile/:id/:profilePic', upload.single('updateprofile'), async (req, res) => {
  await Student.updateOne({ _id: req.params.id }, { profilePic: req.file.filename });
  res.json(req.file.filename);
})
module.exports = router