/**
 * Created by chrisng on 3/20/17.
 */
import m from '../models';

export async function getAllInfo(type, offset, limit) {
  const query = {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { type },
    include: [
      { model: m.Brand, attributes: ['name'] },
      { model: m.Site, attributes: ['name'] },
    ],
    order: 'date DESC',
    limit,
    offset,
  };
  return await m.Info.findAll(query);
}
