import { RepoModule, EconomicPillar, DonationTier, FaqItem } from '../types';

export const PROJECT_METADATA = {
  name: "FOSS For The Common Need",
  legalName: "F.O.S.S. for the Common Need",
  sponsorshipModel: "Model C Fiscal Sponsorship",
  sponsorCandidate: "Social Good Fund (501(c)(3))",
  taxStatus: "Fiscally Sponsored 501(c)(3) Charitable Project",
  budgetGoal12Mo: "$25,000",
  license: "GNU Affero General Public License v3 (AGPLv3)",
  codebaseFramework: "Decidim (Ruby on Rails 7.x)",
  primaryFocus: "Public-Commons Civic Logistics & Community Timebank Dispatch",
  location: "United States (National Open-Source Custodian)",
  tagline: "User-controlled digital tools powered by volunteers to help local non-profits expand access to free goods and services for working class families."
};

export const MISSION_STATEMENT = "In response to centuries of stolen land and labor, FOSS for the Common Need creates user-controlled digital tools powered by volunteers to help local non-profits expand access to free goods and services for working class families.";

export const VISION_STATEMENT = "To build a future where technology is a public good, not a private commodity. We envision a world where communities own their digital infrastructure, ensuring goods and services are distributed according to need.";

export const CORE_ACTIVITIES = [
  {
    title: "Design",
    subtitle: "Building Free Delivery Tools",
    description: "We build easy-to-use apps that help volunteer drivers find the fastest delivery routes, match food boxes with families, and track volunteer hours."
  },
  {
    title: "FOSS",
    subtitle: "Keeping the Tools Free & Public",
    description: "We keep all our software code public and open so that no corporation can ever buy it, privatize it, or put it behind a paywall."
  },
  {
    title: "Free Guides",
    subtitle: "Simple Guides & Open Playbooks",
    description: "We write free, step-by-step guides so any local food bank, town hall, or neighborhood group can easily set up their own free delivery network."
  },
  {
    title: "Partnerships",
    subtitle: "Listening to Everyday People",
    description: "We sit down directly with local food bank workers, volunteer drivers, and families to design apps that are easy, respectful, and genuinely helpful."
  }
];

export const POPULATIONS_SERVED = [
  {
    name: "Low-Income Working Families",
    detail: "Facing soaring delivery fees and food inflation; enables receiving vital pantry boxes and care kits at true $0 cost."
  },
  {
    name: "Elderly Citizens (Age 65+)",
    detail: "Homebound seniors needing reliable, respectful delivery of pharmacy medications, fresh hot meals, and wellness checks."
  },
  {
    name: "People with Disabilities",
    detail: "Residents with limited mobility or sensory needs requiring dignified, custom accessibility instructions and reliable doorstep hand-offs."
  },
  {
    name: "Local Non-Profits & Food Cooperatives",
    detail: "Overstretched charities spending 15+ hours a week on manual dispatch phone calls and spreadsheet coordination."
  }
];

export const ECONOMIC_PILLARS: EconomicPillar[] = [
  {
    id: "purchasing-power",
    title: "Skyrocketing Delivery Costs",
    category: "Family Budgets",
    problem: "Commercial delivery apps add extra fees and jack up prices by 30%, making it impossible for families on tight budgets to get food delivered.",
    solution: "A free community app that connects volunteer drivers with local food pantries to bring groceries and care packages to doors at 100% zero cost.",
    metric: "100% free delivery with zero hidden fees"
  },
  {
    id: "business-models",
    title: "Corporate Delivery Apps",
    category: "People in Charge",
    problem: "Big-tech delivery companies underpay gig workers and trap families into costly services just to chase corporate profits.",
    solution: "A volunteer-powered system where local drivers, charities, and families vote together on how deliveries work and where help goes first.",
    metric: "Run by the community, not corporate executives"
  },
  {
    id: "nonprofit-sustainability",
    title: "Overburdened Community Groups",
    category: "Non-Profits",
    problem: "Non-profits, mutual aid groups, and community organizations waste precious hours each week juggling messy spreadsheets and frantic phone calls just to coordinate deliveries.",
    solution: "An easy automated tool that pairs volunteer drivers with community deliveries in one click, letting non-profits and mutual aid organizers focus on serving their neighbors.",
    metric: "Saves 12–18 hours of busywork every week per group"
  },
  {
    id: "public-finance",
    title: "Towns Left Without Support",
    category: "Democracy",
    problem: "Local towns and neighborhoods often don't have the budget to help during crises, while private apps pull money out of the local economy.",
    solution: "Permanent, free software that any town or neighborhood group can use forever to support one another without paying monthly fees.",
    metric: "Free forever for any town or community group"
  }
];

