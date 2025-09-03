# Boeing Aerospace Manufacturing Analytics Dashboard

A data visualization and transformation platform built with Next.js. This application provides powerful tools for:

- Data transformation and processing
- Interactive data visualizations
- File upload capabilities
- Multiple visualization types:
  - Force-directed graphs
  - Map visualizations
  - VR visualizations
  - 2D and 3D graph visualizations
  - Supply chain network view

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the application.

## Features

### Data Transformation
Access the data transformation tools at `/transform` to process and modify your data.

### Data Visualization
Explore various visualization options at `/visualize`:
- Force-directed graphs for network data
- Interactive maps using Leaflet
- VR visualizations using A-Frame
- 2D and 3D graph visualizations

### Network View
View the interactive supply chain network at `/network-view`:
- Real-time visualization of factories, warehouses, and retailers
- Animated supply routes showing product flow
- Status monitoring and alerts
- Interactive location details
- Powered by OpenStreetMap (no API key required)

### File Upload
Upload your data files at `/upload` to begin working with them.

## Technology Stack

- Next.js 15.1.6
- React 19
- Material UI
- D3.js
- Three.js
- A-Frame
- Leaflet & OpenStreetMap
