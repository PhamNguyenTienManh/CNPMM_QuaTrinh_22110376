import fs from 'fs';
import path from 'path';
import process from 'process';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

// Lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db: { [key: string]: any } = {}; // Định nghĩa kiểu cho db

// Đọc file config.json thủ công
const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const environmentConfig = config[env];  // Truy cập cấu hình theo môi trường

let sequelize: Sequelize;

if (environmentConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[environmentConfig.use_env_variable] as string, environmentConfig);
} else {
  sequelize = new Sequelize(
    environmentConfig.database,
    environmentConfig.username,
    environmentConfig.password,
    environmentConfig
  );
}

// Đọc các tệp trong thư mục hiện tại và tự động tạo các model
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.endsWith('.ts') || file.endsWith('.js')) && // hỗ trợ cả TS & JS
      !file.endsWith('.test.ts')
  );

for (const file of files) {
  const modelPath = path.join(__dirname, file);
  const modelModule = await import(pathToFileURL(modelPath).href);
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Tạo các mối quan hệ nếu có
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;