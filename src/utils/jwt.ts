import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'uJGGdZzj1yDHJInqerFZMldPvlxM56zDsUYfBsROS8kXFzlZRJEtX0QUcNmPDa/Xhhw=';



export function generateToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

}

