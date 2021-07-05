/* eslint-disable import/no-anonymous-default-export */
import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('user').get();
    const entriesData = entries.docs.map(entry => entry.data());

    if (entriesData.some(entry => entry.email === email)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('user').add({
        ...req.body,
        created: new Date().toISOString(),updated: new Date().toISOString(),
      });
      res.status(200).json({ id });
     }
    } catch (e) {
      res.status(400).end();
    }
  }
   