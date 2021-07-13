/* eslint-disable import/no-anonymous-default-export */
import db from '../../../utils/db';
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const { id } = req.query;
  const session = await getSession({ req })

  try {
    if (req.method === 'PUT') {
      // diferenciar si es un insert o es un update
      await db.collection('user').doc(id).update({...req.body,updated: new Date().toISOString(),});
      if (session) {
        // update
      }
    } else if (req.method === 'GET') {
      const doc = await db.collection('user').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      await db.collection('user').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}