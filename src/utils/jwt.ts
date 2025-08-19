import * as jwt from "jsonwebtoken";

// if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined')
// }
const JWT_SECRET = "uJGGdZzj1yDHJInqerFZMldPvlxM56zDsUYfBsROS8kXFzlZRJEtX0QUcNmPDa/Xhhw="



export function generateToken(userId: number, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });

}

