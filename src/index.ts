require('dotenv').config();

import { Router } from 'itty-router';
import productsRouter from './routes/ProductsRouter';

const router = Router();

// Register the products router
router.all('/api/*', productsRouter.handle);

router.all('*', () => new Response('Catch-all route triggered'));

async function handleRequest(request: Request): Promise<Response> {
    console.log('Received request:', request.method, request.url);
    
    const response = await router.handle(request);

    console.log('Response in index:', response);
    
    if (!response) {
        console.log('Using fallback response');
        return new Response("Not able to handle this request");
    }
    
    console.log('Router provided a response:', response.status);
    return response;
}

// Register the event listener for fetch
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});




/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export interface Env {
// 	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
// 	// MY_KV_NAMESPACE: KVNamespace;
// 	//
// 	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
// 	// MY_DURABLE_OBJECT: DurableObjectNamespace;
// 	//
// 	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
// 	// MY_BUCKET: R2Bucket;
// 	//
// 	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
// 	// MY_SERVICE: Fetcher;
// }

// export default {
// 	async fetch(
// 		request: Request,
// 		env: Env,
// 		ctx: ExecutionContext
// 	): Promise<Response> {
// 		console.log('in fetch');
// 		return new Response("Hello World!");
// 	},
// };
