"use strict";

exports.name = "http.app";

exports.requires = [
  "@express",
  "@chalk",
  "@dotenv",
  "@mongoose",
  "@serve-favicon",
  "@path",
  "@cookie-parser",
  "@morgan",
  "@body-parser",
  "@cors",
  "@helmet",
  "@http-errors",
  "middlewares.errors-handle",
  "routes.index",
  "routes.api",
];

exports.factory = function (
  express,
  chalk,
  env,
  mongoose,
  favicon,
  path,
  cookieParser,
  logger,
  bodyParser,
  cors,
  helmet,
  createError,
  midErrorsHandle,
  indexRouter,
  apiRouter
) {
  env.config();

  const app = express();

  app.use(logger("combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static("../../public"));
  app.use(favicon(path.join(__dirname, "../../public", "favicon.ico")));

  // Set view engine.
  app.set("views", path.join(path.resolve(__dirname, "../"), "views"));
  app.set("view engine", "pug");

  // Using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.urlencoded({ extended: true }));

  // CORS.
  app.use(cors());

  // Adding Helmet to enhance your API's security
  app.use(helmet());

  // Create connection to MongoDB
  mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  var db = mongoose.connection;
  db.on("connected", () => {
    console.log(chalk.white.bgGreen("DB connnection successful!"));
  });

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // Register routers.
  app.use("/", indexRouter);
  app.use("/api/", apiRouter);

  // Catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // Handle errors
  app.use(midErrorsHandle);

  return app;
};
