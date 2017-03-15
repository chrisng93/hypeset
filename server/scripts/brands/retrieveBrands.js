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
    // const found = await m.Brand.find({ where: { name: { $iLike: allBrands[i] } } });
    // if (!found) {
    //   await m.Brand.create({ name: allBrands[i] });
    // }
  }
  // insert into db if doens't exist
}
