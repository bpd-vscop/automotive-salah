# Admin Dashboard ULKS

# Functional & Technical Specification

This document outlines the complete functional requirements for the "ULKS" e-commerce admin dashboard. This report serves as the final specification for developers, detailing the platform's modules, features, and role-based access control (RBAC). The system is designed with a four-tier user hierarchy: Super Admin, Admin, Store Manager, and Editor. This specification covers every page and component, providing a clear blueprint for development using MongoDB with Prisma ORM.

## 1. User Roles & Permissions Matrix (RBAC)

This matrix is based directly on the provided information and serves as the source of truth for all permissions.
**Hierarchy:** Super Admin (L1) > Admin (L2) > Store Manager (L3) > Editor (L4)

| **Feature/Module** | **Super Admin (L1)** | **Admin (L2)** | **Store Manager (L3)** | **Editor (L4)** |
|-------------------|----------------------|----------------|------------------------|-----------------|
| **Dashboard** | Full View | Full View | Sales & Order View | Minimal Stat View |
| **Products** | CRUD | CRUD | CRUD | Update Only (No Price/Delete) |
| **Categories** | CRUD | CRUD | CRUD | View Only |
| **Orders** | CRUD | CRUD | CRUD | No Access |
| **Customers** | CRUD | CRUD | View/Edit | No Access |
| **Analytics** | Full View | Full View | View Only | No Access |
| **Users (Staff)** | CRUD (All) | View & Create (Own Level), CRUD (Lower Levels) | View (Own Level), CRUD (Lower Levels) | View Only (Own Level) |
| **Settings** | Full Control | Full Control | No Access | No Access |
| **Homepage Sliders** | Full CRUD | Full CRUD | CRUD | Update Only |
| **Homepage Banners** | Full CRUD | Full CRUD | CRUD | Update Only |
| **Logo Management** | Full Control | Full Control | No Access | No Access |
| **Color Customization** | Full Control | Full Control | View Only | No Access |
| **Canva Integration** | Full Access | Full Access | Limited Access | No Access |

## 2. Database Schema (MongoDB with Prisma)

### Core Collections Structure:

- **roles** - User role definitions with hierarchy levels
- **users** - Internal staff members with dashboard access
- **customers** - Store customers (separate from internal users)
- **addresses** - Customer shipping/billing addresses
- **categories** - Product categories with icons
- **products** - Main product catalog
- **product_images** - Multiple images per product
- **orders** - Order master records
- **order_items** - Order line items
- **settings** - Key-value configuration store
- **activity_log** - System activity tracking
- **sliders** - Homepage carousel slides
- **banners** - Promotional banners
- **site_customization** - Logo and color scheme settings

### Key Schema Features:
- MongoDB ObjectId for all primary keys
- Proper foreign key relationships using ObjectId references
- JSON storage for complex data (addresses, settings)
- Enum types for status fields
- Automatic timestamps for audit trails
- Cascade deletes where appropriate

## 3. Global Components

These components are persistent across most pages of the dashboard.

- **Left Navigation Sidebar:**
  - **Functionality:** A collapsible menu providing primary navigation. Displays the "ULKS" logo at the top. The list of menu items (Dashboard, Products, Orders, Customers, Analytics, Users, Settings, Homepage, Design) will be dynamically rendered based on the logged-in user's role permissions as defined in the matrix above.
  - **Database:** Driven by the user's role_id and hierarchy_level.

- **Top Header Bar:**
  - **Functionality:** Contains a global search bar, a notifications icon (e.g., for new orders, low stock), and a user profile dropdown.
  - **User Profile Dropdown:** Shows the current user's name and role. Must contain links to "Profile" and "Logout".
  - **Database:** User information pulled from the logged-in user's session data.

## 4. Page-by-Page Functional Breakdown

### 4.1. Dashboard

- **Purpose:** Provide an at-a-glance summary of key business metrics and recent activity, tailored to the user's role.
- **Components & Functionalities:**
  1. **Statistic Cards:** Display high-level metrics (Total Sales, Orders, Customers, Avg. Order Value). The visibility of these cards depends on the user's role.
  2. **Sales Overview:** Line chart visualizing sales revenue.
  3. **Traffic Sources:** Donut chart showing website traffic sources.
  4. **Product Categories:** Bar chart showing sales performance by category.
  5. **Recent Orders Table:** A condensed list of recent orders (for Admins & Store Managers).
  6. **Top Products List:** A list of best-selling products.
  7. **Recent Activity Feed:** Timeline showing key events.
- **Database Operations:**
  - Aggregation queries on orders, order_items, products, customers collections
  - Activity log retrieval for timeline display

### 4.2. Products

- **Purpose:** Comprehensive management of the store's product catalog.
- **Components & Functionalities:**
  1. **Product Categories Section:** Cards for each category, showing icon and product count.
  2. **Action Buttons:** "Add Product", "Add Category", "Filter", "Export". (Buttons hidden based on role).
  3. **Product List Table:**
     - **Columns:** Checkbox, Image, Product Name, SKU, Category, Price, Stock, Status, Actions.
     - **Actions:** Icons for Edit, View, and Delete. (Delete hidden for Editors).
  4. **Add/Edit Product Modal:**
     - Form with fields for Product Name, SKU, Category, Prices, Stock, Status, Description, and Product Images.
     - For **Editors**, the Price, Stock, and Status fields should be read-only or hidden.
