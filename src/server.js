// server.js

const express = require("express");
const dbPool = require("./configs/config.db.js"); // Import cấu hình database
const sequelize = require("./configs/sequelize.js"); // Import Sequelize instance
require("./models");
const app = express();
const port = 2811;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
const routes = require("./routes");
app.use(routes);

app.get("", async (req, res) => {});

// Khởi động Server
// app.listen(port, () => {
//   console.log(`Server đang chạy tại http://localhost:${port}`);

// // Kiểm tra kết nối database
//   dbPool.getConnection()
//     .then(connection => {
//       console.log('✅ Đã kết nối thành công với MySQL!');
//       connection.release(); // Giải phóng kết nối
//     })
//     .catch(err => {
//       console.error('❌ Lỗi kết nối MySQL:', err.message);
//     });
// });

async function startServer() {
  try {
    //{ force: true } sẽ XÓA BỎ và tạo lại các bảng
    //await sequelize.sync({ force: false, alter: true });
    console.log("✅ Đồng bộ hóa Models với Database thành công.");

    app.listen(port, () => {
      console.log(`Server đang chạy tại http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khi khởi động server hoặc đồng bộ DB:", error);
  }
}

startServer();
