# Course Selling Website

This is a Node.js-based course selling website featuring JWT authentication, MongoDB integration, and input validation with Zod.

## Steps to Run Locally

1. Clone the repository: `https://github.com/Yuvateja01/CourseSellingBackend.git`
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Set up MongoDB and ensure it's running.
5. Start the application: `npm start` or `node index.js`
6. Access the website on `http://localhost:3000` in your web browser.

## Routes

### Admin Routes:

- `POST /admin/signup`
  - **Description**: Creates a new admin account.
  - **Input Body**: `{ username: 'admin', password: 'pass' }`
  - **Output**: `{ message: 'Admin created successfully' }`

- `POST /admin/signin`
  - **Description**: Logs in an admin account.
  - **Input Body**: `{ username: 'admin', password: 'pass' }`
  - **Output**: `{ token: 'your-token' }`

- `POST /admin/courses`
  - **Description**: Creates a new course.
  - **Input**:
    - **Headers**: `{ 'Authorization': 'Bearer ' }`
    - **Body**: `{ title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }`
  - **Output**: `{ message: 'Course created successfully', courseId: "new course id" }`

- `GET /admin/courses`
  - **Description**: Returns all the courses.
  - **Input**: 
    - **Headers**: `{ 'Authorization': 'Bearer ' }`
  - **Output**: 
    ```json
    {
      "courses": [
        { 
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        },
        // Other courses...
      ]
    }
    ```

### User Routes:

- `POST /users/signup`
  - **Description**: Creates a new user account.
  - **Input**: `{ username: 'user', password: 'pass' }`
  - **Output**: `{ message: 'User created successfully' }`

- `POST /users/signin`
  - **Description**: Logs in a user account.
  - **Input**: `{ username: 'user', password: 'pass' }`
  - **Output**: `{ token: 'your-token' }`

- `GET /users/courses`
  - **Description**: Lists all available courses.
  - **Input**: 
    - **Headers**: `{ 'Authorization': 'Bearer ' }`
  - **Output**: 
    ```json
    {
      "courses": [
        { 
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        },
        // Other courses...
      ]
    }
    ```

- `POST /users/courses/:title`
  - **Description**: Purchases a course.
  - **Input**: 
    - **Headers**: `{ 'Authorization': 'Bearer ' }`
  - **Output**: `{ message: 'Course purchased successfully' }`

- `GET /users/purchasedCourses`
  - **Description**: Lists all purchased courses by the user.
  - **Input**: 
    - **Headers**: `{ 'Authorization': 'Bearer ' }`
  - **Output**: 
    ```json
    {
      "purchasedCourses": [
        { 
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        },
        // Other purchased courses...
      ]
    }
    ```

