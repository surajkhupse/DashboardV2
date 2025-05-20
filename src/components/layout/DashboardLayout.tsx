import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import { PieChart, Pie, Cell, Label } from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import AddWidgetDrawer from "../widgets/AddWidgetDrawer";

const DashboardLayout = () => {

    const widgetsData = [
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
    ]

    const [openDrawer, setOpenDrawer] = useState(false);
    const [dashboardWidgets, setDashboardWidgets] = useState(widgetsData);

    const handleAddWidgets = (widgetsToAdd: any[]) => {
        setDashboardWidgets((prevWidgets) => {
            const updated = [...prevWidgets];

            widgetsToAdd.forEach(({ category, widget }) => {
                const categoryIndex = updated.findIndex((item) => item.category === category);
                if (categoryIndex !== -1) {
                    updated[categoryIndex] = {
                        ...updated[categoryIndex],
                        widgets: [...updated[categoryIndex].widgets, widget],
                    };
                }
            });

            return updated;
        });
    };

    const addNewWidget = (category: string, newWidget: any) => {
        setDashboardWidgets((prev) =>
            prev.map((section) =>
                section.category === category
                    ? { ...section, widgets: [...section.widgets, newWidget] }
                    : section
            )
        );
    };
    const handleRemoveWidget = (category: string, widgetId: string) => {
        setDashboardWidgets((prev: any) => {
            const updatedWidgets = prev.map((section: any) => {
                if (section.category === category) {
                    return {
                        ...section,
                        widgets: section.widgets.filter((widget: any) => widget.id !== widgetId),
                    };
                }
                return section;
            });
            return [...updatedWidgets];
        });
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
                    >
                        Add Widget
                    </Button>

                    <IconButton
                        aria-label="refresh"
                        size="small"
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

            {dashboardWidgets.map((section, sectionIndex) => (
                <Box key={sectionIndex} px={4} py={2}>
                    <Typography variant="subtitle2" fontWeight={700} mb={2}>
                        {section.category}
                    </Typography>
                    <Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
                        {section.widgets.map((widget, widgetIndex) => {
                            if ('chartType' in widget && widget.chartType === "pie") {
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
                                            onClick={() => handleRemoveWidget(section.category, widget.id)}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="subtitle2" fontWeight={600} mb={1}>
                                            {widget.title}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={6} paddingRight={5}>
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
                                                        value={widget.data.reduce((acc, item) => acc + item.value, 0)}
                                                        position="center"
                                                        fontSize={18}
                                                        fontWeight={700}
                                                        fill="#000"
                                                        dy={-10}
                                                    />
                                                </Pie>
                                                <text x={60} y={70} textAnchor="middle" fontSize={12} fill="#666">
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
                            } else if ('type' in widget && widget.type === "no-data") {
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
                                        }}
                                    >
                                        <Typography variant="subtitle1" fontWeight={600} mb={5}>
                                            {widget.title}
                                        </Typography>
                                        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Stack alignItems="center" spacing={1}>
                                                <InsertChartOutlinedIcon sx={{ fontSize: 48, color: "#c1c1c1" }} />
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
                                borderRadius: 3,
                                px: 3,
                                pb: 5,
                                pt: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 20px 20px rgba(57, 51, 51, 0.2)", // grey bottom shadow
                                border: "1px solid rgb(209, 200, 200)", // optional light border
                                overflow: "hidden",
                            }}
                        >
                            <Button
                                startIcon={<AddIcon />}
                                variant="outlined"
                                onClick={() => setOpenDrawer(true)}
                            >
                                Add Widget
                            </Button>
                        </Card>
                    </Stack>
                </Box>
            ))}
            {/* Drawer Component */}
            <AddWidgetDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} managedData={dashboardWidgets} onAddWidget={addNewWidget}
            />
        </>
    );
};

export default DashboardLayout;
