# Lightweight version of ExpressGateway
----

This is a fork of [ExpressGateway](https://github.com/ExpressGateway/express-gateway) trimmed down to the minimal to reduce the amount of dependencies.

Original blurp:

> Express Gateway is a microservices API gateway that sits at the heart of any microservices or serverless architecture, regardless of what language or platform you're using.
>
> Express Gateway secures your microservices and serverless functions and expose them through APIs using Node.js, Express and Express middleware.

---

Removed from original:

- commandline interface
- admin API
- proxy-agent support
- Redis emulation

For documentation see:

- https://www.express-gateway.io/
- https://github.com/ExpressGateway/express-gateway
- https://github.com/ExpressGateway/express-gateway.io
- and the source code

## Creating a Gateway

```bash
mkdir my-gateway
cd my-gateway
git init .
git submodule add git@github.com:jomco/express-gateway-lite.git vendor/express-gateway
cp -rv vendor/express-gateway/example/* .
npm install
npm start
```

## Contribution

Contributions are welcome! Please log an issue or create a pull
request.

## License

[Apache-2.0 License](./LICENSE)

Copyright © Express Gateway Contributors