export const REPOSITORIES: RepoModule[] = [
  {
    id: "courier",
    name: "decidim-module-courier",
    gemName: "decidim-courier",
    tagline: "Volunteer courier dispatch, timebank pools & privacy-first routing",
    description: "The core Decidim component engine providing participatory volunteer dispatch, geo-fenced neighborhood coverage, timebank credit tracking, and zero-commercial route optimization.",
    type: "Ruby on Rails Engine",
    license: "AGPLv3",
    status: "Active Sprint",
    version: "v0.3.1-alpha",
    githubUrl: "https://github.com/decidim/decidim",
    keyFeatures: [
      "Privacy-preserving recipient address masking until route lock",
      "Volunteer timebank coordination & shift self-scheduling",
      "Multi-stop open street map routing without proprietary Google APIs",
      "SMS & web-push doorstep status notifications"
    ],
    sampleCode: `# Gemfile
gem "decidim-courier", git: "https://github.com/foss-common-need/decidim-courier"

# config/initializers/decidim_courier.rb
Decidim::Courier.configure do |config|
  config.zero_cost_enforcement = true
  config.privacy_address_hashing = true
  config.max_volunteer_shift_hours = 4
  config.enable_timebank_credits = true
end`,
    routesSample: `Decidim::Courier::Engine.routes.draw do
  resources :delivery_requests, only: [:index, :new, :create, :show] do
    member do
      post :accept_dispatch
      post :confirm_dropoff
      post :report_issue
    end
  end
  resources :volunteer_shifts
  resource :dispatch_dashboard, only: [:show]
end`
  },
  {
    id: "common-logistics",
    name: "decidim-module-common_logistics",
    gemName: "decidim-common_logistics",
    tagline: "B2B surplus matching between verified non-profits & pantries",
    description: "Enables verified 501(c)(3) charities, food rescue operations, and clinics to broadcast perishable inventory surplus and automatically coordinate bulk transfers before expiration.",
    type: "Ruby on Rails Engine",
    license: "AGPLv3",
    status: "Active Sprint",
    version: "v0.2.4-alpha",
    githubUrl: "https://github.com/decidim/decidim",
    keyFeatures: [
      "Automated perishability countdown & priority redistribution matching",
      "501(c)(3) EIN verification hook for participating partner non-profits",
      "Cold-chain refrigerated transport flag for sensitive insulin / produce",
      "Weigh-in receipt generation for tax deduction donation records"
    ],
    sampleCode: `class SurplusMatchJob < ApplicationJob
  queue_as :logistics_priority

  def perform(surplus_item_id)
    surplus = Decidim::CommonLogistics::SurplusItem.find(surplus_item_id)
    candidates = Decidim::CommonLogistics::PantryMatcher.find_nearby_need(
      surplus.coordinates,
      radius_km: 15,
      requires_refrigeration: surplus.cold_chain_required?
    )
    surplus.dispatch_transfer_invitations!(candidates)
  end
end`,
    routesSample: `Decidim::CommonLogistics::Engine.routes.draw do
  resources :surplus_inventories do
    collection { get :expiring_soon }
    resources :claim_transfers, only: [:create, :update]
  end
  resources :partner_pantries, only: [:index, :show]
end`
  },
  {
    id: "community-audit",
    name: "decidim-module-community_audit",
    gemName: "decidim-community_audit",
    tagline: "Post-delivery dignity auditing & 1-click funder impact metrics",
    description: "Replaces 5-star customer review paradigms with community-centered accountability across four dimensions: Dignity & Respect, Reliability, Accessibility, and Community Value.",
    type: "Accountability Engine",
    license: "AGPLv3",
    status: "Specification",
    version: "v0.1.2-draft",
    githubUrl: "https://github.com/decidim/decidim",
    keyFeatures: [
      "No punitive rating algorithms; restorative feedback loops with organizers",
      "Automated anonymized aggregate reports for philanthropic grant applications",
      "Algorithmic transparency logs showing routing fairness across ZIP codes",
      "Accessible voice-memo or SMS one-tap audit responses"
    ],
    sampleCode: `module Decidim
  module CommunityAudit
    class DignityEvaluation < ApplicationRecord
      DIMENSIONS = %i[dignity_respect reliability accessibility community_value].freeze

      validates :dimension, inclusion: { in: DIMENSIONS }
      validates :anonymous_household_token, presence: true

      scope :funder_aggregate_metrics, ->(partner_id) {
        where(partner_id: partner_id).group(:dimension).average(:score)
      }
    end
  end
end`,
    routesSample: `Decidim::CommunityAudit::Engine.routes.draw do
  resources :audits, only: [:new, :create]
  resource :transparency_report, only: [:show] do
    get :download_funder_metrics, on: :member
  end
end`
  },
  {
    id: "grounded-theme",
    name: "decidim-theme-grounded_commons",
    gemName: "decidim-theme-grounded",
    tagline: "WCAG AAA accessible UI design system & PWA manifest package",
    description: "The official styling engine for FOSS For The Common Need, optimized for low-bandwidth cellular connections, screen readers, large typography, and offline PWA capability.",
    type: "Design System & PWA",
    license: "AGPLv3 / MIT",
    status: "Active Sprint",
    version: "v1.0.0-rc1",
    githubUrl: "https://github.com/decidim/decidim",
    keyFeatures: [
      "WCAG 2.2 AAA color contrast compliance across all ambient lights",
      "Zero JavaScript degradation mode for older low-cost mobile browsers",
      "Progressive Web App (PWA) offline delivery slip synchronization",
      "Grounded natural earth tones (Canopy Forest, Slate, Loam, Terracotta)"
    ],
    sampleCode: `// app/packs/stylesheets/grounded_commons.scss
@import "decidim/core";

:root {
  --primary-canopy: #1E5631;
  --civic-slate: #1D5B79;
  --rich-loam: #6B4423;
  --terracotta: #A45A3D;
  --alabaster: #FAF8F5;
}

.delivery-card--accessible {
  font-size: 1.125rem;
  min-height: 48px;
  touch-action: manipulation;
}`,
    routesSample: `# Asset pipeline manifests and PWA ServiceWorker registration
get "/manifest.json", to: "decidim/grounded/pwa#manifest"
get "/service-worker.js", to: "decidim/grounded/pwa#service_worker"`
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 25,
    label: "Staging & CI/CD",
    impact: "Funds 1 month of automated test runners, container builds, and staging testbeds for our Rails engines.",
    breakdown: "Covers automated code quality, continuous integration, and server uptime tests."
  },
  {
    amount: 50,
    label: "Volunteer Onboarding Kit",
    impact: "Funds vetting protocols, volunteer courier instructional guides, and route safety manuals for 10 new dispatchers.",
    breakdown: "Provides orientation packets, emergency contact systems, and community guidelines.",
    popular: true
  },
  {
    amount: 100,
    label: "Developer Sprint Day",
    impact: "Sponsors 1 full dedicated sprint day for open-source software maintainers working on Decidim core compatibility.",
    breakdown: "Directly funds upstream developer hours refactoring dispatch algorithms and fixing issues."
  },
  {
    amount: 250,
    label: "Accessibility & Security Audit",
    impact: "Funds assistive technology testing (JAWS, NVDA, VoiceOver) and automated dependency vulnerability auditing.",
    breakdown: "Guarantees that homebound and disabled recipients can navigate the platform with 100% independence."
  }
];

