/**
 * Created by chrisng on 3/12/17.
 */
import models from '../../models';

async function updateBrands(req, res) {
  const { brands } = req.body;
  try {
    const user = models.User.findById(req.user.id);
    brands.forEach(brand => {
      user.setBrand(brand);
    });
  } catch(err) {
    console.error(`Error updating brands for user ${user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { updateBrands };
