const jwt = require("jsonwebtoken")

const login = async (req, res)=>{
    try {
        
        const {email, password} = req.body
    
        const adminEmail= "admin@codesfortomorrow.com"
        const adminPassword= "Admin123!@#"
    
        if(email !== adminEmail || password !== adminPassword){
            return res.status(401).json({message:"Invalid Email or Password"})
        }
    
        const token = jwt.sign({email }, 
        process.env.JWT_SECRET,
        {expiresIn:"8h"}
    )
    res.json({token})
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message})
    }
}

module.exports = {login}