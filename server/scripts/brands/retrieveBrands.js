/**
 * Created by chrisng on 3/15/17.
 */
import m from '../../models';
import { parseHbxDesigners } from './hbxDesignersScript';
import { parseGrailedDesigners } from './grailedDesignersScript';

export async function retrieveBrands() {
  const hbxBrands = await parseHbxDesigners();
  const grailedBrands = await parseGrailedDesigners();
  const allBrands = hbxBrands.concat(grailedBrands.brandNames);
  const brandPopularity = grailedBrands.brandPopularity;

  for (let i = 0; i < allBrands.length; i++) {
    await m.Brand.checkOrCreate(allBrands[i]);
  }
  for (let i = 0; i < brandPopularity.length; i++) {
    const brand = await m.Brand.findByName(brandPopularity[i].name);
    await m.BrandPopularity.create({ brandId: brand.id, brandName: brand.name, count: brandPopularity[i].count });
  }
}
