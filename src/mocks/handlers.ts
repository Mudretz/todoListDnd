import { HttpResponse, http } from "msw";

// response resolver
const mockData = [
    {
      title:
        "Что такое генераторы статических сайтов и почему Astro — лучший фреймворк для разработки лендингов",
      url: "https://habr.com/ru/articles/779428/",
      author: "@AlexGriss",
    },
    {
      title: "Как использовать html-элемент <dialog>?",
      url: "https://habr.com/ru/articles/778542/",
      author: "@AlexGriss",
    },
  ]

const postsResolver = () => {
  return HttpResponse.json(mockData);
};

const postsHandler = http.get("/api/posts", postsResolver);
const createPostHandler = http.post('/user', async ({ request }) => {
    const newPost = await request.json();

    return HttpResponse.json(newPost, { status: 201 })
  })

export const handlers = [postsHandler, createPostHandler];