import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanelAddURL from "./TabPanelAddURL";
import TabPanelManageURL from "./TabPanelManageURL";

enum TabName {
  AddURL = "Add URL",
  ManageURL = "Manage URL",
}
export default function TabsBar() {
  const [selectedTab, setSelectedTab] = useState(TabName.AddURL);
  const handleSelectTab = (event: React.SyntheticEvent, tabName: TabName) => {
    // console.log(tabName);
    setSelectedTab(tabName);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#F0F0F0" }}>
        <Tabs
          value={selectedTab}
          onChange={handleSelectTab}
          sx={{
            "& button": { borderRadius: 2 },
            "& buttono:hover": { backgroundColor: "#F0f0F0" },
            "& button.Mui-selected": { backgroundColor: "#F0f0F0" },
          }}
        >
          <Tab value={TabName.AddURL} label={TabName.AddURL} />
          <Tab value={TabName.ManageURL} label={TabName.ManageURL} />
        </Tabs>
      </Box>
      {selectedTab === TabName.AddURL && <TabPanelAddURL />}
      {selectedTab === TabName.ManageURL && <TabPanelManageURL />}
    </Box>
  );
}
