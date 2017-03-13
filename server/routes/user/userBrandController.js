/**
 * Created by chrisng on 3/12/17.
 */
import m from '../../models';

async function updateOwnBrands(req, res) {
  const { brands } = req.body;
  try {
    const user = await m.User.findById(req.user.id);
    for (let i = 0; i < brands.length; i++) {
      const brand = await m.Brand.findByName(brands[i]);
      if (brand) {
        user.setBrands(brand);
      }
    }
    res.status(200).send({ success: true });
  } catch(err) {
    console.error(`Error updating brands for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

async function deleteOwnBrands(req, res) {
  const { brands } = req.body;
  try {
    const user = await m.User.findById(req.user.id);
    for (let i = 0; i < brands.length; i++) {
      const brand = await m.Brand.findByName(brands[i]);
      if (brand) {
        user.removeBrand(brand);
      }
    }
    res.status(200).send({ success: true });
  } catch(err) {
    console.error(`Error deleting brands for user ${req.user.id}: ${JSON.stringify(err)}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { updateOwnBrands, deleteOwnBrands };
