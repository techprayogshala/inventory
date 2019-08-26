const router = require('express').Router();

router.use('/login', require('./loginRouter'));
router.use('/shopping-centre', require('./centresRouter'));
router.use('/shopping-centre', require('./assetsRouter'));
router.use('/', require('./assetsRouter'));

module.exports = router;
