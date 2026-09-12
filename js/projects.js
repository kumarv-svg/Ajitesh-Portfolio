/**
 * AJITESH SAI N. - DATA ANALYST PORTFOLIO
 * Structured Projects Data & Interactive Modal Case Study Controller
 */

const PROJECTS_DATA = [
  {
    id: 'customer-churn',
    number: 'PROJECT 01',
    title: 'Customer Churn & Retention Analytics',
    subtitle: 'Subscription Health, Churn Drivers & Revenue-at-Risk Segmentation',
    category: 'TELECOM & SUBSCRIPTION ANALYTICS',
    tools: ['Excel', 'MySQL', 'Python', 'Power BI'],
    description: 'Analyzed customer behavior, subscription patterns, service usage and churn factors to identify customer segments at higher risk of leaving.',
    metrics: [
      { label: 'Total Customers', value: '10,000' },
      { label: 'Churn Rate', value: '28.75%' },
      { label: 'Revenue at Risk', value: '₹ 4.62M' },
      { label: 'Retention Rate', value: '71.25%' }
    ],
    highlights: [
      'Customer segmentation',
      'Churn rate analysis',
      'Revenue at risk modeling',
      'Usage & CSAT correlation',
      'Churn reason breakdown',
      'Customer satisfaction tiers'
    ],
    thumbnail: 'assets/images/customer-churn-dashboard.png',
    dataModelImg: 'assets/images/churn-datamodel.png',
    githubUrl: 'https://github.com/kumarv-svg/Customer-Churn-Retention-Analytics',
    caseStudy: {
      problemStatement: 'The company was experiencing an elevated customer cancellation rate but lacked granular visibility into which subscription tiers, usage behaviors, or service issues were driving customer churn. Management required an end-to-end analytical pipeline to isolate high-risk customer segments and quantify recurring revenue vulnerability.',
      methodology: [
        'Ingested raw telecommunications subscription logs and cleaned anomalous billing and tenure records using Excel.',
        'Used a sample relational schema in MySQL joining Customers, Subscriptions, ServiceUsage, SupportTickets, Transactions, and Feedback tables.',
        'Authored analytical SQL queries executing aggregations, tenure binning, and customer support escalation impact calculations.',
        'Engineered an interactive executive Power BI dashboard featuring dynamic slicers across Regions, Plan Types, Payment Methods, and Churn Years.'
      ],
      keyInsights: [
        'Basic and Standard tier subscribers exhibited the highest churn tendencies (approaching ~30%), while Corporate accounts demonstrated superior customer loyalty.',
        'Primary root causes for cancellations centered on aggressive Competitor offers and recurring Payment Gateway issues.',
        'Monthly recurring revenue at immediate risk was quantified at ₹ 4.62M, enabling targeted win-back and onboarding interventions.'
      ],
      sqlSnippet: `-- Churn Rate and Revenue at Risk by Customer Plan & Segment
SELECT 
    c.Customer_Segment,
    s.Contract_Type,
    COUNT(c.Customer_ID) AS Total_Subscribers,
    SUM(CASE WHEN ch.Churn_Flag = 1 THEN 1 ELSE 0 END) AS Churned_Subscribers,
    ROUND(SUM(CASE WHEN ch.Churn_Flag = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(c.Customer_ID), 2) AS Churn_Rate_Pct,
    ROUND(SUM(CASE WHEN ch.Churn_Flag = 1 THEN t.Amount ELSE 0 END), 2) AS Monthly_Revenue_At_Risk
FROM Customers c
JOIN Subscriptions s ON c.Customer_ID = s.Customer_ID
JOIN ChurnHistory ch ON c.Customer_ID = ch.Customer_ID
JOIN Transactions t ON c.Customer_ID = t.Customer_ID
GROUP BY c.Customer_Segment, s.Contract_Type
ORDER BY Monthly_Revenue_At_Risk DESC;`
    }
  },
  {
    id: 'supply-chain',
    number: 'PROJECT 02',
    title: 'BharatMart Supply Chain Management',
    subtitle: 'End-to-End Fulfillment, Vendor Reliability & Warehouse OTIF Analytics',
    category: 'SUPPLY CHAIN & LOGISTICS',
    tools: ['Excel', 'MySQL', 'Power BI', 'Python'],
    description: 'Analyzed orders, suppliers, inventory, shipments and delivery performance to identify operational delays and supply-chain inefficiencies.',
    metrics: [
      { label: 'Total Orders', value: '10,000' },
      { label: 'Total Order Value', value: '₹ 7,358.79M' },
      { label: 'Delayed Shipments', value: '4,276' },
      { label: 'OTIF %', value: '34.96%' },
      { label: 'Fill Rate %', value: '90.23%' }
    ],
    highlights: [
      'Supplier performance',
      'On-time delivery tracking',
      'Inventory health & stockouts',
      'Warehouse OTIF benchmarking',
      'Transit delay attribution',
      'Order fulfillment status'
    ],
    thumbnail: 'assets/images/supply-chain-dashboard.png',
    dataModelImg: 'assets/images/supplychain-datamodel.png',
    githubUrl: 'https://github.com/kumarv-svg/Bharatmart-Supply-Chain-Overview',
    caseStudy: {
      problemStatement: 'BharatMart faced widespread fulfillment delays and elevated backorders across regional distribution hubs. Leadership needed comprehensive intelligence on supplier lead times, warehouse processing throughput, carrier mode efficiencies, and inventory stockout risks to optimize OTIF (On-Time In-Full) performance.',
      methodology: [
        'Consolidated order histories, shipment milestones, inventory snapshots, and supplier scorecards across multi-tier retail categories.',
        'Constructed star-schema analytical models linking Orders, OrderItems, Warehouses, Carriers, Shipments, Products, and Suppliers.',
        'Formulated DAX measures calculating OTIF%, Fill Rate%, On-Time Delivery%, Average Delay Days, and Stockout Exposure.',
        'Designed high-density executive Power BI visualizations displaying warehouse benchmarking, carrier shipment distributions, and delivery delay event breakdowns.'
      ],
      keyInsights: [
        'Overall OTIF stood at 34.96% against a 90.23% Fill Rate, demonstrating that delivery timing—rather than warehouse stock availability—was the primary fulfillment bottleneck.',
        'Delayed shipments totaled 4,276 out of 10,000 orders, with initial hub pickup and dispatch bottlenecks accounting for over 28,000 delay hours.',
        'Kolkata and New Delhi Central DCs led warehouse OTIF performance.',
        'Identified high-velocity Grocery and Personal Care lines with elevated backorder volumes (1,194K units), advising optimized reorder thresholds.'
      ],
      sqlSnippet: `-- Supplier On-Time Performance & Quality Rating Analysis
SELECT 
    s.Supplier_ID,
    s.Supplier_Name,
    s.Category,
    COUNT(po.PO_ID) AS Total_Purchase_Orders,
    ROUND(SUM(CASE WHEN po.Actual_Receipt_Date <= po.Promised_Date THEN 1 ELSE 0 END) * 100.0 / COUNT(po.PO_ID), 2) AS Supplier_OnTime_Pct,
    ROUND(AVG(s.Quality_Rating), 2) AS Avg_Quality_Rating,
    SUM(po.PO_Value) AS Total_Procurement_Spend
FROM Suppliers s
JOIN PurchaseOrders po ON s.Supplier_ID = po.Supplier_ID
GROUP BY s.Supplier_ID, s.Supplier_Name, s.Category
HAVING COUNT(po.PO_ID) > 10
ORDER BY Supplier_OnTime_Pct ASC;`
    }
  },
  {
    id: 'ott-analytics',
    number: 'PROJECT 03',
    title: 'OTT Content & Viewership Analytics',
    subtitle: 'Streaming Catalogs, Viewer Engagement & Retention Modeling',
    category: 'MEDIA & STREAMING ENTERTAINMENT',
    tools: ['SQL', 'Python', 'Excel', 'Power BI'],
    description: 'Analyzed customer subscriptions, content consumption and viewing behavior to understand engagement, retention and content performance.',
    metrics: [
      { label: 'Analyzed Platforms', value: '4 Major OTT' },
      { label: 'Catalog Titles', value: '24,000+' },
      { label: 'Top Genre Share', value: '32% Drama' },
      { label: 'Completion Trend', value: '91% Thriller' }
    ],
    highlights: [
      'Customer engagement patterns',
      'Subscription behavior',
      'Content catalog performance',
      'Genre completion dynamics',
      'Platform retention metrics',
      'IMDb rating vs view trends'
    ],
    thumbnail: 'assets/images/ott-analytics.png',
    dataModelImg: null,
    githubUrl: 'https://github.com/kumarv-svg',
    caseStudy: {
      problemStatement: 'Streaming providers face fierce competition for user attention and high subscriber churn. Analyzing platform catalogs (Netflix, Prime Video, Disney+ Hotstar, Apple TV+) provides key visibility into which genres, release dates, and content formats maximize watch-time and user retention.',
      methodology: [
        'Extracted multi-platform streaming catalog datasets and unified metadata schemas in Python using Pandas for string parsing and normalization.',
        'Executed exploratory data analysis (EDA) examining duration distributions, content maturity ratings, and country-of-origin release timelines.',
        'Correlated content completion rates against audience sentiment and IMDb ratings across individual genres.',
        'Visualized active monthly streaming demand trends and platform catalog compositions to inform content acquisition strategies.'
      ],
      keyInsights: [
        'Drama and Comedy genres constituted over 54% of platform catalogs, yet high-intensity Thriller and Crime titles secured the highest completion rates (85%–91%).',
        'Viewing hours peaked during Q4 holiday release cycles, with users completing serialized episodic content 35% faster than standalone feature films.',
        'Direct relationship discovered between metadata tagging quality (cast, subtitle availability, audio tracks) and prolonged subscriber engagement.'
      ],
      sqlSnippet: `-- Content Engagement and Average Rating by Genre & Platform
SELECT 
    Platform_Name,
    Genre,
    COUNT(Title_ID) AS Total_Titles,
    ROUND(AVG(IMDb_Rating), 2) AS Avg_IMDb_Score,
    ROUND(AVG(Completion_Rate_Pct), 1) AS Avg_Completion_Rate,
    SUM(Total_Streaming_Hours_M) AS Total_Stream_Hours
FROM OTT_Catalog_Performance
GROUP BY Platform_Name, Genre
ORDER BY Total_Stream_Hours DESC;`
    }
  },
  {
    id: 'health-pharmacy',
    number: 'PROJECT 04 (FEATURED BONUS)',
    title: 'Healthcare & Pharmacy Operations Analytics',
    subtitle: 'Revenue Streams, Branch Throughput & Prescription Fulfillment',
    category: 'HEALTHCARE & RETAIL PHARMACEUTICALS',
    tools: ['Excel', 'MySQL', 'Power BI'],
    description: 'Analyzed 10,093 healthcare transactions across multi-city branches, tracking ₹218.19M in revenue, fulfillment rates, and prescription compliance.',
    metrics: [
      { label: 'Total Revenue', value: '₹ 218.19M' },
      { label: 'Total Transactions', value: '10,093' },
      { label: 'Total Customers', value: '5,000' },
      { label: 'Total Units Sold', value: '546,222' }
    ],
    highlights: [
      'Multi-branch revenue tracking',
      'Prescription compliance audit',
      'Equipment & Nutrition categories',
      'Payment method distribution',
      'Store branch efficiency',
      'Average order value analysis'
    ],
    thumbnail: 'assets/images/health-pharmacy-dashboard.png',
    dataModelImg: null,
    githubUrl: 'https://github.com/kumarv-svg',
    caseStudy: {
      problemStatement: 'Pharmaceutical distribution networks require strict inventory control and prescription audit tracking while optimizing multi-branch sales performance. This project analyzed store-level transactional data across Indian metropolitan branches to improve stock availability and revenue collection.',
      methodology: [
        'Cleaned raw transactional logs with 100,000+ records in Excel and MySQL, standardizing drug classifications and payment terms.',
        'Segmented revenue by Equipment, Nutrition, Medical Supplies, Prescription, and OTC (Over-the-Counter).',
        'Built an executive dashboard tracking branch performance across Hyderabad, Delhi, Bangalore, Mumbai, and Chennai.'
      ],
      keyInsights: [
        'Medical equipment and nutrition generated the lion share of total revenue, led by automated BP monitors and therapeutic powders.',
        'Digital payments (Credit Card, Net Banking, and UPI) accounted for over 72% of total transaction volume.',
        'High-density urban branches in Connaught Place (Delhi) and Banjara Hills (Hyderabad) consistently maintained the lowest order failure rates.'
      ],
      sqlSnippet: `-- Store Branch Revenue and Prescription Compliance
SELECT 
    Store_Branch,
    City,
    COUNT(Transaction_ID) AS Total_Sales,
    SUM(Total_Revenue) AS Total_Revenue_INR,
    ROUND(AVG(Order_Value), 2) AS Avg_Ticket_Size,
    ROUND(SUM(CASE WHEN Prescription_Required = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(Transaction_ID), 2) AS Prescription_Order_Pct
FROM Pharmacy_Transactions
GROUP BY Store_Branch, City
ORDER BY Total_Revenue_INR DESC;`
    }
  }
];

