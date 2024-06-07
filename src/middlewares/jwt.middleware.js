import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    // 1. Read the token
    const token = req.headers['authorization'];

    // 2. if no token, return error
    if(!token){
        res.status(401).send('Unauthorized');
    }

    // 3. check if token is valid
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload);
        req.userId = payload.userId;
    }catch(err){
        // 4. return error
        res.status(401).send('Unauthorized');
    }

    // 5. Call next middleware in pipeline
    next();
}

export default jwtAuth;