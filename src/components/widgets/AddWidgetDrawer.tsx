import React, { useState, useEffect } from "react";
import {
    Drawer,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type AddWidgetDrawerProps = {
  open: boolean;
  onClose: () => void;
  onAddWidget: (widgetName: string, widgetText: string, category: string) => void;
  selectedCategory: string | null;
};
const AddWidgetDrawer: React.FC<AddWidgetDrawerProps> = ({
    open,
    onClose,
    onAddWidget,
    selectedCategory,
}) => {
    const [widgetName, setWidgetName] = useState("");
    const [widgetText, setWidgetText] = useState("");
    const [touched, setTouched] = useState(false);

    // Reset fields when drawer opens
    useEffect(() => {
        if (open) {
            setWidgetName("");
            setWidgetText("");
            setTouched(false);
        }
    }, [open]);

  const handleAddWidget = () => {
  if (!widgetName.trim() || !widgetText.trim() || !selectedCategory) return;
  onAddWidget(widgetName.trim(), widgetText.trim(), selectedCategory);
  onClose();
};

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Stack sx={{ width: 650, height: "100%" }}>
                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ backgroundColor: "#14147d", px: 3, py: 2 }}
                >
                    <Typography variant="body2" color="white">
                        Add Widget
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                </Stack>

                {/* Body */}
                <Stack spacing={2} px={3} py={2} sx={{ flexGrow: 1, overflowY: "auto" }}>
                    <TextField
                        label="Widget Name"
                        placeholder="Enter widget name"
                        variant="outlined"
                        size="small"
                        helperText="This will be the name of your widget."
                        error={touched && !widgetName.trim()}
                        fullWidth
                        value={widgetName}
                        onChange={(e) => setWidgetName(e.target.value)}
                        onBlur={() => setTouched(true)}
                    />
                    <TextField
                        label="Widget Text"
                        placeholder="Enter widget content"
                        multiline
                        rows={4}
                        fullWidth
                        value={widgetText}
                        onChange={(e) => setWidgetText(e.target.value)}
                    />
                </Stack>

                {/* Footer */}
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        borderTop: "1px solid #e0e0e0",
                        backgroundColor: "#fff",
                    }}
                >
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
                            onClick={handleAddWidget}
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
                            disabled={!widgetName.trim() || !widgetText.trim()}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Drawer>
    );
};

export default AddWidgetDrawer;
