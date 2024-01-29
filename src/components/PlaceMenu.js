import React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Typography } from "antd";
function PlaceMenu({ trips, deleteOnePlace, openList, handleClick }) {
  console.log("tripsin place menu", trips);
  const { Title } = Typography;
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Title level={5}>Finalize Your Places </Title>
          </ListSubheader>
        }
      >
        {trips?.map((trip, i) => (
          <div key={i}>
            <ListItemButton
              onClick={() => {
                handleClick(i);
                // console.log("click tab");
              }}
              key={i}
            >
              <ListItemText
                primary={`Day ${i + 1} (click to select this day)`}
              />
              {openList[i] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openList[i]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {trip?.map((t, j) => (
                  <ListItemButton sx={{ pl: 4 }} key={j}>
                    <ListItemText primary={t.name} />
                    <button
                      key={j}
                      onMouseDown={(e) => {
                        deleteOnePlace(i, t.name);
                        console.log("delete");
                        e.stopPropagation();
                      }}
                    >
                      delete
                    </button>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </>
  );
}
export default PlaceMenu;
