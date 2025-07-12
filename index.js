const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/download", (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.json({ success: false, message: "No URL provided" });

  // Use yt-dlp to get direct video URL
  exec(`yt-dlp -g "${videoUrl}"`, (error, stdout, stderr) => {
    if (error) {
      return res.json({ success: false, message: stderr });
    }
    const downloadUrl = stdout.trim().split("\n")[0];
    res.json({ success: true, downloadUrl });
  });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
