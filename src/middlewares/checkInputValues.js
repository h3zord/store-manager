const checkProductInfo = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const checkSaleInfo = (req, res, next) => {
  for (let index = 0; index < req.body.length; index += 1) {
    const { productId, quantity } = req.body[index];
    if (productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  } 
  return next();
};

module.exports = {
  checkProductInfo,
  checkSaleInfo,
};