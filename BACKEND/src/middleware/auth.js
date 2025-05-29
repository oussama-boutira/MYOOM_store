import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification invalide' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Decoded token:', decoded);

      if (!decoded._id) {
        return res.status(401).json({ message: 'Token invalide: ID utilisateur manquant' });
      }

      // Ensure we have the user ID in the correct format
      req.user = {
        _id: decoded._id,
        email: decoded.email,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        role: decoded.role
      };

      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré' });
      }
      return res.status(401).json({ message: 'Token invalide' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Erreur d\'authentification' });
  }
}; 
