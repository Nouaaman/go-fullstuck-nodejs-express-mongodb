const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    console.log('User added successfully!')
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                    
                }
            ).catch(
                (error) => {
                    console.error(error)
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};


exports.login = (req, res, next) => {
    User.findOne({
       email:req.body.email
    }).then(
        (user) => {
            if (!user) { 
                console.error('User not found!');
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        console.log('incorrect password')
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    const token = jwt.sign({
                            userId: user._id
                        },
                        'RANDOM_TOKEN_SECRET', {
                            expiresIn: '24h'
                        });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    console.error(error)
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            console.error(error)
            res.status(500).json({
                error: error
            });
        }
    );
}