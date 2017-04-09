/**
 * Retrieve brand and brand popularities from Grailed
 */

import winston from 'winston';
import m from '../../models';
import { parseHbxDesigners } from './hbxDesignersScript';
import { parseGrailedDesigners } from './grailedDesignersScript';

const logger = winston.loggers.get('scripts');

export async function retrieveBrands() {
  try {
    // const hbxBrands = await parseHbxDesigners();
    logger.debug('Started retrieving from Grailed brands', { type: 'Brands', site: 'Grailed', action: 'start retrieve' });
    const grailedBrands = await parseGrailedDesigners();
    logger.debug('Finished retrieving from Grailed brands', { type: 'Brands', site: 'Grailed', action: 'finish retrieve' });
    // const allBrands = hbxBrands.concat(grailedBrands.brandNames);
    const allBrands = grailedBrands.brandNames;
    const brandPopularity = grailedBrands.brandPopularity;

    const brandPopularityCount = await m.BrandPopularity.count();
    for (let i = 0; i < allBrands.length; i++) {
      const priorCount = await m.BrandPopularity.count({ where: { brandName: allBrands[i] } });
      let isNew = (priorCount === 0) && (brandPopularityCount !== 0);
      await m.Brand.checkOrCreate(allBrands[i], isNew);
    }
    logger.debug('Finished inserting brands into database', { type: 'Brands', action: 'finish insert' });

    const latestBrandsByPopularity = await m.BrandPopularity.find({ order: 'batch DESC' });
    let batch = 0;
    if (latestBrandsByPopularity) {
      batch = latestBrandsByPopularity.batch += 1;
    }

    for (let i = 0; i < brandPopularity.length; i++) {
      const brand = await m.Brand.findByName(brandPopularity[i].name);
      await m.BrandPopularity.create({ BrandId: brand.id, brandName: brand.name, count: brandPopularity[i].count, batch });
    }
    logger.debug('Finished inserting brand popularities into database', { type: 'BrandPopularities', action: 'finish insert' });
  } catch(err) {
    logger.error('Error retrieving brands', { type: 'Brands', action: 'retrieve', err: JSON.stringify(err.message) });
  }
}
