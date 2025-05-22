import {
  Drawer,
  Box,
  Stack,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type Widget = {
  title: string;
};

type ManagedCategory = {
  category: string;
  widgets: Widget[];
};

type ManagedWidgetDrawerProps = {
  open: boolean;
  onClose: () => void;
  managedData: ManagedCategory[];
  onAddWidget?: (category: string, widget: Widget) => void;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const ManagedWidgetDrawer = ({
  open,
  onClose,
  managedData,
  onAddWidget,
}: ManagedWidgetDrawerProps) => {
  const [value, setValue] = React.useState(0);
  const [selectedWidgets, setSelectedWidgets] = React.useState<{
    [category: string]: string[];
  }>({});

  const handleToggle = (category: string, label: string) => {
    setSelectedWidgets((prev) => {
      const categoryWidgets = prev[category] || [];
      const isSelected = categoryWidgets.includes(label);
      return {
        ...prev,
        [category]: isSelected
          ? categoryWidgets.filter((l) => l !== label)
          : [...categoryWidgets, label],
      };
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CustomTabPanel = ({
    children,
    value,
    index,
    ...other
  }: TabPanelProps) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
      </div>
    );
  };

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  const WidgetOption = ({
    label,
    category,
  }: {
    label: string;
    category: string;
  }) => (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 1,
        px: 1,
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedWidgets[category]?.includes(label) || false}
            onChange={() => handleToggle(category, label)}
            sx={{ color: "#14147d" }}
          />
        }
        label={
          <Typography variant="subtitle2" fontSize={12} fontWeight={600}>
            {label}
          </Typography>
        }
      />
    </Box>
  );

  const renderWidgetsByCategory = (categoryLabel: string) => {
    return managedData
      ?.filter((item) => item.category === categoryLabel)
      .flatMap((item) =>
        item.widgets.map((widget, idx) => (
          <WidgetOption
            key={`${item.category}-${idx}`}
            label={widget.title}
            category={item.category}
          />
        ))
      );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack sx={{ width: 700 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ backgroundColor: "#14147d" }}
          alignItems="center"
          mb={1}
          px={3}
        >
          <Typography variant="body1" color="white">
            Add Widget
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Stack>

        {/* Body */}
        <Stack spacing={2} px={1} sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography variant="subtitle2">
            Select a widget type to add to your dashboard.
          </Typography>

          {/* Tabs */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="widget tabs"
                indicatorColor="primary"
                sx={{ "& .MuiTabs-indicator": { backgroundColor: "#14147d" } }}
              >
                <Tab label="CSPM" {...a11yProps(0)} sx={{ fontWeight: 800 }} />
                <Tab label="CWPP" {...a11yProps(1)} />
                <Tab
                  label="Image"
                  {...a11yProps(2)}
                  sx={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Ticket"
                  {...a11yProps(3)}
                  sx={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              {renderWidgetsByCategory("CSPM Executive Dashboard")}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {renderWidgetsByCategory("CWPP Executive Dashboard")}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {renderWidgetsByCategory("Image Scan Dashboard")}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              {renderWidgetsByCategory("Ticketing Dashboard")}
            </CustomTabPanel>
          </Box>
        </Stack>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            width: "100%",
            borderTop: "1px solid #eee",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: "#0b1444",
                color: "#0b1444",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                Object.entries(selectedWidgets).forEach(
                  ([category, widgets]) => {
                    widgets.forEach((widgetTitle) => {
                      const widget = managedData
                        .find((item) => item.category === category)
                        ?.widgets.find((w) => w.title === widgetTitle);
                      if (widget && onAddWidget) {
                        onAddWidget(category, widget);
                      }
                    });
                  }
                );
                onClose();
              }}
              sx={{
                backgroundColor: "#0b1444",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "#0a123d",
                },
              }}
            >
              Confirm
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default ManagedWidgetDrawer;
