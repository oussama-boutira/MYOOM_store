import('dotenv/config')
import {userModel} from '../models/userShema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = async ({ firstname, lastname, email, password, role = 'user' }) => {
    try {
        // Vérifier si l'utilisateur existe déjà
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            return { 
                data: { message: 'Un utilisateur avec cet email existe déjà' }, 
                statuscode: 400 
            };
        }

        // Hasher le mot de passe
        const hashingpws = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = new userModel({ 
            firstname, 
            lastname, 
            email, 
            password: hashingpws,
            role 
        });

        // Sauvegarder l'utilisateur
        await newUser.save();

        // Générer le token JWT
        const token = gen_jwt({
            _id: newUser._id,
            email,
            firstname,
            lastname,
            role
        });

        return { 
            data: { 
                message: 'Inscription réussie',
                token,
                user: {
                    _id: newUser._id,
                    email,
                    firstname,
                    lastname,
                    role
                }
            }, 
            statuscode: 201 
        };
    } catch (error) {
        console.error("Registration error:", error);
        return { 
            data: { message: 'Une erreur est survenue lors de l\'inscription' }, 
            statuscode: 500 
        };
    }
}

export const login = async ({ password, email }) => {
    try {
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return { 
                data: { message: 'Email ou mot de passe incorrect' }, 
                statuscode: 400 
            };
        }

        const matchingPsw = await bcrypt.compare(password, findUser.password);
        if (matchingPsw) {
            const token = gen_jwt({
                _id: findUser._id,
                email,
                firstname: findUser.firstname,
                lastname: findUser.lastname,
                role: findUser.role
            });
            return { 
                data: { 
                    message: 'Connexion réussie',
                    token,
                    user: {
                        _id: findUser._id,
                        email,
                        firstname: findUser.firstname,
                        lastname: findUser.lastname,
                        role: findUser.role
                    }
                }, 
                statuscode: 200 
            };
        }

        return { 
            data: { message: 'Email ou mot de passe incorrect' }, 
            statuscode: 400 
        };
    } catch (error) {
        console.error("Login error:", error);
        return { 
            data: { message: 'Une erreur est survenue lors de la connexion' }, 
            statuscode: 500 
        };
    }
};

const gen_jwt = (data) => {
    try {
        return jwt.sign(data, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    } catch (error) {
        console.error("JWT generation error:", error);
        throw new Error('JWT generation failed');
    }
};
