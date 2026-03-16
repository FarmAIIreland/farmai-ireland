Every data source FarmAI Ireland needs — and who will actually work with you

Ireland's agricultural data landscape is surprisingly open, but unevenly so. Government bodies and state agencies publish extensive datasets under Creative Commons CC-BY-4.0 licensing with functional APIs, making them the ideal foundation for an AI-powered farming platform. Farming organisations and co-ops produce valuable content designed for redistribution. Trade media, however, presents a more complex picture — Agriland's free model makes it the dominant aggregator, 

Google Play

&#x20;while the Irish Farmers Journal sits behind a paywall. 

Farmers Journal

&#x20;The critical finding: no AI-focused farming media platform exists anywhere in the Irish or UK market, giving FarmAI Ireland genuine whitespace to fill as a translator rather than a competitor.



This report maps 60+ sources across eight categories, evaluates data access for each, and provides an honest strategic assessment of who would partner with you, who would ignore you, and who might resist you.



Part 1: The complete source map

Government bodies and state agencies — your open data backbone

These are FarmAI Ireland's most accessible and legally defensible content sources. Under EU Open Data Directive (transposed via SI 376/2021) and Circular 12/2016, Irish public bodies must publish data under CC-BY-4.0 licensing. Ireland ranked #1 in the EU for open data maturity three consecutive years (2017–2019). 

Central Statistics Office



Source	Key data published	Update frequency	Free?	API/RSS?	Licence

CSO (data.cso.ie)	Livestock slaughterings, milk stats, ag price indices, farm structure surveys, Census of Agriculture	Monthly to decennial	Yes	PxStat REST API, R package (csodata), Python package	CC-BY-4.0

Met Éireann (met.ie)	Weather forecasts, agri-weather bulletin (JSON), radar, historical climate, soil temps	Continuously to monthly	Yes	REST API (XML/JSON), no auth required	CC-BY-4.0 / Met Éireann Open Data Licence

EPA (epa.ie)	GHG emissions (agriculture-specific), water quality, soil data, environmental monitoring	Quarterly to annually	Yes	Multiple REST APIs, GIS/WMS services	CC-BY-4.0

DAFM (gov.ie/dafm)	CAP beneficiaries, TB stats, sheep census, LPIS data, forestry licences, ACRES/GLAS data	Annually to periodic	Yes	CKAN API via opendata.agriculture.gov.ie	CC-BY-4.0

Teagasc (teagasc.ie)	National Farm Survey, PastureBase grass growth, Grass10 newsletter, T-Stor research repository, recommended crop variety lists	Weekly to annually	Mostly yes (NFS microdata restricted)	OAI-PMH on T-Stor; no PastureBase API	Mixed (CC-BY-4.0 on data.gov.ie datasets; copyright on publications)

Bord Bia (bordbia.ie)	Weekly cattle/sheep prices, beef market price index across 7 EU markets, export performance reports, sector profiles	Weekly to annually	Yes	No API, no RSS — HTML/PDF only	No explicit licence (PSI rules apply on request)

ICBF (icbf.com)	EBI dairy index, Euro-Star beef ratings, bull proof tables (3×/year), Commercial Beef Value at marts	3× yearly (genetic evaluations)	Bull search free; HerdPlus is paid subscription	No public API	Proprietary

AHI (animalhealthireland.ie)	BVD eradication data, CellCheck mastitis programme, Johne's control, Beef HealthCheck liver/lung scores	Continuous to quarterly	Programme info free; herd data via ICBF	No API	Not explicitly licensed

data.gov.ie	251 agriculture datasets (175 from CSO, 53 from DAFM, 14 from Teagasc, 6 from Coillte)	Varies	Yes	CKAN API	219 datasets CC-BY-4.0; 13 CC-BY-NC

The standout sources for immediate use are Met Éireann (free API, no authentication, CC-BY-4.0, real-time agri-weather data in JSON), 

Met Éireann

&#x20;the CSO's PxStat system (full API with R and Python packages covering 175 agricultural datasets), and the EPA's suite of REST APIs. These three alone could power daily automated content on weather impacts, market statistics, and environmental compliance — all under open licensing with proper attribution.



