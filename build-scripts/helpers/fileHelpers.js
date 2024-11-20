import fs from "fs";
import crypto from "crypto";

/**
 * Creates a hash of the contents of a file
 * @param {string} filePath - Path to the file to hash
 * @returns {string} Hash of the file contents
 */
export function hashFile(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileContent);
  return hash.digest("hex");
}
