const User = require("../Schema/schema")
const bcrypt = require("bcrypt")

module.exports.GetAllUser = async (req, res, next)=>{
    try {
        const users = await User.find({role:"USER"})
        console.log(users)
        return res.json({ status: true, users });
    } catch (ex) {
        next(ex)
    }
}

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body)
    const {username, email, role, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck){
      return res.json({ message: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let admin = {}
    if(role!=="ADMIN"){
        admin={...req.body,password: hashedPassword}
    }else{
        admin={
            username,
            email,
            password: hashedPassword,
        }
    } 

    const user = await User.create(admin);
    delete user.password;
    return res.json({ status: true,message:`${role} Register Successfully`, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const Email = await User.findOne({ email });
    if (!Email){
      return res.json({ message: "Incorrect Username", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, Email.password);
    if (!isPasswordValid){
      return res.json({ message: "Incorrect Password", status: false });
    }
    delete Email.password;
    return res.json({ message:"Login successfully",status: true, Email });
  } catch (ex) {
    next(ex);
  }
};

 