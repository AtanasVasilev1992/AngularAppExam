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

### Key Functionalities
- CRUD operations (Create, Read, Update, Delete) for places and museums
- User authentication and authorization
- Responsive design
- Form validations
- Error handling
- Pagination
- Loading states with spinners
- Confirmation dialogs for destructive actions

## 🛠️ Built With

- Angular 16
- TypeScript
- Node.js 
- Express
- HTML5
- CSS3

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
node server.js
```
The server will start on http://localhost:3030

2. Start the client (in a new terminal)
```bash
cd client
ng serve
```
Navigate to http://localhost:4200 to access the application.

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

## 🔄 REST API

The application communicates with a REST API with the following endpoints:

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

### Likes
- POST `/data/likes` - Like item
- DELETE `/data/likes/:id` - Remove like
- GET `/data/likes/:itemId` - Get likes for item

## Future Improvements

- Search functionality
- Advanced filtering
- User comments
- Image upload
- Interactive map
- Social sharing
- Email notifications

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
