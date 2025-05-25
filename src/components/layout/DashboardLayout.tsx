import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import { PieChart, Pie, Cell, Label } from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AddWidgetDrawer from "../widgets/addWidgetDrawer";
import ManagedWidgetDrawer from "../widgets/managedWidgetDrawer";

import { useEffect } from "react";
import { useDashboardStore } from "../../stores/useDashboardStore";

type PieWidget = {
  id: string;
  title: string;
  chartType: "pie";
  total: boolean;
  data: { name: string; value: number; color: string }[];
};

type NoDataWidget = {
  id: string;
  type: "no-data";
  title: string;
  content: string;
  image: string;
};

type Widget = PieWidget | NoDataWidget;

type DashboardSection = {
  category: string;
  widgets: Widget[];
};

type DashboardLayoutProps = {
  searchQuery: string;
};


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ searchQuery }) => {
  const widgetsData: DashboardSection[] = [
    {
      category: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloudAccounts",
          title: "Cloud Accounts",
          chartType: "pie",
          total: true,
          data: [
            { name: "Connected", value: 1, color: "#4B6BFB" },
            { name: "Not Connected", value: 1, color: "#E5EDFF" },
          ],
        },
        {
          id: "riskAssessment",
          title: "Cloud Account Risk Assessment",
          chartType: "pie",
          total: true,
          data: [
            { name: "Failed", value: 1689, color: "#C92A2A" },
            { name: "Warning", value: 681, color: "#FCC419" },
            { name: "Not available", value: 36, color: "#DEE2E6" },
            { name: "Passed", value: 7253, color: "#37B24D" },
          ],
        },
      ],
    },
    {
      category: "CWPP Dashboard",
      widgets: [
        {
          id: "1",
          type: "no-data",
          title: "Top 5 Namespace Specific Alerts",
          content: "No Graph data available!",
          image: "",
        },
        {
          id: "2",
          type: "no-data",
          title: "Workload Alerts",
          content: "No Graph data available!",
          image: "",
        },
      ],
    },
  ];

  const [openAddWidgetDrawer, setOpenAddWidgetDrawer] = useState(false);
  const [openManagedWidgetDrawer, setOpenManagedWidgetDrawer] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { dashboardWidgets, addWidget, removeWidget, setWidgets } = useDashboardStore();

  useEffect(() => {
    setWidgets(widgetsData);
  }, []);

  const handleRemoveWidget = (category: string, widgetId: string) => {
    removeWidget(category, widgetId);
  };

  const handleAddWidget = (widgetName: string, widgetText: string, category: string) => {
    const newWidget: NoDataWidget = {
      id: Date.now().toString(),
      type: "no-data",
      title: widgetName,
      content: widgetText,
      image: "",
    };
    addWidget(category, newWidget);
  };

  const filterWidgets = (widget: Widget) => {
    const query = searchQuery.toLowerCase();

    if ("chartType" in widget && widget.chartType === "pie") {
      // Search in title or any data name
      const titleMatch = widget.title.toLowerCase().includes(query);
      const dataMatch = widget.data.some((d) =>
        d.name.toLowerCase().includes(query)
      );
      return titleMatch || dataMatch;
    } else if ("type" in widget && widget.type === "no-data") {
      // Search in title or content
      return (
        widget.title.toLowerCase().includes(query) ||
        widget.content.toLowerCase().includes(query)
      );
    }
    return false;
  };

  const filteredDashboardWidgets = dashboardWidgets
    .map((section) => ({
      ...section,
      widgets: section.widgets.filter(filterWidgets),
    }))
    .filter((section) => section.widgets.length > 0);

    const handleRefresh = () => {
  setWidgets(widgetsData);
};

  return (
    <>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingX={3}
        paddingTop={1}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          CNAPP Dashboard
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#677581",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
            }}
            endIcon={<AddIcon />}
            onClick={() => setOpenManagedWidgetDrawer(true)}
          >
            Managed Widget
          </Button>

          <IconButton
            aria-label="refresh"
            size="small"
            onClick={handleRefresh}
            sx={{
              backgroundColor: "#ffffff",
              color: "#677581",
              borderRadius: "8px",
              px: 1,
            }}
          >
            <SyncIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {filteredDashboardWidgets.map((section, sectionIndex) => (
        <Box key={sectionIndex} px={4} py={2}>
          <Typography variant="subtitle2" fontWeight={700} mb={2}>
            {section.category}
          </Typography>
          <Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
            {section.widgets.map((widget, widgetIndex) => {
              if ("chartType" in widget && widget.chartType === "pie") {
                return (
                  <Card
                    key={widget.id}
                    sx={{
                      flex: "1 1 300px",
                      minHeight: 180,
                      maxWidth: 500,
                      minWidth: 300,
                      borderRadius: 3,
                      px: 3,
                      pb: 5,
                      pt: 2,
                      boxShadow: "0 20px 20px rgba(57, 51, 51, 0.2)", // grey bottom shadow
                      border: "1px solid rgb(209, 200, 200)", // optional light border
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Close Icon */}
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#f5f5f5",
                      }}
                      onClick={() =>
                        handleRemoveWidget(section.category, widget.id)
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle2" fontWeight={600} mb={1}>
                      {widget.title}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={6}
                      paddingRight={5}
                    >
                      <PieChart width={120} height={120}>
                        <Pie
                          data={widget.data}
                          dataKey="value"
                          innerRadius={40}
                          outerRadius={60}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {widget.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <Label
                            value={widget.data.reduce(
                              (acc, item) => acc + item.value,
                              0
                            )}
                            position="center"
                            fontSize={18}
                            fontWeight={700}
                            fill="#000"
                            dy={-10}
                          />
                        </Pie>
                        <text
                          x={60}
                          y={70}
                          textAnchor="middle"
                          fontSize={12}
                          fill="#666"
                        >
                          Total
                        </text>
                      </PieChart>
                      <Box>
                        {widget.data.map((item, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            display="flex"
                            alignItems="center"
                            mb={0.5}
                          >
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                                mr: 1,
                              }}
                            />
                            {item.name} ({item.value})
                          </Typography>
                        ))}
                      </Box>
                    </Stack>
                  </Card>
                );
              } else if ("type" in widget && widget.type === "no-data") {
                return (
                  <Card
                    key={widget.id}
                    sx={{
                      flex: "1 1 300px",
                      minHeight: 180,
                      borderRadius: 3,
                      px: 3,
                      pb: 3,
                      pt: 2,
                      boxShadow: "0 20px 20px rgba(57, 51, 51, 0.2)", // grey bottom shadow
                      border: "1px solid rgb(209, 200, 200)", // optional light border
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "#f5f5f5",
                      }}
                      onClick={() =>
                        handleRemoveWidget(section.category, widget.id)
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="subtitle1" fontWeight={600} mb={5}>
                      {widget.title}
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Stack alignItems="center" spacing={1}>
                        <InsertChartOutlinedIcon
                          sx={{ fontSize: 48, color: "#c1c1c1" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {widget.content}
                        </Typography>
                      </Stack>
                    </Box>
                  </Card>
                );
              }
              return null;
            })}
            {/* Add Widget Card */}
            <Card
              sx={{
                flex: "1 1 300px",
                minHeight: 180,
                maxWidth: 400,
                borderRadius: 3,
                px: 3,
                pb: 5,
                pt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 20px rgba(57, 51, 51, 0.2)",
                border: "1px solid rgb(209, 200, 200)",
                overflow: "hidden",
              }}
            >
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={() => {
                  setSelectedCategory(section.category);
                  setOpenAddWidgetDrawer(true);
                }}
              >
                Add Widget
              </Button>
            </Card>
          </Stack>
        </Box>
      ))}
      {/* Managed Widgets Drawer */}
      <ManagedWidgetDrawer
        open={openManagedWidgetDrawer}
        onClose={() => setOpenManagedWidgetDrawer(false)}
        managedData={dashboardWidgets}
      />
      {/* Add Widgets Drawer */}
      <AddWidgetDrawer
        open={openAddWidgetDrawer}
        onClose={() => {
          setTimeout(() => {
            setOpenAddWidgetDrawer(false);
            setSelectedCategory(null);
          }, 300);
        }}
        onAddWidget={handleAddWidget}
        selectedCategory={selectedCategory}
      />

    </>
  );
};

export default DashboardLayout;
