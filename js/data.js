/* ==========================================================
   data.js - THE ONLY FILE YOU EDIT TO ADD / REMOVE DASHBOARDS
   One line per dashboard. Fields:
     title        shown on the card
     category     decides which tab it appears in (new names create new tabs)
     file         "dashboards/" + the exact file name (spaces and capitals are fine,
                  but the name must match the real file exactly)
     description  one short sentence (optional)
     updated      "YYYY-MM-DD" (optional)
     image        normally NOT needed: previews are found by file name (see README).
                  Use only to point to a picture with a different name (optional)
   Tabs appear in the order the categories first show up below.
   ========================================================== */
window.DASHBOARDS = [
  { title: "3D Dashboard for Project Management", category: "Project Management", file: "dashboards/3D Dashboard for Project Management.xlsx", description: "Project progress and tasks in a 3D layout." },
  { title: "Business Projects for Tablet", category: "Project Management", file: "dashboards/dashboard-for-managing-business-projects-from-tablet.xlsx", description: "Business projects laid out for tablet screens." },
  { title: "Roadmap Chart", category: "Project Management", file: "dashboards/Roadmap Chart.xlsx", description: "Plan milestones on a visual roadmap." },
  { title: "Team Capacity Usage Dashboard", category: "Project Management", file: "dashboards/Team Capacity Usage Dashboard.xlsx", description: "See how much of your team's capacity is used." },
  { title: "ABC Product Analysis Dashboard", category: "Sales", file: "dashboards/ABC Product Analysis Dashoboard.xlsx", description: "Group products by sales importance (A, B, C)." },
  { title: "CRM Dashboard", category: "Sales", file: "dashboards/CRM Dashboard.xlsx", description: "Customers, leads and sales activity." },
  { title: "CRM Dashboard 2", category: "Sales", file: "dashboards/crm-dashboard.xlsx", description: "A second CRM view of customers and leads." },
  { title: "Sales Product Dashboard", category: "Sales", file: "dashboards/Sales Product Dashboard.xlsx", description: "Sales results by product." },
  { title: "Sales Calendar Control", category: "Sales", file: "dashboards/Sales-calendar-control.xlsx", description: "Track sales activity on a calendar." },
  { title: "Sales Project Management", category: "Sales", file: "dashboards/sales-project-management-dashboard.xlsx", description: "Manage sales projects and deals." },
  { title: "Advertising Effectiveness Dashboard", category: "Marketing", file: "dashboards/Advertising Effectiveness Dashboard.xlsx", description: "Ad spend, reach and results at a glance." },
  { title: "Social Media Traffic and Revenue", category: "Marketing", file: "dashboards/Social Media Traffic and Revenue Dashboard.xlsx", description: "Social media traffic and the revenue it brings." },
  { title: "Budget Planning Dashboard", category: "Finance", file: "dashboards/Budget Planning Dashboard.xlsx", description: "Plan budgets and compare them with actuals." },
  { title: "Investment and Earnings Dashboard", category: "Finance", file: "dashboards/Investment and earnings Dashboard.xlsx", description: "Investments and earnings over time." },
  { title: "Loan and Profit Analysis", category: "Finance", file: "dashboards/Loan and Profit analysis.xlsx", description: "Loans, interest and profit analysis." },
  { title: "Personal Finance Dashboard", category: "Personal Finance", file: "dashboards/Personal Finance Dashboard.xlsx", description: "Track income, spending and savings." },
  { title: "Personal Finance Dashboard (New)", category: "Personal Finance", file: "dashboards/Personal Finance Dashboard New.xlsx", description: "Updated personal finance dashboard." },
  { title: "Personal Finance with Prototypes", category: "Personal Finance", file: "dashboards/Personal Finance Dashboard including Prototypes.xlsx", description: "Personal finance dashboard plus prototype designs." },
  { title: "Personal Finance Prototype 2", category: "Personal Finance", file: "dashboards/Personal Finance Prototype 2 Detailed Dashboard.xlsx", description: "Detailed personal finance prototype, version 2." },
  { title: "Personal Finance Prototype 3", category: "Personal Finance", file: "dashboards/Personal Finance Prototype 3 Detailed Dashboard.xlsx", description: "Detailed personal finance prototype, version 3." },
  { title: "Personal Finances Template", category: "Personal Finance", file: "dashboards/personal-finances-template.xlsx", description: "Template for tracking your personal finances." },
  { title: "Human Resources Dashboard", category: "HR", file: "dashboards/human-resources-dashboard.xlsx", description: "Headcount, hiring and people metrics." },
  { title: "Employee Productivity Dashboard", category: "HR", file: "dashboards/Employee Productivity Dashboard.xlsx", description: "Team output and productivity trends." },
  { title: "Manager Performance Metrics", category: "HR", file: "dashboards/Manager Performance Metrics Dashboard.xlsx", description: "Performance metrics for managers." },
  { title: "Payroll and Employee Performance", category: "HR", file: "dashboards/Payroll and Employee Performance Dshboard.xlsx", description: "Payroll costs and employee performance." },
  { title: "Business Intelligence Dashboard", category: "Operations", file: "dashboards/Business Intelligence Dashboard.xlsx", description: "Key business metrics in one view." },
  { title: "Truck Logistics Management", category: "Operations", file: "dashboards/logistics-management-trucks.xlsx", description: "Truck fleet and delivery management." },
  { title: "Medical Analysis Dashboard", category: "Healthcare", file: "dashboards/medical-dashboard-for-analysis-in-excel.xlsx", description: "Medical data analysis in Excel." }
];
