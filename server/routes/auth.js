import express from 'express';
import mongodb from '../mongoAccess';
const router = express.Router();
import passport from 'passport';


router.get('/twitter',passport.authenticate('twitter'));
router.get('/twitter/return',passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    const { id, username, displayName, _json:{profile_image_url} } = req.user;
    const userInfo = { id, username, displayName, profile_image_url };
    res.cookie('userInfo', JSON.stringify(userInfo), { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
    res.redirect('/');
  });

export default router;
