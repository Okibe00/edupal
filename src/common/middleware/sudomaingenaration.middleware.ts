import {Request,  NextFunction, Response } from "express";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')   // remove special characters
    .trim()
    .replace(/\s+/g, '-');         // replace spaces with hyphens
}
async function generateUniqueSlug(name: string) {
  let baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;
  //check  database
  // while (await schoolExists(slug)) {
  //   counter++;
  //   slug = `${baseSlug}${counter}`;
  // }

  return slug;
}

function getSubdomain(req:Request) {
  const host = req.hostname; // xyzacademy.edupal.app
  const parts = host.split('.');
  
  if (parts.length < 3) return null; // no subdomain
  
  return parts[0]; // xyzacademy
}

async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  // const subdomain = getSubdomain(req);

  // if (!subdomain) {
  //   return res.status(400).json({ error: "Invalid subdomain" });
  // }

  // const school = await db.schools.findOne({ slug: subdomain });

  // if (!school) {
  //   return res.status(404).json({ error: "School not found" });
  // }

  // req.school = school;
  // next();
}