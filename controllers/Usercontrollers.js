const User = require("../modal/usermodel");
const { generateTocken } = require("../tocken/generateTocken");

const userSignUp = async (req, res) => {
  const user = await User.find({ _id: req.body._id });
  if (user.length) {
    res.status(400).json({ message: "User Already Exists " });
  } else {
    try {
      let insertData = await User(req.body);
      const result = await insertData.save();
      const tocken = await generateTocken(result._id);
      res.status(200).json({ message: "SignUp SuccessFull", result, tocken });
    } catch (error) {
      console.log("error", error);
    }
  }
};

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let comparedResult = await user.matchPassword(req.body.password);
    if (comparedResult) {
      let tocken = await generateTocken(user._id);
      res
        .status(200)
        .json({ message: "Login SuccessFull", result: user, tocken });
    } else {
      res.status(400).json({ message: "Password does Not MAtch" });
    }
  } else {
    res.status(400).json({ message: "User Not Found " });
  }
};

const fetchParticularUser = async (req, res) => {
  try {
    let singleUser = await User.find({ _id: req.user._id });
    res.status(200).json({ message: "Fetched UserData", result: singleUser });
  } catch (error) {
    res.json({ message: "Unable To Get The data" });
  }
};

const addCalories = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.body);
    let inserrtCalories = await User.updateOne(
      { _id: req.user._id },
      { $set: { calories: req.body } }
    );
    res.status(200).json({
      message: "Calories Data Updated SuccessFully",
      result: inserrtCalories,
    });
  } catch (error) {
    res.json({ amessage: "Unable To Insert calories Data" });
  }
};

const addNewDietPlan = async (req, res) => {
  try {
    let findDietPlan = await User.find({ _id: req.user._id });
    console.log("findDietPlan",findDietPlan)
    if (findDietPlan[0].dietPlan.length > 0) {
        res.json({message:"Already Diet Plan Exists"})
    } else {
      let insertNewDiet = await User.updateOne(
        { _id: req.user._id },
        { $set: { dietPlan: req.body } },
        { new: true }
      );
      res
        .status(200)
        .json({
          message: "Diet Plan Added SuccessFully",
          result: insertNewDiet,
        });
    }
  } catch (error) {
    res.json({ message: "Unable To Add The Diet Plan" });
  }
};


const getSingleUserDetails = async (req,res) => {
    try{
        let displayData = await User.find({_id:req.user._id})
        res.status(200).json({message:"Data Retrieved SuccessFully",result:displayData})
    }catch(error){
        res.json({message:"Unable To Display The User data"})
    }
}


const removeDeitPlan = async (req,res) => {
  console.log(req.body)
  try{
    let removeDiet = await User.updateOne({_id:req.user._id},{$set:{dietPlan:[]}}) 
    res.status(200).json({message:"SuccessFully Removed Diet Plan",result:removeDiet})
  }catch(error){
    res.json({message:"Unable To Remove The Diet Data"})
  }
}



module.exports = {
  userSignUp,
  loginUser,
  addCalories,
  addNewDietPlan,
  fetchParticularUser,
  getSingleUserDetails,
  removeDeitPlan
};
