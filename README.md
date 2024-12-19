# AngularAppExam
App for Exam from SoftUni

A web application for exploring and sharing interesting places and museums across Bulgaria. Users can discover, create, and interact with locations throughout the country.

## 🌟 Features

### Public Part (Accessible without authentication)
- Browse all places and museums
- View detailed information about each location
- View likes count
- Register and login functionality

### Private Part (User Area)
- Create new places and museums
- Edit and delete your own content
- Like/unlike places and museums created by other users
- Personal profile with created and liked content
- Comment on places and museums

### Key Functionalities
- CRUD operations (Create, Read, Update, Delete) for places and museums
- User authentication and authorization
- Responsive design
- Form validations
- Error handling
- Pagination
- Loading states with spinners
- Confirmation dialogs for destructive actions
- Global search functionality
- Comments system
- Engaging animations using Angular Animations:
  - Smooth page transitions
  - Card loading animations with stagger effects
  - Interactive button hover effects
  - Tab switching animations in profile
  - Content fade-in effects

## 🚀 Live Demo
The application is deployed and accessible at:
- Frontend: [Explore Bulgaria](https://explore-bulgaria-2024-19-12.web.app)
- Backend: Local development server

## 🛠️ Built With

- Angular 16
- TypeScript
- Node.js 
- Express
- HTML5
- CSS3
- Firebase (Hosting)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/explore-bulgaria.git
```

2. Install the dependencies for the client
```bash
cd explore-bulgaria
cd client
npm install
```

3. Install the dependencies for the server
```bash
cd ../server
npm install
```

### Running the Application

1. Start the server
```bash
cd server
npm start
```
The server will start on http://localhost:3030

2. Start the client (in a new terminal)
```bash
cd client
ng serve
```
Navigate to http://localhost:4200 to access the application.

### Deployment
The frontend application is deployed using Firebase Hosting:

1. Install Firebase tools
```bash
npm install -g firebase-tools
```

2. Login to Firebase
```bash
firebase login
```

3. Build the application
```bash
ng build
```

4. Deploy to Firebase
```bash
firebase deploy
```

The application will be available at the provided Firebase hosting URL.

## 📱 Application Structure

### Components
- **Home** - Landing page with general information
- **Places** - List and manage places
- **Museums** - List and manage museums
- **User Authentication** - Login and Register functionality
- **Profile** - User profile management
- **Shared Components** - Reusable components (loader, confirm dialog, etc.)

### Core Modules
- **Authentication** - Handles user authentication
- **Guards** - Route protection
- **Services** - API communication
- **Interfaces** - TypeScript interfaces for type safety

## 🔐 User Roles

### Guest Users Can:
- View all places and museums
- View details about each location
- Register
- Login

### Registered Users Can:
- All guest permissions
- Create new places and museums
- Edit their own content
- Delete their own content
- Like/unlike content
- Access their profile page
- Comment on places and museums

## 💾 Data Structure

### Places
```typescript
interface Place {
    _id: string;
    name: string;
    city: string;
    image: string;
    description: string;
    workTime: string;
    _ownerId: string;
    createdAt: string;
    updatedAt: string;
}
```

### Museums
```typescript
interface Museum {
    _id: string;
    name: string;
    image: string;
    description: string;
    workTime: string;
    _ownerId: string;
    createdAt: string;
    updatedAt: string;
}
```

### Comments
```typescript
interface Comment {
    _id: string;
    text: string;
    itemId: string;
    username: string;
    _ownerId: string;
    _createdOn: number;
}
```

### Likes
```typescript
interface Like {
    _id: string;
    _ownerId: string;
    itemId: string;
    itemType: 'place' | 'museum';
    createdAt: string;
    updatedAt: string;
}
```

## 🔄 REST API

### Authentication
- POST `/users/register` - Register a new user
- POST `/users/login` - User login
- GET `/users/logout` - User logout

### Places
- GET `/data/places` - Get all places
- GET `/data/places/:id` - Get specific place
- POST `/data/places` - Create new place
- PUT `/data/places/:id` - Edit place
- DELETE `/data/places/:id` - Delete place

### Museums
- GET `/data/museums` - Get all museums
- GET `/data/museums/:id` - Get specific museum
- POST `/data/museums` - Create new museum
- PUT `/data/museums/:id` - Edit museum
- DELETE `/data/museums/:id` - Delete museum

### Comments
- GET `/data/comments` - Get all comments
- POST `/data/comments` - Create new comment
- DELETE `/data/comments/:id` - Delete comment
- GET `/data/comments?where=itemId="${itemId}"` - Get comments for specific item

### Likes
- POST `/data/likes` - Like item
- DELETE `/data/likes/:id` - Remove like
- GET `/data/likes?where=itemId="${itemId}"` - Get likes for specific item
- GET `/data/likes?where=_ownerId="${userId}"` - Get likes by user

## 🎯 Features in Detail

### Search Functionality
- Global search across places and museums
- Real-time search results with debounce
- Results grouped by type (places/museums)

### Comments System
- Add comments to places and museums
- Delete own comments
- View all comments for each location
- Username display for each comment

### Like System
- Like/Unlike places and museums
- View total likes count
- See liked status for logged-in users
- View all liked items in profile

### Profile Features
- View created places and museums
- View liked content
- Manage own content

## 🛠️ Technical Implementation

### RxJS Operators Used
- `debounceTime` - For search optimization
- `distinctUntilChanged` - Prevent duplicate searches
- `switchMap` - Handle async operations
- `map` - Data transformation
- `forkJoin` - Parallel API calls

### Guards
- `AuthGuard` - Protect private routes
- `PublicGuard` - Route protection for authenticated users

### Custom Pipes
- `time` - Format timestamps
- `shortenText` - Truncate long descriptions

### Shared Components
- `Loader` - Loading spinner
- `ConfirmDialog` - Confirmation dialogs
- `SearchResults` - Search results display
- `Pagination` - Page navigation

## 🧪 Unit Testing

### Test Coverage
- API Service tests for core functionality
- CRUD operations testing for Places and Museums
- Form validation tests
- Service method tests for error handling

### Components Tested
- **Places**:
  - AddPlaceComponent
    - Form validation
    - URL validation
    - API interaction
    - Navigation after success
  - EditPlaceComponent
    - Data loading
    - Form population
    - Update functionality
    - URL validation
    - Access control

- **Museums**:
  - Similar test coverage as Places
  - Create/Edit functionality
  - Form validation
  - URL validation

### API Service Tests
- GET operations
- POST operations
- PUT operations
- DELETE operations
- Error handling scenarios
- Response mapping

### Key Test Features
- Mocked services and dependencies
- Async operation testing
- Form interaction testing
- Navigation testing
- Error scenario coverage
- Input validation

### Running Tests
```bash
# Run all tests
ng test

# Run tests with coverage report
ng test --code-coverage
```

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── core/            # Core components (header, footer)
│   ├── shared/          # Shared components and pipes
│   ├── user/            # Authentication components
│   ├── place/           # Place-related components
│   ├── museum/          # Museum-related components
│   ├── types/           # TypeScript interfaces
│   └── services/        # API and authentication services
```

### Development Commands
```bash
# Development server
ng serve

# Build
ng build

# Run tests
ng test
```

# My pages

![home](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/home.png)
![about](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/about.png)
![404](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/404.png)
![museums](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/museums.png)
![places/details](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/place-details.png)
![places/details-author](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/places-details-author.png)
![profile](../AngularAppExam/client/explore-Bulgaria/src/assets/pages/profil-my-content.png)

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