- **Database Operations:**
  - CRUD operations on products, categories, product_images collections
  - Join operations for category information
  - File upload handling for product images

### 4.3. Orders

- **Purpose:** Comprehensive system for viewing, managing, and fulfilling customer orders. Inaccessible to Editor role.
- **Module Access:**
  - **Full CRUD:** Super Admin, Admin, Store Manager
  - **No Access:** Editor
- **Components & Functionalities:**
  1. **Orders Dashboard:**
     - **Statistic Cards:** Real-time counts for Pending, Processing, Shipped, Completed, Cancelled/Refunded orders.
     - Clicking cards filters the Order List Table.
  2. **Action Bar:**
     - **Filter Button:** Advanced filtering (date range, status, payment status).
     - **Export Button:** CSV export of filtered orders.
     - **Create Order Button:** Manual order creation for phone/in-person sales.
  3. **Order List Table:**
     - **Columns:** Checkbox, Order ID, Customer, Date, Items, Total, Payment, Status, Tracking Number, Actions.
     - **Actions:** View/Edit, Print Invoice.
  4. **Order Detail Page (/orders/{id}):**
     - Header with Order ID, date, status
     - Customer details with editable addresses
     - Order items with product details
     - **Shipping Information Section (CRITICAL):**
       - Input fields for carrier and tracking number
       - "Save & Mark as Shipped" button
       - Status update logic: Processing → Shipped
       - Automatic email notification trigger
     - Order notes/activity timeline
  5. **Bulk Actions:** Update status, print invoices, delete orders.
- **Database Operations:**
  - Complex queries joining orders, customers, order_items, products
  - Status update operations
  - Address management (stored as JSON)
  - Activity logging for all order changes

### 4.4. Customers

- **Purpose:** View and manage registered customer database. Inaccessible to Editors.
- **Components & Functionalities:**
  1. **Action Buttons:** "Add Customer", "Filter", "Export".
  2. **Customer List Table:**
     - **Columns:** Checkbox, Customer Name, Email, Phone, # of Orders, Total Spent, Date Registered, Actions.
     - **Actions:** Edit Customer Info, View Order History.
  3. **Add/Edit Customer Modal:** Form with Name, Email, Phone, Password fields.
- **Database Operations:**
  - CRUD operations on customers collection
  - Aggregation queries for order counts and spending totals
  - Address management through related addresses collection

### 4.5. Users (Staff Management)

- **Purpose:** Create and manage internal staff accounts with strict hierarchical permissions.
- **Components & Functionalities:**
  1. **Hierarchical Data Display (CRITICAL):**
     - **Super Admin (L1):** Sees all users, full CRUD on all
     - **Admin (L2):** Sees Admins/Store Managers/Editors, CRUD on lower levels only
     - **Store Manager (L3):** Sees Store Managers/Editors, CRUD on Editors only
     - **Editor (L4):** Sees Editors only, view-only access
  2. **"Add User" Functionality (CRITICAL):**
     - **Super Admin:** Can create Admin, Store Manager, Editor
     - **Admin:** Can create Admin, Store Manager, Editor (special exception)
     - **Store Manager:** Can create Editor only
     - **Editor:** No creation rights
- **Database Operations:**
  - Filtered queries based on hierarchy_level
  - Role-based user creation logic
  - Activity logging for all user management actions

### 4.6. Analytics

- **Purpose:** In-depth analysis and reporting. Inaccessible to Editors.
- **Components & Functionalities:**
  1. **Reporting Dashboard:** Advanced filtering by date ranges, products, categories.
  2. **Specific Reports:** Sales by country, customer lifetime value, inventory reports.
  3. **Data Export:** CSV/PDF export functionality.
- **Database Operations:**
  - Complex aggregation queries across multiple collections
  - Statistical calculations and trend analysis
  - Report generation and export functionality

### 4.7. Settings

- **Purpose:** Configure global application settings. Accessible only to Super Admins and Admins.
- **Components & Functionalities:**
  1. **General Settings:** Store name, address, currency.
  2. **Payment Gateways:** API keys for payment processors.
  3. **Shipping & Taxes:** Configuration of shipping zones and tax rules.
  4. **Email Templates:** Editing transactional email templates.
- **Database Operations:**
  - CRUD operations on settings collection
  - JSON storage for complex configuration objects
  - Validation of configuration values

## 5. NEW FEATURES - Homepage Customization

### 5.1. Homepage Sliders Management

- **Purpose:** Manage homepage carousel/slider images and content.
- **Module Access:**
  - **Full CRUD:** Super Admin, Admin, Store Manager
  - **Update Only:** Editor (cannot delete or change critical settings)
