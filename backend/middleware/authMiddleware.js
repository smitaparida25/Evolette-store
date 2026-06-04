// the job? before allowing access to protected route, check if valid jwt

import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) =>{ // next is the function that'll pass the control to next route
try{
const token = req.cookies.token;
if(!token){
return res.status(401).json({
error: "Unauthorized",
});
}

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = decoded;
next();
} catch(error){
return res.status(401).json({
error: "Invalid token"
});
}
}