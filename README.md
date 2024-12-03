# Australia Post Address Validator

This project is a Next.js 15 application that validates Australian addresses using the Australia Post API through a GraphQL API. It showcases modern web development techniques, efficient state management, and a clean, responsive user interface.

<img src="/doc/success.png" height="500">
<img src="/doc/error.png" height="500">

## Features

- Address validation using Australia Post API
- GraphQL integration with Apollo Client and Server
- Modern UI with custom styling
- Form management with react-hook-form and zod
- Full TypeScript support
- Comprehensive error handling

## Technologies Used

- Next.js 15 (App Router)
- React 18
- Apollo Client & Server
- TypeScript
- react-hook-form
- zod
- Tailwind CSS
- @as-integrations/next

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm 7.x or later

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Basanta-Kc/lawpath.git
   cd lawpath
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables (update with your actual credentials):
     ```env
     AUSTRALIA_POST_API_KEY=your_api_key
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   Navigate to [http://localhost:3000](http://localhost:3000).

### Running Tests

To run tests:

```bash
npm run test
```

### Building for Production

To build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

Would you like me to add deployment instructions or further expand on any of the sections?