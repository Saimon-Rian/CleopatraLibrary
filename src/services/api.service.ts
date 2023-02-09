import type { Context, ServiceSchema } from "moleculer";
import type { ApiSettingsSchema, GatewayResponse, IncomingRequest, Route } from "moleculer-web";
import ApiGateway from "moleculer-web";
import jwt from "jsonwebtoken";

interface Meta {
	userAgent?: string | null | undefined;
	user?: object | null | undefined;
}

const ApiService: ServiceSchema<ApiSettingsSchema> = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "",
            // Configures the Access-Control-Allow-Methods CORS header. 
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            // Configures the Access-Control-Allow-Headers CORS header.
            allowedHeaders: ['*'],
            // Configures the Access-Control-Expose-Headers CORS header.
            exposedHeaders: [],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
            maxAge: 3600
        },
		// Exposed port
		port: process.env.PORT != null ? Number(process.env.PORT) : 3050,

		// Exposed IP
		ip: "0.0.0.0",

		// Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
		use: [],

		routes: [
			{
				path: "/",
				aliases: {
					"POST login": "UserService.userLogin",
				},
				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: false,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: false,
				
				
			},
			{
				path: "/api",

				// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
				use: [],

				// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
				mergeParams: true,

				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: false,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: false,

				// The auto-alias feature allows you to declare your route alias directly in your services.
				// The gateway will dynamically build the full routes from service schema.
				autoAliases: true,

				aliases: {
					"POST user/new": "UserService.newUser",
					"GET /user": "UserService.allUser",
					"GET /user/profile": "UserService.getProfile",
					"GET /user/:user_id": "UserService.getUser",
					"PUT /user/:user_id": "UserService.updateUser",
					"DELETE /user/:user_id": "UserService.deleteUser",
					///////////////////////////////////////
					"POST /book/new": "BookService.newBook",
					"GET /book": "BookService.allBook",
					"GET /book/:book_id": "BookService.getBook",
					"PUT /book/:book_id": "BookService.updateBook",
					"DELETE /book/:book_id": "BookService.deleteBook",
					///////////////////////////////////////
					"POST /comment/new": "CommentService.newComment",
					"GET /comment": "CommentService.allComment",
					"GET /comment/:comment_id": "CommentService.getComment",
					"PUT /comment/:comment_id": "CommentService.updateComment",
					"DELETE /comment/:comment_id": "CommentService.deleteComment",
					///////////////////////////////////////
					"POST /rating/new": "RatingService.newRating",
					"GET /rating": "RatingService.allRating",
					"GET /rating/:rating_id": "RatingService.getRating",
					"PUT /rating/:rating_id": "RatingService.updateRating",
					"DELETE /rating/:rating_id": "RatingService.deleteRating",
					///////////////////////////////////////
					"POST /user/favorite": "FavoriteService.newFavorite",
					"DELETE /user/favorite/:user/:book": "FavoriteService.deleteFavorite",
				},

				/**
				 * Before call hook. You can check the request.
				 *
				onBeforeCall(
					ctx: Context<unknown, Meta>,
					route: Route,
					req: IncomingRequest,
					res: GatewayResponse,
				): void {
					// Set request headers to context meta
					ctx.meta.userAgent = req.headers["user-agent"];
				}, */

				/**
				 * After call hook. You can modify the data.
				 *
				onAfterCall(
					ctx: Context,
					route: Route,
					req: IncomingRequest,
					res: GatewayResponse,
					data: unknown,
				): unknown {
					// Async function which return with Promise
					// return this.doSomething(ctx, res, data);
					return data;
				}, */

				// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},

				// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
				mappingPolicy: "all", // Available values: "all", "restrict"

				// Enable/disable logging
				logging: true,
			},
		],

		// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
		log4XXResponses: false,
		// Logging the request parameters. Set to any log level to enable it. E.g. "info"
		logRequestParams: null,
		// Logging the response data. Set to any log level to enable it. E.g. "info"
		logResponseData: null,

		// Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
		assets: {
			folder: "public",

			// Options to `server-static` module
			options: {},
		},
	},

	methods: {
		/**
		 * Authenticate the request. It check the `Authorization` token value in the request header.
		 * Check the token value & resolve the user by the token.
		 * The resolved user will be available in `ctx.meta.user`
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 */
		authenticate(
            ctx: Context,
            route: Route,
            req: IncomingRequest,
        ){
            // Read the token from header
            const auth = req.headers.authorization;

            if (!auth){
                throw new ApiGateway.Errors.UnAuthorizedError(
                        ApiGateway.Errors.ERR_NO_TOKEN,
                        null,
                    );
            }

            const token = auth.replace('Bearer', '').trim()

            try {
                var decoded_user = jwt.verify(token, 'secret');
                if (decoded_user){
                    return decoded_user
                }
            } catch(err) {
                // Invalid token
                throw new ApiGateway.Errors.UnAuthorizedError(
                    ApiGateway.Errors.ERR_INVALID_TOKEN,
                    null,
                );
            }

            throw new ApiGateway.Errors.UnAuthorizedError(
                ApiGateway.Errors.ERR_NO_TOKEN,
                null,
            );

        },
		/**
		 * Authorize the request. Check that the authenticated user has right to access the resource.
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 */
		authorize(ctx: Context<null, Meta>, route: Route, req: IncomingRequest) {
			// Get the authenticated user.
			const { user } = ctx.meta;

			// It check the `auth` property in action schema.
			if (req.$action.auth === "required" && !user) {
				throw new ApiGateway.Errors.UnAuthorizedError("NO_RIGHTS", null);
			}
		},
	},
};

export default ApiService;
