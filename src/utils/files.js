/**
 * @file Contains file utils.
 * @author Manuel Cabral
 * @version 0.0.1
 */

// required modules
const fs = require('fs')

/**
 * Delete all files from a folder.
 * @param {String} path - The path of the folder.
 * @returns {Boolean} - True if the files were deleted. Otherwise, false.
 */
const clearFolderFiles = async (path) => {
	const files = fs.readdirSync(path)
	if (!files.length) return false
	files.forEach(async (file) => {
		await fs.unlinkSync(`${path}/${file}`)
	})
	return true
}

/**
 * Check if a path exists.
 * @param {*} path - The path to check.
 * @returns {Boolean} - True if the path exists. Otherwise, false.
 */
const existsPath = async (path) => fs.existsSync(path)

const createPath = async (path) => {
    const exists = await existsPath(path)
    if (!exists) await fs.mkdirSync(path)
}

module.exports = {
    existsPath,
    createPath,
	clearFolderFiles,
}
