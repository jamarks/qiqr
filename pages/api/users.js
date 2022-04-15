/* eslint-disable import/no-anonymous-default-export */
import db from '../../utils/db';

export default async (req, res) => {
  try {
    const entries = await db.collection('user').orderBy('created').get();
    console.log(entries)
    const entriesData = entries.docs.map(user => ({
      id: user.id,
      ...user.data()
    }));
    res.status(200).json({ entriesData });
  } catch (e) {
    console.log(e)
    res.status(400).end({});
  }
}