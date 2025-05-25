import { create } from "zustand";

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

type DashboardStore = {
  dashboardWidgets: DashboardSection[];
  addWidget: (category: string, widget: Widget) => void;
  removeWidget: (category: string, widgetId: string) => void;
  setWidgets: (widgets: DashboardSection[]) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardWidgets: [],
  setWidgets: (widgets) => set({ dashboardWidgets: widgets }),
  addWidget: (category, widget) =>
    set((state) => ({
      dashboardWidgets: state.dashboardWidgets.map((section) =>
        section.category === category
          ? { ...section, widgets: [...section.widgets, widget] }
          : section
      ),
    })),
  removeWidget: (category, widgetId) =>
    set((state) => ({
      dashboardWidgets: state.dashboardWidgets.map((section) =>
        section.category === category
          ? {
              ...section,
              widgets: section.widgets.filter((w) => w.id !== widgetId),
            }
          : section
      ),
    })),
}));
