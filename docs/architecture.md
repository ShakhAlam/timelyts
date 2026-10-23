# Architecture

This document describes how Timelyts is put together: how it is built and served, how routing and layout work, which components make up each page, where state lives, and how to extend it. Diagrams use [Mermaid](https://mermaid.js.org/), which GitHub and Azure DevOps render natively.

- [At a glance](#at-a-glance)
- [Runtime and deployment](#runtime-and-deployment)
- [Application bootstrap and layout](#application-bootstrap-and-layout)
- [Routing](#routing)
- [Component catalogue](#component-catalogue)
- [Page compositions](#page-compositions)
- [User flows](#user-flows)
- [State management](#state-management)
- [Component props](#component-props)
- [Styling and theming](#styling-and-theming)
- [Build and delivery pipeline](#build-and-delivery-pipeline)
- [Design notes and technical debt](#design-notes-and-technical-debt)
- [Extending the app](#extending-the-app)

## At a glance

- **Single-page application** bootstrapped with Create React App (`react-scripts` 5), written in strict TypeScript.
- **React Router 6** with one layout route (`App`) that wraps every page in the app bar, theme and date-localisation providers.
- **MUI 5** for all UI: cards, tabs, accordions, drawers and the MUI Lab date pickers.
- **No backend yet.** Pages render hard-coded sample data and each component keeps its own local state. There is no API client, global store or persistence.
- **Express** static server for production hosting and **Azure Pipelines** for CI.

## Runtime and deployment

```mermaid
flowchart LR
    subgraph Dev["Developer machine"]
        SRC["src/ (TypeScript + JSX)"]
        CRA["react-scripts start<br/>webpack dev server :3000"]
        SRC --> CRA
    end

    subgraph CI["Azure Pipelines (push to main)"]
        INSTALL["npm install"] --> BUILD["npm run build"]
    end

    subgraph Host["Production host (e.g. Heroku)"]
        EXP["server/server.js<br/>Express :PORT or 3001"]
        STATIC[("Static bundle<br/>index.html, JS, CSS")]
        EXP --> STATIC
    end

    BROWSER["Browser<br/>React SPA"]

    CRA -- "HMR + bundle" --> BROWSER
    SRC -. "git push" .-> CI
    BUILD -- "build/" --> STATIC
    EXP -- "GET * returns index.html" --> BROWSER
```

The Express server serves static files and returns `index.html` for every other path, so React Router can handle deep links on the client. The server is currently pointed at `public/` rather than `build/`; see [Design notes](#design-notes-and-technical-debt).

## Application bootstrap and layout

`src/index.tsx` loads global CSS (Bootstrap, then `index.css`), declares the whole route table and renders it into `#root`. `App` is the layout route: it provides the theme and the date adapter, draws the app bar and drawer, and renders the active page through `<Outlet/>`.

```mermaid
flowchart TD
    ROOT["index.html #root"] --> SM["React.StrictMode"]
    SM --> BR["BrowserRouter"]
    BR --> RS["Routes"]
    RS --> APP["App (layout route path='/*')"]

    subgraph AppTree["App.tsx"]
        APP --> LP["LocalizationProvider<br/>date-fns adapter"]
        LP --> TP["ThemeProvider<br/>lightMode / darkMode"]
        TP --> BOX["BoxStyled #mainbox<br/>background image by theme"]
        BOX --> CSS["CssBaseline"]
        BOX --> BAR["PrimarySearchAppBar"]
        BAR --> DRAWER["PersistentDrawer"]
        BOX --> OUT["Outlet"]
    end

    OUT --> PAGE["Active page component<br/>(see Routing)"]
```

## Routing

All routes are children of the `App` layout route, so every page shares the app bar and theme.

```mermaid
flowchart LR
    APP(["App layout /*"])

    APP --> HOME["/ (index)<br/>Home"]
    APP --> SCHED["/schedules<br/>Calendar"]
    APP --> PUB["/publish<br/>Publish"]
    APP --> CREATE["/publish/create/:type<br/>NewSessionType"]
    APP --> EDIT["/publish/edit/:id<br/>EditSessionType"]
    APP --> SUBS["/subscriptions<br/>Subscriptions"]
    APP --> CONT["/contacts<br/>Contacts"]
    APP --> AUTO["/automations<br/>Automations"]
    APP --> BOOK["/booking-page<br/>BookingPage"]
    APP --> PROF["/profile<br/>Profile (stub)"]
    APP --> SIGN["/signin<br/>Signin (stub)"]
    APP --> NF["* (catch-all)<br/>'This route is not found'"]

    DR{{"Drawer links without routes:<br/>/analytics, /logout"}} -.-> NF
```

| Path | Component | File | Params |
|---|---|---|---|
| `/` | `Home` | `src/routes/Home.tsx` | |
| `/schedules` | `Calendar` | `src/routes/Calendar.tsx` | |
| `/publish` | `Publish` | `src/routes/publish/Publish.tsx` | |
| `/publish/create/:type` | `NewSessionType` | `src/routes/publish/NewSessionType.tsx` | `type`: `one-on-one`, `group`, `collective` or `round-robin` |
| `/publish/edit/:id` | `EditSessionType` | `src/routes/publish/EditSessionType.tsx` | `id`: session type id |
| `/subscriptions` | `Subscriptions` | `src/routes/Subscriptions.tsx` | |
| `/contacts` | `Contacts` | `src/routes/Contacts.tsx` | |
| `/automations` | `Automations` | `src/routes/Automations.tsx` | |
| `/booking-page` | `BookingPage` | `src/routes/BookingPage.tsx` | |
| `/profile` | `Profile` | `src/routes/Profile.tsx` | |
| `/signin` | `Signin` | `src/routes/Signin.tsx` | |
| `*` | inline element | `src/index.tsx` | |

Route params are read with `useParams()` in the thin route wrappers (`NewSessionType`, `EditSessionType`) and passed down as props to the card components that render the forms.

## Component catalogue

Components fall into three layers:

```mermaid
flowchart TB
    subgraph L1["Layout (src/App.tsx, src/components)"]
        App
        PrimarySearchAppBar
        PersistentDrawer
    end

    subgraph L2["Pages (src/routes)"]
        Home
        Calendar
        Publish
        NewSessionType
        EditSessionType
        Subscriptions
        Contacts
        Automations
        BookingPage
    end

    subgraph L3a["Shared components (src/components)"]
        EventTypeCard
        EventTypeShareModal
        ShareLinkCard
        ScheduleCard
        ScheduleWeekView
        DateTimeAutoComplete
        SubscriptionCard
        SubscriptionDateCard
        ContactCard
        WorkflowSummaryCard
        BookingSessionInfoCard
        BookingCalendarCard
    end

    subgraph L3b["Publish feature components (src/routes/publish/components)"]
        EventTypeCreateCard
        NewSessionTypeCard
        EditSessionTypeCard
        EventLocationAutoComplete
    end

    L1 --> L2
    L2 --> L3a
    L2 --> L3b
```

| Component | Responsibility |
|---|---|
| `PrimarySearchAppBar` | Fixed top bar: menu button, title, search box, dark-mode switch, mail, notification and account icons, and a mobile overflow menu. Owns the drawer's open state. |
| `PersistentDrawer` | Left navigation drawer. Builds links from a label list (`'Contacts'` becomes `/contacts`) and maps labels to icons. |
| `EventTypeCard` | One published session type: duration, kind, name. Favourite, edit (links to `/publish/edit/1`) and share actions; expandable. |
| `EventTypeShareModal` | Dialog with tabs **Share a link**, **Add to email** and **Add to website**. |
| `ShareLinkCard` | Booking link with copy button, expire-after-first-booking switch and preview link. |
| `ScheduleCard` | Named availability schedule; expands to show `ScheduleWeekView`. |
| `ScheduleWeekView` | Per-day rows with a checkbox and start/end pickers. Uses `react-device-detect` to show native `<input type="time">` on iOS. |
| `DateTimeAutoComplete` | MUI `Autocomplete` over a fixed list of times. |
| `SubscriptionDateCard` | Date header that groups bookings. |
| `SubscriptionCard` | One booking: time range, session name, kind, invitee email, location and time zone. |
| `ContactCard` | One contact: name and email. |
| `WorkflowSummaryCard` | One automation workflow with icon and name. |
| `BookingSessionInfoCard` | Invitee view of session details (title, host, duration, location). |
| `BookingCalendarCard` | `StaticDatePicker` for picking a booking date. |
| `EventTypeCreateCard` | One session kind on `/publish`, with a **Create** button linking to `create/:type`. |
| `NewSessionTypeCard` | Short create form; icon chosen by `type`. **Next** goes to the editor. |
| `EditSessionTypeCard` | Full editor as an accordion of settings sections, with Back, Cancel and Save. |
| `EventLocationAutoComplete` | Free-solo location picker: suggests Google Meet or Phone Call, or lets you add a custom value. |
| `ExampleSelect`, `ScheduleCalendarView` | Unused: an experiment and an empty stub. |

## Page compositions

### Home and sharing

```mermaid
flowchart TD
    Home --> BTN["Button: Publish New Session Type<br/>Link to /publish"]
    Home --> ETC["EventTypeCard x N"]
    ETC --> EDITBTN["Edit icon<br/>Link to /publish/edit/1"]
    ETC --> SHARE["Share icon"]
    SHARE --> MODAL["EventTypeShareModal"]
    MODAL --> T1["Tab: Share a link"]
    MODAL --> T2["Tab: Add to email"]
    MODAL --> T3["Tab: Add to website"]
    T1 --> SLC["ShareLinkCard"]
```

### Publish flow

```mermaid
flowchart TD
    Publish --> ETCC["EventTypeCreateCard x 4<br/>one-on-one, group, collective, round-robin"]
    ETCC -- "Create" --> NST["NewSessionType<br/>useParams type"]
    NST --> NSTC["NewSessionTypeCard"]
    NSTC --> F1["Name, Description, Link, Color TextFields"]
    NSTC --> LOC1["EventLocationAutoComplete"]
    NSTC -- "Next" --> EST["EditSessionType<br/>useParams id"]
    EST --> ESTC["EditSessionTypeCard"]
    ESTC --> A1["Accordion: Session Type"]
    ESTC --> A2["Accordion: Available Times"]
    ESTC --> A3["Accordion: Questions for Invitees"]
    ESTC --> A4["Accordion: Workflows"]
    ESTC --> A5["Accordion: Notifications and Cancellation Policy"]
    ESTC --> A6["Accordion: Confirmation Page"]
    ESTC --> A7["Accordion: Collect Payments"]
    A1 --> LOC2["EventLocationAutoComplete"]
```

### Schedules

```mermaid
flowchart TD
    Calendar["Calendar (/schedules)"] --> ADD["Button: Add New Schedule"]
    Calendar --> SC["ScheduleCard x N"]
    SC -- "expand" --> SWV["ScheduleWeekView"]
    SWV --> DAY["ScheduleWeekViewDay (per weekday)"]
    DAY --> TRV["TimeRangeView"]
    TRV -->|desktop| DTA["DateTimeAutoComplete Start / End"]
    TRV -->|iOS| NATIVE["input type=time x 2"]
```

### Bookings, contacts, automations and the booking page

```mermaid
flowchart LR
    subgraph S["Subscriptions"]
        ST["Tabs: Upcoming / Pending / Past"] --> SDC1["SubscriptionDateCard"] --> SUBC["SubscriptionCard"]
    end
    subgraph C["Contacts"]
        CT["Tabs: Upcoming / Prospects / All"] --> SDC2["SubscriptionDateCard"] --> CC["ContactCard"]
    end
    subgraph A["Automations"]
        WSC["WorkflowSummaryCard x 5<br/>email and SMS reminders"]
    end
    subgraph B["BookingPage"]
        BSI["BookingSessionInfoCard"]
        BCC["BookingCalendarCard<br/>StaticDatePicker"]
    end
```

`Subscriptions` and `Contacts` each define their own local `TabPanel` and `a11yProps` helpers (the MUI tabs example pattern).

## User flows

### Host publishes a session type

```mermaid
sequenceDiagram
    actor Host
    participant Home as Home (/)
    participant Pub as Publish (/publish)
    participant New as NewSessionType (/publish/create/:type)
    participant Edit as EditSessionType (/publish/edit/:id)

    Host->>Home: Open app
    Home-->>Host: Session type cards
    Host->>Home: Click "Publish New Session Type"
    Home->>Pub: navigate /publish
    Pub-->>Host: Four session kinds
    Host->>Pub: Click "Create" on One-on-One
    Pub->>New: navigate create/one-on-one
    New-->>Host: Name, location, description, link, color form
    Host->>New: Fill form, click "Next"
    New->>Edit: navigate /publish/edit/1
    Edit-->>Host: Accordion editor
    Host->>Edit: Save or Cancel
    Note over Edit: Values stay in local state only, no API call yet
```

### Host shares a booking link and an invitee books

```mermaid
sequenceDiagram
    actor Host
    actor Invitee
    participant Card as EventTypeCard
    participant Modal as EventTypeShareModal
    participant Booking as BookingPage (/booking-page)

    Host->>Card: Click share icon
    Card->>Modal: open = true
    Modal-->>Host: Link http://host/booking-page
    Host->>Modal: Copy Link
    Host-->>Invitee: Send link (outside the app)
    Invitee->>Booking: Open link
    Booking-->>Invitee: Session info and date picker
    Invitee->>Booking: Pick a date
    Note over Booking: Slot selection and confirmation are not implemented yet
```

## State management

There is no global store (Redux, Context or similar) and no server state. All state is `React.useState` in the component that uses it.

| Owner | State | Purpose |
|---|---|---|
| `App` | `darkModeChecked` | Position of the theme switch. The selected theme object is held in a module-level variable `theme`. |
| `App` | `drawerOpen` | Passed to the app bar but not used to drive the drawer. |
| `PrimarySearchAppBar` | `drawerOpen`, `anchorEl`, `mobileMoreAnchorEl` | Drawer visibility and menu anchors |
| Card components | `expanded` | Expand/collapse of the card body |
| `EventTypeCard` | `shareModalOpen` | Share dialog visibility |
| `EventTypeShareModal` | `selectedTab` | Active share tab |
| `ShareLinkCard` | `copyButtonText` | "Copy Link" / "Link Copied! ✓" feedback (resets after 1.5 s) |
| `Subscriptions`, `Contacts` | `value` | Active tab |
| `NewSessionTypeCard`, `EditSessionTypeCard` | `formValues` | Form inputs (not saved) |
| `EditSessionTypeCard` | `expanded` | Open accordion panel |
| `BookingCalendarCard`, `ScheduleWeekViewDay`, autocompletes | `value` | Selected date or time |

### Theme switching

```mermaid
stateDiagram-v2
    [*] --> Light: initial theme = lightMode
    Light --> Dark: switch toggled and previous darkModeChecked was true
    Dark --> Light: switch toggled and previous darkModeChecked was false
    note right of Light
        Day background (day_01.jpg)
    end note
    note right of Dark
        Night background (nightsky_02.jpg)
    end note
```

`handleDarkModeChange` sets `darkModeChecked` and then branches on the value from **before** the click, so the theme lags one toggle behind the switch. Holding the theme in a module variable instead of state also means the change only shows up because the `setDarkModeChecked` call triggers a re-render. The fix is to derive the theme from state: `const theme = darkModeChecked ? darkMode : lightMode`.

## Component props

Props are declared as `I<Component>Props` interfaces and components are typed as `React.FC<Props>`.

```mermaid
classDiagram
    class IPrimarySearchAppBarProps {
        +handleDarkModeChange(e) any
        +boolean darkModeChecked
        +boolean drawerOpen
    }
    class IProps_PersistentDrawer {
        +boolean open
        +handleDrawerClose(a) kmEvent
    }
    class IEventTypeCardProps {
        +String name
        +String sessionLen
        +String sessionType
    }
    class IEventTypeShareModalProps {
        +boolean open
        +any handleClose
        +String name
        +String sessionLen
        +String sessionType
    }
    class IShareLinkCardProps {
        +String link
        +any onClose
    }
    class IScheduleCardProps {
        +String name
    }
    class ISubscriptionCardProps {
        +String name
        +String timeRange
        +String eventType
        +String email
        +String location
        +String inviteeTimeZone
        +String notes
        +String createdDate
    }
    class IContactCardProps {
        +String name
        +String email
    }
    class IWorkflowSummaryCardProps {
        +String name
        +String description
        +ReactNode icon
    }
    class IEventTypeCreateCardProps {
        +String title
        +String description
        +String type
        +ReactElement icon
    }
    class INewSessionTypeCardProps {
        +string type
    }
    class IEditSessionTypeCardProps {
        +string id
    }

    IPrimarySearchAppBarProps ..> IProps_PersistentDrawer : renders drawer
    IEventTypeCardProps ..> IEventTypeShareModalProps : passes name, len, type
    IEventTypeShareModalProps ..> IShareLinkCardProps : renders link card
```

`ISubscriptionCardProps.email`, `notes` and `createdDate` are optional. Several props use the boxed `String` type rather than the primitive `string`; prefer `string` in new code.

## Styling and theming

- **MUI themes** are defined in `App.tsx`: `lightMode` (black primary, white app bar) and `darkMode` (`#ccd9e0` primary, black app bar). Both use `#f50057` as the secondary colour.
- **Background:** `BoxStyled` in `App.tsx` picks `src/images/day_01.jpg` or `nightsky_02.jpg` based on `theme.palette.mode` and fixes it to the viewport.
- **Cards** are styled with MUI `styled()` and `sx`, and use translucent dark backgrounds so the background image shows through. Each card file has its own copy of the `ExpandMore` rotating-chevron helper from the MUI card example.
- **Global CSS:** Bootstrap 5 CSS is imported before `index.css`, so app styles take precedence. `App.css` holds a few leftovers from CRA.
- **Responsive layout** uses the MUI `Grid` breakpoints (`xs`/`sm`/`md`) and `useMediaQuery('(min-width:600px)')` to hide secondary text on small screens.
- **Dates:** `LocalizationProvider` with the `date-fns` adapter at the root, so every MUI Lab picker shares it.

## Build and delivery pipeline

```mermaid
flowchart LR
    PUSH["git push to main"] --> TRIG["Azure Pipelines trigger"]
    TRIG --> AGENT["ubuntu-latest agent"]
    AGENT --> NODE["NodeTool@0<br/>Node 16.x"]
    NODE --> INST["npm install"]
    INST --> BLD["npm run build<br/>react-scripts build"]
    BLD --> OUT[("build/<br/>hashed JS and CSS")]
    OUT -. "manual: git push heroku" .-> HEROKU["Heroku"]
```

The pipeline doesn't run `npm test`, publish build artifacts or deploy. Heroku deployment is manual (see [getting-started](getting-started.md#deploying-to-heroku)).

## Design notes and technical debt

| Area | Observation | Suggested direction |
|---|---|---|
| Data | All entities are hard-coded JSX props in route files. | Define domain types (`SessionType`, `Schedule`, `Booking`, `Contact`, `Workflow`) in `src/types/` and load them through a data layer. |
| Server | `server/server.js` serves `public/` instead of `build/`. | Point it at `build/` and add a `start:prod` script or Procfile. |
| Routing | Edit links and **Next** are hard-coded to `/publish/edit/1`. Drawer links `/analytics` and `/logout` have no routes. | Use real ids; add routes or remove the links. |
| Forms | Every `TextField` in the session type forms uses `name="name"`. | Give each field a unique `name` that matches a key in `defaultValues`. |
| Theme | The switch handler reads stale state, and the theme lives in a module variable. | Derive the theme from state with `useMemo`. |
| Schedules | `ScheduleWeekView` lists `Sun, Mon, Wed, Thu, Fri, Sat` (no Tuesday). Non-iOS mobile renders an empty `<div/>`. | Fix the day list; use the MUI `TimePicker` on all platforms. |
| Duplication | `ExpandMore`, `TabPanel` and `a11yProps` are copied across files. | Extract them to `src/components/common/`. |
| Dependencies | `react-dnd`, `jquery`, `popper.js` and the Bootstrap JS bundle are unused. MUI and Emotion are pinned to `latest`. | Remove the unused packages; pin exact versions. |
| Tests | Only the stale CRA template test exists, and it fails. | Add React Testing Library tests per route, rendered inside `MemoryRouter`. |

## Extending the app

### Adding a backend

The intended shape once an API exists:

```mermaid
flowchart LR
    subgraph SPA["React SPA"]
        PAGES["Route components"] --> HOOKS["Data hooks<br/>useSessionTypes, useSchedules..."]
        HOOKS --> CLIENT["src/api/ client<br/>fetch + REACT_APP_API_URL"]
        PAGES --> AUTH["Auth context<br/>current user, token"]
        CLIENT --> AUTH
    end
    CLIENT -- "HTTPS JSON" --> API["REST API"]
    API --> DB[("Database")]
    API --> NOTIFY["Email and SMS provider<br/>(automations)"]
```

- Keep route components thin: fetch data through hooks and pass plain props to the existing cards, which are already presentational.
- Put cross-cutting state (current user, theme) in React Context providers alongside `ThemeProvider` in `App.tsx`.
- Express in `server/` can also proxy `/api` while it serves the SPA.

### Adding a page

See [getting-started: Adding a new page](getting-started.md#adding-a-new-page). In short: create the component in `src/routes/`, register it under the `App` route in `src/index.tsx`, and add a label and icon in `PersistentDrawer`.

### Conventions

- One default-exported component per file, named after the file.
- `I<Name>Props` interfaces with `React.FC<Props>`.
- Feature-specific components live in a `components/` folder next to the feature's routes (`src/routes/publish/components/`). Components used across features go in `src/components/`.
- Pages start with `<Box sx={{ paddingTop: 12 }}>` to clear the fixed app bar.
