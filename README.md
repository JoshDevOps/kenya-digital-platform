# SkillBridge

## Fixing Compilation Errors

The following compilation errors were identified and fixed:

1. **Missing SessionRoom Component**:
   - Error: `Module not found: Error: Can't resolve './pages/SessionRoom' in '...'`
   - Fix: Created a new SessionRoom.js file in the src/pages directory.

2. **Missing aws-amplify Dependency**:
   - Error: `Module not found: Error: Can't resolve 'aws-amplify' in '...'`
   - Fix: The aws-amplify package is listed in package.json but might not be properly installed.

3. **Missing react-player Dependency**:
   - Error: `Module not found: Error: Can't resolve 'react-player' in '...'`
   - Fix: The react-player package is listed in package.json but might not be properly installed.

## How to Fix Dependency Issues

If you're still experiencing issues with dependencies, follow these steps:

1. Run the reinstall-dependencies.sh script:
   ```bash
   chmod +x reinstall-dependencies.sh
   ./reinstall-dependencies.sh
   ```

2. Or manually reinstall the dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Rebuild the application:
   ```bash
   npm run build
   ```

## Project Structure

- `/src/components`: Reusable UI components
- `/src/contexts`: React context providers
- `/src/pages`: Page components
- `/src/services`: API and service functions
- `/src/graphql`: GraphQL queries and mutations
- `/src/tests`: Test files

## Dependencies

- React
- React Router
- AWS Amplify
- React Player
- Tailwind CSS

## System Architecture

### 1. Component Hierarchy Diagram

```
App (Root)
├── ThemeProvider
│   ├── AuthProvider
│   │   ├── CourseProvider
│   │   │   ├── AppContent
│   │   │   │   ├── Toast
│   │   │   │   ├── OfflineIndicator
│   │   │   │   ├── PWAInstallPrompt
│   │   │   │   │
│   │   │   │   ├── [Authenticated Layout]
│   │   │   │   │   ├── Sidebar
│   │   │   │   │   └── Main Content Area
│   │   │   │   │       ├── Dashboard/LearnerDashboard/CoachDashboard
│   │   │   │   │       ├── ContentManagement (Coach Only)
│   │   │   │   │       ├── LiveSessions (Coach Only)
│   │   │   │   │       ├── PaymentSettings (Coach Only)
│   │   │   │   │       ├── Analytics (Coach Only)
│   │   │   │   │       ├── AIContentCreator (Coach Only)
│   │   │   │   │       ├── Profile
│   │   │   │   │       ├── LearnerCourses
│   │   │   │   │       ├── MyCourses
│   │   │   │   │       ├── LearnerProgress
│   │   │   │   │       ├── Subscriptions
│   │   │   │   │       ├── Community
│   │   │   │   │       ├── AIHub
│   │   │   │   │       ├── VideoPlayer
│   │   │   │   │       └── SessionRoom
│   │   │   │   │
│   │   │   │   └── [Public Layout]
│   │   │   │       ├── Home
│   │   │   │       ├── Courses
│   │   │   │       ├── CourseDetail
│   │   │   │       ├── Login
│   │   │   │       ├── Register
│   │   │   │       ├── ForgotPassword
│   │   │   │       └── ConfirmAccount
│   │   │   │
│   │   │   └── Shared Components
│   │   │       ├── CourseCard
│   │   │       ├── VideoCard
│   │   │       ├── EnrollmentButton
│   │   │       ├── MPesaPaymentModal
│   │   │       ├── LiveSessionModal
│   │   │       ├── Modal
│   │   │       ├── Button
│   │   │       ├── Card
│   │   │       ├── Badge
│   │   │       ├── ThemeToggle
│   │   │       ├── AITutor
│   │   │       ├── SmartRecommendations
│   │   │       └── DiscussionForum
```

### 2. Data Flow Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AWS Amplify    │    │   Backend       │
│   (React App)   │    │   GraphQL API    │    │   Services      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ Auth    │◄────────────►│ Auth  │◄────────────►│ Cognito │
    │ Context │              │ API   │              │ User    │
    └─────────┘              └───────┘              │ Pool    │
         │                       │                  └─────────┘
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ Course  │◄────────────►│Course │◄────────────►│DynamoDB │
    │ Context │              │ API   │              │ Tables  │
    └─────────┘              └───────┘              └─────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ UI      │◄────────────►│Video/ │◄────────────►│   S3    │
    │ Pages   │              │Media  │              │ Storage │
    └─────────┘              │ API   │              └─────────┘
                             └───────┘
                                 │
                            ┌────▼────┐
                            │ Payment │
                            │ Service │
                            │(M-Pesa) │
                            └─────────┘

Data Flow Patterns:
1. Authentication: Login → AuthContext → Cognito → User State
2. Course Data: UI → CourseContext → GraphQL → DynamoDB
3. Media Upload: Component → S3 API → S3 Bucket
4. Real-time: SessionRoom → GraphQL Subscriptions → Live Updates
5. Payments: PaymentModal → M-Pesa API → Transaction Status
```

### 3. API Endpoint Mappings

```
GraphQL API Endpoints (AWS AppSync):

