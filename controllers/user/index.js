const router = require('express').Router();
const authRoutes = require('./user-auth');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/authorize', authRoutes);
router.use('/dashboard', dashboardRoutes);


module.exports = router;
