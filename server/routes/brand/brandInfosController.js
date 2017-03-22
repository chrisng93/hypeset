/**
 * Created by chrisng on 3/21/17.
 */
import m from '../../models';

function createBrandInfoQuery(type, brandName, offset, limit) {
  return {
    attributes: ['name', 'condensedName'],
    where: { condensedName: brandName },
    include: [{ model: m.Info, where: { type }, order: 'date ASC' }],
    offset,
    limit,
    subQuery: false,
  };
}

async function retrieveBrandInfos(req, res) {
  const { name } = req.params;
  let { offset, limit } = req.query;
  try {
    offset ? offset = parseInt(offset) : offset = 0;
    limit ? limit = parseInt(limit) : limit = 20;
    const newsQuery = createBrandInfoQuery('News', name, offset, limit);
    const salesQuery = createBrandInfoQuery('Sale', name, offset, limit);
    const brand = await m.Brand.find({ attributes: ['name', 'condensedName'], where: { condensedName: name } });
    const brandNews = await m.Brand.find(newsQuery) || {};
    const brandSales = await m.Brand.find(salesQuery) || {};
    console.log(`Retrieved news and sales for brand ${name}`);
    const brandInfos = {
      brand: brand.name,
      brandNews: brandNews.Infos || [],
      brandSales: brandSales.Infos || [],
    };
    res.status(200).send({ success: true, brandInfos });
  } catch(err) {
    console.error(`Error retrieving brand ${name} infos: ${err}`);
    res.status(500).send({ success: false, message: JSON.stringify(err) });
  }
}

module.exports = { retrieveBrandInfos };