QUERIES:
├── getUser(id: ID!) → User
├── listCourses(limit: Int, nextToken: String) → CourseConnection
├── getCourse(id: ID!) → Course
├── getUserEnrollments(userId: ID!) → [Enrollment]
├── getCourseEnrollments(courseId: ID!) → [Enrollment]
├── listSessions(courseId: ID) → [Session]
└── getSession(id: ID!) → Session

MUTATIONS:
├── createCourse(input: CreateCourseInput!) → Course
├── updateCourse(input: UpdateCourseInput!) → Course
├── deleteCourse(id: ID!) → Course
├── enrollInCourse(courseId: ID!) → Enrollment
├── updateProgress(enrollmentId: ID!, progress: Float!) → Enrollment
├── createSession(input: CreateSessionInput!) → Session
└── joinSession(sessionId: ID!) → Session

SUBSCRIPTIONS:
└── onSessionUpdate(sessionId: ID!) → Session

Custom API Functions (services/api.js):
├── Video Management
│   ├── createVideo(videoData)
│   ├── updateVideo(videoData)
│   ├── deleteVideo(videoId)
│   └── getVideosByOwner(ownerId)
├── Live Sessions
│   ├── createLiveSession(sessionData)
│   ├── updateLiveSession(sessionData)
│   ├── deleteLiveSession(sessionId)
│   └── getLiveSessionsByOwner(ownerId)
├── Payments
│   ├── processPayment(paymentData)
│   └── getUserPurchases(userId)
└── Analytics
    ├── recordVideoEngagement(engagementData)
    ├── recordSessionAttendance(attendanceData)
    ├── getVideoEngagementStats(videoId)
    └── getSessionAttendanceStats(sessionId)
```

### 4. File Structure Visualization

```
kenya-digital-platform/
├── 📁 infrastructure/           # AWS CDK Infrastructure
│   ├── 📁 bin/                 # CDK entry points
│   ├── 📁 lib/                 # Stack definitions
│   ├── 📁 graphql/             # GraphQL schema
│   └── 📁 resolvers/           # VTL resolvers
│
├── 📁 public/                  # Static assets
│   ├── 📄 index.html
│   └── 📄 manifest.json
│
├── 📁 scripts/                 # Build/deployment scripts
│   ├── 📄 get-env-vars.js
│   └── 📄 validate-and-push.js
│
├── 📁 src/                     # Main application code
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📄 CourseCard.js
│   │   ├── 📄 VideoCard.js
│   │   ├── 📄 MPesaPaymentModal.js
│   │   ├── 📄 LiveSessionModal.js
│   │   ├── 📄 AITutor.js
│   │   ├── 📄 SmartRecommendations.js
│   │   └── 📄 ... (30+ components)
│   │
│   ├── 📁 contexts/            # React Context providers
│   │   ├── 📄 AuthContext.js   # Authentication state
│   │   ├── 📄 CourseContext.js # Course data management
│   │   └── 📄 ThemeContext.js  # Theme switching
│   │
│   ├── 📁 graphql/             # GraphQL operations
│   │   ├── 📄 queries.js       # Query definitions
│   │   ├── 📄 mutations.js     # Mutation definitions
│   │   └── 📄 schema.graphql   # Schema copy
│   │
│   ├── 📁 pages/               # Page components
│   │   ├── 📄 Home.js          # Landing page
│   │   ├── 📄 Dashboard.js     # Main dashboard
│   │   ├── 📄 LearnerDashboard.js
│   │   ├── 📄 CoachDashboard.js
│   │   ├── 📄 ContentManagement.js
│   │   ├── 📄 LiveSessions.js
│   │   ├── 📄 SessionRoom.js   # Video conferencing
│   │   ├── 📄 AIContentCreator.js
│   │   └── 📄 ... (25+ pages)
│   │
│   ├── 📁 services/            # API and business logic
│   │   ├── 📄 api.js           # GraphQL API calls
│   │   ├── 📄 courses.js       # Course operations
│   │   ├── 📄 analytics.js     # Analytics tracking
│   │   └── 📄 storage.js       # File upload/storage
│   │
│   ├── 📁 tests/               # Test files
│   │   ├── 📄 AuthContext.test.js
│   │   ├── 📄 Register.test.js
│   │   └── 📄 ... (10+ tests)
│   │
│   ├── 📄 App.js               # Main app component
│   ├── 📄 index.js             # Entry point
│   ├── 📄 aws-exports.js       # AWS configuration
│   └── 📄 index.css            # Global styles
│
├── 📄 package.json             # Dependencies
├── 📄 tailwind.config.js       # Tailwind CSS config
├── 📄 buildspec.yml            # AWS CodeBuild spec
└── 📄 README.md                # Project documentation
```