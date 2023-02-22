import Box from "@mui/material/Box";
import TabsBar from "./pageComponent/TabsBar";

export default function ShortenURL() {
  return (
    <Box sx={{ width: "50vw", height: "50vh" }}>
      <h2>URL Shortener</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabsBar />
      </Box>
    </Box>
  );
}