// Modal Controller Function
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-dynamic-content');

  let tabsHtml = `
    <div class="modal-tabs-nav" role="tablist">
      <button class="modal-tab-btn active" data-tab="overview">Overview & Impact</button>
      <button class="modal-tab-btn" data-tab="methodology">Methodology</button>
      <button class="modal-tab-btn" data-tab="sql">SQL / Analytics Query</button>
      ${project.dataModelImg ? '<button class="modal-tab-btn" data-tab="schema">Data Model Schema</button>' : ''}
    </div>
  `;

  let contentHtml = `
    <div class="modal-header-section">
      <div class="project-number">${project.number} • ${project.category}</div>
      <h2 class="modal-project-title">${project.title}</h2>
      <p class="section-subtitle">${project.subtitle}</p>
      
      <div class="project-tools" style="margin-top: 8px;">
        ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-image-showcase">
      <img src="${project.thumbnail}" alt="${project.title} Dashboard Preview" loading="lazy">
    </div>

    <!-- Verified Metrics Grid in Modal -->
    <div class="project-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));">
      ${project.metrics.map(m => `
        <div class="metric-cell">
          <span class="metric-label">${m.label}</span>
          <span class="metric-val">${m.value}</span>
        </div>
      `).join('')}
    </div>

    ${tabsHtml}

    <!-- Tab 1: Overview & Impact -->
    <div class="modal-tab-content active" id="tab-overview">
      <div>
        <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Business Problem</h4>
        <p class="modal-narrative-p">${project.caseStudy.problemStatement}</p>
      </div>

      <div>
        <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Key Analytical Findings</h4>
        <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
          ${project.caseStudy.keyInsights.map(k => `<li class="modal-narrative-p">${k}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Tab 2: Methodology -->
    <div class="modal-tab-content" id="tab-methodology">
      <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Analytical Workflow & Pipeline</h4>
      <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 10px;">
        ${project.caseStudy.methodology.map(m => `<li class="modal-narrative-p">${m}</li>`).join('')}
      </ol>
      <div style="margin-top: 10px;">
        <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Analysis Highlights</h4>
        <div class="project-highlights">
          ${project.highlights.map(h => `<span class="highlight-chip">${h}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Tab 3: SQL / Analytics Query -->
    <div class="modal-tab-content" id="tab-sql">
      <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Production SQL Aggregation / Query</h4>
      <pre class="modal-code-block"><code>${escapeHtml(project.caseStudy.sqlSnippet)}</code></pre>
    </div>

    <!-- Tab 4: Schema (if exists) -->
    ${project.dataModelImg ? `
      <div class="modal-tab-content" id="tab-schema">
        <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.05rem;">Relational Star Schema & Power BI Relationships</h4>
        <p class="modal-narrative-p" style="margin-bottom: 12px;">Verified data model relationships connecting fact tables, dimension tables, and calculated metric tables.</p>
        <div class="modal-schema-wrap">
          <img src="${project.dataModelImg}" alt="${project.title} Data Model Schema" loading="lazy">
        </div>
      </div>
    ` : ''}

    <div style="display: flex; gap: 14px; margin-top: 12px; flex-wrap: wrap;">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <span>View on GitHub</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
      <button class="btn btn-secondary" onclick="closeProjectModal()">
        <span>Close Case Study</span>
      </button>
    </div>
  `;

  modalContainer.innerHTML = contentHtml;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Attach tab switching events inside modal
  const tabBtns = modalContainer.querySelectorAll('.modal-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      modalContainer.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetId = `tab-${btn.getAttribute('data-tab')}`;
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
