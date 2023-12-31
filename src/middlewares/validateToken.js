import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    
    const { token } = req.signedCookies;;

    if (!token) return res.status(401).json({ message: "Authorization denied"})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {

        if (err) return res.status(401).json({ message: "Authorization denied"})
        req.user = user
        next()
    })

    
}
