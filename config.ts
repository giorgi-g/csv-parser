require('dotenv').config();

export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_ENV = process.env.DB_ENV || 'dev01';
export const DB_PORT = process.env.DB_PORT || '5432';
export const FILES_DIR = 'files';
export const FILE_EXTENSION = 'csv';