export const BUDGET_ALLOCATION_25K = [
  { item: "Software Engineering & Decidim Rails Engine Core", amount: 12000, percentage: 48, note: "Developing decidim-module-courier, route solvers, and API connectors." },
  { item: "Accessibility (WCAG AAA) & Security Testing", amount: 4500, percentage: 18, note: "Professional screen reader audits, pen testing, and low-bandwidth optimization." },
  { item: "Public Documentation & Municipality Deployment Toolkits", amount: 3500, percentage: 14, note: "Technical guides, Docker quickstart recipes, and non-profit training videos." },
  { item: "Community Pilot Onboarding & Non-Profit Hardware Staging", amount: 3000, percentage: 12, note: "Initial staging server, SMS notification gateway tokens, and pilot food bank setup." },
  { item: "Fiscal Sponsorship Administration & Legal / Accounting", amount: 2000, percentage: 8, note: "Model C fiscal sponsor overhead, annual filing support, and public disclosures." }
];

export const ROADMAP_MILESTONES = [
  {
    quarter: "Phase 1: Present",
    status: "In Progress",
    title: "Fiscal Sponsorship & Seed Fund ($25K)",
    points: [
      "Finalize Model C 501(c)(3) fiscal sponsorship onboarding with Social Good Fund.",
      "Launch public upstream GitHub repositories under GNU AGPLv3 license.",
      "Establish nonpartisan developer dispatch working groups for Ruby on Rails and accessibility."
    ]
  },
  {
    quarter: "Phase 2: Q1 2027",
    status: "Upcoming",
    title: "Alpha Engine & First Non-Profit Pilot",
    points: [
      "Ship v0.4.0 of decidim-module-courier with basic routing and timebank support.",
      "Deploy live alpha with 2 partner food banks and 15 volunteer couriers in a pilot metro area.",
      "Publish first Algorithmic Transparency Report on volunteer route fairness."
    ]
  },
  {
    quarter: "Phase 3: Q2-Q3 2027",
    status: "Planned",
    title: "Community Audit & B2B Surplus Engine",
    points: [
      "Integrate decidim-module-community_audit for restorative feedback without commercial rating penalties.",
      "Launch decidim-module-common_logistics for food rescue cold-chain transfers between pantries.",
      "Undergo comprehensive independent WCAG 2.2 AAA accessibility audit."
    ]
  },
  {
    quarter: "Phase 4: Q4 2027+",
    status: "Vision",
    title: "Federated Commons & Municipal Toolkit",
    points: [
      "1-click Docker and Helm charts for community centers, co-ops, and local city agencies.",
      "Decentralized ActivityPub federation between regional logistics nodes.",
      "Self-sustaining grant pipeline and ongoing public-interest developer fellowships."
    ]
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    category: "Governance",
    question: "What is a Model C Fiscal Sponsorship and why did we choose it?",
    answer: "Under a Model C fiscal sponsorship (such as with the Social Good Fund), FOSS For The Common Need maintains its programmatic identity, strategic governance, and technical autonomy while operating under the fiscal sponsor's 501(c)(3) tax-exempt status. This allows all donations and foundation grants to be 100% tax-deductible to donors immediately, without waiting 12+ months for IRS Form 1023 determination, while keeping legal, compliance, and accounting standards rigorous."
  },
  {
    category: "Governance",
    question: "Are you involved in political campaigns, lobbying, or electoral activities?",
    answer: "No. Absolutely none. The project operates strictly as a nonpartisan open-source software custodian and civic tech lab. It holds zero proprietary voter files, campaign data, or partisan candidate profiles. It will never intervene in any political campaign, endorse candidates, or engage in legislative lobbying. All code and documentation are public goods for everyone."
  },
  {
    category: "Open Source",
    question: "Why did you choose the GNU Affero General Public License (AGPLv3)?",
    answer: "Commercial delivery giants frequently take open-source code, modify it behind closed doors, and deploy it as a proprietary cloud service. The AGPLv3 copyleft license ensures that anyone who modifies or hosts our logistics engine—even as a web service—must make their complete source code freely available to their users under the exact same license. This protects the commons from corporate capture forever."
  },
  {
    category: "Open Source",
    question: "Why build on top of Decidim and Ruby on Rails?",
    answer: "Decidim is the world's premier open-source digital democracy and participatory budgeting framework, trusted by Barcelona, the European Commission, and dozens of civic institutions. By building modular Rails engines for Decidim, we inherit rock-solid security, internationalization, accessible design, and participatory assembly features, rather than building yet another fragile standalone silo."
  },
  {
    category: "Logistics",
    question: "How is this different from commercial delivery apps (DoorDash, UberEats, Instacart)?",
    answer: "Commercial delivery apps are extractive: they charge consumers heavy service fees and 15-30% restaurant markups, misclassify drivers as gig workers, and prioritize lucrative wealthy neighborhoods while leaving working-class transit deserts behind. FOSS For The Common Need charges exactly $0 to consumers and non-profits, uses community volunteer couriers and timebanking, and is governed by the recipients and organizers who use it."
  },
  {
    category: "Finances",
    question: "How will the initial $25,000 budget be used?",
    answer: "Our anticipated first-year revenue is $25K, sourced from tax-deductible foundation grants, philanthropic capital, and individual community donors. 48% is dedicated to software development on our Decidim Rails engines, 18% to accessibility and security testing, 14% to public deployment documentation, 12% to community non-profit onboarding, and 8% to fiscal sponsor administrative compliance."
  },
  {
    category: "Logistics",
    question: "Do you charge fees for services, deliveries, or software downloads?",
    answer: "None. Zero fees for service. The codebase is distributed publicly at zero cost, and the end-user logistics routing generates zero commercial commissions or transaction fees."
  }
];

