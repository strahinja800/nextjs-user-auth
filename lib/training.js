/* import db from './db';

export function getTrainings() {
  const stmt = db.prepare('SELECT * FROM trainings');
  return stmt.all();
}
 */

import prisma from "@/prisma/client";

export async function getTrainings() {
  return await prisma.training.findMany()
}