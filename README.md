This website has been created as a Frontend Web Developer -  SKILL ASSESSMENT TASK by  [Kazi Wakil Ahmed](https://kwa.netlify.app). <br>
You can see the live demo [here](https://ph-assessment-task-5-2-2024.vercel.app/).

## How to run on local machine?

To run locally, clone this repository and run the following command within the root folder:

```
npm run dev
```
OR
```
yarn dev
```
Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How to start/setup a new project?

Open your work folder in terminal and run the following command to start a new NextJs project.
```
npx create-next-app@latest
```

On installation, you'll see the following prompts:
```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

Go with the default or customize the defaults as you see fit. Install any other packages necessary and start working.

## Brief overview of the architecture

Next.js is a React framework that enables server-side rendering (SSR), static site generation (SSG), and other advanced features. Its architecture revolves around the concept of pages, routing, and server-side rendering capabilities.

1. Routing: Next.js provides built-in routing capabilities, so developers don't need to install additional routing libraries. It follows the file-based routing approach, where each file inside the pages directory represents a route in your application.
   
2. Server-side Rendering (SSR): Next.js supports server-side rendering, allowing us to pre-render React components on the server before sending them to the client. This improves performance and ensures that search engines and social media crawlers can properly index website content.

3. Static Site Generation (SSG): Next.js also supports static site generation, where pages are pre-rendered at build time instead of on each request. This approach generates HTML files for each page at build time, which can be served statically by a CDN or web server. 

4. API Routes: Next.js allows you to create API routes by adding JavaScript files inside the ```app/api``` directory. These files can handle HTTP requests and responses, enabling us to build backend logic directly within your Next.js application. 

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

NextJs applications can be deployed as web services on any platform that supports NodeJs. This project is deployed on Vercel.