- **Components & Functionalities:**
  1. **Slider List View:**
     - Table showing all slides with preview images
     - Columns: Preview, Title, Description, Order, Status, Actions
     - Drag & drop reordering functionality
  2. **Add/Edit Slider Modal:**
     - **Fields:** Title, Description, Image Upload, Link URL, Button Text, Order, Active Status
     - **Image Upload:** Support for JPG, PNG, WebP with automatic optimization
     - **Preview:** Real-time preview of slider appearance
  3. **Slider Settings:**
     - Auto-play settings
     - Transition effects
     - Display duration per slide
- **Database Operations:**
  - CRUD operations on sliders collection
  - File upload and image optimization
  - Order management for slide sequence

### 5.2. Homepage Banners Management

- **Purpose:** Manage promotional banners across different page positions.
- **Module Access:**
  - **Full CRUD:** Super Admin, Admin, Store Manager
  - **Update Only:** Editor
- **Components & Functionalities:**
  1. **Banner List View:**
     - Organized by position (Top, Middle, Bottom, Sidebar)
     - Quick toggle for active/inactive status
  2. **Add/Edit Banner Modal:**
     - **Fields:** Title, Description, Image Upload, Link URL, Button Text, Position, Active Status
     - **Position Options:** Top, Middle, Bottom, Sidebar
     - **Scheduling:** Start/end dates for banner display
  3. **Banner Preview:**
     - Live preview showing how banner appears on website
     - Mobile responsive preview
- **Database Operations:**
  - CRUD operations on banners collection
  - Position-based filtering
  - Scheduled display logic

### 5.3. Site Customization (Logo & Colors)

- **Purpose:** Customize site appearance including logo and color scheme.
- **Module Access:**
  - **Full Control:** Super Admin, Admin
  - **View Only:** Store Manager
  - **No Access:** Editor
- **Components & Functionalities:**
  1. **Logo Management:**
     - **Upload Interface:** Drag & drop logo upload
     - **Format Support:** PNG, SVG, JPG with automatic optimization
     - **Preview:** Real-time logo preview in navigation
     - **Dimensions:** Automatic resizing and multiple size generation
  2. **Color Customization:**
     - **Color Picker Interface:** Visual color selection tool
     - **Color Scheme Options:**
       - Primary Color (main brand color)
       - Secondary Color (accent elements)
       - Accent Color (buttons, highlights)
       - Text Color (primary text)
       - Background Color (page background)
     - **Preview Mode:** Real-time color preview across dashboard
     - **Preset Themes:** Pre-configured color combinations
  3. **Canva Integration:**
     - **Design Templates:** Access to Canva design templates
     - **Brand Kit Sync:** Automatically sync logo and colors with Canva
     - **Direct Design:** Launch Canva designer directly from dashboard
     - **Asset Library:** Access to Canva's stock photos and graphics
- **Database Operations:**
  - CRUD operations on site_customization collection
  - File management for logo storage
  - Color validation and storage
  - Integration with Canva API

### 5.4. Canva Integration Features

- **Purpose:** Seamless integration with Canva for design creation and brand consistency.
- **Integration Points:**
  1. **Slider Design:** Create slider images directly in Canva
  2. **Banner Design:** Design promotional banners with Canva templates
  3. **Logo Creation:** Use Canva's logo maker tools
  4. **Brand Kit:** Sync site colors and logo with Canva brand kit
  5. **Template Library:** Access to ULKS-specific design templates
- **Technical Requirements:**
  - Canva API integration
  - OAuth authentication for Canva accounts
  - Asset synchronization between platforms
  - Template customization capabilities

## 6. Technical Implementation Notes

### 6.1. Database Setup
```javascript
// Environment configuration
DATABASE_URL="mongodb://localhost:27017/ulks_ecommerce"

// Prisma commands
npx prisma generate
npx prisma db push
```

### 6.2. Key Technical Considerations

1. **File Upload Security:**
   - Validate file types and sizes
   - Implement virus scanning
   - Generate unique filenames
   - Use secure storage (AWS S3, Cloudinary)

2. **Image Optimization:**
   - Automatic compression
   - Multiple size generation
   - WebP conversion for better performance
   - CDN integration for faster delivery

3. **Permission Validation:**
   - Server-side permission checks
   - Role-based API endpoints
   - Hierarchical access control
   - Activity logging for all actions

4. **Performance Optimization:**
   - Database indexing on frequently queried fields
   - Caching for site customization settings
   - Lazy loading for images
   - Pagination for large datasets

### 6.3. API Endpoints Structure

```javascript
// Example API structure
/api/sliders
  GET    /          - List all sliders
  POST   /          - Create new slider
  PUT    /:id       - Update slider
  DELETE /:id       - Delete slider
  PUT    /:id/order - Update slider order

/api/banners
  GET    /          - List all banners
  POST   /          - Create new banner
  PUT    /:id       - Update banner
  DELETE /:id       - Delete banner

/api/site-customization
  GET    /          - Get current customization
  PUT    /          - Update customization
  POST   /logo      - Upload new logo
  PUT    /colors    - Update color scheme
```

This specification provides a complete blueprint for implementing the ULKS E-Commerce Dashboard with all requested features, maintaining the original functionality while adding powerful homepage customization capabilities.