DAFM's dedicated open data portal at opendata.agriculture.gov.ie 

Agriculture

&#x20;runs on CKAN, a standard open data platform with well-documented API endpoints. 

Agriculture

&#x20;Datasets include spatially referenced forestry data, nitrates derogation maps, and scheme payment information 

Agriculture +2

&#x20;— all downloadable in CSV, SHP, XLSX, and JSON formats. 

Agriculture



Teagasc presents a paradox: it is Ireland's most prolific producer of farming content (daily website updates, weekly Grass10 newsletters, quarterly TResearch magazine, the Irish Journal of Agricultural and Food Research, 

Ijafr

Teagasc

&#x20;plus podcasts including The Dairy Edge, The Beef Edge, and OviCast) but lacks a centralised API. Its institutional repository T-Stor supports OAI-PMH protocol for harvesting research publications. PastureBase Ireland, the national grassland database with real-time grass growth data, 

Teagasc

Teagasc

&#x20;has no public API and requires farmer registration. Teagasc has 14 datasets on data.gov.ie under mixed CC-BY-4.0 and CC-BY-NC licensing.



Bord Bia publishes genuinely valuable weekly cattle and sheep trade prices and a monthly beef market price index benchmarking Ireland against six other EU markets. 

Agriland

&#x20;However, all of this sits in HTML web pages and PDF reports with no structured data access whatsoever. Scraping or manual extraction would be required.



Northern Ireland sources — surprisingly strong open data

Northern Ireland's agricultural data infrastructure is excellent and directly relevant to FarmAI Ireland's cross-border audience.



Source	Key data published	Update frequency	Free?	API/RSS?

DAERA (daera-ni.gov.uk)	Annual farm census, weekly market price reports (cattle/sheep/pigs/cereals), milk production data, Total Income from Farming	Weekly to annually	Yes	ArcGIS Hub + OpenDataNI CKAN API

LMC (lmcni.com)	Official NI deadweight cattle prices, sheep prices, British Isles price comparisons, slaughterings, import/export data	Weekly	Yes — exceptional free access	Searchable web tables (no REST API but structured queryable data)

AFBI (afbini.gov.uk)	Research publications, All-Island Animal Disease Surveillance, grassland research, NIFAB livestock biobank	Periodic	Yes	Open access repository at afbi.dspacedirect.org

CAFRE (cafre.ac.uk)	Farm benchmarking, advisory content, Knowledge Transfer programmes, Bovine Genetics Project	Regular	Partially (benchmarking requires Government Gateway login)	No API

UFU (ufuni.org)	NI farming policy, press releases, member communications	Several times/week	Yes	No API (WordPress, may support /feed/)

AgriSearch (agrisearch.org)	GrassCheck — weekly grass growth monitoring from 35 NI farms, CalfCheck research	Weekly (during growing season)	Yes	No formal API

The Livestock and Meat Commission (LMC) deserves special attention. It publishes statutory weekly deadweight cattle and sheep price reports with cross-border price comparisons — a data goldmine for automated market commentary. DAERA's agricultural statistics carry National Statistics accreditation under the UK framework and are available through both their ArcGIS Hub and the OpenDataNI portal with CKAN API access.