export const INITIAL_BLOG_POSTS: import('../types').BlogPost[] = [
  {
    id: "announcing-launch-website",
    title: "Announcing the Official Launch of FOSS For the Common Need",
    slug: "announcing-the-official-launch-of-foss-for-the-common-need",
    date: "October 16, 2026",
    timestamp: 1792185600000,
    author: {
      name: "Jon Sullivan",
      role: "Project Director & Lead Maintainer"
    },
    category: "Announcements",
    readTime: "4 min read",
    summary: "Today we publicly unveil FOSS For the Common Need—a nonpartisan 501(c)(3) fiscally sponsored tech lab engineering free, user-controlled digital logistics infrastructure on Decidim Ruby on Rails.",
    content: `Welcome to the official launch of **FOSS For the Common Need**!

For over a year, working behind the scenes with grassroots mutual aid networks, community food banks, and civic software craftspeople, we have asked a foundational question:

> *As corporate tech monopolies automate and extract wealth from our neighborhoods, why are low-income families and homebound seniors forced to pay $15 to $25 in commercial delivery markups just to receive emergency food and vital medicine?*

### The Public Commons Solution
Commercial venture-backed apps commodify essential community distribution lines, extracting 20% to 30% from local merchants while exploiting misclassified gig workers. Meanwhile, local 501(c)(3) charities waste dozens of staff hours each week trying to manually route volunteer drivers through messy spreadsheets and phone trees.

**FOSS For the Common Need** exists to replace this extractive model with an enduring public commons. 

Under our Model C fiscal sponsorship with the **Social Good Fund**, we operate as a nonpartisan 501(c)(3) research and engineering collective. We build modular, open-source engines for **Decidim**—the world-class participatory democracy framework written in Ruby on Rails—to deliver goods at **$0 consumer and charity cost**.

### Our First-Year $25,000 Milestone
With this website launch, we are officially kicking off our **$25,000 Seed & MVP Campaign**. Every dollar contributed is 100% tax-deductible and directly funds:
- Upstream Ruby on Rails development on \`decidim-module-courier\`
- Rigorous WCAG 2.2 AAA accessibility audits for blind and low-mobility users
- Pilot deployment toolkits for our first 3 partner food pantries and 50 volunteer couriers
- Algorithmic transparency reports that audit route distribution fairness across city ZIP codes

### Explore and Join Us Today
We believe technology must be a protected public utility, not private property. You can explore our open code repositories under the **GNU AGPLv3**, read our four economic pillars, make a tax-deductible gift, or join our Developer Dispatch.

Thank you for standing with us to build a digital future where goods and services are distributed according to common need, not corporate margin.`,
    tags: ["Launch", "Fiscal Sponsorship", "Decidim", "Ruby on Rails", "AGPLv3", "Mutual Aid"],
    featured: true
  },
  {
    id: "why-agplv3-license",
    title: "Why We Chose the GNU AGPLv3 to Shield Civic Software",
    slug: "why-we-chose-the-gnu-agplv3-to-shield-civic-software",
    date: "October 8, 2026",
    timestamp: 1791494400000,
    author: {
      name: "Governance Working Group",
      role: "Public Commons Legal Research"
    },
    category: "Governance & Policy",
    readTime: "5 min read",
    summary: "How strong network copyleft prevents commercial delivery conglomerates from privatizing community-built route solvers and closing source code.",
    content: `When civic developers write open-source code under permissive licenses like MIT or Apache 2.0, venture-backed companies can legally incorporate those algorithms into proprietary cloud software, sell access behind a paywall, and keep enhancements hidden.

In civic logistics—where food distribution and senior healthcare access are at stake—we cannot afford proprietary enclosure.

### The Network Freedom Clause
The GNU Affero General Public License (AGPLv3) addresses the 'ASP/SaaS loophole.' Under AGPLv3, if any entity hosts or modifies our Decidim courier engines over a network service, they are legally required to make the complete, corresponding source code available to all users who interact with that service.

This guarantees:
1. **Perpetual Free Access:** No private platform can turn our route solvers into a paid subscription.
2. **Upstream Reciprocity:** Any municipality or corporation that improves the dispatch algorithm must contribute those improvements back to the public commons.
3. **Auditability:** Recipient communities can always verify how their data and route priority calculations are handled.

Software for the common need must remain common forever.`,
    tags: ["AGPLv3", "Copyleft", "Open Source", "Software Sovereignty"],
    featured: false
  },
  {
    id: "courier-engine-alpha-sprint",
    title: "Sprint Notes: Recipient Privacy Hashing & Zero-Cost Dispatch in decidim-module-courier",
    slug: "sprint-notes-recipient-privacy-hashing-and-zero-cost-dispatch",
    date: "September 28, 2026",
    timestamp: 1790630400000,
    author: {
      name: "Decidim Core Team",
      role: "Rails Engine Maintainers"
    },
    category: "Engineering",
    readTime: "6 min read",
    summary: "Technical update on our SHA-256 recipient tokenization, OpenStreetMap routing without proprietary Google APIs, and volunteer shift scheduling.",
    content: `Our engineering sprint for \`decidim-module-courier\` (v0.3.1-alpha) has reached a major milestone. Here are the core architectural updates shipped this month:

### 1. Cryptographic Address Hashing & Privacy Masking
Recipients requesting pantry boxes or prescription deliveries frequently include vulnerable undocumented families, domestic violence survivors, and homebound seniors. 
We implemented a zero-knowledge address masking layer:
- Recipient physical street addresses are never stored in plaintext within Decidim user logs.
- During courier transit, the active volunteer receives an encrypted, time-bounded delivery token.
- Once delivery is confirmed via physical doorstep token, exact geographic markers are cleared from the active database.

### 2. OSRM & OpenStreetMap Integration (Zero Google API Fees)
Commercial logistics platforms pay thousands per month in Google Maps API billing. For our zero-cost civic mission, we integrated the Open Source Routing Machine (OSRM) on OpenStreetMap datasets, enabling low-emission turn-by-turn route optimization with zero proprietary third-party cost.

### 3. Volunteer Timebanking Hooks
Volunteers can now track fulfilled shifts as community timebank hours, seamlessly linking dispatch pools with neighborhood mutual credit assemblies.

Check out the code in our public repository and submit pull requests on our \`main\` branch!`,
    tags: ["Ruby on Rails", "Decidim", "Cryptography", "OpenStreetMap", "OSRM"],
    featured: false
  },
  {
    id: "field-report-pantry-logistics",
    title: "Field Report: What 150 Manual Deliveries Taught Us About Mutual Aid Software",
    slug: "field-report-what-150-manual-deliveries-taught-us-about-mutual-aid-software",
    date: "September 14, 2026",
    timestamp: 1789420800000,
    author: {
      name: "Community Organizing Circle",
      role: "Field Partnerships"
    },
    category: "Community & Pilots",
    readTime: "4 min read",
    summary: "Real-world lessons from shadowing food bank coordinators, handling cold-chain milk and produce, and designing for dignity over punitive customer ratings.",
    content: `Before writing a single line of Rails code, our team spent two months shadowing community food bank volunteers across three neighborhoods. Here is what frontline organizers told us:

### Dignity Over 5-Star Reviews
Commercial delivery apps punish gig workers whenever a rating dips below 4.8 stars. But food pantry recipients told us they don't want a consumerist 'customer review' system—they want restorative accountability. 

That is why we designed \`decidim-module-community_audit\` to measure:
- **Dignity & Respect:** Were cultural and dietary preferences respected?
- **Reliability:** Did the delivery arrive within the promised window?
- **Accessibility:** Was the drop-off positioned safely for mobility devices?

### Cold-Chain Perishable Matching
Pantry coordinators receive sudden calls from grocery distributors with pallets of yogurt or greens that expire in 48 hours. Without automated B2B surplus matching, 40% of perishable food goes to compost while families go hungry. 

Our upcoming \`decidim-module-common_logistics\` engine will solve this with automated geo-fenced expiry alerts to nearby pantries.`,
    tags: ["Field Work", "Food Sovereignty", "Accessibility", "Community Audit"],
    featured: false
  }
];

