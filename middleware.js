const { productSchema,reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you need to login first to do that');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProduct = (req, res, next) => {
    const { name, price, img, desc } = req.body;
    const { error }=productSchema.validate({ name, img, price, desc });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
    
}

module.exports.validatereviewProduct = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if(error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
}