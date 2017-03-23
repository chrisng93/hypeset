/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';
import { parseHbxDesigners } from './hbxDesignersScript';
import { parseGrailedDesigners } from './grailedDesignersScript';

export async function retrieveBrands() {
  try {
    console.log('Started retrieving brands..');
    // const hbxBrands = await parseHbxDesigners();
    const grailedBrands = await parseGrailedDesigners();
    // const allBrands = hbxBrands.concat(grailedBrands.brandNames);
    const allBrands = grailedBrands.brandNames;
    const brandPopularity = grailedBrands.brandPopularity;
    console.log('Finished retrieving brands..');

    for (let i = 0; i < allBrands.length; i++) {
      await m.Brand.checkOrCreate(allBrands[i]);
    }
    console.log('Finished inserting brands into db..');

    const latestBrandsByPopularity = await m.BrandPopularity.find({ order: 'batch DESC' });
    let batch = 0;
    if (latestBrandsByPopularity) {
      batch = latestBrandsByPopularity.batch += 1;
    }

    for (let i = 0; i < brandPopularity.length; i++) {
      const brand = await m.Brand.findByName(brandPopularity[i].name);
      await m.BrandPopularity.create({ BrandId: brand.id, brandName: brand.name, count: brandPopularity[i].count, batch });
    }
    console.log('Finished inserting into brand popularities table..');
  } catch(err) {
    console.error(`Error retrieivng brands: ${err}`);
  }
}
