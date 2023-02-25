/* eslint-disable complexity */
const checkProductInfo = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const checkSaleInfo = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: '"productId" or "quantity" are missing' });
  }
  
  for (let index = 0; index < req.body.length; index += 1) {
    const { productId, quantity } = req.body[index];
    if (productId === undefined || quantity === undefined) {
      return res.status(400).json({ message: '"productId" or "quantity" are missing' });
    }
  }
  next();
};

module.exports = {
  checkProductInfo,
  checkSaleInfo,
};