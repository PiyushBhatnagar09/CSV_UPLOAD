// using the flash messages to show message to user
module.exports.setFlash= function(req, res, next) {
    res.locals.flash= {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
}