Cross-border sources include Lakeland Dairies (operates across ROI and NI, appears in both jurisdictions' milk price leagues), Safefood (all-island food safety body 

iCommunity

&#x20;publishing "A Compendium of Food Chain Statistics for the Island of Ireland"), and InterTradeIreland (cross-border agri-food trade data showing food and drink trade grew from £2.6bn to £3.8bn).



Farming organisations — press releases designed for redistribution

Source	Focus	Content type	Update frequency	Free?

IFA (ifa.ie)	All sectors, \~72,000 members	Press releases, policy positions, price monitoring, campaign updates	Near-daily	Yes

ICMSA (icmsa.ie)	Dairy-focused, \~18,000 members	Press releases, milk price commentary, EU dairy policy	Several times/week	Yes

ICSA (icsaireland.ie)	Beef and sheep, \~10,000 members	Press releases (222+ pages archived), factory price updates, CAP submissions	Multiple times/week	Yes

Macra na Feirme (macra.ie)	Young farmers	Policy positions, Land Mobility Service, events, training	Irregular	Yes

Sheep Ireland (sheep.ie)	Sheep breeding genetics	€uroStar evaluations, LambPlus recording, RamSearch database (ramsearch.ie)	Weekly genetic evaluations (Apr–Oct)	RamSearch freely searchable; flock data restricted

IHFA (ihfa.ie)	Holstein Friesian breeding, 3,700 members	Herdbook, classification data, show results	Periodic	Partially

IGGG (irishgraingrowers.ie)	Tillage policy	Press releases, campaign positions	Irregular	Yes

None of these organisations have public APIs or confirmed RSS feeds, though several run WordPress sites that likely support standard /feed/ endpoints. All distribute press releases to farming media and would welcome accurate coverage. Sheep Ireland's RamSearch at ramsearch.ie is a notable exception — a freely searchable, structured database of performance-recorded pedigree rams with genetic evaluation data. 

Sheep Ireland



Co-operatives — monthly milk prices and branded content budgets

Co-op	Key data	Update frequency	Cross-border?

Tirlán (tirlan.com)	Monthly milk prices, grain prices (\~190,000 tonnes purchased), sustainability reports, annual reports	Monthly	No

Dairygold (dairygold.ie)	Monthly milk prices (incl. 1.06c/L "Grassroots" sustainability bonus), annual reports	Monthly	No

Lakeland Dairies (lakeland.ie)	Monthly milk prices, sustainability reports	Monthly	Yes — ROI + NI (3,200 farm families across 16 counties)

Aurivo (aurivo.ie)	Monthly milk prices (FutureMilk sustainability bonus), annual reports	Monthly	Partial (also operates in NI)

Carbery Group (carbery.com)	Milk prices via West Cork co-ops (Bandon, Barryroe, Drinagh, Lisavaird), FutureProof programme	Monthly	No

Kerry Dairy Ireland	Monthly milk prices	Monthly	No

No co-op offers a public API. Milk prices are typically announced via press release and tracked comprehensively by Agriland's Milk Price Tracker, which aggregates all co-op prices monthly. Annual reports are freely downloadable as PDFs. Tirlán operates a farmer-facing portal at tirlanfarmlife.com with agri-services content.



Trade media — the competitive landscape

Publication	Model	Paywall?	RSS feed?	Audience

Agriland (agriland.ie)	Digital-only, ad-funded	No paywall — 100% free	agriland.co.uk/feed (UK sister site confirmed)	\~1M monthly users, 60K+ daily, most-downloaded farming app

Irish Farmers Journal (farmersjournal.ie)	Print + digital, subscription-funded	Metered paywall — 10 free articles/month	No confirmed RSS	379,000–400,000 weekly readers, \~60,000 print circulation

Farming Independent (independent.ie/business/farming)	Part of Irish Independent (Mediahuis)	General paywall	Likely via Independent.ie infrastructure	Part of Ireland's largest newspaper group

Irish Examiner (irishexaminer.com/farming/)	Part of Irish Examiner (Mediahuis)	Subscription model	Likely via Examiner infrastructure	Regional but strong Munster farming readership

RTÉ (rte.ie)	Public broadcaster	Free (Ear to the Ground on RTÉ Player)	RSS available for news sections	National reach, 32+ seasons of Ear to the Ground

That's Farming (thatsfarming.com)	Digital-only	No paywall	Not confirmed	Operations significantly reduced (editor illness, 2024)

Farming Life (farminglife.com)	Print supplement (News Letter) + online	Partial paywall	Newsletter available	\~28,000 circulation (NI), 62,700 Facebook likes 

Facebook

MediaLive

Agriland dominates Irish farming digital media. Founded in 2013 by Cormac Farrelly 

Agriland

&#x20;(media specialist and farmer, formerly co-founded Kantar Media), 

Agriland Media

&#x20;it grew to \~40 employees 

Agriland

&#x20;and Ireland's largest agricultural digital audience within four years. Its growth strategy — free content, mobile-first, 7-day publishing, branded content revenue 

Agriland

&#x20;— proved that Irish farmers adopt digital media aggressively. Revenue comes from display advertising, native/branded content partnerships 

Agriland Advertising

&#x20;(documented with Dairygold, Volac, AXA Insurance, DAFM), classifieds (Haystack), and recruitment (AgriRecruit).



The Irish Farmers Journal, owned by The Agricultural Trust (which reinvests all profits into agriculture), remains the most authoritative voice. Its paywall protects premium content 

Farmers Journal

&#x20;including detailed mart reports and price data. It employs specialist journalists across every sector and runs a demonstration farm at Tullamore. 

The Irish Times



Research institutions and open access publications

Source	Type	Access

Irish Journal of Agricultural and Food Research (IJAFR)	Peer-reviewed journal (Teagasc)	Fully open access — all articles free

T-Stor (t-stor.teagasc.ie)	Teagasc research repository	Open access, OAI-PMH protocol

AFBI Repository (afbi.dspacedirect.org)	NI agri-food research	Open access

UCD School of Agriculture (ucd.ie/agfood/)	University research	Mixed (journal-dependent)

Teagasc Moorepark	Dairy research (Moorepark blueprint, grassland)	Publications freely available

Teagasc Oak Park	Tillage research, annual Recommended Lists for cereal varieties	Free — essential reference for tillage farmers

EU-level and international data

Source	Key data	Access

Eurostat (ec.europa.eu/eurostat)	Agricultural accounts, livestock, crop production, organic farming — Ireland-specific breakdowns	Free, bulk download + API, updated twice daily 

Eurostat

EU Agri-food Data Portal (agridata.ec.europa.eu)	FADN farm economics, CAP performance indicators, fertiliser data, market data 

Europa

Free, documented API, interactive dashboards

OSi/Tailte Éireann (geohive.ie)	National Land Cover Map, townland boundaries, 

Irishriverproject

&#x20;GeoHive geospatial hub 

Geohive

CC licence, 120+ open datasets 

Osi

&#x20;on ArcGIS portal

Teagasc Soils (gis.teagasc.ie/soils/)	Irish Soil Information System — national soil maps	Free web access

Part 2: Who will work with you and who won't

Government agencies would see FarmAI Ireland as a free amplification channel

Verdict: Strongly complementary. Low risk of resistance.



Teagasc's entire mission is "translating science into practice" 

Wikipedia

&#x20;— essentially identical to what FarmAI Ireland does for AI developments. The agency already partners extensively with media: it supplies content to Agriland and the Irish Farmers Journal, runs free webinars (Signpost Series), publishes across YouTube (1,000+ videos), 

Teagasc

&#x20;Facebook groups, and multiple podcast series. It has formal MOUs with UCC and SETU. 

Agriland

&#x20;A DAFM partnership with Agriland and AXA Insurance on "Farm Safe Farm Well" — a three-month multimedia campaign 

Agriland Advertising

&#x20;— proves the department's willingness to work with digital platforms.



Under the EU PSI Directive, these bodies are legally required to have permissive content reuse policies. FarmAI Ireland's model of citing sources, linking back, and adding AI-specific analysis creates a straightforward value proposition: you extend the reach of their content to an audience segment (tech-curious farmers) they struggle to engage directly.



The realistic path: Register on Teagasc and DAFM press distribution lists. Cover their publications and webinars editorially. Build a track record of accurate, well-attributed reporting. After 6–12 months, approach their communications teams about formal content partnerships or early access to reports. Teagasc's Signpost Series webinars are an easy starting point — freely accessible and designed for media coverage.



Farming organisations want amplification and would welcome you

Verdict: Complementary. They need every channel they can get.



IFA (72,000 members, €17.6M annual income), 

RTÉ

&#x20;ICMSA (18,000 members, 

Wikipedia

&#x20;concentrated in Munster), 

RTÉ

&#x20;and ICSA (10,000 members) 

RTÉ

&#x20;all issue press releases specifically for media distribution. They do not have exclusive media partnerships and actively seek coverage from any outlet that accurately represents their positions. Their press offices are staffed for this purpose.



ICMSA has historically been "reluctant to establish commercial links," preferring independence, 

RTÉ

ICMSA

&#x20;but has developed its own interactive milk price comparison tool 

ICMSA

&#x20;— indicating comfort with digital engagement. IFA maintains a Brussels office and works through COPA-COGECA at EU level, 

RTÉ

&#x20;generating EU-focused policy content that is underreported in Irish farming media.



The value exchange: FarmAI Ireland covers their positions on AI and technology policy (precision farming regulation, data ownership in agriculture, EU AI Act implications for farming). In return, they provide quotes, policy context, and social media amplification. This is especially valuable when covering contentious AI topics — having IFA or ICMSA perspectives grounds your reporting in farmer concerns.



Would they see you as a threat? No. These organisations want maximum media coverage. They have zero commercial interest in gating their press releases. The only risk is inaccurate representation, which your source-citing model mitigates.



Co-ops have advertising budgets and technology stories to tell

Verdict: Significant commercial opportunity. They already spend on farming media.



Documented evidence of co-op media sponsorships: Dairygold partnered with Agriland on the "Blackwater Catchment Series" (branded sustainability content). 

Agriland

&#x20;Aurivo's retail arm Homeland sponsored Agriland's FarmLand TV show launch. 

Agriland

&#x20;Volac ran a four-part "Feeding Success" native content series through Agriland. 

Agriland Advertising

&#x20;Dairygold sponsors Dairy Women Ireland conferences 

LinkedIn

&#x20;and multiple farm events.



Tirlán's Nurture Fund — a €10 million seed fund for early-stage agri-food tech investments — signals direct interest in the AI/tech space. 

Tirlan

Global AgInvesting

&#x20;Co-ops are increasingly communicating sustainability metrics, technology adoption, and carbon accounting to their farmer-suppliers. FarmAI Ireland's niche aligns with the content they need to distribute: explaining new milking technology, genomic tools, grassland management AI, and environmental compliance systems.



The commercial model: Sponsored newsletter sections, co-branded explainer series (e.g., "Understanding your carbon footprint report — presented by Dairygold"), and sponsored coverage of their technology rollouts. Co-ops need to communicate complex technology to their supplier base — FarmAI Ireland's "plain English translator" positioning serves this need directly.



Realistic first step: Approach one co-op (Tirlán is the obvious choice given their Nurture Fund and tech focus) with a sponsored content proposal after you've published consistently for 3–6 months and can demonstrate audience engagement metrics.



Trade media is where friction is likeliest — but manageable

Verdict: Agriland is the key relationship. Irish Farmers Journal will likely ignore you. Position carefully.



Agriland could view FarmAI Ireland two ways. As a complementary niche outlet (you cover AI specifically, they cover everything, you cite and link to them driving traffic), or as a minor competitor for the same digital farming audience. The balance tips toward complementary because FarmAI Ireland is not trying to break news — you're translating and explaining public information. If FarmAI Ireland consistently links to Agriland articles as sources, the traffic-driving argument is tangible. Agriland itself partners with brands for content, so there is precedent for commercial relationships.



The Irish Farmers Journal is unlikely to engage with a small independent platform in year one. Its content is paywalled, its audience relationship is subscription-based, 

Farmers Journal

&#x20;and it has no incentive to support an aggregator that might reduce the premium on its content. However, IFJ's free content (some articles are always accessible) and public-facing data (event coverage, opinion columns) can still be cited within fair dealing rules.



The legal framework supports FarmAI Ireland's model: Irish fair dealing 

Wikipedia

&#x20;(Copyright and Related Rights Act 2000, Section 51) permits use of works on "current economic, political or religious matters" by media businesses, provided use is not expressly reserved. The EU Copyright Directive Article 15 (transposed November 2021) 

Law Society of Ireland

&#x20;allows "very short extracts" without authorisation. 

European Parliament

&#x20;As a platform under €10M turnover with fewer than 5M monthly unique visitors and under 3 years old, FarmAI Ireland faces "much lighter obligations" under Article 17. 

European Parliament



Practical guidelines: Write original summaries and analysis. Use only very short extracts (a headline or single sentence) with attribution. Always link to originals. Never reproduce photographs without permission. Government and agency content carries more permissive reuse rights than commercial publications.



No precedent exists for this exact model — that is the opportunity

There is no "Morning Brew for farming" in Ireland, the UK, or internationally. Current AI-in-agriculture platforms (Microsoft FarmBeats, Syngenta Cropwise, CropX) are operational tools, not media brands. The Irish farming podcast ecosystem is rich (Agriland's "The Farming Week," 

Player.fm

&#x20;IFJ's daily "Farm Tech Talk," 

Apple Podcasts

&#x20;Teagasc's sector-specific shows) 

Player.fm

&#x20;but fragmented and none focus on AI translation.



The closest UK parallel is FarmingUK (farminguk.com), which operates as a free news aggregator with RSS feeds, 

FeedSpot

&#x20;but it aggregates general farming news rather than providing specialist translation of a specific topic. Farmers Guide — a free monthly UK magazine reaching 90,000+ readers — proves that free farming content can build audience, 

Farmers Guide

&#x20;but again lacks the AI niche focus.



Agriland's own origin story is the most relevant precedent. Cormac Farrelly launched it in 2013 "when most people said farmers would never do digital." He built Ireland's largest agricultural digital audience within four years through free content, mobile-first design, and seven-day publishing. FarmAI Ireland can learn from this playbook while occupying a distinct niche.



Part 3: Sources you can use immediately under open licence

The following sources publish under Creative Commons Attribution 4.0 (CC-BY-4.0) or equivalent open licensing and can be used freely with proper attribution:



CSO PxStat — 175 agricultural datasets with full REST API 

CRAN

&#x20;(attribution: "Source: CSO, Ireland")

Met Éireann — weather forecasts, agri-weather JSON, historical climate data via free API 

Met Éireann

EPA — GHG emissions data, water quality, environmental monitoring via multiple REST APIs 

Epa

DAFM Open Data — 53 datasets via CKAN API at opendata.agriculture.gov.ie

data.gov.ie — 219 CC-BY-4.0 agriculture datasets across all publishers 

data

OSi/Tailte Éireann — National Land Cover Map, boundary data 

Irishriverproject

&#x20;via ArcGIS portal

Eurostat — EU agricultural statistics with API access, updated twice daily 

Eurostat

DAERA (NI) — ArcGIS Hub and OpenDataNI CKAN portal

Teagasc T-Stor — open access research repository (OAI-PMH protocol)

AFBI Repository — open access NI agricultural research 

Dspacedirect

IJAFR — fully open access peer-reviewed Irish agricultural research journal 

Ijafr

Teagasc

Standard attribution for Irish government data: "Contains Irish Public Sector Data licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence." 

OpenStreetMap



The practical playbook for your first twelve months

FarmAI Ireland's data access strategy should follow a clear sequence. Phase one (months 1–3) should build on freely available open data: automate content pipelines from Met Éireann's agri-weather API, CSO's agricultural statistics, EPA emissions data, and LMC NI's weekly price reports. Register on every farming organisation's press distribution list. Cover Teagasc Signpost Series webinars and DAFM scheme announcements editorially.



Phase two (months 4–8) should develop relationships: attend the National Ploughing Championships (September 2026, Tullamore — 250,000+ visitors, every relevant organisation present), join the Irish Grassland Association as a corporate member (networking with Agriland, co-ops, Teagasc), and approach AgTechUCD accelerator 

Silicon Republic

&#x20;or Enterprise Ireland's Competitive Start Fund (up to €50K feasibility funding). 

Enterprise Ireland



Phase three (months 9–12) should pursue commercial partnerships: pitch a sponsored content series to one co-op (Tirlán's Nurture Fund makes them the natural first target), approach Teagasc communications about formal content collaboration, and explore Bord Bia's interest in having their market data interpreted for a new audience segment.



The model works because you're not competing for the same value. Agriland breaks news. The Irish Farmers Journal provides depth. FarmAI Ireland explains what AI means for the person reading it on a tractor. Every source you cite benefits from the attribution and the traffic. The translator position is legally sound, commercially viable, and fills a gap that no existing Irish or UK farming media outlet currently occupies.





