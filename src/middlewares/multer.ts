import Multer from 'multer'

export const multer = Multer( {
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 2 * 1024 * 1024, // No larger than 2mb, change as you need
	},
}).single('picture')