export const PROJECTS_CATALOG: import('../types').ProjectItem[] = [
  {
    id: "decidim-courier",
    title: "Decidim Courier Engine",
    repoName: "decidim-module-courier",
    category: "Civic Logistics & Dispatch",
    tagline: "Volunteer courier dispatch, timebank pools & privacy-first routing",
    description: "The core Decidim component engine providing participatory volunteer dispatch, geo-fenced neighborhood coverage, timebank credit tracking, and zero-commercial route optimization for verified food banks and clinics.",
    goals: [
      "Eliminate 100% of commercial delivery markups and gig platform commissions for working families.",
      "Protect recipient safety via cryptographic address tokenization and zero telemetry logging.",
      "Enable low-emission multi-stop route optimization using open-source OpenStreetMap and OSRM protocols.",
      "Integrate neighborhood timebanking credits for volunteer couriers."
    ],
    currentStatus: "Active Alpha Sprint",
    statusCode: "active",
    progressPercent: 65,
    repositoryUrl: "https://github.com/decidim/decidim",
    docsUrl: "https://docs.decidim.org",
    techStack: ["Ruby on Rails 7.2", "Decidim Core", "OSRM", "PostGIS", "Sidekiq", "Redis"],
    license: "GNU AGPLv3",
    leadRole: "Rails Engine Core Working Group",
    keyDeliverables: [
      "Zero-knowledge recipient address masking",
      "Volunteer shift self-scheduling module",
      "Decidim participatory assembly voting hooks",
      "Low-bandwidth PWA courier route screen"
    ]
  },
  {
    id: "common-logistics",
    title: "Common Logistics B2B Surplus Engine",
    repoName: "decidim-module-common_logistics",
    category: "Food Rescue & Inventory",
    tagline: "Automated perishable surplus matching between 501(c)(3) pantries & clinics",
    description: "Enables verified 501(c)(3) charities, food rescue operations, and clinics to broadcast perishable inventory surplus and automatically coordinate bulk transfers before expiration.",
    goals: [
      "Rescue perishable surplus (produce, milk, insulin, emergency formula) before expiration.",
      "Automate B2B peer-to-peer transfer coordination, saving 15+ staff hours per week per charity.",
      "Verify 501(c)(3) non-profit status automatically via open public EIN registries.",
      "Provide cold-chain handling alerts for temperature-sensitive food and medications."
    ],
    currentStatus: "Active Development",
    statusCode: "active",
    progressPercent: 45,
    repositoryUrl: "https://github.com/decidim/decidim",
    docsUrl: "https://docs.decidim.org",
    techStack: ["Ruby on Rails", "Decidim Component Cell", "PostgreSQL", "Turbo Streams"],
    license: "GNU AGPLv3",
    leadRole: "Mutual Aid Supply Chain Group",
    keyDeliverables: [
      "Automated perishability countdown timer",
      "Refrigerated cold-chain route tagging",
      "Instant tax-deductible surplus donation weigh-in receipts"
    ]
  },
  {
    id: "community-audit",
    title: "Community Accountability & Funder Audit",
    repoName: "decidim-module-community_audit",
    category: "Democratic Accountability",
    tagline: "Post-delivery dignity auditing & 1-click funder impact metrics",
    description: "Replaces extractive 5-star customer review paradigms with community-centered accountability across four dimensions: Dignity & Respect, Reliability, Accessibility, and Community Value.",
    goals: [
      "Replace punitive 5-star worker deactivation with restorative, organizer-mediated feedback loops.",
      "Measure recipient dignity, cultural food appropriateness, and physical accessibility.",
      "Auto-generate 1-click standardized impact metrics for foundation grant applications and 990 disclosures.",
      "Publish periodic algorithmic transparency logs on route equity."
    ],
    currentStatus: "In Specification",
    statusCode: "spec",
    progressPercent: 30,
    repositoryUrl: "https://github.com/decidim/decidim",
    docsUrl: "https://docs.decidim.org",
    techStack: ["Ruby on Rails", "Decidim Accountability", "Chart.js", "WCAG 2.2 AAA"],
    license: "GNU AGPLv3",
    leadRole: "Dignity & Accessibility Research Team",
    keyDeliverables: [
      "Anonymous recipient feedback survey cell",
      "1-Click PDF & CSV funder grant report exporter",
      "Restorative feedback resolution workflow"
    ]
  },
  {
    id: "grounded-commons-theme",
    title: "Grounded Commons Design System & PWA",
    repoName: "decidim-theme-grounded_commons",
    category: "Design System & PWA",
    tagline: "WCAG AAA accessible UI design system & PWA manifest package",
    description: "The official styling engine for FOSS For The Common Need, optimized for low-bandwidth cellular connections, screen readers, large typography, and offline PWA capability.",
    goals: [
      "Achieve strict WCAG 2.2 AAA color contrast and keyboard navigation across all ambient environments.",
      "Support offline PWA service worker synchronization for volunteer couriers in low-signal areas.",
      "Provide zero-JavaScript degradation mode for older low-cost mobile phones.",
      "Incorporate high-contrast Grounded Commons earth-toned palette (Canopy Forest, Slate, Loam, Terracotta)."
    ],
    currentStatus: "Pilot Ready",
    statusCode: "pilot",
    progressPercent: 85,
    repositoryUrl: "https://github.com/decidim/decidim",
    docsUrl: "https://docs.decidim.org",
    techStack: ["Tailwind CSS", "Shakapacker / SCSS", "ServiceWorker API", "Web Manifest"],
    license: "GNU AGPLv3 / MIT",
    leadRole: "Accessibility & Design Collective",
    keyDeliverables: [
      "High-contrast color token variables",
      "Accessible PWA manifest and offline cache worker",
      "Screen-reader tested Decidim view overrides"
    ]
  },
  {
    id: "civic-deploy-kit",
    title: "Civic Self-Hosting & Municipality Deploy Kit",
    repoName: "civic-logistics-deploy-kit",
    category: "DevOps & Infrastructure",
    tagline: "Turnkey Docker Compose, Helm charts, and Ansible recipes for local mutual aid nodes",
    description: "Enables any municipality, cooperative, or community center to deploy their own autonomous, sovereign logistics instance in under 15 minutes on affordable cloud or bare-metal hardware.",
    goals: [
      "Democratize server deployment with zero proprietary vendor lock-in.",
      "Package complete stack: Decidim Rails app, PostgreSQL with PostGIS, Redis, OSRM routing, and automated backups.",
      "Provide step-by-step documentation for community sysadmins and non-profit IT staff.",
      "Include pre-configured Let's Encrypt SSL and security hardening scripts."
    ],
    currentStatus: "In Specification",
    statusCode: "spec",
    progressPercent: 25,
    repositoryUrl: "https://github.com/decidim/decidim",
    techStack: ["Docker", "Docker Compose", "Ansible", "Kubernetes Helm", "Ubuntu / Debian"],
    license: "GNU AGPLv3",
    leadRole: "DevOps & Public Infrastructure Circle",
    keyDeliverables: [
      "Single-command \`docker-compose up\` mutual aid instance",
      "Automated daily encrypted database backups",
      "Hardened Nginx reverse proxy with SSL"
    ]
  },
  {
    id: "algorithmic-transparency",
    title: "Algorithmic Route Equity & Transparency Framework",
    repoName: "algorithmic-transparency-framework",
    category: "Auditing & Research",
    tagline: "Public audit tools verifying that routing algorithms do not discriminate by ZIP code or race",
    description: "An open research and auditing toolkit that tests routing heuristics against historical census data to guarantee that low-income and minority neighborhoods receive equal dispatch priority.",
    goals: [
      "Prevent algorithmic redlining and geographic transit discrimination.",
      "Publish quarterly public fairness audits measuring median wait times across all census tracts.",
      "Provide civic oversight dashboards for municipal participatory assemblies.",
      "Establish reproducible open-source testing benchmarks for civic algorithms."
    ],
    currentStatus: "Public Draft",
    statusCode: "draft",
    progressPercent: 20,
    repositoryUrl: "https://github.com/decidim/decidim",
    techStack: ["Python", "Jupyter", "GeoPandas", "Decidim API"],
    license: "GNU AGPLv3",
    leadRole: "Data Justice Working Group",
    keyDeliverables: [
      "Automated census tract parity test suite",
      "Open algorithmic fairness dashboard",
      "Public transparency report template"
    ]
  }
];

