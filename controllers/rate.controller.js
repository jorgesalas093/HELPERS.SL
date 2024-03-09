const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Rate = require('../models/Rate.Model');

module.exports.createRate = (req, res, next) => {
    const { receiverId } = req.params;
    const { rate } = req.body;
    const { currentUserId } = req;

    if (currentUserId === receiverId) {
        return next(createError(StatusCodes.BAD_REQUEST, 'Cannot rate yourself'));
    }

    Rate.create({
        postRate: currentUserId,
        receiverRate: receiverId,
        rate: rate
    })
        .then(rate => {
            res.status(StatusCodes.CREATED).json(rate);
        })
        .catch(next);
};


module.exports.getRate = (req, res, next) => {
    const { receiverId } = req.params;

    Rate.find({ receiverRate: receiverId })
        .then(rates => {
            if (rates.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'No rates found for the receiver' });
            }
        
            const totalRate = rates.reduce((accumulator, rate) => {
                return accumulator + rate.rate;
            }, 0);
            
            const averageRate = totalRate / rates.length;
            

            res.status(StatusCodes.OK).json({ rates, score: averageRate });

        })
        .catch(error => {
            console.error('Error fetching rates:', error);
            next(error);
        });
};


// module.exports.getRate = (req, res, next) => {
//     const { receiverId } = req.params;

//     Rate.find({ receiverRate: receiverId })
//         .then(rates => {
//             if (rates.length === 0) {
//                 return res.status(StatusCodes.NOT_FOUND).json({ message: 'No rates found for the receiver' });
//             }



//             res.json({ rates, totalScore: 123 })

//         })
//         .catch(error => {
//             console.error('Error fetching rates:', error);
//             next(error);
//         });
// };
