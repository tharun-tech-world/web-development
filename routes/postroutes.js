const router = require('express').Router();
const verify= require('../routes/verifytoken')

router.get('/', verify, (req, res) => {
   //res.send(req.user);

    res.json({
        posts: {
            title: 'Tharun Post',
            description: 'Enjoyed the Session ?'
        }
    });

})


module.exports = router;
